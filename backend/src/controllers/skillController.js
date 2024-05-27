const Skill = require("../models/skill");
const fs = require("fs");

exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create({
      name: req.body.name,
      type: req.body.type,
      mastery: req.body.mastery,
      svg_path: req.file.path,
    });
    res.json(skill);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skillId = req.params.id;
    const skill = await Skill.findByPk(skillId);

    if (!skill) {
      return res.status(404).send("Skill not found");
    }

    fs.unlink(skill.svg_path, (err) => {
      if (err) {
        return res.status(500).send("Failed to delete image file");
      }
    });

    await skill.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};
