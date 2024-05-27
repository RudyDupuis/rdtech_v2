const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Skill = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mastery: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  svg_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Skill;
