# 🔧 Fixing the Anthropic API Error

## ❌ Error You're Seeing

```
Could not resolve authentication method. Expected "Authorization" headers to be explicitly omitted
```

This means the **Anthropic API key is missing** from your environment variables.

---

## ✅ Solution (2 Minutes)

### **Step 1: Get Your Anthropic API Key**

1. Go to: **https://console.anthropic.com/**
2. Sign up or log in
3. Navigate to **"API Keys"** in the sidebar
4. Click **"Create Key"**
5. Copy the key (starts with `sk-ant-`)

### **Step 2: Add to Server .env**

Open `server/.env` and add this line:

```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

**Important**: Replace `sk-ant-your-actual-key-here` with your real API key!

### **Step 3: Restart Backend**

The server should auto-restart with nodemon. If not:

```bash
# Stop the server (Ctrl+C)
# Then restart:
cd server
npm run dev
```

---

## 🧪 Test Again

1. Go back to your frontend at http://localhost:5173
2. Type a question in the AskBar
3. Click send
4. You should now get an AI answer!

---

## 🔍 Verify It's Working

After adding the API key, you should see in the server terminal:

```
✅ MongoDB Connected
✅ Firebase Admin initialized
✅ Collection academic_chunks created
🚀 Server running on http://localhost:5000
🔌 Socket.IO ready
```

When you ask a question, you'll see:

```
🤔 Processing question from user [userId]
Question: "Your question here"

📚 Step 1: Retrieving context...
Retrieved 0 context chunks

🤖 Step 2: Asking Claude...
✅ Answer generated
Steps: 3
Confidence: 0.95

💾 Step 3: Saving doubt...
✅ Doubt saved with ID: [doubtId]
⏱️  Total processing time: 2340ms
```

---

## 💡 Alternative: Test Without Qdrant First

If you don't have Qdrant running yet, that's okay! The system will work without it (just without context retrieval).

You'll see this warning in the server logs:
```
⚠️  Qdrant not available - RAG features will be limited
```

This is fine for testing. The AI will still answer questions, just without additional context.

---

## 🚀 Complete .env Example

Here's what your `server/.env` should look like:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# MongoDB
MONGODB_URI=mongodb+srv://your-connection-string

# JWT
JWT_SECRET=your-super-secret-jwt-key-min-32-chars

# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com

# Anthropic (Claude AI) - ADD THIS!
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here

# Qdrant (Optional for now)
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
```

---

## 🎯 Quick Checklist

- [ ] Got Anthropic API key from console.anthropic.com
- [ ] Added `ANTHROPIC_API_KEY=sk-ant-...` to server/.env
- [ ] Saved the file
- [ ] Server restarted automatically (or manually restarted)
- [ ] Tried asking a question again
- [ ] Got an AI answer! 🎉

---

## 🐛 Still Not Working?

### **Check 1: API Key Format**
Make sure your API key:
- Starts with `sk-ant-`
- Has no extra spaces
- Is on one line
- Is in the `server/.env` file (not client!)

### **Check 2: Server Logs**
Look at your server terminal for errors. You should see:
```
🤔 Processing question...
```

If you see an error about Anthropic, the API key is wrong.

### **Check 3: Anthropic Account**
- Make sure you have credits in your Anthropic account
- Check if your API key is active
- Verify you're not hitting rate limits

---

## 📞 Need More Help?

**Common Issues:**

1. **"Invalid API key"**
   - Double-check you copied the full key
   - Make sure it's the right key from Anthropic (not OpenAI or another service)

2. **"Rate limit exceeded"**
   - You're making too many requests
   - Wait a minute and try again

3. **"Insufficient credits"**
   - Add credits to your Anthropic account
   - Or use the free tier if available

---

## 🎉 Once It's Working

You'll be able to:
- Ask any academic question
- Get step-by-step AI explanations
- See confidence scores
- Bookmark and rate answers
- Build your knowledge base

---

**Add your Anthropic API key and you're ready to go!** 🚀

