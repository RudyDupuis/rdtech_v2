const TrainingExperience = require("../../models/experiences/TrainingExperience");
const fs = require("fs");

exports.createTrainingExperience = async (req, res) => {
  const { title, start_date, end_date, short_desc } = req.body;
  const thumbnail_path = req.file ? req.file.path : null;

  try {
    const trainingExperience = await TrainingExperience.create({
      title,
      start_date,
      end_date,
      short_desc,
      thumbnail_path,
    });
    res.status(201).json(trainingExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTrainingExperiences = async (req, res) => {
  try {
    const trainingExperiences = await TrainingExperience.findAll();
    res.status(200).json(trainingExperiences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTrainingExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const trainingExperience = await TrainingExperience.findByPk(id);

    if (!trainingExperience) {
      return res.status(404).send("TrainingExperience not found");
    }

    if (trainingExperience.thumbnail_path !== null) {
      fs.unlink(trainingExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete image file");
        }
      });
    }

    await trainingExperience.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateTrainingExperience = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date, short_desc } = req.body;
  const newImgPath = req.file ? req.file.path : null;

  try {
    const trainingExperience = await TrainingExperience.findByPk(id);

    if (!trainingExperience) {
      return res.status(404).send("TrainingExperience not found");
    }

    if (newImgPath && trainingExperience.thumbnail_path) {
      fs.unlink(trainingExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
    }

    trainingExperience.title = title || trainingExperience.title;
    trainingExperience.start_date = start_date || trainingExperience.start_date;
    trainingExperience.end_date = end_date || trainingExperience.end_date;
    trainingExperience.short_desc = short_desc || trainingExperience.short_desc;
    trainingExperience.thumbnail_path =
      newImgPath || trainingExperience.thumbnail_path;

    await trainingExperience.save();
    res.status(200).json(trainingExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
