const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");
const HardSkill = require("../skills/HardSkill");

const ProjectExperience = sequelize.define("ProjectExperience", {
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
  long_desc: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  images_path: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  project_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  code_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  doc_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_favorite: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

ProjectExperience.belongsToMany(HardSkill, {
  through: "ProjectExperienceHardSkills",
  as: "hard_skills",
});
module.exports = ProjectExperience;
