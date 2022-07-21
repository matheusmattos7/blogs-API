const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');

const { validateLogin } = require('../middlewares/validateLogin');
const { validateUser } = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares/validateToken');

router
  .post('/login', validateLogin, loginController.login);

router
  .post('/user', validateUser, userController.createUser);

router
  .get('/user', validateToken, userController.getUser);

module.exports = router;