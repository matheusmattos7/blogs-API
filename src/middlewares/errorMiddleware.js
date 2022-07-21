const status = require('../util/statusHttpCode');

const errorMiddleware = (err, _req, res, _next) => {
  res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
};

module.exports = errorMiddleware;