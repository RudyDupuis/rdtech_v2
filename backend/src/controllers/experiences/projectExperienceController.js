const ProjectExperience = require("../../models/experiences/ProjectExperience");
const fs = require("fs");
const HardSkill = require("../../models/skills/HardSkill");

exports.createProjectExperience = async (req, res) => {
  const {
    title,
    start_date,
    end_date,
    short_desc,
    long_desc,
    hard_skill_ids,
    project_link,
    code_link,
    doc_link,
    is_favorite,
  } = req.body;

  const thumbnail_path = req.files["thumbnail"]
    ? req.files["thumbnail"][0].path
    : null;
  const images_path = req.files["images"]
    ? req.files["images"].map((file) => file.path)
    : [];

  const hardSkillsIds = hard_skill_ids
    .split(",")
    .map((id) => parseInt(id.trim()));

  try {
    const projectExperience = await ProjectExperience.create({
      title,
      start_date,
      end_date: end_date !== "null" ? end_date : null,
      short_desc,
      thumbnail_path,
      long_desc,
      images_path,
      project_link,
      code_link,
      doc_link,
      is_favorite,
    });
    await projectExperience.addHard_skills(hardSkillsIds);
    res.status(201).json(projectExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllProjectExperiences = async (req, res) => {
  try {
    const projectExperiences = await ProjectExperience.findAll({
      include: {
        model: HardSkill,
        as: "hard_skills",
      },
    });
    res.status(200).json(projectExperiences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProjectExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const projectExperience = await ProjectExperience.findByPk(id);

    if (!projectExperience) {
      return res.status(404).send("ProjectExperience not found");
    }

    if (projectExperience.thumbnail_path !== null) {
      fs.unlink(projectExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete image file");
        }
      });
    }

    if (projectExperience.images_path !== null) {
      projectExperience.images_path.forEach((image_path) => {
        fs.unlink(image_path, (err) => {
          if (err) {
            return res.status(500).send("Failed to delete image file");
          }
        });
      });
    }

    await projectExperience.setHard_skills([]);
    await projectExperience.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateProjectExperience = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    start_date,
    end_date,
    short_desc,
    long_desc,
    hard_skill_ids,
    project_link,
    code_link,
    doc_link,
    is_favorite,
  } = req.body;

  const newThumbnailPath = req.files["thumbnail"]
    ? req.files["thumbnail"][0].path
    : null;
  const newImagesPath = req.files["images"]
    ? req.files["images"].map((file) => file.path)
    : [];

  const hardSkillsIds = hard_skill_ids
    .split(",")
    .map((id) => parseInt(id.trim()));

  try {
    const projectExperience = await ProjectExperience.findByPk(id);

    if (!projectExperience) {
      return res.status(404).send("ProjectExperience not found");
    }

    if (newThumbnailPath && projectExperience.thumbnail_path) {
      fs.unlink(projectExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
    }

    projectExperience.title = title;
    projectExperience.start_date = start_date;
    projectExperience.end_date = end_date !== "null" ? end_date : null;
    projectExperience.short_desc = short_desc;
    projectExperience.thumbnail_path =
      newThumbnailPath || projectExperience.thumbnail_path;
    projectExperience.long_desc = long_desc;
    projectExperience.images_path =
      projectExperience.images_path.concat(newImagesPath);
    projectExperience.project_link = project_link;
    projectExperience.code_link = code_link;
    projectExperience.doc_link = doc_link;
    projectExperience.is_favorite = is_favorite;

    await projectExperience.save();
    await projectExperience.setHard_skills([]);
    await projectExperience.addHard_skills(hardSkillsIds);
    res.status(200).json(projectExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.removeProjectExperienceImage = async (req, res) => {
  const { id } = req.params;
  const { image_path } = req.body;

  try {
    const projectExperience = await ProjectExperience.findByPk(id);

    if (!projectExperience) {
      return res.status(404).send("ProjectExperience not found");
    }

    if (image_path === projectExperience.thumbnail_path) {
      fs.unlink(projectExperience.thumbnail_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
      projectExperience.thumbnail_path = null;
    } else if (
      projectExperience.images_path !== null &&
      projectExperience.images_path.includes(image_path)
    ) {
      fs.unlink(image_path, (err) => {
        if (err) {
          return res.status(500).send("Failed to delete old image file");
        }
      });
      projectExperience.images_path = projectExperience.images_path.filter(
        (path) => path !== image_path
      );
    } else {
      return res.status(404).send("Image path does not match");
    }
    await projectExperience.save();
    res.status(200).json(projectExperience);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFavoriteProjectExperiences = async (req, res) => {
  try {
    const projectExperiences = await ProjectExperience.findAll({
      where: { is_favorite: true },
      include: {
        model: HardSkill,
        as: "hard_skills",
      },
    });
    res.status(200).json(projectExperiences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
