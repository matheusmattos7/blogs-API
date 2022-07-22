const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPosts.associate = (model) => {
    BlogPosts.belongsTo(model.User, {
       foreignKey: 'userId',
        as: 'user'
    });
  };

  return BlogPosts;
};

module.exports = BlogPost;