const { loginSchema } = require('../util/schema');

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginSchema.validate({ email, password });

  if (error) {
    const [errorCode, errorMessage] = error.details[0].message.split('+');

    return res.status(Number(errorCode)).json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateLogin,
};