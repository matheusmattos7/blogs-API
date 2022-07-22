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

const throwNotFound = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

module.exports = {
  throwInvalidFields,
  throwSequelizeUniqueConstraintError,
  throwUnauthorizedError,
  throwNotFound,
};