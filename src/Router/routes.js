const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const { validateLogin } = require('../middlewares/validateLogin');
const { validateUser } = require('../middlewares/validateUser');

router
  .post('/login', validateLogin, loginController.login);

router
  .post('/user', validateUser, userController.createUser);

module.exports = router;