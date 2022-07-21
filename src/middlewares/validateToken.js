const { throwUnauthorizedError } = require('../services/_services');
const { verifyToken } = require('./token/jwtToken');

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;

  const validation = verifyToken(authorization);

  if (!authorization) {
    return throwUnauthorizedError('Token not found');
  }

  if (!validation) {
    return throwUnauthorizedError('Expired or invalid token');
  }

  next();
};

module.exports = {
  validateToken,
};