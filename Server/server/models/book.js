export default (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
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
