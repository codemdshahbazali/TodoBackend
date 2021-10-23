const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const User = require('./User');

const Todo = sequelize.define(
  'Todos',
  {
    // Model attributes are defined here
    item: {
      type: DataTypes.STRING,
      allowNull: false,
      // allowNull defaults to true
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
  }
);

//Defining associations (forgein key - primary key)
User.hasMany(Todo, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Todo.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.sync({ force: true });
  } catch (e) {
    console.log(e.message);
  }
})();

module.exports = Todo;
