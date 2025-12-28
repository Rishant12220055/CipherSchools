
# CipherSQLStudio

CipherSQLStudio is a browser-based SQL learning platform where students can practice SQL queries against pre-configured assignments with real-time execution and intelligent hints.

## Project Description

This web application allows users to:
- **View SQL Assignments**: Browse a list of challenges with varied difficulty.
- **Practice SQL**: Write and execute queries in a professional Monaco-based editor.
- **Get Intelligent Hints**: Stuck? Ask the integrated Gemini AI for a nudge in the right direction (without spoiling the answer!).
- **Real-time Feedback**: See query results instantly from a live PostgreSQL sandbox.

## Technology Stack

### Frontend
- **Framework**: React.js (Vite)
- **Styling**: Vanilla SCSS (Mobile-first, BEM methodology)
- **Editor**: Monaco Editor (The power behind VS Code)
- **Http Client**: Axios

### Backend
- **Runtime**: Node.js / Express.js
- **Metadata Database**: MongoDB (Atlas) - Stores assignment definitions (questions, descriptions).
- **Sandbox Database**: PostgreSQL - Executes user queries and holds the sample data (e.g., `employees` table).
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`) for generating context-aware hints.

## Installation and Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Local or Cloud)
- MongoDB (Atlas or Local)
- Google Cloud API Key (for Gemini)

### 1. Repository Setup
Clone the repository and install dependencies for both client and server.

```bash
# Clone
git clone <repository_url>
cd CipherSQLStudio

# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Environment Configuration
Create a `.env` file in the `server` directory with the following variables:

```env
# Server Port
PORT=5000

# MongoDB Connection
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/cipherschools?retryWrites=true&w=majority

# PostgreSQL Connection (Sandbox)
PG_USER=postgres
PG_HOST=localhost
PG_DATABASE=ciphersql_sandbox
PG_PASSWORD=<your_pg_password>
PG_PORT=5432

# Gemini AI API Key
GEMINI_API_KEY=<your_gemini_api_key>
```

### 3. Database Initialization
Initialize the PostgreSQL sandbox and seed the MongoDB assignments.

```bash
cd server

# Create PostgreSQL Database (if not exists)
node create_database.js

# Seed MongoDB Assignments and PostgreSQL Tables
node utils/seeder.js            # Seeds PG 'employees' table
node utils/seedAssignments.js   # Seeds MongoDB assignments
```

### 4. Running the Application
Run both frontend and backend development servers.

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
cd client
npm run dev
```

Access the application at `http://localhost:5173`.

## Architecture & Data Flow

1.  **User Selects Assignment**: Frontend fetches assignment details from MongoDB via Express API.
2.  **User Writes Query**: Code is entered in the Monaco Editor.
3.  **Execute Query**:
    *   Frontend sends SQL string to Backend (`POST /api/queries/execute`).
    *   Backend sanitizes query (blocks `DROP`, `DELETE`).
    *   Backend executes query against PostgreSQL `ciphersql_sandbox` database.
    *   Results (rows or errors) are returned to Frontend.
4.  **Get Hint**:
    *   Frontend sends current query and incorrect result context to Backend (`POST /api/hints`).
    *   Backend constructs a prompt for Gemini LLM.
    *   Gemini returns a helpful hint.
    *   Hint is displayed to the user.

## Data Flow Diagrams

**Level 0: Context Diagram**
![Level 0 DFD](assets/dfd_level_0.jpg)

**Level 1: System Flow (Execution Engine)**
![Level 1 DFD](assets/dfd_level_1.jpg)

## Design Decisions
-   **Dual Database Strategy**: MongoDB is used for static content (assignments) flexibility, while PostgreSQL provides the robust SQL execution engine required for the core learning experience.
-   **Security**: The backend implements basic SQL sanitization to prevent destructive commands in the sandbox environment.
-   **Professional UI**: The interface uses a "Professional Enterprise Dark" theme (Zinc palette) to mimic real-world developer tools.
