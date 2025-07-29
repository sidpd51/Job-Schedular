# Log Tracking Dashboard & Job Importer Service

A full-stack app for tracking job import logs in real-time. Built with **React (Vite + TS)** on the frontend and **Node.js + TypeScript** microservice backend using **BullMQ**, **MongoDB**, and **Redis**.

---

![alt text](<docs/Screenshot 2025-07-29 at 6.21.03 PM.png>)

---

## 🧾 Overview

**Frontend**: Real-time dashboard to monitor job import logs with pagination and responsive UI.

**Backend**: Job importer microservice that fetches jobs from XML feeds, queues them via BullMQ, stores logs in MongoDB, and sends real-time updates via Socket.IO.

---

## 🚀 Features

-   Real-time log tracking (REST + Socket.IO)
-   Paginated import logs
-   Type-safe, modular architecture
-   Responsive Tailwind UI with DaisyUI
-   Structured Winston logging with correlation IDs

---

## 🛠️ Tech Stack

### Frontend

-   React 19, TypeScript
-   Vite, TailwindCSS, DaisyUI
-   TanStack Query & Table
-   Axios, ESLint, Prettier

### Backend

-   Node.js, Express, TypeScript
-   BullMQ, Redis, MongoDB
-   Socket.IO, node-cron
-   Winston logger, Zod validation

---

## 📁 Project Structure

<details>
<summary><code>Knovation-Assignment/</code></summary>

```text
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── DataTable/
│   │   ├── Navbar/
│   │   └── common/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── .env.example
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── cronJobs/
│   ├── dtos/
│   ├── middlewares/
│   ├── models/
│   ├── producers/
│   ├── queues/
│   ├── repositories/
│   ├── routers/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   └── workers/
├── server.ts
└── .env.example
```
</details>

---

## ⚙️ Getting Started

### 🧩 Prerequisites

-   Node.js v18+
-   Redis (local or cloud)
-   MongoDB Atlas
-   Git

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/sidpd51/Knovator-Assignment.git
cd Knovator-Assignment
```

### Backend Setup

```
cd server
cp .env.example .env

# Update .env
# PORT=3000
# LEVEL=trace
# URL=<XML_FEED_URL>
# REDIS_HOST=localhost
# REDIS_PORT=6379
# REDIS_PASSWORD=
# MONGODB_ATLAS_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
# WORKER_CONCURRENCY=5
# BATCHING_SIZE=1000
# CRON_SCHEDULE=0 * * * *
# FRONTEND_URL=http://localhost:5173

npm install
npm run dev
```

Frontend Setup

```
cd client
cp .env.example .env

# Update .env
# BACKEND_URL=http://localhost:3000

npm install
npm run dev
```

# 📡 API & Sockets

### REST Endpoint

```
GET /api/v1/importlogs?page=1&limit=10
```

-   Returns paginated job import logs.

### Socket.IO

-   Event: getImportLogs
-   Payload: { page?: number, limit?: number }
-   Response: { success, message, data }

### 🧾 Logging & Tracing

-   Winston logger with levels (set via LEVEL in .env)
-   Correlation ID for tracing async requests
-   Logs include timestamps, request IDs, levels, and messages

### 🤝 Contributing

```
# Fork & clone the repo
git checkout -b feature/your-feature
git commit -m "Add feature"
git push origin feature/your-feature
# Open a Pull Request
```

### 📄 License

This project is licensed under the MIT License.
