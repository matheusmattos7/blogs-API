const throwInvalidFields = (message) => {
  const err = new Error(message);
  err.name = 'ValidationError';
  throw err;
};

const throwSequelizeUniqueConstraintError = (message) => {
  const err = new Error(message);
  err.name = 'SequelizeUniqueConstraintError';
  throw err;
};

const throwUnauthorizedError = (message) => {
  const err = new Error(message);
  err.name = 'UnauthorizedError';
  throw err;
};

module.exports = {
  throwInvalidFields,
  throwSequelizeUniqueConstraintError,
  throwUnauthorizedError,
};