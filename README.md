# School Management API

A robust RESTful API built with Node.js, Express, and MySQL for managing school data. The highlight of this API is its ability to list and sort schools based on their geographical proximity to a user's location.

## Features

- **Add a School**: Adds a new school with its name, address, latitude, and longitude to the database.
- **List Schools**: Fetches all schools from the database sorted by their distance from a provided set of coordinates (latitude and longitude).
- **Dockerized Database**: Easy database setup using Docker Compose.

## Tech Stack

- **Backend Framework**: Node.js, Express.js (v5)
- **Database**: MySQL (using `mysql2` package)
- **Containerization**: Docker (for running the MySQL server)

## Project Structure

```text
├── DEPLOYMENT.md          # Deployment documentation
├── docker-compose.yml     # Docker configuration for MySQL
├── package.json           # Project dependencies and scripts
├── postman/               # Contains Postman collection for testing the API
└── server/                # Source code
    ├── index.js           # Application entry point
    ├── controllers/       # Route controllers
    ├── db/                # Database connection & schema
    ├── middlewares/       # Express middlewares (error handling, etc.)
    ├── routes/            # Express routes
    ├── services/          # Business logic layer
    ├── utils/             # Utility functions (e.g., distance calculation)
    └── validations/       # Request payload validations
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) and Docker Compose

### Installation

1. **Clone the repository and install dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the root directory and add the following variables (adjust values according to your needs or default docker settings):
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=secret
   DB_NAME=schoolmanagement
   ```

3. **Database Setup**
   Ensure Docker is running, then spin up the MySQL database container:
   ```bash
   npm run docker:up
   ```
   *The database schema (`server/db/schema.sql`) should automatically be initialized from the container setup, or manually executed depending on your configuration.*

4. **Run the Application**
   Start the development server with file-watching enabled:
   ```bash
   npm run dev
   ```
   The API will be accessible at `http://localhost:3000`.

### Available Scripts

- `npm start`: Starts the application in production mode.
- `npm run dev`: Starts the application in watch mode for development.
- `npm run docker:up`: Starts the MySQL Docker container.
- `npm run docker:down`: Stops and removes the MySQL Docker container.
- `npm run docker:reset`: Stops, removes volumes, and restarts the MySQL container.

## API Endpoints

### 1. Add a School
- **Endpoint**: `POST /api/schools`
- **Description**: Add a new school to the database.
- **Body**:
  ```json
  {
    "name": "Springfield High School",
    "address": "123 Main St, Springfield",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
  ```

### 2. List Schools by Proximity
- **Endpoint**: `GET /api/schools?latitude={lat}&longitude={lng}`
- **Description**: List all schools sorted by distance from the provided coordinates.
- **Query Parameters**:
  - `latitude` (float): The user's latitude.
  - `longitude` (float): The user's longitude.

## Testing

A Postman collection is included in the `postman/` directory (`School-Management-API.postman_collection.json`). You can import this file directly into Postman to easily test all available endpoints.
