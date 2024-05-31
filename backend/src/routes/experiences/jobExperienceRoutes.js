const express = require("express");
const { experienceUpload } = require("../../middleswares/uploadMiddleware");
const jobExperienceController = require("../../controllers/experiences/jobExperienceController");
const router = express.Router();

router.post(
  "/",
  experienceUpload.single("thumbnail"),
  jobExperienceController.createJobExperience
);
router.get("/", jobExperienceController.getAllJobExperiences);
router.delete("/:id", jobExperienceController.deleteJobExperience);
router.put(
  "/:id",
  experienceUpload.single("thumbnail"),
  jobExperienceController.updateJobExperience
);
router.post(
  "/remove-image/:id",
  experienceUpload.none(),
  jobExperienceController.removeJobExperienceImage
);

module.exports = router;
