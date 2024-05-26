<script setup lang="ts">
import type { PostSkill } from '@/entities/Skill'
import { ApiMethods } from '@/helpers/ApiMethods'
import { ref } from 'vue'

const api = new ApiMethods()
const skill = ref<PostSkill>({ name: '', type: 'softSkill', svg: null })

const handleSubmit = async () => {
  try {
    await api.postData('skills', skill.value)
  } catch (error) {
    console.error('Error:', error)
  }
}

const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    skill.value.svg = file
  }
}
</script>

<template>
  <section>
    <h2 class="mb3">Ajouter une nouvelle compétence</h2>
    <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
      <input type="text" placeholder="Nom" v-model="skill.name" required />

      <select placeholder="Type" v-model="skill.type" required>
        <option value="softSkill">Soft Skill</option>
        <option value="hardSkill">Hard Skill</option>
      </select>

      <label for="svg_path">SVG Path:</label>
      <input type="file" id="svg_path" accept=".svg" @change="handleFileUpload" required />

      <button type="submit">Ajouter</button>
    </form>
  </section>
</template>
