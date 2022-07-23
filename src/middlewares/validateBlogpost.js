const { blogPostSchema } = require('../util/schema');
const { throwInvalidFields } = require('../services/_services');
const { Category } = require('../database/models');

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

module.exports = {
  validateBlogPost,
  categoryIdsExist,
};