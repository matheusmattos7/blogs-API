const loginService = require('../services/loginService');
const status = require('../util/statusHttpCode');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await loginService.login(email);

    return res.status(status.OK).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};