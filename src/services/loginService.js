const { User } = require('../database/models');
const { createToken } = require('../token/jwtToken');

const login = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return {
      error: {
        status: 400,
        message: 'Invalid fields',
      },
    };
  }

  const token = createToken({ user });

  return token;
};

module.exports = {
  login,
};