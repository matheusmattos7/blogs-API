const statusCode = require('../util/statusHttpCode');

const errors = {
  ValidationError: statusCode.BAD_REQUEST,
  UnauthorizedError: statusCode.UNAUTHORIZED,
  NotFoundError: statusCode.NOT_FOUND,
  SequelizeUniqueConstraintError: statusCode.CONFLICT,
  JsonWebTokenError: statusCode.UNAUTHORIZED,
};

const errorMiddlewareHandler = (err, _req, res, _next) => {
  const { name, message } = err;
  const status = errors[name];

  if (!status) {
  return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message });
}
  return res.status(status).json({ message });
};

module.exports = errorMiddlewareHandler;