const { User } = require('../database/models');
const { createToken } = require('../middlewares/token/jwtToken');
const { throwSequelizeUniqueConstraintError, throwNotFound } = require('./_services');

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

const getUserId = async (id) => {
  const user = await User.findOne({ where: { id },
    attributes: {
      exclude: ['password'],
    },
  });

  if (!user) {
    return throwNotFound('User does not exist');
  }

  return user;
};

const removeUserId = async (user) => {
  const deletedUser = await User.destroy({ where: { id: user.id } });

  return deletedUser;
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  removeUserId,
};