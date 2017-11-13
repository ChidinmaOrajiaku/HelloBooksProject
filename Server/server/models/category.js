
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: DataTypes.STRING
  });
  Category.associate = (models) => {
    // associations can be defined here
    Category.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Category.hasMany(models.Books, {
      foreignKey: 'categoryId',
      as: 'book',
    });
    Category.hasMany(models.RentedBooks, {
      foreignKey: 'categoryId',
      as: 'rentedbook',
    });
  };
  return Category;
};
