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
const {
  validateBlogPost,
   validateUpdateTitleAndContent,
   userValidation,
   } = require('../middlewares/validateBlogpost');

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
  .get('/post/search', validateToken, postController.searchPostTerm);

router
  .post('/post', validateBlogPost, validateToken, postController.createPost);

router
  .get('/post', validateToken, postController.getPosts);

router
  .get('/post/:id', validateToken, postController.getPostsById);

router
  .put('/post/:id',
  validateUpdateTitleAndContent, validateToken, userValidation, postController.updatePost);

router
  .delete('/post/:id', validateToken, postController.removePostById);

router
  .delete('/user/me', validateToken, userController.removeUserId);

module.exports = router;