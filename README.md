# MOE Painting - Self-Hosted Backend

This is the self-hosted backend for the MOE Painting website. It provides a REST API for managing leads, sending emails, and interacting with an AI assistant.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/)

## Setup Instructions

1.  **Clone or Copy Files:**
    Make sure all the files from the backend folder are in your project directory.

2.  **Install Dependencies:**
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```bash
    cp .env.example .env
    ```
    Now, open the `.env` file and fill in your actual credentials for `EMAIL_USER`, `EMAIL_PASS`, and `OPENAI_API_KEY`.

4.  **Initialize the Database:**
    Run the migration script to create the necessary database tables. A `database.sqlite` file will be created.
    ```bash
    npm run migrate
    ```

5.  **Start the Server:**
    To run the server in development mode (with auto-reloading), use:
    ```bash
    npm run dev
    ```
    For production, use:
    ```bash
    npm start
    ```

The server will be running on `http://localhost:5000`.

## Available Scripts

-   `npm start`: Starts the server in production mode.
-   `npm run dev`: Starts the server in development mode using `nodemon`.
-   `npm run migrate`: Initializes or updates the database schema.