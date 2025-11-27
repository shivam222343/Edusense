# ⚡ Switch to Groq (Free & Fast)

Since Gemini is giving you trouble, we are switching to **Groq**. It is:
- **Free** (currently in beta)
- **Extremely Fast**
- **Uses Llama 3 70B** (Very smart)

## 🚀 Step 1: Get API Key
1. Go to: **[https://console.groq.com/keys](https://console.groq.com/keys)**
2. Sign in (Google/GitHub).
3. Click **"Create API Key"**.
4. Copy the key (starts with `gsk_...`).

## ⚙️ Step 2: Update .env
1. Open `server/.env`.
2. Add this line:
   ```env
   GROQ_API_KEY=gsk_your_key_here
   ```
3. Save the file.

## 🔄 Step 3: Restart Server
1. Stop the server (`Ctrl+C`).
2. Run `npm run dev`.

## 🧪 Test It
1. Go to **http://localhost:5173**
2. Ask a question.
3. It should be **blazing fast**! ⚡
