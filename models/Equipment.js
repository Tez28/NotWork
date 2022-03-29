// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Equipment model (table) by extending off Sequelize's Model class
class Equipment extends Model {}

// set up fields and rules for Equipment model
Equipment.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // define equipment_name column
    equipment_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // define stock column
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    // define category_id column
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "category",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'equipment',
  }
);

module.exports = Equipment;