import Joi from 'joi';

export const todoValidationSchema = Joi.object({
  title: Joi.string()
    .max(255)
    .required(),
  description: Joi.string()
    .required(),
  isCompleted: Joi.boolean()
    .default(false),
  isPrivate: Joi.boolean()
    .default(true),
});


