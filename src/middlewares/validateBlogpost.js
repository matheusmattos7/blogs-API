const { blogPostSchema, blogPostSchemaUpdate } = require('../util/schema');
const { throwInvalidFields } = require('../services/_services');
const { Category } = require('../database/models');
const { verifyToken } = require('./token/jwtToken');
const { getUserId } = require('../services/userService');

const validateBlogPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const { error } = blogPostSchema.validate({ title, content, categoryIds });

  if (error) {
    const [errorCode, errorMessage] = error.details[0].message.split('+');

    return res.status(Number(errorCode)).json({ message: errorMessage });
  }

  next();
};

const categoryIdsExist = async (categoryIds) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });

    if (categoryIds.length !== count) {
      return throwInvalidFields('"categoryIds" not found');
  }
};

const userValidation = async (req, res, next) => {
  const { authorization } = req.headers;
  const idPost = req.params.id;

  const { user } = verifyToken(authorization);

  const { id } = await getUserId(idPost);

  if (user.id !== id) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  next();
};

const validateUpdateTitleAndContent = (req, res, next) => {
  const { title, content } = req.body;
  const { error } = blogPostSchemaUpdate.validate({ title, content });

  if (error) {
    const [errorCode, errorMessage] = error.details[0].message.split('+');

    return res.status(Number(errorCode)).json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateBlogPost,
  categoryIdsExist,
  userValidation,
  validateUpdateTitleAndContent,
};