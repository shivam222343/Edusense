# 🧠 How to Setup Qdrant (Vector Database)

To enable RAG (Retrieval Augmented Generation) and let the AI "remember" context, you need a Vector Database. We use **Qdrant**.

You have two options: **Cloud (Recommended)** or **Local (Docker)**.

---

## ☁️ Option 1: Qdrant Cloud (Easiest)

1.  **Sign Up**: Go to **[https://cloud.qdrant.io/](https://cloud.qdrant.io/)** and create a free account.
2.  **Create Cluster**:
    *   Click **"Create Cluster"**.
    *   Name it (e.g., `techfiesta-cluster`).
    *   Select **"Free Tier"** (1GB RAM, 1 Node).
    *   Click **"Create"**.
3.  **Get Credentials**:
    *   Once created, you will see your **Cluster URL** (e.g., `https://xyz-example.us-east-1-0.aws.cloud.qdrant.io:6333`).
    *   Click **"Get API Key"** and generate a new key.
4.  **Update `.env`**:
    *   Open `server/.env`.
    *   Add/Update these lines:
        ```env
        QDRANT_URL=your_cluster_url_here
        QDRANT_API_KEY=your_api_key_here
        ```
    *   **Note**: Make sure `QDRANT_URL` includes `https://` and port `:6333` if shown.

---

## 🐳 Option 2: Local Docker (Advanced)

If you have Docker installed:

1.  Run this command in your terminal:
    ```bash
    docker run -p 6333:6333 -p 6334:6334 \
        -v $(pwd)/qdrant_storage:/qdrant/storage:z \
        qdrant/qdrant
    ```
2.  Update `.env`:
    ```env
    QDRANT_URL=http://localhost:6333
    # QDRANT_API_KEY is not needed for local default setup
    ```

---

## ✅ Verify It Works

1.  Restart your server: `npm run dev`.
2.  Check the logs. You should see:
    > `✅ Collection academic_chunks already exists` (or created)

---

## 📚 Populating Data

Once Qdrant is running, you need to feed it data (textbooks, notes) so the AI can use it.
We will create a script for this later!
