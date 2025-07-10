# Empy Assinaturas

This project is a signature management system.

## Prerequisites

- Node.js (v18 or later)
- npm

## Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the database migrations:
    ```bash
    npx prisma migrate dev --name init
    ```
4.  Generate the Prisma client:
    ```bash
    npx prisma generate
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```
The backend will be running on `http://localhost:3000`.

## Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
The frontend will be running on `http://localhost:5173`.
