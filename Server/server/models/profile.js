
export default (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    image: {
      type: DataTypes.STRING,
      unique: true
    },
    status: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    interest: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    usersId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Profile.belongsTo(models.Users, {
          foreignKey: 'usersId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Profile;
};
