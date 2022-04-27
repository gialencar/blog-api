const { DataTypes } = require('sequelize');

const attributes = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
};

module.exports = (sequelize) => {
  const User = sequelize.define('User', attributes, {
    timestamps: false,
    tableName: 'Users',
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { as: 'posts' });
  };

  return User;
};
