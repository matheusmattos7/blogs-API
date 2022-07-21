const loginService = require('../services/loginService');
const status = require('../util/statusHttpCode');

const login = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await loginService.login(email);

    console.log('test1', token);
    const { error } = token;
    if (error) {
      return res.status(error.status).json({ message: error.message });
    }

    return res.status(status.OK).json({ token });
  } catch (err) {
    return next();
  }
};

module.exports = {
  login,
};