# Job Importer Microservice

A Node.js/TypeScript microservice for importing job listings from an XML feed, batching and processing them asynchronously with BullMQ, and logging import statistics to MongoDB. The service features robust error handling, request tracing with correlation IDs, structured logging, and real-time updates via Socket.IO.

---

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Setup & Installation](#setup--installation)
-   [Configuration](#configuration)
-   [Running the Project](#running-the-project)
-   [API Endpoints](#api-endpoints)
-   [Socket.IO Events](#socketio-events)
-   [Logging & Tracing](#logging--tracing)
-   [License](#license)

---

## Features

-   **Express REST API** for querying import logs
-   **BullMQ** for job queueing and worker concurrency
-   **MongoDB** for persistent storage of jobs and import logs
-   **Redis** for queue backend
-   **Node-cron** for scheduled job fetching
-   **Winston** logger with correlation ID tracing
-   **Zod** for request validation
-   **Centralized error handling**
-   **Socket.IO** for real-time log updates

---

## Project Structure

```
src/
  config/         # Configuration files (env, logger, MongoDB, Redis, XML parser)
  controllers/    # Express route controllers (API logic)
  cronJobs/       # Scheduled job fetch logic (node-cron)
  dtos/           # Data transfer objects (TypeScript types)
  middlewares/    # Express middlewares (correlation ID, error handler)
  models/         # Mongoose models (Job, ImportLog)
  producers/      # BullMQ job producers (enqueue jobs)
  queues/         # BullMQ queue definitions
  repositories/   # Data access logic (MongoDB queries)
  routers/        # Express routers (API routes)
  services/       # Business logic (fetching, processing, etc.)
  utils/          # Helpers and error classes
  validators/     # Zod validation logic
  workers/        # BullMQ workers (job processing)
server.ts         # App entry point
```

### Folder Details

-   **config/**: Loads environment variables, sets up logger, MongoDB, Redis, and XML parser.
-   **controllers/**: Handles incoming HTTP requests and sends responses.
-   **cronJobs/**: Contains scheduled tasks (e.g., periodic job fetching).
-   **dtos/**: TypeScript types for data transfer between layers.
-   **middlewares/**: Express middlewares for error handling and correlation ID tracing.
-   **models/**: Mongoose schemas for MongoDB collections (Job, ImportLog).
-   **producers/**: Adds jobs to BullMQ queues in batches.
-   **queues/**: Queue definitions for BullMQ.
-   **repositories/**: Database access logic for jobs and import logs.
-   **routers/**: Express routers for API versioning and endpoints.
-   **services/**: Business logic, such as fetching jobs from XML feeds and orchestrating queue operations.
-   **utils/**: Utility functions, error classes, and correlation ID helpers.
-   **validators/**: Zod-based request validation logic.
-   **workers/**: BullMQ workers that process jobs and log import results.

---

## Setup & Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [npm](https://www.npmjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local MongoDB
-   [Redis](https://redis.io/) instance
-   [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the repository:**

    ```sh
    git clone <your-repo-url>
    cd server
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up environment variables:**

    - Copy `.env.example` to `.env`:

        ```sh
        cp .env.example .env
        ```

    - Fill in all required values in `.env`:

        ```
        PORT=3000
        LEVEL=info
        URL=<XML_FEED_URL>
        REDIS_HOST=localhost
        REDIS_PORT=6379
        REDIS_PASSWORD=
        MONGODB_ATLAS_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
        WORKER_CONCURRENCY=5
        BATCHING_SIZE=1000
        CRON_SCHEDULE=0 * * * *
        FRONTEND_URL=http://localhost:5173
        ```

---

## Running the Project

### Development

```sh
npm run dev
```

### Production

```sh
npm run build
npm start
```

---

## API Endpoints

### Get All Import Logs

-   **GET** `/api/v1/importlogs`
    -   Query params: `page` (default: 1), `limit` (default: 10)
    -   Returns paginated import logs with summary statistics.

---

## Socket.IO Events

-   **Connect to Socket.IO server** (same port as HTTP server)
-   **Event:** `getImportLogs`
    -   **Payload:** `{ page?: number, limit?: number }`
    -   **Response:** `{ success, message, data }` (same as REST endpoint)

---

## Logging & Tracing

-   Uses [Winston](https://github.com/winstonjs/winston) for structured logging.
-   Each log entry includes a correlation ID for tracing requests across async operations.
-   Log level can be set via the `LEVEL` environment variable.

---

## License

MIT (add your license here)

---

## Credits

Built with [Express](https://expressjs.com/), [BullMQ](https://docs.bullmq.io/), [Mongoose](https://mongoosejs.com/), [Winston](https://github.com/winstonjs/winston), [Zod](https://zod.dev/), [Socket.IO](https://socket.io/), and [node-cron](https://www.npmjs.com/package/node-cron).
