const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const JobExperience = sequelize.define("JobExperience", {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail_path: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = JobExperience;
