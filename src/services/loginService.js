const { User } = require('../database/models');
const { createToken } = require('../middlewares/token/jwtToken');
const { throwInvalidFields } = require('./_services');

const login = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return throwInvalidFields('Invalid fields');
  }

  const token = createToken({ user });

  return token;
};

module.exports = {
  login,
};