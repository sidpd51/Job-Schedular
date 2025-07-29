# Log Tracking Dashboard (React + TypeScript + Vite)

A modern, responsive dashboard for tracking import logs, built with React, TypeScript, Vite, Tailwind CSS, DaisyUI, and TanStack Query/Table.

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
    -   Sorting
    -   Filtering
-   **Modern UI Components**:
    -   Interactive data tables
    -   Loading states
    -   Error handling
    -   Responsive navigation

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

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Git

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/log-tracking-dashboard.git
    cd log-tracking-dashboard/client
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

### Environment Setup

1. Copy the environment template:

    ```bash
    cp .env.example .env
    ```

2. Update environment variables:
    ```env
    VITE_API_URL=http://localhost:3000/api
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
-   **Preview**:
    ```bash
    npm run preview
    ```
-   **Lint**:
    ```bash
    npm run lint
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

## License

This project is licensed under the MIT License - see the
