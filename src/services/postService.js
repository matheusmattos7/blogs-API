const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory } = require('../database/models');
const { categoryIdsExist } = require('../middlewares/validateBlogpost');

const createPost = async ({ title, content, categoryIds }, { id: userId }) => {
  const t = await sequelize.transaction();
  await categoryIdsExist(categoryIds);
  try {
    const result = await BlogPost.create({
      title,
      content,
      userId,
      published: new Date(),
      updated: new Date(),
    }, { transaction: t });

    await Promise.all(categoryIds.map((item) => PostCategory
    .create({ postId: result.id, categoryId: item }, { transaction: t })));

    await t.commit();

    return result;
  } catch (err) {
    await t.rollback();
  }
};

module.exports = {
  createPost,
};