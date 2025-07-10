# Empy Assinaturas - Subscription Management System

This project is a full-stack application for managing user subscriptions, built with a React frontend and a Node.js (Express) backend.

## Tech Stack

-   **Frontend:** React, TypeScript, Vite, Tailwind CSS
-   **Backend:** Node.js, Express, TypeScript, Prisma
-   **Database:** PostgreSQL

## Prerequisites

-   **Node.js:** v18.x or later
-   **npm:** v8.x or later (or your preferred package manager)
-   **Git:** For cloning the repository
-   **PostgreSQL:** A running instance of PostgreSQL server

---

## Getting Started

### 1. Clone the Repository

First, clone the project to your local machine:

```bash
git clone <repository-url>
cd empy-assinaturas
```

### 2. Backend Setup

The backend server handles business logic, database interactions, and API endpoints.

**a. Navigate to the backend directory:**

```bash
cd backend
```

**b. Install dependencies:**

```bash
npm install
```

**c. Set up environment variables:**

Create a `.env` file in the `backend` directory by copying the example file:

```bash
cp env.example.env .env
```

Now, edit the `.env` file and add your PostgreSQL database connection string:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

**d. Run database migrations:**

This command will set up the database schema based on the Prisma model.

```bash
npx prisma migrate dev --name init
```

**e. (Optional) Seed the database:**

To populate the database with initial data (e.g., test plans), run:

```bash
npm run prisma:seed
```

**f. Start the development server:**

```bash
npm run dev
```

The backend will be running on `http://localhost:3001`.

---

### 3. Frontend Setup

The frontend provides the user interface for plan selection and checkout.

**a. Navigate to the frontend directory:**

```bash
cd ../frontend
```

**b. Install dependencies:**

```bash
npm install
```

**c. Start the development server:**

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`.

---

## Backend API Routes

The server exposes the following RESTful endpoints:

### Plans

-   `GET /plans`
    -   **Description:** Retrieves a list of all active subscription plans available for customers.
    -   **Response:** An array of plan objects.

-   `GET /plans/management`
    -   **Description:** Retrieves a list of *all* plans (both active and inactive) for internal management purposes.
    -   **Response:** An array of plan objects with more detailed fields.

-   `POST /plans/management`
    -   **Description:** Creates a new subscription plan.
    -   **Body:** A JSON object with plan details (name, values, credits, etc.).
    -   **Response:** The newly created plan object.

### Users & Purchases

-   `GET /users/:userId/plan`
    -   **Description:** Fetches the current active subscription for a specific user.
    -   **Response:** The user's current subscription object or 404 if not found.

-   `POST /users/:userId/purchase`
    -   **Description:** Processes a new plan purchase for a user.
    -   **Body:** A JSON object containing `planId`, `isMonthly`, and `cardDetails`.
    -   **Response:** A result object with the status of the purchase and transaction details.

-   `POST /users/:userId/change-plan`
    -   **Description:** Handles a plan upgrade or downgrade for a user.
    -   **Body:** A JSON object containing `newPlanId`, `isMonthly`, and optional `cardDetails`.
    -   **Response:** A result object with the status of the change and transaction details.

-   `GET /users/:userId/history`
    -   **Description:** Retrieves the complete purchase and transaction history for a specific user.
    -   **Response:** An array of purchase history records.

### Management

-   `GET /purchases/management`
    -   **Description:** Retrieves the complete purchase history for *all* users for management and reporting.
    -   **Response:** An array of all purchase history records.