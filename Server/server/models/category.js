
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  });
  Category.associate = (models) => {
    // associations can be defined here
    Category.belongsTo(models.Users, {
      foreignKey: 'usersId',
      onDelete: 'CASCADE',
    });
    Category.hasMany(models.Books, {
      foreignKey: 'categoryId',
      as: 'books',
    });
    Category.hasMany(models.RentedBooks, {
      foreignKey: 'categoryId',
      as: 'rentedbooks',
    });
  };
  return Category;
};
