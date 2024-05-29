<script setup lang="ts">
import SkillComp from '@/components/contents/SkillComp.vue'
import SkillForm from '@/components/forms/SkillForm.vue'
import { type GetHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'
import { PutSoftSkill, type GetSoftSkill } from '@/entities/skills/SoftSkill'
import { ApiMethods } from '@/helpers/ApiMethods'
import { onMounted, ref } from 'vue'

const api = new ApiMethods()
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

onMounted(() => {
  getSkills()
})
</script>

<template>
  <section class="f-col a-cent prl4">
    <h2 class="mb2">Gestion des compétence</h2>
    <skill-form :skill="editingSkill" :getSkills="getSkills" />
    <h3 class="mb2">Soft Skill</h3>
    <div class="skill-list">
      <div
        v-for="(skill, index) in softSkills"
        :key="index"
        class="mb2"
        @click="editingSkill = new PutSoftSkill(skill.id, skill.name, null, skill.svg_path)"
      >
        <p>{{ skill.id }}</p>
        <skill-comp :skill="skill" color="grey" size="small" />
      </div>
    </div>

    <h3 class="mb2">Hard Skill</h3>
    <div class="skill-list">
      <div
        v-for="(skill, index) in hardSkills"
        :key="index"
        class="mb2"
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
</template>

<style scoped lang="scss">
.skill-list {
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(10, 1fr);
  justify-items: center;

  p {
    font-size: 10px;
  }
  div {
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(8, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(7, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 400px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
