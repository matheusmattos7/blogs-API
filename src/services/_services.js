const throwInvalidFields = (message) => {
  const err = new Error(message);
  err.name = 'ValidationError';
  throw err;
};

const throwUserAlreadyRegistered = (message) => {
  const err = new Error(message);
  err.name = 'SequelizeUniqueConstraintError';
  throw err;
};

module.exports = {
  throwInvalidFields,
  throwUserAlreadyRegistered,
};