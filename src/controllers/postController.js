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

module.exports = {
  createPost,
};