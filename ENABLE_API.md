# ⚠️ Critical: Enable the Gemini API

If you are getting "404 Not Found" errors, it means the **Generative Language API** is not enabled for your Google Cloud project.

## ✅ How to Fix It

1. **Click this link:**
   👉 **[https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com](https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com)**

2. **Select your Project:**
   - In the top bar, select the project where you created your API key.

3. **Click "ENABLE"**:
   - If you see a blue "ENABLE" button, click it.
   - If it says "MANAGE", it is already enabled (try creating a new key in a NEW project).

4. **Wait 1-2 Minutes**:
   - Google needs time to activate the API.

5. **Restart Your Server**:
   - Stop the server (`Ctrl+C`).
   - Run `npm run dev`.

---

## 🔑 Alternative: Create a Key in a NEW Project

If the above doesn't work, the easiest fix is:

1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Click **Create API Key**.
3. Select **"Create API key in NEW project"**.
4. Use this new key in your `.env` file.
