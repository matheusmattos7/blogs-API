const { userSchema } = require('../util/schema');

const validateUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const { error } = userSchema.validate({ displayName, email, password, image });

  if (error) {
    const [errorCode, errorMessage] = error.details[0].message.split('+');

    return res.status(Number(errorCode)).json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateUser,
};