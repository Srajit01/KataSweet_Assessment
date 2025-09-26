const Joi = require('joi');

const createSweetSchema = Joi.object({
  name: Joi.string().trim().max(100).required().messages({
    'string.max': 'Sweet name cannot exceed 100 characters',
    'any.required': 'Sweet name is required'
  }),
  category: Joi.string().valid('chocolate', 'candy', 'gummy', 'hard candy', 'toffee', 'lollipop', 'other').required(),
  price: Joi.number().min(0.01).required().messages({
    'number.min': 'Price must be at least 0.01',
    'any.required': 'Price is required'
  }),
  quantity: Joi.number().min(0).required().messages({
    'number.min': 'Quantity cannot be negative',
    'any.required': 'Quantity is required'
  }),
  description: Joi.string().max(500).optional(),
  imageUrl: Joi.string().uri().optional()
});

const updateSweetSchema = Joi.object({
  name: Joi.string().trim().max(100).optional(),
  category: Joi.string().valid('chocolate', 'candy', 'gummy', 'hard candy', 'toffee', 'lollipop', 'other').optional(),
  price: Joi.number().min(0.01).optional(),
  quantity: Joi.number().min(0).optional(),
  description: Joi.string().max(500).optional(),
  imageUrl: Joi.string().uri().optional()
});

const purchaseSchema = Joi.object({
  quantity: Joi.number().min(1).required().messages({
    'number.min': 'Purchase quantity must be at least 1',
    'any.required': 'Quantity is required'
  })
});

const restockSchema = Joi.object({
  quantity: Joi.number().min(1).required().messages({
    'number.min': 'Restock quantity must be at least 1',
    'any.required': 'Quantity is required'
  })
});

const searchSchema = Joi.object({
  name: Joi.string().optional(),
  category: Joi.string().optional(),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional()
});

module.exports = {
  createSweetSchema,
  updateSweetSchema,
  purchaseSchema,
  restockSchema,
  searchSchema
};