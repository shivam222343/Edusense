# 🔑 How to Get a Working Gemini API Key

If you are getting "404 Not Found" or "Rate Limit" errors, follow these steps to get a fresh, working key.

## 🚀 Step-by-Step Guide

### **1. Go to Google AI Studio**
Click this link: **[https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)**

### **2. Sign In**
Sign in with your Google Account.

### **3. Create API Key**
1. Click the blue **"Create API key"** button.
2. You will see two options:
   - **"Create API key in new project"** (Recommended ✅)
   - "Create API key in existing project"
3. Select **"Create API key in new project"**.
   - *Why?* This ensures the project has the Generative Language API enabled automatically.

### **4. Copy the Key**
1. Copy the key string (starts with `AIza...`).
2. **Do not share this key publicly.**

---

## ⚙️ Update Your Server

1. Open `server/.env` file.
2. Find or add the line:
   ```env
   GEMINI_API_KEY=AIza-paste-your-new-key-here
   ```
3. **Save** the file.
4. The server will restart automatically.

---

## 🧪 Verify It Works

1. Go to **http://localhost:5173**
2. Ask: **"Hello"**
3. If it works, you are done! 🎉

---

## ❓ Common Questions

**Q: Do I need to add a credit card?**
A: **No.** The free tier does not require a credit card.

**Q: Which model should I use?**
A: My code automatically tries all available models (`gemini-1.5-flash`, `gemini-pro`, etc.), so you don't need to worry about this. Just get the key!

**Q: I still get 404 errors.**
A: Make sure you created the key in a **NEW project** (Step 3). Old Google Cloud projects might have the API disabled.
