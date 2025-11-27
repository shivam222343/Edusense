# 💎 Switching to Gemini (Free & Powerful)

## ✅ What I've Done
I've updated the entire backend to use **Google Gemini** instead of Claude.
- **Gemini 1.5 Flash**: Fast, smart, and free for text generation
- **Gemini Embeddings**: High-quality vector embeddings (better than the placeholder!)

## 🚀 How to Get Started (2 Minutes)

### **Step 1: Get Your Free API Key**
1. Go to: **https://aistudio.google.com/app/apikey**
2. Click **"Create API key"**
3. Select a project (or create new)
4. Copy the key (starts with `AIza...`)

### **Step 2: Update Your .env File**
Open `server/.env` and:
1. **Remove** the `ANTHROPIC_API_KEY` line
2. **Add** this line:

```env
GEMINI_API_KEY=AIza-your-actual-key-here
```

### **Step 3: Restart Server**
The server should auto-restart. If not:
```bash
# In server terminal
Ctrl+C
npm run dev
```

---

## 🧪 Test It Out!
1. Go to http://localhost:5173
2. Ask: **"What is photosynthesis?"**
3. You should get a super fast answer from Gemini!

---

## 📊 Why This is Better
- **Free Tier**: Generous free limits (15 RPM, 1M TPM)
- **Embeddings**: Now using real AI embeddings (not placeholders)
- **Speed**: Gemini Flash is extremely fast
- **Future Proof**: Easy to upgrade to Pro models if needed

---

## 🐛 Troubleshooting
**"GEMINI_API_KEY is not set"**
- Check `.env` file location
- Ensure no extra spaces
- Restart server manually

**"400 Bad Request"**
- Check if API key is valid
- Ensure you have access to Gemini API (available in most countries)

---

**Get your key here**: https://aistudio.google.com/app/apikey
**Add to**: `server/.env`

**Enjoy your free AI platform!** 🚀
