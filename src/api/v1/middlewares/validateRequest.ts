import { Request, Response, NextFunction } from "express";
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;
import { ObjectSchema } from "joi";

// Internal module imports


export const validateRequest =
  (schema: ObjectSchema): MiddlewareFunction =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      console.error("Validation Error:", error.details.map((detail) => detail.message)); // Log errors for debugging
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    next();
  };
