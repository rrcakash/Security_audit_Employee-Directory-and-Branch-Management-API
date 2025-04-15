// test/errorHandler.test.ts

import request from 'supertest';
import express from 'express';
import { errorHandler } from '../src/api/v1/middlewares/errorHandler'; 
import { ValidationError, permissionError, AppError } from '../src/api/v1/errors/customErrors'; 
import { ValidationError as JoiValidationError } from 'joi';

const app = express();
app.use(express.json());

// Simulate routes that throw different types of errors
app.get('/validation-error', (req, res, next) => {
    next(new ValidationError('The input provided is not valid'));
});

app.get('/permission-error', (req, res, next) => {
    next(new permissionError('You do not have the required permissions'));
});

app.get('/app-error', (req, res, next) => {
    next(new AppError('There was an issue with the application', 503));
});

app.get('/joi-validation-error', (req, res, next) => {
    const joiError = new JoiValidationError('"username" field is missing', [{
        message: '"username" field is missing',
        path: ['username'],
        type: 'any.required',
        context: { key: 'username', label: 'username' }
    }], undefined);
    next(joiError);
});

app.get('/generic-error', (req, res, next) => {
    next(new Error('A server-side issue occurred'));
});

app.get('/unknown-error', (req, res, next) => {
    next("This is not an Error object");
});

// Apply the error handling middleware to the app
app.use(errorHandler);

describe('Error Handling Middleware Tests', () => {
    test('should handle ValidationError and return 400 status with error message', async () => {
        const response = await request(app).get('/validation-error');
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ message: 'The input provided is not valid' }]);
    });

    test('should handle PermissionError and return 403 status with error message', async () => {
        const response = await request(app).get('/permission-error');
        expect(response.status).toBe(401);
        expect(response.body.errors).toEqual([{ message: 'You do not have the required permissions' }]);
    });

    test('should handle AppError and return custom status code and error message', async () => {
        const response = await request(app).get('/app-error');
        expect(response.status).toBe(503);
        expect(response.body.errors).toEqual([{ message: 'There was an issue with the application' }]);
    });

    test('should handle JoiValidationError and return 400 status with Joi error details', async () => {
        const response = await request(app).get('/joi-validation-error');
        expect(response.status).toBe(400);
        expect(response.body.errors).toEqual([{ message: '"username" field is missing' }]);
    });

    test('should handle generic Error and return 500 status with default message', async () => {
        const response = await request(app).get('/generic-error');
        expect(response.status).toBe(500);
        expect(response.body.errors).toEqual([{ message: 'Internal Server Error' }]);
    });

    test('should handle unknown error type and return 500 status with default message for unknown errors', async () => {
        const response = await request(app).get('/unknown-error');
        expect(response.status).toBe(500);
        expect(response.body.errors).toEqual([{ message: 'An unexpected error occurred' }]);
    });
});
