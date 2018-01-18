
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Category already exists'
      },
    }
  });
  Category.associate = (models) => {
    // associations can be defined here
    Category.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Category.hasMany(models.Book, {
      foreignKey: 'categoryId',
      as: 'book',
    });
    Category.hasMany(models.RentedBook, {
      foreignKey: 'categoryId',
      as: 'rentedbook',
    });
  };
  return Category;
};
