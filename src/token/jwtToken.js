const jwt = require('jsonwebtoken');

require('dotenv').config();

const secret = process.env.JWT_SECRET;

const createToken = (body) => {
  const token = jwt.sign(body, secret,
    {
      algorithm: 'HS256',
      expiresIn: '15m',
    });

    return token;
};

const validateToken = (data) => {
  const token = jwt.verify(data, secret);

  return token;
};

module.exports = {
  createToken,
  validateToken,
};