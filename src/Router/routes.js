const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const { validateLogin } = require('../middlewares/validateLogin');

router
  .post('/login', validateLogin, loginController.login);

module.exports = router;