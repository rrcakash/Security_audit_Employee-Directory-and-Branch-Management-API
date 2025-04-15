import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ValidationError as JoiValidationError } from 'joi';
import { AppError, ValidationError, permissionError } from '../errors/customErrors';

// Error handling middleware function
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("ERROR HANDLER MIDDLEWARE TRIGGERED:", err);

    if (err instanceof JoiValidationError) {
        const validationErrors = err.details.map(detail => ({ message: detail.message }));
        res.status(400).json({ errors: validationErrors });
    } else if (err instanceof ValidationError) {
        res.status(400).json({ errors: [{ message: err.message }] });
    } else if (err instanceof permissionError) {
        res.status(401).json({ errors: [{ message: err.message }] });
    } else if (err instanceof AppError) {
        res.status(err.status || 500).json({ errors: [{ message: err.message }] });
    } else if (err instanceof Error) {
        res.status(500).json({ errors: [{ message: "Internal Server Error" }] });
    } else {
        res.status(500).json({ errors: [{ message: "An unexpected error occurred" }] });
    }

    next(); // This ensures the request-response cycle can continue if needed.
};

export { errorHandler };
