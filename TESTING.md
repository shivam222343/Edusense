# 🧪 Phase 1 Testing Checklist

## Pre-Testing Setup

- [ ] MongoDB is running
- [ ] Server `.env` is configured with all credentials
- [ ] Client `.env` is configured with Firebase config
- [ ] Firebase Authentication is enabled (Email/Password + Google)
- [ ] Backend server is running on `http://localhost:5000`
- [ ] Frontend dev server is running on `http://localhost:5173`

## 1. Email/Password Signup Tests

### Basic Signup
- [ ] Open `http://localhost:5173`
- [ ] Click "Get Started" button
- [ ] Modal opens smoothly with animation
- [ ] Fill in all fields (name, email, password, confirm password)
- [ ] Click "Create Account"
- [ ] Loading state shows ("Creating account...")
- [ ] Redirects to `/dashboard`
- [ ] User info displays correctly (name, email)
- [ ] Provider shows as "email"

### Validation Tests
- [ ] Try signup with mismatched passwords → Error: "Passwords do not match"
- [ ] Try signup with password < 6 chars → Error: "Password must be at least 6 characters"
- [ ] Try signup with existing email → Error from Firebase
- [ ] Try signup with invalid email format → Browser validation

### UI/UX Tests
- [ ] Password visibility toggle works
- [ ] Confirm password visibility toggle works
- [ ] Close button (X) closes modal
- [ ] Click outside modal closes it
- [ ] "Sign in" link switches to login modal
- [ ] All icons display correctly (Google, Email, Lock, User, Eye)

## 2. Email/Password Login Tests

### Basic Login
- [ ] Click "Sign In" button
- [ ] Login modal opens
- [ ] Enter email and password from signup
- [ ] Click "Sign In"
- [ ] Loading state shows ("Signing in...")
- [ ] Redirects to `/dashboard`
- [ ] User info displays correctly

### Error Tests
- [ ] Try login with wrong password → Error message displays
- [ ] Try login with non-existent email → Error message displays
- [ ] Try login with invalid email format → Browser validation

### UI/UX Tests
- [ ] Password visibility toggle works
- [ ] "Forgot password?" link is visible (functionality TBD)
- [ ] "Sign up" link switches to signup modal
- [ ] Close button works
- [ ] Click outside closes modal

## 3. Google Sign-In Tests (First Time User)

### First-Time Google Login
- [ ] Click "Continue with Google" in login modal
- [ ] Google OAuth popup appears
- [ ] Select Google account
- [ ] Popup closes
- [ ] **SetPasswordModal appears automatically**
- [ ] Modal shows success icon and message
- [ ] Enter password and confirm password
- [ ] Click "Set Password"
- [ ] Loading state shows
- [ ] Modal closes
- [ ] User is on `/dashboard`
- [ ] User info shows Google profile picture
- [ ] Provider shows as "google"
- [ ] Status shows "Password set"

### Skip Password Option
- [ ] Repeat Google login with new account
- [ ] SetPasswordModal appears
- [ ] Click "Skip for now"
- [ ] Modal closes
- [ ] User is on `/dashboard`
- [ ] Status shows provider as "google" (no password set message)

### Password Validation in SetPasswordModal
- [ ] Try mismatched passwords → Error
- [ ] Try password < 6 chars → Error
- [ ] Password visibility toggles work

## 4. Google Sign-In Tests (Returning User)

### With Password Set
- [ ] Logout
- [ ] Click "Continue with Google"
- [ ] Select same Google account (that has password set)
- [ ] **SetPasswordModal does NOT appear**
- [ ] Directly redirects to `/dashboard`
- [ ] User info displays correctly
- [ ] Status shows "Password set"

### Without Password Set
- [ ] Logout
- [ ] Login with Google account that skipped password
- [ ] **SetPasswordModal appears again**
- [ ] Can set password or skip again

## 5. Session Persistence Tests

### Page Refresh
- [ ] Login with any method
- [ ] Refresh the page (F5)
- [ ] User remains logged in
- [ ] Dashboard still displays
- [ ] User info still correct

### Browser Close/Reopen
- [ ] Login with any method
- [ ] Close browser completely
- [ ] Reopen browser
- [ ] Navigate to `http://localhost:5173`
- [ ] User is still logged in
- [ ] Redirects to `/dashboard`

### Direct URL Access
- [ ] While logged in, navigate to `http://localhost:5173/dashboard` directly
- [ ] Dashboard loads correctly
- [ ] While logged out, navigate to `http://localhost:5173/dashboard`
- [ ] Redirects to `/` (landing page)

## 6. Logout Tests

### Standard Logout
- [ ] Login with any method
- [ ] Click "Logout" button in dashboard
- [ ] Redirects to `/` (landing page)
- [ ] Try accessing `/dashboard` → Redirects to `/`
- [ ] Refresh page → Still logged out
- [ ] Close and reopen browser → Still logged out

### Logout Persistence
- [ ] Login → Logout → Close browser → Reopen
- [ ] User is still logged out
- [ ] No automatic re-login

## 7. Protected Route Tests

### Authenticated Access
- [ ] Login
- [ ] Navigate to `/dashboard` → Loads correctly
- [ ] Navigate to `/` → Redirects to `/dashboard`

### Unauthenticated Access
- [ ] Logout
- [ ] Navigate to `/dashboard` → Redirects to `/`
- [ ] Navigate to `/` → Shows landing page
- [ ] Try any invalid route → Redirects to `/`

## 8. Backend API Tests

### Health Check
- [ ] Open `http://localhost:5000/health`
- [ ] Returns JSON: `{ success: true, message: "Server is running", timestamp: "..." }`

### Verify Token Endpoint
- [ ] Check browser DevTools → Network tab
- [ ] During login/signup, verify `POST /api/auth/verify-token` is called
- [ ] Response includes user data
- [ ] Response sets `auth_token` cookie (check Application → Cookies)

### Get Current User
- [ ] While logged in, check Network tab
- [ ] On page load, verify `GET /api/auth/me` is called
- [ ] Returns current user data
- [ ] Cookie is sent automatically

### Logout Endpoint
- [ ] Click logout
- [ ] Verify `POST /api/auth/logout` is called
- [ ] Cookie is cleared (check Application → Cookies)

## 9. Database Tests

### User Creation
- [ ] Signup with email
- [ ] Check MongoDB (use MongoDB Compass or CLI)
- [ ] Verify user document exists in `ayursetu.users` collection
- [ ] Fields: `firebaseUid`, `email`, `name`, `provider: "email"`, `hasPassword: true`

### Google User Creation
- [ ] Login with Google (first time)
- [ ] Check MongoDB
- [ ] Verify user document exists
- [ ] Fields: `firebaseUid`, `email`, `name`, `picture`, `provider: "google"`, `hasPassword: false`

### Password Status Update
- [ ] Google user sets password
- [ ] Check MongoDB
- [ ] Verify `hasPassword` changed to `true`

### No Duplicate Users
- [ ] Login with Google
- [ ] Logout and login with same Google account
- [ ] Check MongoDB
- [ ] Only ONE user document should exist (no duplicates)

## 10. Error Handling Tests

### Network Errors
- [ ] Stop backend server
- [ ] Try to login → Error message displays
- [ ] Start backend server
- [ ] Try to login → Works correctly

### Firebase Errors
- [ ] Use invalid Firebase config in client `.env`
- [ ] Try to login → Error message displays
- [ ] Fix config
- [ ] Try to login → Works correctly

### MongoDB Errors
- [ ] Stop MongoDB
- [ ] Try to login → Backend error (check server logs)
- [ ] Start MongoDB
- [ ] Try to login → Works correctly

## 11. UI/UX Polish Tests

### Animations
- [ ] All modals open with smooth scale + fade animation
- [ ] All modals close with smooth animation
- [ ] Error messages slide in from top
- [ ] Dashboard cards have stagger animation

### Responsive Design
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768px width)
- [ ] Test on mobile (375px width)
- [ ] All modals are scrollable on small screens
- [ ] All buttons are clickable
- [ ] Text is readable

### Loading States
- [ ] All buttons show loading text during async operations
- [ ] Buttons are disabled during loading
- [ ] Cursor changes to not-allowed on disabled buttons

### Accessibility
- [ ] All form inputs have labels
- [ ] Tab navigation works through forms
- [ ] Enter key submits forms
- [ ] Escape key closes modals (if implemented)

## 12. Security Tests

### Cookie Security
- [ ] Open DevTools → Application → Cookies
- [ ] Find `auth_token` cookie
- [ ] Verify `HttpOnly` flag is set
- [ ] Verify `SameSite` is set
- [ ] Try to access cookie via JavaScript console: `document.cookie`
- [ ] Cookie should NOT be visible/accessible

### CORS
- [ ] Try to make API request from different origin (e.g., Postman)
- [ ] Request should be blocked by CORS
- [ ] Only `http://localhost:5173` should be allowed

### JWT Expiration
- [ ] Login
- [ ] Wait 7 days (or manually expire JWT in backend)
- [ ] Try to access protected route
- [ ] Should be logged out / redirected to login

## 13. Cross-Browser Tests

- [ ] Chrome - All features work
- [ ] Firefox - All features work
- [ ] Edge - All features work
- [ ] Safari - All features work (if on Mac)

## 14. Performance Tests

### Load Times
- [ ] Landing page loads in < 2 seconds
- [ ] Dashboard loads in < 2 seconds
- [ ] Modals open instantly (< 100ms)

### Bundle Size
- [ ] Run `npm run build` in client
- [ ] Check bundle size (should be reasonable, < 500KB gzipped)

## 15. Edge Cases

### Rapid Clicks
- [ ] Click login button multiple times rapidly
- [ ] Should only submit once (button disabled during loading)

### Modal Switching
- [ ] Open login modal
- [ ] Click "Sign up" link
- [ ] Signup modal opens, login modal closes
- [ ] Click "Sign in" link
- [ ] Login modal opens, signup modal closes

### Empty Form Submission
- [ ] Try to submit login form with empty fields
- [ ] Browser validation prevents submission

### Special Characters in Password
- [ ] Signup with password containing special chars: `P@ssw0rd!#$`
- [ ] Should work correctly
- [ ] Login with same password
- [ ] Should work correctly

## 🎯 Success Criteria

All checkboxes above should be checked ✅

If any test fails:
1. Check browser console for errors
2. Check server logs for errors
3. Verify environment variables
4. Check Firebase Console for auth logs
5. Check MongoDB for data issues
6. Refer to troubleshooting section in README.md

---

## 📊 Test Results Summary

- **Total Tests**: ~150+
- **Passed**: ___
- **Failed**: ___
- **Skipped**: ___

**Date Tested**: ___________
**Tested By**: ___________
**Environment**: Development / Production

---

**Happy Testing! 🚀**
