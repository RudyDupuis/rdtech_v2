const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SoftSkill = sequelize.define("SoftSkill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  svg_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = SoftSkill;
