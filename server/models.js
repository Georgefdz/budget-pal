const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  },
);

const Expense = sequelize.define('Expense', {
  concept: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    // defaultValue: "#00587D",
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  isRecurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: false,
});

sequelize.sync({alter: true});

module.exports = {
  Expense,
};
