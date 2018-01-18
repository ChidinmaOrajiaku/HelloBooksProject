import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
      beforeCreate: (User) => {
        const salt = bcrypt.genSaltSync(9);
        User.password = bcrypt.hashSync(User.password, salt);
      },
      beforeUpdate: (User) => {
        const salt = bcrypt.genSaltSync(9);
        User.password = bcrypt.hashSync(User.password, salt);
      },
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Book, {
      foreignKey: 'userId',
      as: 'book',
    });
    User.hasMany(models.RentedBook, {
      foreignKey: 'userId',
      as: 'rentedbook',
    });
    User.hasMany(models.Category, {
      foreignKey: 'userId',
      as: 'category',
    });
  };
  return User;
};
