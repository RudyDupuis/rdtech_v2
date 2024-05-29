<script setup lang="ts">
import SkillComp from '@/components/contents/SkillComp.vue'
import ExperienceForm from '@/components/forms/ExperienceForm.vue'
import SkillForm from '@/components/forms/SkillForm.vue'
import { type GetJobExperience, PutJobExperience } from '@/entities/experiences/JobExperience'
import type { PutProjectExperience } from '@/entities/experiences/ProjectExperience'
import {
  type GetTrainingExperience,
  PutTrainingExperience
} from '@/entities/experiences/TrainingExperience'
import { type GetHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'
import { PutSoftSkill, type GetSoftSkill } from '@/entities/skills/SoftSkill'
import { ApiMethods } from '@/helpers/ApiMethods'
import { onMounted, ref } from 'vue'

const api = new ApiMethods()
const backUrl = import.meta.env.VITE_BACKEND_URL

const softSkills = ref<Array<GetSoftSkill>>([])
const hardSkills = ref<Array<GetHardSkill>>([])
const editingSkill = ref<PutSoftSkill | PutHardSkill | undefined>(undefined)

function getSkills() {
  api
    .getData('hard-skills')
    .then(
      (returnedValue) =>
        (hardSkills.value = returnedValue.sort((a: GetHardSkill, b: GetHardSkill) =>
          a.name.localeCompare(b.name)
        ))
    )
  api
    .getData('soft-skills')
    .then(
      (returnedValue) =>
        (softSkills.value = returnedValue.sort((a: GetHardSkill, b: GetHardSkill) =>
          a.name.localeCompare(b.name)
        ))
    )
}

const jobExperiences = ref<Array<GetJobExperience>>([])
const trainingExperiences = ref<Array<GetTrainingExperience>>([])
const editingExperience = ref<
  PutProjectExperience | PutJobExperience | PutTrainingExperience | undefined
>(undefined)

function getExperiences() {
  api
    .getData('job-experiences')
    .then(
      (returnedValue) =>
        (jobExperiences.value = returnedValue.sort(
          (a: GetJobExperience, b: GetJobExperience) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        ))
    )
  api
    .getData('training-experiences')
    .then(
      (returnedValue) =>
        (trainingExperiences.value = returnedValue.sort(
          (a: GetTrainingExperience, b: GetTrainingExperience) =>
            new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        ))
    )
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
    <div class="skill-list mb3">
      <div
        v-for="(skill, index) in softSkills"
        :key="index"
        class="mb1"
        @click="editingSkill = new PutSoftSkill(skill.id, skill.name, null, skill.svg_path)"
      >
        <p>{{ skill.id }}</p>
        <skill-comp :skill="skill" color="grey" size="small" />
      </div>
    </div>

    <h3 class="mb1">Hard Skill</h3>
    <p class="mb2 prl2 text-a-cent">Cliquer sur un élément des listes pour le modifier</p>
    <div class="skill-list mb3">
      <div
        v-for="(skill, index) in hardSkills"
        :key="index"
        class="mb1"
        @click="
          editingSkill = new PutHardSkill(skill.id, skill.name, null, skill.svg_path, skill.mastery)
        "
      >
        <p>{{ skill.id }}</p>
        <skill-comp :skill="skill" color="grey" size="small" />
        <p class="text-a-cent">{{ skill.mastery }}</p>
      </div>
    </div>
  </section>
  <section class="f-col a-cent">
    <h2 class="mb2">Gestion des expériences</h2>
    <experience-form :experience="editingExperience" :getExperiences="getExperiences" class="mb3" />
    <h3 class="mb1">Projets</h3>
    <h3 class="mb1">Emplois</h3>
    <div class="skill-list mb3">
      <div
        v-for="(job, index) in jobExperiences"
        :key="index"
        class="mb1"
        @click="
          editingExperience = new PutJobExperience(
            job.id,
            job.title,
            job.start_date,
            job.end_date,
            job.short_desc,
            null,
            job.thumbnail_path
          )
        "
      >
        <p>{{ job.id }}</p>
        <p>{{ job.title }}</p>
        <img
          :src="backUrl + job.thumbnail_path"
          :alt="'Image de ' + job.title"
          style="width: 80px; height: auto"
        />
      </div>
    </div>
    <h3 class="mb1">Formations</h3>
    <div class="skill-list mb3">
      <div
        v-for="(training, index) in trainingExperiences"
        :key="index"
        class="mb1"
        @click="
          editingExperience = new PutTrainingExperience(
            training.id,
            training.title,
            training.start_date,
            training.end_date,
            training.short_desc,
            null,
            training.thumbnail_path
          )
        "
      >
        <p>{{ training.id }}</p>
        <p>{{ training.title }}</p>
        <img
          :src="backUrl + training.thumbnail_path"
          :alt="'Image de ' + training.title"
          style="width: 80px; height: auto"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.skill-list {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;
  width: 1200px;

  p {
    font-size: 10px;
  }
  div {
    cursor: pointer;
  }

  @media (max-width: 1300px) {
    grid-template-columns: repeat(8, 1fr);
    width: 900px;
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
    width: 600px;
  }
  @media (max-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
    width: 400px;
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
    width: 300px;
  }
}
</style>
