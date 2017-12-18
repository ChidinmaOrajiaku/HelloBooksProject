export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Title with empty strings are not allowed'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Author with empty strings are not allowed'
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Category with empty strings are not allowed'
        },
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {
          args: true,
          msg: 'Image must be a url'
        },
        notEmpty: {
          args: true,
          msg: 'Image with empty strings are not allowed'
        },
      }
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Books.associate = (models) => {
    // associations can be defined here
    Books.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Books.hasMany(models.RentedBooks, {
      foreignKey: 'bookId',
      as: 'rentedbook',
    });
    Books.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return Books;
};
