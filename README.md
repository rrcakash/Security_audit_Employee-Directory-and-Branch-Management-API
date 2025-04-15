# Employee Directory and Branch Management API

This repository contains a Node.js API for managing employee and branch data, with a focus on validation, database integration, and automated testing. The project involves creating and testing CRUD operations for employee and branch records, validating input data using Joi, and using Firebase Firestore as the database for persistent storage.

## Project Overview

The project is divided into multiple assignments, each focusing on specific tasks:

1. **Assignment 2**: Basic Setup of the API
2. **Assignment 3**: Adding Data Validation and Firestore Integration
3. **Assignment 5**: Integrating API Endpoints with Joi Validation and Firestore, and Implementing Tests

### Key Features
- **Employee Directory Endpoints**: Implement CRUD operations for managing employee records.
- **Branch Management Endpoints**: Implement CRUD operations for managing branch records.
- **Data Validation with Joi**: Validate incoming data to ensure integrity and security.
- **Database Integration with Firestore**: Use Firebase Firestore for persistent data storage.
- **Automated Testing**: Use Jest and Supertest for automated API testing.
- **Swagger Documentation**: Automatically generate API documentation using Swagger.

---

## Assignment 2: Project Setup and API Structure

### Setup Instructions

1. **GitHub Integration**:
   - Create a new repository using the GitHub template provided.
   - Set up the project locally using the provided executable or manually.
   
2. **Development Environment Setup**:
   - Initialize a Node.js project and set up TypeScript.
   - Install necessary dependencies (`express`, `morgan`, `jest`, etc.).
   - Implement a basic Express.js server with HTTP request logging using Morgan.
   
3. **Health Check Endpoint**:
   - Create a `/health` endpoint to check if the server is running.
   - Write basic tests using Jest and Supertest.

### Dependencies
- Express, Morgan, Jest, Supertest, TypeScript.

---

## Assignment 3: Joi Validation and Firestore Integration

### Data Validation with Joi

1. **Joi Validation**:
   - Install and configure Joi for data validation.
   - Create Joi schemas for validating employee and branch data.
   - Implement validation middleware and apply it to the API routes.

2. **Firestore Integration**:
   - Set up Firebase Firestore for database storage.
   - Refactor the API to use Firestore instead of in-memory storage.
   - Implement CRUD operations on Firestore for employee and branch data.
   
3. **Error Handling**:
   - Implement custom error classes and use middleware to handle errors gracefully.
   - Ensure Firestore-related errors and validation errors are caught and sent to the client with meaningful messages.

### Dependencies
- Joi, Firebase Admin SDK, Firestore.

---

## Assignment 5: Implementing API Endpoints and Testing

### API Endpoints

1. **Employee Directory Endpoints**:
   - **Create Employee**: Endpoint to create new employees.
   - **Get All Employees**: Endpoint to list all employees.
   - **Get Employee by ID**: Endpoint to get employee details by ID.
   - **Update Employee**: Endpoint to update employee details.
   - **Delete Employee**: Endpoint to delete an employee.
   
2. **Branch Management Endpoints**:
   - **Create Branch**: Endpoint to create new branches.
   - **Get All Branches**: Endpoint to list all branches.
   - **Get Branch by ID**: Endpoint to get branch details by ID.
   - **Update Branch**: Endpoint to update branch details.
   - **Delete Branch**: Endpoint to delete a branch.

3. **Additional Endpoints for Logical Operations**:
   - **Get All Employees for a Branch**: Endpoint to list employees belonging to a specific branch.
   - **Get Employees by Department**: Endpoint to list employees from a specific department.

### Automated Testing

1. **Write Unit and Integration Tests**:
   - Use Jest and Supertest for API testing.
   - Write tests to verify CRUD operations for both employees and branches.
   
2. **Continuous Integration with GitHub Actions**:
   - Set up GitHub Actions to run tests automatically on every push or pull request.
   - Ensure all tests pass successfully and report results.

### Swagger Documentation
   - Integrate Swagger to generate and serve API documentation automatically.
   - Ensure the documentation is accurate and includes all API routes.

### Dependencies
- Joi, Firebase Admin SDK, Firestore, Swagger, Jest, Supertest, GitHub Actions.

---

## How to Set Up and Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<your-username>/<repository-name>.git
   cd <repository-name>

2. Install dependencies:
npm install
Set up Firebase:

3. Create a Firebase project and enable Firestore.

Add the Firebase credentials to your project and ensure the credentials file is in your .gitignore.

4. Run the server:
npm run start

5. Run tests
npm test 