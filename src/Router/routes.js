const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');

const { validateLogin } = require('../middlewares/validateLogin');
const { validateUser } = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares/validateToken');
const { validateCategory } = require('../middlewares/validateCategory');

router
  .post('/login', validateLogin, loginController.login);

router
  .post('/user', validateUser, userController.createUser);

router
  .get('/user', validateToken, userController.getUser);

router
  .get('/user/:id', validateToken, userController.getUserId);

router
  .post('/categories', validateCategory, validateToken, categoriesController.createCategories);

router
  .get('/categories', validateToken, categoriesController.getCategories);

module.exports = router;