<script setup lang="ts">
import type { GetExperience } from '@/entities/experiences/Experience'
import { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import { formatExperienceDate } from '@/helpers/formatting'

interface Props {
  experience: GetExperience
}

defineProps<Props>()

const backUrl = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div class="f-col a-cent prl2">
    <img
      v-if="experience.thumbnail_path"
      :src="backUrl + experience.thumbnail_path"
      :alt="'Miniature de ' + experience.title"
      class="primary-border mb1"
    />
    <p class="text-bold mb05">{{ experience.title }}</p>
    <p class="text-medium mb05">
      {{ formatExperienceDate(experience.start_date, experience.end_date) }}
    </p>
    <p class="mb05">{{ experience.short_desc }}</p>
    <router-link
      v-if="experience instanceof GetProjectExperience"
      :to="{ name: 'project', params: { id: experience.id } }"
      class="text-important"
    >
      En savoir plus ➜
    </router-link>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 350px;
}
img {
  width: 350px;
  height: auto;

  @media (max-width: 520px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
}
p {
  text-align: center;
}
</style>
