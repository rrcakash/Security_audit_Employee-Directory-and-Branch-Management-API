import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Branch name is required.",
    "string.empty": "Branch name cannot be empty.",
  }),
  address: Joi.string().required().messages({
    "any.required": "Address is required.",
    "string.empty": "Address cannot be empty.",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "any.required": "Phone number is required.",
      "string.pattern.base": "Phone number must be 10 digits.",
      "string.empty": "Phone number cannot be empty.",
    }),
});

export const updateBranchSchema = Joi.object({
  id: Joi.string().optional(),
  name: Joi.string().optional(),
  address: Joi.string().optional(),
// Inside your Joi validation schema
phone: Joi.string().pattern(/^\d{10}$/).required()  // Allowing 10 digits without dashes
,
});