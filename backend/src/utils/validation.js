const Joi = require('joi');

const taskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().max(1000).optional(),
  status: Joi.string().valid('to-do', 'in-progress', 'completed').default('to-do'),
  dueDate: Joi.string().isoDate().optional().allow(null)
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('pending', 'in-progress', 'completed').required()
});

const validateTask = (data) => taskSchema.validate(data, { abortEarly: false });
const validateStatusUpdate = (data) => statusUpdateSchema.validate(data, { abortEarly: false });

module.exports = {
  validateTask,
  validateStatusUpdate
};