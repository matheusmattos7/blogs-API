const PostCategory = (sequelize, DataTypes) => {
  const PostCategories = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      foreignKey: true
    }
  },
  {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategories.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategories,
      as: 'blogPosts',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });

    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategories,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    })
  }

  return PostCategories;
};

module.exports = PostCategory;