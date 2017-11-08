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
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Username with non-alphanumeric characters are not allowed'
        },
        notEmpty: {
          args: true,
          msg: 'Username with empty strings are not allowed'
        },
      },
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email with empty strings are not allowed'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email'
        },
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Password with non-alphanumeric characters are not allowed'
        },
        notEmpty: {
          args: true,
          msg: 'Password with empty strings are not allowed'
        },
        isMoreThan4Characters(value) {
          if (value.length < 4) {
            throw new Error('Password should be more than 4 characters');
          }
        }
      }
    },
  }, {
    hooks: {
      beforeCreate: (Users) => {
        const salt = bcrypt.genSaltSync(9);
        Users.password = bcrypt.hashSync(Users.password, salt);
      },
      beforeUpdate: (Users) => {
        const salt = bcrypt.genSaltSync(9);
        Users.password = bcrypt.hashSync(Users.password, salt);
      },
    }
  });
  Users.associate = (models) => {
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
    Users.hasMany(models.Profile, {
      foreignKey: 'usersId',
      as: 'profile',
    });
  };
  return Users;
};
