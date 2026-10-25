# Travlr Getaways — Full-Stack Web Application

## Project Overview

Travlr Getaways is a full-stack travel website built for the CS 465 course. It combines a customer-facing website with an Angular single-page application (SPA) for administrative trip management. The application uses Express and Node.js for server-side routing and API requests, MongoDB for trip and user data, and JSON to exchange data between the frontend and backend.

## Technologies

- **Node.js and Express** — server runtime, website routes, and REST API
- **Handlebars (HBS)** — server-rendered customer-facing pages
- **Angular and TypeScript** — interactive administration SPA
- **MongoDB and Mongoose** — document database and data models
- **JSON** — request and response format for API communication
- **JWT** — token-based authentication for protected administrative trip operations

## Application Architecture

The customer-facing pages use Express routes and Handlebars templates. The server renders the requested page and sends HTML to the browser. JavaScript supports browser-side behavior where needed.

The administrative interface is an Angular SPA. Angular updates views in the browser and sends HTTP requests to the Express API when it needs trip data or when an administrator creates, edits, or deletes a trip. This separates the user interface from the backend data operations.

MongoDB was selected because trip records and user records fit naturally into document-based storage. MongoDB stores records as documents, while Mongoose provides models and validation for working with those documents from Node.js. This approach works well with JSON-shaped data exchanged through the API.

## JSON and JavaScript

JavaScript is a programming language used to implement application behavior. JSON (JavaScript Object Notation) is a text-based data format; it is not executable JavaScript. The Angular frontend sends JSON request bodies to Express and receives JSON responses from the API. Express parses incoming JSON and uses Mongoose to read or update MongoDB documents. The API then returns JSON that Angular can use to update the interface.

## API Endpoints

The trip API is mounted at `/api`. Protected trip-management requests require a valid JWT in the `Authorization` header using the `Bearer <token>` format.

| Method | Endpoint | Purpose | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register an account and return a token | Public |
| `POST` | `/api/auth/login` | Validate credentials and return a token | Public |
| `GET` | `/api/trips` | Retrieve all trips | Public |
| `GET` | `/api/trips/:tripCode` | Retrieve one trip by its code | Public |
| `POST` | `/api/trips` | Create a trip | JWT required |
| `PUT` | `/api/trips/:tripCode` | Update a trip by its code | JWT required |
| `DELETE` | `/api/trips/:tripCode` | Delete a trip by its code | JWT required |

The API returns status codes to communicate results, including `200` for successful retrieval or updates, `201` for successful creation, `400` for invalid requests, `401` for missing or invalid authentication, and `404` when a trip cannot be found.

## Authentication and Security

The registration endpoint checks required fields and enforces a minimum password length. Login validates the supplied email and password and returns a JWT when the credentials are valid. Middleware verifies the token before allowing trip creation, updates, or deletion. Requests without a valid token receive an unauthorized response.

The application expects environment variables to be configured locally. Create a `.env` file in the project root and set `JWT_SECRET` to a strong, private value. Configure the MongoDB connection according to `app_server/models/db.js`. Do not commit `.env` files, credentials, or real secrets to version control.

## Setup and Running Locally

Prerequisites:

- Node.js and npm
- A running MongoDB instance and a valid connection configuration
- Angular CLI is available through the project's local dependencies

1. Clone the repository.
2. From the project root, install backend dependencies:
   ```bash
   npm install
   ```
3. Configure the required environment variables in a local `.env` file. Set a private `JWT_SECRET` and configure the MongoDB connection as expected by `app_server/models/db.js`.
4. Start the Express application:
   ```bash
   npm start
   ```
   The default Express port is determined by the project's server configuration. During development, the API was also run on port `3001` for testing.
5. In a second terminal, install and start the Angular administration app:
   ```bash
   cd admin
   npm install
   npm start
   ```
   Angular CLI typically serves the development app at `http://localhost:4200`; use the port shown in the terminal if it selects another port.
6. Open the customer-facing site at the Express server's local address and the administration SPA at the Angular development address.

If your local setup uses a different port or MongoDB connection string, update the local configuration accordingly. Never place secret values in this README.

## Refactoring, Reusable Components, and Testing

During development, the application was organized so that Express routes handle HTTP requests, Mongoose models handle database interactions, and Angular components manage the administrative interface. Keeping these responsibilities separate makes code easier to maintain and test. Reusable UI components reduce duplicated markup and behavior, help keep the interface consistent, and make future updates more efficient.

Testing included retrieving trip records, looking up an individual trip, logging in through the administration interface, and creating, editing, and deleting a test trip. Protected trip creation was also tested without a token and returned `401 Unauthorized`, confirming that the middleware blocked the unauthenticated request. API tests should cover successful responses, invalid input, missing records, missing or expired tokens, and database errors.

## Course Reflection

This project strengthened my understanding of how a full-stack application connects a customer-facing website, an SPA, an API, and a database. I practiced working with Express routes, Angular components, JSON request and response bodies, MongoDB/Mongoose models, and JWT authentication. I also learned that testing needs to include both normal application behavior and security boundaries. These skills are relevant to software engineering roles because they demonstrate experience building, integrating, troubleshooting, and documenting a web application.
