const HardSkill = require("../../models/skills/HardSkill");
const fs = require("fs");

exports.createHardSkill = async (req, res) => {
  const { name, mastery } = req.body;
  const svg_path = req.file ? req.file.path : null;

  try {
    const hardSkill = await HardSkill.create({ name, svg_path, mastery });
    res.status(201).json(hardSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllHardSkills = async (req, res) => {
  try {
    const hardSkills = await HardSkill.findAll();
    res.status(200).json(hardSkills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteHardSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await HardSkill.findByPk(id);

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
    res.status(400).send(error.message);
  }
};

exports.updateHardSkill = async (req, res) => {
  const { id } = req.params;
  const { name, mastery } = req.body;
  const newSvgPath = req.file ? req.file.path : null;

  try {
    const hardSkill = await HardSkill.findByPk(id);

    if (!hardSkill) {
      return res.status(404).send("Skill not found");
    }

    if (newSvgPath && hardSkill.svg_path) {
      fs.unlink(hardSkill.svg_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
    }

    hardSkill.name = name || hardSkill.name;
    hardSkill.mastery = mastery || hardSkill.mastery;
    hardSkill.svg_path = newSvgPath || hardSkill.svg_path;

    await hardSkill.save();
    res.status(200).json(hardSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
