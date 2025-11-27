# 🚀 Quick Setup Guide

## Step 1: Create .env files

### Server .env
```bash
cd server
cp .env.example .env
# Edit .env with your credentials
```

### Client .env
```bash
cd client
cp .env.example .env
# Edit .env with your Firebase config
```

## Step 2: Start MongoDB
Make sure MongoDB is running on your system.

## Step 3: Start Backend
```bash
cd server
npm run dev
```

## Step 4: Start Frontend
```bash
cd client
npm run dev
```

## Step 5: Test Authentication
1. Open http://localhost:5173
2. Click "Get Started"
3. Try signing up with email or Google

---

## 🔑 Quick Firebase Setup

1. **Firebase Console**: https://console.firebase.google.com/
2. **Enable Auth Methods**: Authentication > Sign-in method > Enable Email/Password & Google
3. **Get Client Config**: Project Settings > General > Your apps > Web
4. **Get Admin Config**: Project Settings > Service Accounts > Generate New Private Key

---

## 📋 Checklist

- [ ] MongoDB running
- [ ] Server .env configured
- [ ] Client .env configured
- [ ] Firebase Authentication enabled (Email + Google)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can signup with email
- [ ] Can login with email
- [ ] Can login with Google
- [ ] Set password modal appears for Google users
- [ ] Can logout
- [ ] Session persists after refresh

---

## 🆘 Need Help?

Check the main README.md for detailed instructions and troubleshooting.
