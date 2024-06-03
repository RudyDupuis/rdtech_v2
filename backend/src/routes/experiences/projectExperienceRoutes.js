const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const projectExperienceController = require("../../controllers/experiences/projectExperienceController");
const router = express.Router();

router.post(
  "/",
  experienceUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  projectExperienceController.createProjectExperience
);
router.get("/", projectExperienceController.getAllProjectExperiences);
router.delete("/:id", projectExperienceController.deleteProjectExperience);
router.put(
  "/:id",
  experienceUpload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  projectExperienceController.updateProjectExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  projectExperienceController.removeProjectExperienceImage
);
router.get(
  "/favorites",
  projectExperienceController.getAllFavoriteProjectExperiences
);
router.get("/:id", projectExperienceController.getProjectExperienceById);

module.exports = router;
