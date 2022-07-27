const postService = require('../services/postService');
const status = require('../util/statusHttpCode');
const { verifyToken } = require('../middlewares/token/jwtToken');

const createPost = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { body } = req;

    const { user } = verifyToken(authorization);

    const result = await postService.createPost(body, user);

    return res.status(status.CREATED).json(result);
  } catch (err) {
    return next(err);
  }
};

const getPosts = async (_req, res, next) => {
  try {
    const result = await postService.getPosts();

    return res.status(status.OK).json(result);
  } catch (err) {
    return next(err);
  }
};

const getPostsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await postService.getPostsById(id);

    return res.status(status.OK).json(result);
  } catch (err) {
    return next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const result = await postService.updatePost(id, title, content);

    return res.status(status.OK).json(result);
  } catch (err) {
    return next(err);
  }
};

const removePostById = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;

    const { user } = verifyToken(authorization);

    const result = await postService.removePostById(id, user);

    return res.status(204).json(result);
  } catch (err) {
    return next(err);
  }
};

const searchPostTerm = async (req, res, next) => {
  try {
    const { q } = req.query;

    const result = await postService.searchPostTerm(q);

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  removePostById,
  searchPostTerm,
};