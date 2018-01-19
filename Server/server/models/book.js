export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input a title'
        },
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input an author'
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please input a category'
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
  Book.associate = (models) => {
    // associations can be defined here
    Book.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Book.hasMany(models.RentedBook, {
      foreignKey: 'bookId',
      as: 'rentedbook',
    });
    Book.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return Book;
};
