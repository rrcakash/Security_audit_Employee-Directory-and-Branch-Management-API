import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Name is required.",
    "string.empty": "Name cannot be empty.",
  }),
  position: Joi.string().trim().required().messages({
    "any.required": "Position is required.",
    "string.empty": "Position cannot be empty.",
  }),
  department: Joi.string().trim().required().messages({
    "any.required": "Department is required.",
    "string.empty": "Department cannot be empty.",
  }),
  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Invalid email format.",
    "string.empty": "Email cannot be empty.",
  }),
  phone: Joi.string()
    .trim()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.pattern.base": "Phone number must be 10 digits.",
      "string.empty": "Phone number cannot be empty.",
    }),
  branchId: Joi.number().integer().required().messages({
    "any.required": "Branch ID is required.",
    "number.base": "Branch ID must be a number.",
  }),
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().trim().optional(),
  position: Joi.string().trim().optional(),
  department: Joi.string().trim().optional(),
  email: Joi.string().trim().email().optional(),
  phone: Joi.string().trim().pattern(/^\d{10}$/).optional(),
  branchId: Joi.number().integer().optional(),
}).min(1); // Ensures that at least one field is provided


