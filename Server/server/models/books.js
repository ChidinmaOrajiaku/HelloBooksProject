export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Books.associate = (models) => {
    // associations can be defined here
    Books.belongsTo(models.Users, {
      foreignKey: 'usersId',
      onDelete: 'CASCADE',
    });
    Books.hasMany(models.RentedBooks, {
      foreignKey: 'booksId',
      as: 'rentedbooks',
    });
    Books.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return Books;
};
