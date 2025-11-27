# 🚀 Phase 2 Quick Start

## ✅ Backend Complete - Ready to Test!

### Step 1: Get Anthropic API Key (2 minutes)
1. Go to: https://console.anthropic.com/
2. Sign up / Log in
3. Go to "API Keys"
4. Create new key
5. Copy the key (starts with `sk-ant-`)

### Step 2: Add to Environment (1 minute)
Open `server/.env` and add:
```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Step 3: Start Qdrant (1 minute)
```bash
docker run -p 6333:6333 qdrant/qdrant
```

**Don't have Docker?**
- Install: https://www.docker.com/get-started
- Or use Qdrant Cloud: https://cloud.qdrant.io/

### Step 4: Restart Backend (auto-restarts with nodemon)
The server should automatically restart and show:
```
✅ MongoDB Connected
✅ Firebase Admin initialized
✅ Collection academic_chunks already exists
🚀 Server running on http://localhost:5000
🔌 Socket.IO ready
```

### Step 5: Test the AI! (2 minutes)

**Option A: Use Postman/Thunder Client**
1. POST to `http://localhost:5000/api/ask/text`
2. Headers: `Cookie: auth_token=YOUR_JWT_FROM_LOGIN`
3. Body (JSON):
```json
{
  "questionText": "What is the Pythagorean theorem?"
}
```

**Option B: Use curl**
```bash
# First login to get JWT, then:
curl -X POST http://localhost:5000/api/ask/text \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=YOUR_JWT" \
  -d '{"questionText": "Explain photosynthesis"}'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "doubtId": "...",
    "steps": [
      "Step 1: ...",
      "Step 2: ...",
      "Step 3: ..."
    ],
    "finalAnswer": "...",
    "confidence": 0.95,
    "retrievedContext": [...],
    "processingTime": 2340
  }
}
```

---

## 🎨 Frontend - What to Build

### Components Needed (in order):
1. **AskBar.jsx** - Input for questions
2. **AnswerCard.jsx** - Display AI answers
3. **Navbar.jsx** - Top navigation
4. **Sidebar.jsx** - Desktop menu
5. **MobileDrawer.jsx** - Mobile menu
6. **AskDoubtPage.jsx** - Main page
7. **MyDoubtsPage.jsx** - History page

### Design System:
- **Colors**: Black (#000), White (#fff), Teal (#08FDD8)
- **Font**: Inter (already installed)
- **Spacing**: 8px, 12px, 20px
- **Animations**: Framer Motion

### See Full Specs:
- `FRONTEND_COMPONENTS.md` - Detailed component specs
- `PHASE2_GUIDE.md` - Complete guide

---

## 📁 What's Been Created

### Backend Files (All Complete ✅)
```
server/src/
├── ai/
│   ├── llm/claudeClient.js
│   ├── rag/
│   │   ├── qdrantClient.js
│   │   ├── embedder.js
│   │   ├── retriever.js
│   │   └── promptBuilder.js
│   └── services/askService.js
├── models/Doubt.js
├── controllers/askController.js
├── routes/askRoutes.js
└── server.js (updated)
```

### Frontend Files (Foundation ✅)
```
client/src/
├── services/
│   ├── socketService.js
│   └── askApi.js
└── (components to build)
```

---

## 🧪 Quick Test Checklist

- [ ] Anthropic API key added to `.env`
- [ ] Qdrant running (`docker ps` shows qdrant)
- [ ] Backend running without errors
- [ ] Can POST to `/api/ask/text`
- [ ] Response includes steps and answer
- [ ] Doubt saved in MongoDB
- [ ] Socket.IO connected

---

## 🐛 Troubleshooting

### "Qdrant not available"
```bash
docker run -p 6333:6333 qdrant/qdrant
```

### "Anthropic API error"
- Check API key is correct
- Verify you have credits: https://console.anthropic.com/

### "MongoDB error"
- Check MongoDB is running
- Verify connection string in `.env`

### "Socket not connecting"
- Check CORS settings
- Verify `FRONTEND_URL` in server `.env`

---

## 📊 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/ask/text` | POST | Ask a question |
| `/api/ask/my` | GET | Get my doubts |
| `/api/ask/stats` | GET | Get statistics |
| `/api/ask/:id` | GET | Get specific doubt |
| `/api/ask/:id/bookmark` | POST | Toggle bookmark |
| `/api/ask/:id/rate` | POST | Rate answer |

---

## 🎯 Next Actions

1. ✅ **Backend is ready** - Test it now!
2. 🎨 **Build frontend** - Follow FRONTEND_COMPONENTS.md
3. 🧪 **Test complete flow** - Ask → Answer → Display
4. 🚀 **Deploy** - When ready

---

## 💡 Pro Tips

### Add Sample Content to Qdrant
```javascript
// Create a script to add educational content
const sampleText = "Photosynthesis is the process...";
const chunks = await embedder.processDocument(sampleText, {
  subject: 'biology',
  topic: 'photosynthesis',
  source: 'textbook',
  difficulty: 'medium'
});
await qdrantClient.upsertChunks(chunks);
```

### Monitor in Real-Time
- Watch server logs for AI pipeline
- Check MongoDB for saved doubts
- Use Qdrant dashboard: http://localhost:6333/dashboard

---

## 📚 Documentation

- **PHASE2_GUIDE.md** - Complete implementation guide
- **FRONTEND_COMPONENTS.md** - UI component specs
- **PHASE2_SUMMARY.md** - What's been built

---

## 🎉 You're Ready!

**Backend**: 100% Complete ✅
**Frontend**: Ready to Build 🎨

**Start testing the AI now!** 🚀

