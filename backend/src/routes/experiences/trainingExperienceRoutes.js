const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const trainingExperienceController = require("../../controllers/experiences/trainingExperienceController");
const router = express.Router();

router.post(
  "/",
  experienceUpload.single("thumbnail"),
  trainingExperienceController.createTrainingExperience
);
router.get("/", trainingExperienceController.getAllTrainingExperiences);
router.delete("/:id", trainingExperienceController.deleteTrainingExperience);
router.put(
  "/:id",
  experienceUpload.single("thumbnail"),
  trainingExperienceController.updateTrainingExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  trainingExperienceController.removeTrainingExperienceImage
);

module.exports = router;
