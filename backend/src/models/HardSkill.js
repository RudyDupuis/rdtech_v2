const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const HardSkill = sequelize.define("HardSkill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  svg_path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mastery: {
    type: DataTypes.ENUM("advanced", "intermediate", "beginner"),
    allowNull: false,
  },
});

module.exports = HardSkill;
