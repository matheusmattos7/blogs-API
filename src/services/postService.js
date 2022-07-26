const Sequelize = require('sequelize');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const { BlogPost, PostCategory, Category, User } = require('../database/models');
const { categoryIdsExist } = require('../middlewares/validateBlogpost');
const { throwNotFound, throwUnauthorizedError } = require('./_services');

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

const updatePost = async (id, title, content) => {
  await BlogPost.update({ title, content }, { where: { id } });
  const updatedPost = await getPostsById(id);

  return updatedPost;
};

const removePostById = async (id, user) => {
  const post = await BlogPost.findByPk(id);

  if (!post) {
    return throwNotFound('Post does not exist');
  }

  if (post.userId !== user.id) {
    return throwUnauthorizedError('Unauthorized user');
  }

  const postDeleted = await BlogPost.destroy({ where: { id } });

  return postDeleted;
};

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  updatePost,
  removePostById,
};