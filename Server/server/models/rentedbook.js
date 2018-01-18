
export default (sequelize, DataTypes) => {
  const RentedBook = sequelize.define('RentedBook', {
    bookId: DataTypes.INTEGER,

    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    toReturnDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER

  });
  RentedBook.associate = (models) => {
    // associations can be defined here
    RentedBook.belongsTo(models.Book, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
    RentedBook.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    RentedBook.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return RentedBook;
};

