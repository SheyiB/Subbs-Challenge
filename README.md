# Node.js TypeScript Express PostgreSQL Project

This project is a web application built with Node.js, TypeScript, Express, and PostgreSQL. It also includes Swagger documentation for the API endpoints.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js
- npm
- Docker

## Setup

1. **Create a .env file**: In the root directory of the project, create a `.env` file and add the following environment variables:

```
PORT=<your-port>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRE=<your-jwt-expire-time>
```

Replace `<your-port>`, `<your-jwt-secret>`, and `<your-jwt-expire-time>` with your desired port number, JWT secret, and JWT expiration time, respectively.

2. **Start the database**: Run the following command to start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

3. **Install dependencies**: Navigate to the root directory of the project and run the following command to install the necessary dependencies:

```bash
npm install
```

## Running the Application

After setting up, you can start the application by running the following command in the root directory of the project:

```bash
npm run start
```

The application will start and listen on the port you specified in the `.env` file.

## Swagger Documentation

You can access the Swagger documentation for the API endpoints at `http://localhost:<your-port>/api-docs`.
