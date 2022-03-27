const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class EquipmentTag extends Model {}

EquipmentTag.init(
  {
    // define an id column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // define product_id column
    equipment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "equipment",
        key: "id"
      }
    },
    // define tag_id column
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "tag",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'equipment_tag',
  }
);

module.exports = EquipmentTag;