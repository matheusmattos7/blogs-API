const Joi = require('joi');
const message = require('./codeMessages');
const status = require('./statusHttpCode');

const MIN_NAME = 8;
const MIN_PASSWORD = 6;

const loginSchema = Joi.object({
  email: Joi.string().email().empty().messages({
    'string.empty': `${status.BAD_REQUEST}+${message.SOME_REQUIRED}`,
  })
  .required(),
  password: Joi.string().empty().messages({
    'string.empty': `${status.BAD_REQUEST}+${message.SOME_REQUIRED}`,
  }).required(),
  }).messages({
  'string.empty': `${status.BAD_REQUEST}+${message.INVALID_FIELD}`,
});

const userSchema = Joi.object({
  displayName: Joi.string().min(MIN_NAME).messages({
    'string.min': `${status.BAD_REQUEST}+${message.DISPLAY_NAME_MIN}`,
  })
    .required(),
  email: Joi.string().email().messages({
    'string.email': `${status.BAD_REQUEST}+${message.EMAIL_VALID}`,
  })
    .required(),
  password: Joi.string().min(MIN_PASSWORD).messages({
    'string.min': `${status.BAD_REQUEST}+${message.PASSWORD_MIN}`,
  })
    .required(),
  image: Joi.string().required(),
});

const categorySchema = Joi.object({
  name: Joi.string().empty().required().messages({
    'any.required': `${status.BAD_REQUEST}+${message.NAME_IS_REQUIRED}`,
  }),
});

const blogPostSchema = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
  categoryIds: Joi.array().empty().required(),
}).messages({
  'string.empty': `${status.BAD_REQUEST}+${message.SOME_REQUIRED}`,
});

const blogPostSchemaUpdate = Joi.object({
  title: Joi.string().empty().required(),
  content: Joi.string().empty().required(),
}).messages({
  'string.empty': `${status.BAD_REQUEST}+${message.SOME_REQUIRED}`,
});

module.exports = {
  loginSchema,
  userSchema,
  categorySchema,
  blogPostSchema,
  blogPostSchemaUpdate,
};