const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory, Category, User } = require('../database/models');
const { categoryIdsExist } = require('../middlewares/validateBlogpost');
const { throwNotFound } = require('./_services');

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

const getPosts = async () => {
  const getAllPosts = await BlogPost.findAll({
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      { model: Category, as: 'categories' },
    ],
  });

  return getAllPosts;
};

const getPostsById = async (id) => {
  const getById = await BlogPost.findByPk(id, {
    include: [
      { model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      { model: Category, as: 'categories' },
    ],
  });

  if (!getById) {
    return throwNotFound('Post does not exist');
  }

  return getById;
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
};