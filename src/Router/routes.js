const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const userController = require('../controllers/userController');
const categoriesController = require('../controllers/categoriesController');
const postController = require('../controllers/postController');

const { validateLogin } = require('../middlewares/validateLogin');
const { validateUser } = require('../middlewares/validateUser');
const { validateToken } = require('../middlewares/validateToken');
const { validateCategory } = require('../middlewares/validateCategory');
const { validateBlogPost } = require('../middlewares/validateBlogpost');

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

router
  .post('/post', validateBlogPost, validateToken, postController.createPost);

router
  .get('/post', validateToken, postController.getPosts);

module.exports = router;