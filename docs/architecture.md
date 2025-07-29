# Architecture Document: Job Processing System

## 1. Introduction

### Purpose

This document outlines the architecture of the Job Processing System, which fetches job data from XML APIs, converts it to JSON, processes it using a BullMQ-based queue system, and stores it in a MongoDB database.

### Scope

The system handles fetching, transforming, and storing job data in bulk, with scheduling via cron jobs, robust error handling, and logging for tracking imports.

### Audience

Developers, architects, and stakeholders involved in building, maintaining, or extending the system.

### Definitions

-   **BullMQ**: Node.js library for managing job queues with Redis.
-   **Job**: A single unit of work representing job data.
-   **Queue**: BullMQ queue for managing job processing.
-   **Cron Job**: Scheduled task for initiating data fetching.
-   **MongoDB**: NoSQL database for storing job data and import logs.

## 2. System Overview

### Context

The system fetches job data from external XML APIs, converts it to JSON, and processes it in batches using BullMQ queues. Processed jobs are stored or updated in a MongoDB database, with import logs tracked for monitoring.

### Goals and Objectives

-   **Scalability**: Handle lakhs of jobs efficiently via batch processing.
-   **Reliability**: Robust error handling and retry mechanisms.
-   **Traceability**: Log import details (total fetched, new, updated, failed jobs) using MongoDB.
-   **Maintainability**: Modular design for easy updates and debugging.

### Stakeholders

-   Developers: Implement and maintain the system.
-   Operations Team: Monitor performance and logs.
-   Business Stakeholders: Rely on accurate job data storage.

## 3. Architecture Overview

### High-Level Architecture

The system uses a producer-consumer pattern with BullMQ and Redis, storing data in MongoDB. Key components include:

-   **Data Fetching Service**: Converts XML API responses to JSON.
-   **Producer**: Batches and adds jobs to the queue.
-   **Worker**: Processes jobs and stores/updates them in MongoDB.
-   **Cron Scheduler**: Triggers data fetching on a schedule.
-   **Logging System**: Tracks import metrics in MongoDB.

### Key Components

-   **fetchJobsFromXML Service**: Converts XML API responses to a JSON array of jobs.
-   **fetchAndInsert Service**: Orchestrates fetching and queuing jobs.
-   **addJobToQueue Producer**: Batches and adds jobs to `JOB_QUEUE`.
-   **BullMQ Worker**: Processes jobs, calling `createOrUpdateJob` to store/update in MongoDB.
-   **startCronJobs**: Schedules `fetchAndInsert` execution.
-   **Import Logger**: Records import details via `createImportLog` and queries logs via `getAllImportLogs`.

### Design Principles

-   **Modularity**: Separate concerns for fetching, queuing, processing, and storage.
-   **Scalability**: Batch processing and configurable worker concurrency.
-   **Fault Tolerance**: Retry mechanisms and failure logging in MongoDB.

## 4. System Decomposition

### Components

1. **fetchJobsFromXML Service**:
    - **Responsibility**: Fetches job data from XML APIs and converts it to JSON.
    - **Output**: Array of job objects.
2. **fetchAndInsert Service**:
    - **Responsibility**: Calls `fetchJobsFromXML` and passes data to `addJobToQueue`.
    - **Trigger**: Invoked by `startCronJobs`.
3. **addJobToQueue Producer**:
    - **Responsibility**: Batches job data and adds it to `JOB_QUEUE` in bulk.
4. **BullMQ Worker**:
    - **Responsibility**: Processes jobs from `JOB_QUEUE`, calling `createOrUpdateJob` to store/update in MongoDB.
    - **Concurrency**: Configurable via `serverConfig.WORKER_CONCURRENCY`.
5. **startCronJobs**:
    - **Responsibility**: Schedules `fetchAndInsert` at specified intervals.
6. **Import Logger**:
    - **Responsibility**: Logs import details via `createImportLog` and retrieves logs via `getAllImportLogs` using MongoDB aggregation.

### Layers

-   **Presentation Layer**: client React.js.
-   **Service Layer**: `fetchJobsFromXML`, `fetchAndInsert`, `addJobToQueue`, Worker.
-   **Data Access Layer**: `createOrUpdateJob`, `createImportLog`, `getAllImportLogs` (MongoDB operations).
-   **Infrastructure Layer**: Redis (BullMQ), MongoDB, cron scheduler, logging system.

### Interfaces

-   **XML API**: External endpoint providing job data.
-   **Redis**: Used by BullMQ for queue management.
-   **MongoDB**: Stores job data and import logs via repositories.

## 5. Data Architecture

### Data Model

-   **Job (IJob)**:
    -   **Fields**: `id` (number, unique), additional job-specific fields (stored in MongoDB `Job` collection).
    -   **Operation**: Managed by `createOrUpdateJob` with upsert functionality.
-   **ImportLog (IImportLog)**:
    -   **Fields**: `fileName` (API URL), `timestamp` (Date), `totalFetched` (number), `newJobs` (number), `updatedJobs` (number), `failedJobs` (array of objects with `job` and `reason`), `totalImported` (number).
    -   **Operations**: Created by `createImportLog`, queried by `getAllImportLogs` with pagination and aggregation.

### Data Flow

1. XML data is fetched and converted to JSON by `fetchJobsFromXML`.
2. JSON data (array of jobs) is passed to `addJobToQueue` for batch queuing.
3. Worker processes jobs from `JOB_QUEUE`, storing/updating via `createOrUpdateJob` in MongoDB.
4. On queue drain, `createImportLog` stores import metrics in MongoDB.
5. `getAllImportLogs` retrieves paginated logs using MongoDB aggregation for sorting and projecting fields.

### Storage

-   **MongoDB**:
    -   **Collections**: `Job` (job data), `ImportLog` (import metrics).
    -   **Operations**:
        -   `createOrUpdateJob`: Upserts job data based on `id`, with validation.
        -   `createImportLog`: Inserts import log records.
        -   `getAllImportLogs`: Uses aggregation pipeline for sorted, paginated, and formatted log retrieval (fields: `fileName`, `timestamp`, `totalFetched`, `totalImported`, `newJobs`, `updatedJobs`, `failedJobs` count).
-   **Redis**: Stores queue state and job data for BullMQ.

## 6. Technology Stack

-   **Programming Language**: Node.js.
-   **Queue Management**: BullMQ (with Redis).
-   **Database**: MongoDB (for `Job` and `ImportLog` collections).
-   **Configuration**: `serverConfig` for settings (e.g., `WORKER_CONCURRENCY`, API URL).
-   **Logging**: Custom logger (`logger.config`).
-   **Repositories**: `job.repository`, `ImportLog.repository` for MongoDB operations.
-   **Scheduling**: Cron-based scheduler for `startCronJobs`.
-   **Redis Client**: Configured via `redis.config`.

## 7. Non-Functional Requirements

### Performance

-   Batch processing in `addJobToQueue` handles lakhs of jobs.
-   MongoDB aggregation in `getAllImportLogs` optimizes log retrieval with sorting and pagination.
-   Worker concurrency set via `serverConfig.WORKER_CONCURRENCY`.

### Scalability

-   Horizontal scaling via additional BullMQ workers.
-   MongoDB supports high-throughput writes and reads with indexing on `Job.id` and `ImportLog.timestamp`.
-   Redis ensures fast queue operations.

### Reliability

-   BullMQ retries failed jobs (configurable via `job.opts.attempts`).
-   Failed jobs logged in `failedJobs` array and stored in `ImportLog` collection.
-   MongoDB `upsert` in `createOrUpdateJob` ensures atomic updates.

### Security

-   Assumes secure API access (e.g., authentication for XML API, not specified).
-   MongoDB and Redis connections should use secure configurations (e.g., authentication, TLS).

### Maintainability

-   Modular services and repositories for easy updates.
-   Comprehensive logging via `logger.config` and MongoDB `ImportLog`.
-   MongoDB aggregation in `getAllImportLogs` simplifies log querying.

## 8. System Interactions

### External Interfaces

-   **XML API**: Provides job data (URL in `serverConfig.URL`).
-   **Redis**: Stores queue state.
-   **MongoDB**: Persists `Job` and `ImportLog` data.

### Workflows

1. **Scheduled Fetch**:
    - `startCronJobs` triggers `fetchAndInsert` at specified times.
    - `fetchAndInsert` calls `fetchJobsFromXML` and passes data to `addJobToQueue`.
2. **Job Processing**:
    - `addJobToQueue` batches jobs and adds them to `JOB_QUEUE`.
    - Worker processes jobs, calling `createOrUpdateJob` to upsert in MongoDB `Job` collection.
3. **Logging**:
    - On queue drain, `createImportLog` stores metrics in MongoDB `ImportLog` collection.
    - `getAllImportLogs` retrieves paginated logs with aggregation.

### Admin Dashboard (with Pagination)

![alt text](<Screenshot 2025-07-29 at 6.21.03 PM.png>)

### Schema Design

![alt text](<Screenshot 2025-07-29 at 6.46.43 PM.png>)

### Project Flow

![alt text](<Screenshot 2025-07-29 at 7.12.48 PM.png>)

## 9. Deployment and Operations

### Deployment Architecture

-   **Node.js Application**: Runs services, producer, worker, and cron scheduler.
-   **Redis**: Deployed for queue management.
-   **MongoDB**: Deployed for `Job` and `ImportLog` storage.

### Environments

-   Development, staging, production (assumed).

### Monitoring and Logging

-   **Logger**: Tracks job failures and import stats (`logger.config`).
-   **BullMQ Events**: Monitors queue drain and job failures.
-   **MongoDB Logs**: `ImportLog` collection stores metrics (`totalFetched`, `newJobs`, `updatedJobs`, `failedJobs`).
-   **Log Retrieval**: `getAllImportLogs` provides paginated, sorted logs with aggregation.

## 10. Risks and Mitigations

-   **Risk**: XML API downtime or rate limits.
    -   **Mitigation**: Implement retry logic and caching in `fetchJobsFromXML`.
-   **Risk**: MongoDB write bottlenecks for large job batches.
    -   **Mitigation**: Optimize `createOrUpdateJob` with bulk upserts and indexing on `id`.
-   **Risk**: Queue overload with large datasets.
    -   **Mitigation**: Batch processing in `addJobToQueue` and configurable worker concurrency.

## 11. Assumptions and Constraints

-   **Assumptions**:
    -   XML API provides consistent data.
    -   MongoDB and Redis are configured for high availability.
    -   Indexes exist on `Job.id` and `ImportLog.timestamp` for performance.
-   **Constraints**:
    -   Limited by API rate limits and response times.
    -   MongoDB schema must support job and log structures.

## 12. Future Considerations

-   Add MongoDB indexes for additional query patterns.
-   Implement monitoring dashboards for queue and MongoDB metrics.
-   Support multiple API sources for job data.
-   Add circuit breakers for API failures.

## 13. References

-   BullMQ Documentation: https://bullmq.io/
-   MongoDB Documentation: https://www.mongodb.com/docs/
-   Redis Configuration: Internal `redis.config`.
-   Logger Configuration: Internal `logger.config`.
