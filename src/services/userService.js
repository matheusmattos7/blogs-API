const { User } = require('../database/models');
const { createToken } = require('../token/jwtToken');
const { throwUserAlreadyRegistered } = require('./_services');

const createUser = async ({ displayName, email, password, image }) => {
  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return throwUserAlreadyRegistered('User already registered');
  }

  const user = User.create({
    displayName,
    email,
    password,
    image,
  });

  const token = createToken({ user });

  return token;
};

module.exports = {
  createUser,
};