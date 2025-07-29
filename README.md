# Client - Log Tracking Dashboard (React + TypeScript + Vite)

A modern, responsive dashboard for tracking import logs, built with React, TypeScript, Vite, Tailwind CSS, DaisyUI, and TanStack Query/Table.

![alt text](<docs/Screenshot 2025-07-29 at 6.21.03 PM.png>)

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Environment Setup](#environment-setup)
    -   [Available Scripts](#available-scripts)
-   [Architecture](#architecture)
-   [Contributing](#contributing)
-   [License](#license)

## Project Overview

A real-time log tracking dashboard that allows users to monitor import operations. Built with modern web technologies, it provides a responsive and intuitive interface for tracking system logs.

## Features

-   **Real-time Log Tracking**: View import logs as they happen
-   **Responsive Design**: Works seamlessly across devices
-   **Data Management**:
    -   Pagination
-   **Modern UI Components**:
    -   Interactive data tables
    -   Loading states
    -   Error handling

## Tech Stack

-   **Frontend**: React 19, TypeScript
-   **Build Tool**: Vite
-   **Styling**: TailwindCSS, DaisyUI
-   **Data Management**: TanStack Query
-   **Table Component**: TanStack Table
-   **HTTP Client**: Axios
-   **Development Tools**: ESLint, Prettier

## Project Structure

```
client/
├── public/                # Static assets
├── src/
│   ├── assets/           # Images, icons, etc.
│   ├── components/       # Reusable UI components
│   │   ├── DataTable/    # Table component with pagination
│   │   ├── Navbar/       # Navigation component
│   │   └── common/       # Shared components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and API functions
│   ├── pages/            # Page components
│   ├── types/            # TypeScript definitions
│   ├── App.tsx          # Root component
│   └── main.tsx         # Entry point
└── config files...       # Various configuration files
```

### Available Scripts

-   **Development**:
    ```bash
    npm run dev
    ```
-   **Build**:
    ```bash
    npm run build
    ```

## Architecture

The application follows a component-based architecture with:

-   Modular components
-   Custom hooks for data fetching
-   Centralized state management
-   Type-safe development
-   API abstraction layer

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

# Server - Job Importer Microservice

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
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with url
-   [Redis](https://redis.io/) instance local
-   [Git](https://git-scm.com/)

---

## API Endpoints

### Get All Import Logs

-   **GET** `/api/v1/importlogs`
    -   Query params: `page` (default: 1), `limit` (default: 10)
    -   Returns paginated import logs with summary statistics.

---

## Socket.IO Events (optional)

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

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18+ recommended)
-   [npm](https://www.npmjs.com/)
-   [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) with url
-   [Redis](https://redis.io/) instance local
-   [Git](https://git-scm.com/)

## Project & Environment setup

#### Clone the repository:

    git clone https://github.com/sidpd51/Knovator-Assignment.git
    cd Knovator-Assignment

#### Client Setup

1. Copy the environment template:

    ```bash
    cd client
    cp .env.example .env
    ```

2. Update environment variables:
    ```env
    BACKEND_URL=<your backend url>
    ```
3. Install pkgs & Run the project using script
    ```
    npm i
    npm run dev
    ```

#### Server Setup

1. Copy the environment template:

    ```
    cd server
    cp .env.example .env
    ```

2. Update environment variables:
    ```env
    PORT=3000
    LEVEL=trace
    URL=<XML_FEED_URL>
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=
    MONGODB_ATLAS_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/db
    WORKER_CONCURRENCY=5
    BATCHING_SIZE=1000
    CRON_SCHEDULE=0 * * * *
    FRONTEND_URL=<your frontend url>
    ```
3. Install pkgs & Run the project using script
    ```
    npm i
    npm run dev
    ```
