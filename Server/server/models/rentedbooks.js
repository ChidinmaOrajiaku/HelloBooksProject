
export default (sequelize, DataTypes) => {
  const RentedBooks = sequelize.define('RentedBooks', {
    booksId: DataTypes.INTEGER,
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    toReturnDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    usersId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        RentedBooks.belongsTo(models.Books, {
          foreignKey: 'booksId',
          onDelete: 'CASCADE',
        });
        RentedBooks.belongsTo(models.Users, {
          foreignKey: 'usersId',
          onDelete: 'CASCADE',
        });
        RentedBooks.belongsTo(models.BooksCategory, {
          foreignKey: 'categoryId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return RentedBooks;
};
