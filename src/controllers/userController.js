const userService = require('../services/userService');
const status = require('../util/statusHttpCode');

const createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const token = await userService.createUser(body);

    return res.status(status.CREATED).json({ token });
  } catch (err) {
      next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const users = await userService.getUser();

    return res.status(status.OK).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUser,
};