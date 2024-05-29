const SoftSkill = require("../../models/skills/SoftSkill");
const fs = require("fs");

exports.createSoftSkill = async (req, res) => {
  const { name } = req.body;
  const svg_path = req.file ? req.file.path : null;

  try {
    const softSkill = await SoftSkill.create({ name, svg_path });
    res.status(201).json(softSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSoftSkills = async (req, res) => {
  try {
    const softSkills = await SoftSkill.findAll();
    res.status(200).json(softSkills);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSoftSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await SoftSkill.findByPk(id);

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

exports.updateSoftSkill = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newSvgPath = req.file ? req.file.path : null;

  try {
    const softSkill = await SoftSkill.findByPk(id);

    if (!softSkill) {
      return res.status(404).send("Skill not found");
    }

    if (newSvgPath && softSkill.svg_path) {
      fs.unlink(softSkill.svg_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
    }

    softSkill.name = name || softSkill.name;
    softSkill.svg_path = newSvgPath || softSkill.svg_path;

    await softSkill.save();
    res.status(200).json(softSkill);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
