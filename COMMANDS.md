# 🛠️ Common Tasks & Commands

## Development

### Start Everything
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev

# Terminal 3 - MongoDB (if not running as service)
mongod
```

### Stop Everything
- Press `Ctrl+C` in each terminal
- Or close the terminal windows

## Environment Setup

### Create .env Files
```bash
# Server
cd server
cp .env.example .env
# Edit server/.env with your credentials

# Client
cd client
cp .env.example .env
# Edit client/.env with your Firebase config
```

### Generate JWT Secret
```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or use online generator
# https://generate-secret.vercel.app/32
```

## Database Management

### View MongoDB Data
```bash
# Using MongoDB Shell
mongosh
use ayursetu
db.users.find().pretty()

# Or use MongoDB Compass GUI
# Connection string: mongodb://localhost:27017
```

### Clear All Users
```bash
mongosh
use ayursetu
db.users.deleteMany({})
```

### Drop Database (Start Fresh)
```bash
mongosh
use ayursetu
db.dropDatabase()
```

## Testing

### Test Backend API
```bash
# Health check
curl http://localhost:5000/health

# Or open in browser
http://localhost:5000/health
```

### Check Server Logs
- Look at the terminal where `npm run dev` is running
- Logs show:
  - MongoDB connection status
  - Firebase Admin initialization
  - API requests
  - Errors

### Check Frontend Logs
- Open browser DevTools (F12)
- Go to Console tab
- Look for errors or warnings

## Debugging

### Backend Not Starting
```bash
# Check if port 5000 is already in use
netstat -ano | findstr :5000

# Kill process if needed
taskkill /PID <process_id> /F

# Or change port in server/.env
PORT=5001
```

### Frontend Not Starting
```bash
# Check if port 5173 is already in use
netstat -ano | findstr :5173

# Kill process if needed
taskkill /PID <process_id> /F

# Or Vite will auto-increment to 5174
```

### MongoDB Not Running
```bash
# Start MongoDB service (Windows)
net start MongoDB

# Or run manually
mongod --dbpath C:\data\db
```

### Clear Browser Data
1. Open DevTools (F12)
2. Go to Application tab
3. Clear Storage:
   - Cookies
   - Local Storage
   - Session Storage
4. Refresh page

## Firebase

### View Firebase Users
1. Go to Firebase Console
2. Authentication > Users
3. See all registered users

### Delete Firebase User
1. Firebase Console > Authentication > Users
2. Click user > Delete account
3. Also delete from MongoDB:
   ```bash
   mongosh
   use ayursetu
   db.users.deleteOne({ email: "user@example.com" })
   ```

### Reset Firebase Auth
1. Firebase Console > Authentication > Users
2. Delete all users
3. Clear MongoDB:
   ```bash
   mongosh
   use ayursetu
   db.users.deleteMany({})
   ```

## Git

### Initial Commit
```bash
git init
git add .
git commit -m "Phase 1: Complete authentication foundation"
```

### Create .gitignore
Already created! Make sure these are ignored:
- `node_modules/`
- `.env`
- `dist/`

### Push to GitHub
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

## Production Build

### Build Frontend
```bash
cd client
npm run build
# Output in client/dist/
```

### Build Backend
Backend doesn't need building (Node.js runs directly)

### Preview Production Build
```bash
cd client
npm run preview
# Opens production build on http://localhost:4173
```

## Dependencies

### Update All Dependencies
```bash
# Backend
cd server
npm update

# Frontend
cd client
npm update
```

### Check for Vulnerabilities
```bash
npm audit
npm audit fix
```

### Install New Package
```bash
# Backend
cd server
npm install <package-name>

# Frontend
cd client
npm install <package-name>
```

## Useful VS Code Extensions

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)
- GitLens

## Environment Variables Quick Reference

### Server (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayursetu
JWT_SECRET=<32+ char random string>
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
FIREBASE_PROJECT_ID=<from Firebase>
FIREBASE_PRIVATE_KEY="<from Firebase JSON>"
FIREBASE_CLIENT_EMAIL=<from Firebase>
```

### Client (.env)
```env
VITE_FIREBASE_API_KEY=<from Firebase>
VITE_FIREBASE_AUTH_DOMAIN=<project-id>.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=<from Firebase>
VITE_FIREBASE_STORAGE_BUCKET=<project-id>.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=<from Firebase>
VITE_FIREBASE_APP_ID=<from Firebase>
VITE_API_URL=http://localhost:5000
```

## Troubleshooting Commands

### Check Node Version
```bash
node --version
# Should be v16 or higher
```

### Check npm Version
```bash
npm --version
```

### Check MongoDB Version
```bash
mongod --version
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reinstall Dependencies
```bash
# Backend
cd server
rm -rf node_modules package-lock.json
npm install

# Frontend
cd client
rm -rf node_modules package-lock.json
npm install
```

## Quick Fixes

### "Cannot find module"
```bash
npm install
```

### "Port already in use"
```bash
# Change port in .env or kill process
netstat -ano | findstr :<port>
taskkill /PID <process_id> /F
```

### "MongoDB connection failed"
```bash
# Start MongoDB
net start MongoDB
# Or check MONGODB_URI in .env
```

### "Firebase error"
- Check Firebase Console > Authentication is enabled
- Verify .env has correct Firebase credentials
- Check Firebase Console > Authentication > Users for errors

### "CORS error"
- Verify FRONTEND_URL in server/.env matches client URL
- Check both servers are running

### "Invalid token"
- Clear browser cookies
- Logout and login again
- Check JWT_SECRET in server/.env

## Performance Monitoring

### Check Bundle Size
```bash
cd client
npm run build
# Check dist/ folder size
```

### Analyze Bundle
```bash
cd client
npm install -D rollup-plugin-visualizer
# Add to vite.config.js
# Run build and open stats.html
```

## Backup & Restore

### Backup MongoDB
```bash
mongodump --db ayursetu --out ./backup
```

### Restore MongoDB
```bash
mongorestore --db ayursetu ./backup/ayursetu
```

---

**Keep this file handy for quick reference! 📌**
