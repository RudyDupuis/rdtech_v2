const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/sequelize");
const hardSkillRoutes = require("./src/routes/skills/hardSkillRoutes");
const softSkillRoutes = require("./src/routes/skills/softSkillRoutes");
const jobExperienceRoutes = require("./src/routes/experiences/jobExperienceRoutes");
const trainingExperienceRoutes = require("./src/routes/experiences/trainingExperienceRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/hard-skills", hardSkillRoutes);
app.use("/soft-skills", softSkillRoutes);

app.use("/job-experiences", jobExperienceRoutes);
app.use("/training-experiences", trainingExperienceRoutes);

sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
