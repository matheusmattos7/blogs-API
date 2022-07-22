const { categorySchema } = require('../util/schema');

const validateCategory = (req, res, next) => {
  const { name } = req.body;
  const { error } = categorySchema.validate({ name });

  if (error) {
    const [errorCode, errorMessage] = error.details[0].message.split('+');

    return res.status(Number(errorCode)).json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateCategory,
};