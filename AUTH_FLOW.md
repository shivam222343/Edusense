# Authentication Flow Documentation

## 🔄 Complete Authentication Flow

### 1. Email/Password Signup Flow
```
User fills signup form
    ↓
Frontend: signUpWithEmail(email, password)
    ↓
Firebase creates user account
    ↓
Firebase returns ID token
    ↓
Frontend: POST /api/auth/verify-token { idToken, hasSetPassword: true }
    ↓
Backend: Verify token with Firebase Admin
    ↓
Backend: Create user in MongoDB
    ↓
Backend: Generate JWT
    ↓
Backend: Set HttpOnly cookie
    ↓
Backend: Return user data
    ↓
Frontend: Save user to Zustand store
    ↓
Frontend: Redirect to /dashboard
```

### 2. Email/Password Login Flow
```
User fills login form
    ↓
Frontend: loginWithEmail(email, password)
    ↓
Firebase authenticates user
    ↓
Firebase returns ID token
    ↓
Frontend: POST /api/auth/verify-token { idToken }
    ↓
Backend: Verify token with Firebase Admin
    ↓
Backend: Find user in MongoDB
    ↓
Backend: Generate JWT
    ↓
Backend: Set HttpOnly cookie
    ↓
Backend: Return user data
    ↓
Frontend: Save user to Zustand store
    ↓
Frontend: Redirect to /dashboard
```

### 3. Google Sign-In Flow (First Time)
```
User clicks "Continue with Google"
    ↓
Frontend: signInWithGoogle()
    ↓
Google OAuth popup appears
    ↓
User selects Google account
    ↓
Firebase returns ID token
    ↓
Frontend: POST /api/auth/verify-token { idToken }
    ↓
Backend: Verify token with Firebase Admin
    ↓
Backend: User NOT found in MongoDB
    ↓
Backend: Create new user (provider: "google", hasPassword: false)
    ↓
Backend: Generate JWT
    ↓
Backend: Set HttpOnly cookie
    ↓
Backend: Return { user, needsPassword: true }
    ↓
Frontend: Save user to Zustand store
    ↓
Frontend: Open SetPasswordModal
    ↓
User sets password (or skips)
    ↓
Frontend: setPasswordForGoogleUser(password)
    ↓
Firebase updates user password
    ↓
Frontend: POST /api/auth/update-password-status
    ↓
Backend: Update user.hasPassword = true
    ↓
Frontend: Close modal
    ↓
User is on /dashboard
```

### 4. Google Sign-In Flow (Returning User)
```
User clicks "Continue with Google"
    ↓
Frontend: signInWithGoogle()
    ↓
Google OAuth popup appears
    ↓
User selects Google account
    ↓
Firebase returns ID token
    ↓
Frontend: POST /api/auth/verify-token { idToken }
    ↓
Backend: Verify token with Firebase Admin
    ↓
Backend: User FOUND in MongoDB
    ↓
Backend: Generate JWT
    ↓
Backend: Set HttpOnly cookie
    ↓
Backend: Return { user, needsPassword: false }
    ↓
Frontend: Save user to Zustand store
    ↓
Frontend: Redirect to /dashboard (no password modal)
```

### 5. Session Persistence Flow
```
User refreshes page / reopens browser
    ↓
Frontend: App.jsx useEffect runs
    ↓
Frontend: fetchUser() from Zustand store
    ↓
Frontend: GET /api/auth/me (JWT cookie sent automatically)
    ↓
Backend: authenticateUser middleware
    ↓
Backend: Extract JWT from cookie
    ↓
Backend: Verify JWT signature
    ↓
Backend: Find user in MongoDB
    ↓
Backend: Return user data
    ↓
Frontend: Update Zustand store
    ↓
User remains logged in
```

### 6. Logout Flow
```
User clicks "Logout"
    ↓
Frontend: logout() from Zustand store
    ↓
Frontend: logoutUser() - Firebase signOut
    ↓
Frontend: POST /api/auth/logout
    ↓
Backend: Clear auth_token cookie
    ↓
Frontend: Clear Zustand store
    ↓
Frontend: Redirect to /
```

### 7. Protected Route Flow
```
User tries to access /dashboard
    ↓
ProtectedRoute component checks isAuthenticated
    ↓
If NOT authenticated:
    ↓
    Redirect to /
    ↓
If authenticated:
    ↓
    Render Dashboard component
```

## 🗄️ Data Storage

### Frontend (Zustand + LocalStorage)
```javascript
{
  user: {
    id: "mongodb_id",
    email: "user@example.com",
    name: "John Doe",
    picture: "https://...",
    provider: "google" | "email",
    hasPassword: true | false
  },
  isAuthenticated: true | false,
  isLoading: false,
  error: null
}
```

### Backend (MongoDB)
```javascript
{
  _id: ObjectId,
  firebaseUid: "firebase_uid",
  email: "user@example.com",
  name: "John Doe",
  picture: "https://...",
  provider: "google" | "email",
  hasPassword: true | false,
  createdAt: Date,
  updatedAt: Date
}
```

### JWT Cookie (HttpOnly)
```javascript
{
  userId: "mongodb_id",
  email: "user@example.com",
  firebaseUid: "firebase_uid",
  iat: timestamp,
  exp: timestamp
}
```

## 🔐 Security Layers

1. **Firebase Authentication**: Handles password hashing, OAuth, token generation
2. **Firebase Admin SDK**: Backend verifies all tokens are legitimate
3. **JWT**: Backend-issued token for session management
4. **HttpOnly Cookie**: JWT stored securely, not accessible via JavaScript
5. **CORS**: Only frontend URL can make requests
6. **MongoDB**: User data stored securely with indexes

## 🎯 Key Features

### Dual Login System
- Users can login with Google OR email/password
- Google users can set password to enable email login
- Same user account regardless of login method

### Password Status Tracking
- `hasPassword` field tracks if user has set password
- Google users without password see SetPasswordModal
- Can skip and set password later

### Session Management
- JWT in HttpOnly cookie (7 days expiry)
- Zustand state persisted to localStorage
- Auto-fetch user on app load
- Seamless experience across refreshes

### Error Handling
- Firebase errors caught and displayed
- Backend errors with proper status codes
- User-friendly error messages
- Loading states during async operations

## 📱 Modal State Management

```javascript
// useAuthModalStore
{
  isLoginOpen: false,
  isSignupOpen: false,
  isSetPasswordOpen: false,
  
  openLogin() { ... },
  openSignup() { ... },
  openSetPassword() { ... },
  closeAll() { ... }
}
```

Only one modal can be open at a time. Modals can transition between each other (e.g., Login → Signup).

## 🚀 API Endpoints Summary

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/verify-token` | No | Verify Firebase token, create/login user |
| GET | `/api/auth/me` | Yes | Get current user info |
| POST | `/api/auth/logout` | Yes | Logout and clear cookie |
| POST | `/api/auth/update-password-status` | Yes | Update hasPassword flag |
| GET | `/health` | No | Server health check |

## 🎨 Component Hierarchy

```
App.jsx
├── Router
│   ├── Routes
│   │   ├── / (Landing or redirect to Dashboard)
│   │   ├── /dashboard (Protected)
│   │   └── * (Redirect to /)
│   └── Modals (rendered globally)
│       ├── LoginModal
│       ├── SignupModal
│       └── SetPasswordModal
```

---

**This completes the Phase 1 Authentication Foundation!** 🎉
