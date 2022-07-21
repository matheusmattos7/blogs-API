const Joi = require('joi');
const message = require('./codeMessages');
const status = require('./statusHttpCode');

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

module.exports = {
  loginSchema,
};