# Phase 3: Image & PDF-Based Doubt Input System
## Implementation Guide

### Overview
This phase adds multimodal doubt input capabilities, allowing students to upload images and PDFs, crop regions of interest, and submit them as doubts with OCR-extracted text.

---

## Architecture Overview

```
User Upload → Cloudinary Storage → Worker Processing (OCR/Embeddings) → Qdrant Vector Store → RAG Pipeline → AI Answer
```

### Key Components:
1. **Frame Model**: Stores metadata for uploaded images/PDFs and crops
2. **Media Services**: Handle upload, OCR, cropping, embedding generation
3. **Worker Jobs**: Background processing with BullMQ
4. **Frontend Components**: Upload UI, PDF viewer with Konva crop tool
5. **Integration**: Connects to existing Phase-2 RAG pipeline

---

## Backend Implementation

### 1. Database Model - Frame

**File**: `server/src/models/Frame.js`

Stores extracted image/PDF frame metadata with OCR results and embeddings.

### 2. Services

#### CloudinaryService (`server/src/services/cloudinaryService.js`)
- Upload images/PDFs to Cloudinary
- Delete media
- Generate signed URLs

#### OCRService (`server/src/services/ocrService.js`)
- Tesseract.js for printed text (free fallback)
- Vision LLM integration for higher quality (optional)
- Handwriting detection

#### CropService (`server/src/services/cropService.js`)
- Server-side image cropping using Sharp
- Maintains quality and accuracy

#### PDFService (`server/src/services/pdfService.js`)
- Convert PDF pages to images using pdf-lib
- Extract page count and metadata

#### EmbeddingService (`server/src/services/embeddingService.js`)
- Reuses Phase-2 embedding generation
- Chunks OCR text appropriately

### 3. API Routes

**File**: `server/src/routes/media.routes.js`

Endpoints:
- `POST /api/media/upload-image` - Upload single image
- `POST /api/media/upload-pdf` - Upload PDF (processes all pages)
- `POST /api/media/extract-crop` - Crop region from image/PDF page
- `POST /api/ask/image` - Submit image-based doubt
- `GET /api/frames/:id` - Get frame metadata

### 4. Worker Jobs

**Files**:
- `server/src/workers/processImage.worker.js`
- `server/src/workers/processPdf.worker.js`

**Process**:
1. Download from Cloudinary
2. Run OCR (Tesseract or Vision LLM)
3. Chunk text
4. Generate embeddings
5. Upsert to Qdrant
6. Update Frame document
7. Emit socket events

---

## Frontend Implementation

### 1. Components

#### ImageUploader (`client/src/components/ImageUploader.jsx`)
- Drag & drop interface
- File validation
- Upload progress
- Preview thumbnail

#### PdfViewerWithCrop (`client/src/components/PdfViewerWithCrop.jsx`)
- PDF.js for rendering
- Konva overlay for rectangle drawing
- Page navigation
- Zoom/pan controls
- Mobile touch support

#### CropModal (`client/src/components/CropModal.jsx`)
- Preview cropped region
- Edit OCR text
- Confirm/cancel actions

#### AskImageModal (`client/src/components/AskImageModal.jsx`)
- Question input
- OCR text display (editable)
- Submit to RAG pipeline

### 2. Pages

#### UploadPage (`client/src/pages/UploadPage.jsx`)
- Main upload interface
- Image and PDF upload options
- Recent uploads list

---

## Data Flow

### Image Upload Flow:
```
1. User uploads image → POST /api/media/upload-image
2. Server stores to Cloudinary → Creates Frame doc → Enqueues job
3. Worker processes: OCR → Chunking → Embeddings → Qdrant
4. Frame updated with OCR text and embedding IDs
5. Socket event emitted: frame:processed
6. UI shows OCR preview
7. User edits text (optional) → Submits doubt
8. POST /api/ask/image → Triggers Phase-2 RAG pipeline
9. Answer generated and saved
```

### PDF Crop Flow:
```
1. User uploads PDF → POST /api/media/upload-pdf
2. Worker extracts pages → Creates Frame for each page
3. User views page → Draws rectangle with Konva
4. POST /api/media/extract-crop with coordinates
5. Server crops using Sharp → Uploads crop → Creates crop Frame
6. Worker processes crop (same as image flow)
7. User submits doubt with crop
```

---

## Environment Variables Required

Add to `.env`:
```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis (for BullMQ)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Vision LLM (Optional - for better OCR)
CLAUDE_API_KEY=your_claude_key

# Worker Configuration
WORKER_CONCURRENCY=2
OCR_TIMEOUT=30000
```

---

## Installation Steps

### Backend:
```bash
cd server
npm install sharp tesseract.js pdf-lib cloudinary bullmq ioredis multer
```

### Frontend:
```bash
cd client
npm install react-konva konva react-pdf pdfjs-dist react-dropzone
```

---

## Running Workers

Workers run as separate processes:

```bash
# Terminal 1: Main server
npm run dev

# Terminal 2: Image processing worker
node src/workers/processImage.worker.js

# Terminal 3: PDF processing worker  
node src/workers/processPdf.worker.js
```

---

## Testing Checklist

- [ ] Upload image → Verify Cloudinary storage
- [ ] OCR extraction → Check accuracy
- [ ] Upload PDF → Verify page extraction
- [ ] Draw crop rectangle → Verify coordinates
- [ ] Submit image doubt → Get AI answer
- [ ] Edit OCR text → Verify changes persist
- [ ] Mobile upload → Test touch gestures
- [ ] Worker processing → Monitor queue
- [ ] Qdrant vectors → Verify searchability

---

## Security Considerations

1. **File Validation**: Check file types and sizes
2. **JWT Authentication**: All endpoints require valid token
3. **Rate Limiting**: Limit OCR/LLM API calls
4. **Sanitization**: Clean OCR text before storage
5. **Cloudinary Security**: Use signed URLs for sensitive content

---

## Performance Optimizations

1. **Lazy Loading**: Load PDF pages on demand
2. **Image Compression**: Optimize before upload
3. **Worker Concurrency**: Limit parallel jobs
4. **Caching**: Cache OCR results
5. **Batch Processing**: Group embedding generation

---

## Future Enhancements

- [ ] Handwriting recognition (HTR)
- [ ] Multi-language OCR
- [ ] Diagram/equation detection
- [ ] Collaborative annotations
- [ ] Video frame extraction
- [ ] Auto-crop smart detection

---

## File Structure

```
server/src/
├── models/
│   └── Frame.js
├── routes/
│   └── media.routes.js
├── controllers/
│   └── media.controller.js
├── services/
│   ├── cloudinaryService.js
│   ├── ocrService.js
│   ├── cropService.js
│   ├── pdfService.js
│   └── visionService.js
├── workers/
│   ├── processImage.worker.js
│   └── processPdf.worker.js
└── jobs/
    ├── enqueueImageJob.js
    └── enqueuePdfJob.js

client/src/
├── components/
│   ├── ImageUploader.jsx
│   ├── PdfViewerWithCrop.jsx
│   ├── CropModal.jsx
│   ├── AskImageModal.jsx
│   └── PageThumbnail.jsx
└── pages/
    ├── UploadPage.jsx
    └── ImageAskPage.jsx
```

---

## Integration with Phase 2

The image/PDF doubt flow integrates seamlessly with the existing RAG pipeline:

1. **Frame embeddings** are stored in the same Qdrant collection as text chunks
2. **askService** retrieves relevant chunks (text + image context)
3. **LLM** generates answers using both text and visual context
4. **Doubt model** stores frameId reference for traceability

---

## Estimated Implementation Time

- **Backend Core**: 8-12 hours
- **Worker Jobs**: 4-6 hours  
- **Frontend Components**: 10-15 hours
- **Integration & Testing**: 6-8 hours
- **Total**: 28-41 hours

---

## Next Steps

1. ✅ Create implementation plan (this document)
2. ⏳ Build Frame model
3. ⏳ Implement core services
4. ⏳ Create API routes
5. ⏳ Build worker jobs
6. ⏳ Develop frontend components
7. ⏳ Integration testing
8. ⏳ Deploy and monitor

---

**Status**: Phase 3 implementation in progress...
**Last Updated**: 2025-11-25
