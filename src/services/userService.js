const { User } = require('../database/models');
const { createToken } = require('../middlewares/token/jwtToken');
const { throwSequelizeUniqueConstraintError } = require('./_services');

const createUser = async ({ displayName, email, password, image }) => {
  const userExist = await User.findOne({ where: { email } });

  if (userExist) {
    return throwSequelizeUniqueConstraintError('User already registered');
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

const getUser = async () => {
  const users = await User.findAll({
     attributes: {
        exclude: ['password'],
     },
  });

  return users;
};

module.exports = {
  createUser,
  getUser,
};