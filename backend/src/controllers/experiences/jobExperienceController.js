const JobExperience = require("../../models/experiences/JobExperience");
const fs = require("fs");

exports.createJobExperience = async (req, res) => {
  const { title, start_date, end_date, short_desc } = req.body;
  const thumbnail_path = req.file ? req.file.path : null;

  try {
    const jobExperience = await JobExperience.create({
      title,
      start_date,
      end_date,
      short_desc,
      thumbnail_path,
    });
    res.status(201).json(jobExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllJobExperiences = async (req, res) => {
  try {
    const jobExperiences = await JobExperience.findAll();
    res.status(200).json(jobExperiences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteJobExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const jobExperience = await JobExperience.findByPk(id);

    if (!jobExperience) {
      return res.status(404).send("JobExperience not found");
    }

    if (jobExperience.thumbnail_path !== null) {
      fs.unlink(jobExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete image file");
        }
      });
    }

    await jobExperience.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateJobExperience = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date, short_desc } = req.body;
  const newImgPath = req.file ? req.file.path : null;

  try {
    const jobExperience = await JobExperience.findByPk(id);

    if (!jobExperience) {
      return res.status(404).send("JobExperience not found");
    }

    if (newImgPath && jobExperience.thumbnail_path) {
      fs.unlink(jobExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
    }

    jobExperience.title = title || jobExperience.title;
    jobExperience.start_date = start_date || jobExperience.start_date;
    jobExperience.end_date = end_date || jobExperience.end_date;
    jobExperience.short_desc = short_desc || jobExperience.short_desc;
    jobExperience.thumbnail_path = newImgPath || jobExperience.thumbnail_path;

    await jobExperience.save();
    res.status(200).json(jobExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
