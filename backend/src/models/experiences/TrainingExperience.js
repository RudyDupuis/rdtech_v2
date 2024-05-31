const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const TrainingExperience = sequelize.define("TrainingExperience", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  short_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  thumbnail_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = TrainingExperience;
