const { verifyToken } = require('../middlewares/token/jwtToken');
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

const getUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserId(id);

    return res.status(status.OK).json(user);
  } catch (err) {
    next(err);
  }
};

const removeUserId = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    const { user } = verifyToken(authorization);

    const result = await userService.removeUserId(user);

    return res.status(204).json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  getUser,
  getUserId,
  removeUserId,
};