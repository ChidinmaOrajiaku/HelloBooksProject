
export default (sequelize, DataTypes) => {
  const RentedBooks = sequelize.define('RentedBooks', {
    bookId: DataTypes.INTEGER,

    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },

    toReturnDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    userId: DataTypes.INTEGER

  });
  RentedBooks.associate = (models) => {
    // associations can be defined here
    RentedBooks.belongsTo(models.Books, {
      foreignKey: 'bookId',
      onDelete: 'CASCADE',
    });
    RentedBooks.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    RentedBooks.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
    });
  };
  return RentedBooks;
};

