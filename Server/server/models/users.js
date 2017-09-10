import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already exists'
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      isEmail: {
        args: true,
        msg: 'Invalid Email'
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    hooks: {
      beforeCreate: (Users) => {
        const salt = bcrypt.genSaltSync(9);
        Users.password = bcrypt.hashSync(Users.password, salt);
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.Books, {
          foreignKey: 'usersId',
          as: 'books',
        });
        Users.hasMany(models.RentedBooks, {
          foreignKey: 'usersId',
          as: 'rentedbooks',
        });
        Users.hasMany(models.Category, {
          foreignKey: 'usersId',
          as: 'category',
        });
      },
    },
  });
  return Users;
};
