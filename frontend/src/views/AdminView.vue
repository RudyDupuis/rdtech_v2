<script setup lang="ts">
import AdminExperienceComp from '@/components/contents/admin/AdminExperienceComp.vue'
import AdminSkillComp from '@/components/contents/admin/AdminSkillComp.vue'
import ExperienceForm from '@/components/forms/ExperienceForm.vue'
import SkillForm from '@/components/forms/SkillForm.vue'
import { type GetJobExperience, PutJobExperience } from '@/entities/experiences/JobExperience'
import {
  type GetProjectExperience,
  PutProjectExperience
} from '@/entities/experiences/ProjectExperience'
import {
  type GetTrainingExperience,
  PutTrainingExperience
} from '@/entities/experiences/TrainingExperience'
import { type GetHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'
import { PutSoftSkill, type GetSoftSkill } from '@/entities/skills/SoftSkill'
import { ExperienceApi } from '@/helpers/api/ExperienceApi'
import { SkillApi } from '@/helpers/api/SkillApi'
import { JobExperienceMapper } from '@/helpers/mappers/experiences/JobExperienceMapper'
import { ProjectExperienceMapper } from '@/helpers/mappers/experiences/ProjectExperienceMapper'
import { TrainingExperienceMapper } from '@/helpers/mappers/experiences/TrainingExperienceMapper'
import { HardSkillMapper } from '@/helpers/mappers/skills/HardSkillMapper'
import { SoftSkillMapper } from '@/helpers/mappers/skills/SoftSkillMapper'
import { onMounted, ref } from 'vue'

const softSkillMapper = new SoftSkillMapper()
const hardSkillMapper = new HardSkillMapper()
const skillApi = new SkillApi()

const softSkills = ref<Array<GetSoftSkill>>([])
const hardSkills = ref<Array<GetHardSkill>>([])
const editingSkill = ref<PutSoftSkill | PutHardSkill | undefined>(undefined)

async function getSkills() {
  softSkills.value = await skillApi.getAllSoftSkills()
  hardSkills.value = await skillApi.getAllHardSkills()
}

const projectMapper = new ProjectExperienceMapper()
const jobMapper = new JobExperienceMapper()
const trainingMapper = new TrainingExperienceMapper()
const experienceApi = new ExperienceApi()

const projectExperiences = ref<Array<GetProjectExperience>>([])
const jobExperiences = ref<Array<GetJobExperience>>([])
const trainingExperiences = ref<Array<GetTrainingExperience>>([])
const editingExperience = ref<
  PutProjectExperience | PutJobExperience | PutTrainingExperience | undefined
>(undefined)

async function getExperiences() {
  projectExperiences.value = await experienceApi.getAllProjectExperiences()
  jobExperiences.value = await experienceApi.getAllJobExperiences()
  trainingExperiences.value = await experienceApi.getAllTrainingExperiences()
}

onMounted(() => {
  getSkills()
  getExperiences()
})
</script>

<template>
  <h1 class="mb3">Administration</h1>
  <section class="f-col a-cent">
    <h2 class="mb2">Gestion des compétence</h2>
    <skill-form :skill="editingSkill" :getSkills="getSkills" class="mb3" />
    <h3 class="mb1">Soft Skill</h3>
    <p class="mb2 prl2 text-a-cent">Cliquer sur un élément des listes pour le modifier</p>
    <div class="medium-skill-list w80vw mb3">
      <admin-skill-comp
        v-for="(skill, index) in softSkills"
        :key="index"
        :skill="skill"
        class="mb1"
        @click="editingSkill = softSkillMapper.getSoftSkillToPutSoftSkill(skill)"
      />
    </div>

    <h3 class="mb1">Hard Skill</h3>
    <p class="mb2 prl2 text-a-cent">Cliquer sur un élément des listes pour le modifier</p>
    <div class="medium-skill-list w80vw mb3">
      <admin-skill-comp
        v-for="(skill, index) in hardSkills"
        :key="index"
        :skill="skill"
        class="mb1"
        @click="editingSkill = hardSkillMapper.getHardSkillToPutHardSkill(skill)"
      />
    </div>
  </section>
  <section class="f-col a-cent">
    <h2 class="mb2">Gestion des expériences</h2>
    <experience-form :experience="editingExperience" :getExperiences="getExperiences" class="mb3" />
    <h3 class="mb1">Projets</h3>
    <div class="medium-skill-list w80vw mb3">
      <admin-experience-comp
        v-for="(project, index) in projectExperiences"
        :key="index"
        :experience="project"
        class="mb1"
        @click="
          editingExperience = projectMapper.getProjectExperienceToPutProjectExperience(project)
        "
      />
    </div>
    <h3 class="mb1">Emplois</h3>
    <div class="medium-skill-list w80vw mb3">
      <admin-experience-comp
        v-for="(job, index) in jobExperiences"
        :key="index"
        :experience="job"
        class="mb1"
        @click="editingExperience = jobMapper.getJobExperienceToPutJobExperience(job)"
      />
    </div>
    <h3 class="mb1">Formations</h3>
    <div class="medium-skill-list w80vw mb3">
      <admin-experience-comp
        v-for="(training, index) in trainingExperiences"
        :key="index"
        :experience="training"
        class="mb1"
        @click="
          editingExperience = trainingMapper.getTrainingExperienceToPutTrainingExperience(training)
        "
      />
    </div>
  </section>
</template>
