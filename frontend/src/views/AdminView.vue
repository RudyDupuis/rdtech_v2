<script setup lang="ts">
import SkillComp from '@/components/content/SkillComp.vue'
import { GetSkill, type PostSkill } from '@/entities/Skill'
import { ApiMethods } from '@/helpers/ApiMethods'
import { onMounted, ref } from 'vue'

const api = new ApiMethods()
const skill = ref<PostSkill>({ name: '', type: 'softSkill', mastery: 'beginner', svg: null })
const skills = ref<Array<GetSkill>>([])

async function handleSubmit() {
  try {
    await api.postData('skills', skill.value)
    skill.value = { name: '', type: 'softSkill', mastery: 'beginner', svg: null }
    getSkills()
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleDelete(skillId: string) {
  try {
    await api.deleteData('skills/' + skillId)
    getSkills()
  } catch (error) {
    console.error('Error:', error)
  }
}

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    skill.value.svg = file
  }
}

function getSkills() {
  api.getData('skills').then((returnedValue) => (skills.value = returnedValue))
}

onMounted(() => {
  getSkills()
})
</script>

<template>
  <section>
    <h2 class="mb3">Ajouter une nouvelle compétence</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="mb3">
      <input type="text" placeholder="Nom" v-model="skill.name" required />

      <select placeholder="Type" v-model="skill.type" required>
        <option value="softSkill">Soft Skill</option>
        <option value="hardSkill">Hard Skill</option>
      </select>

      <select placeholder="Maîtrise" v-model="skill.mastery" required>
        <option value="advanced">Avancé</option>
        <option value="intermediate">Intermédiaire</option>
        <option value="beginner">Débutant</option>
      </select>

      <label for="svg_path">SVG | 80px par 80px | Ex nommage: 'Vue-js.svg'</label>
      <input type="file" id="svg_path" accept=".svg" @change="handleFileUpload" required />

      <button type="submit">Ajouter</button>
    </form>
    <section class="f a-cent j-betw f-wrap prl3">
      <div
        v-for="(skill, index) in skills"
        :key="index"
        class="mb1"
        style="cursor: pointer"
        @dblclick="handleDelete(skill.id)"
      >
        <skill-comp :skill="skill" color="grey" size="small" />
        <p class="text-a-cent" style="font-size: 10px">{{ skill.mastery }}</p>
        <p class="text-a-cent" style="font-size: 10px">{{ skill.type }}</p>
      </div>
    </section>
  </section>
</template>
