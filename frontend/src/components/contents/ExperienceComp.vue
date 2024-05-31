<script setup lang="ts">
import type { GetExperience } from '@/entities/experiences/Experience'
import { formatExperienceDate } from '@/helpers/formatting'

interface Props {
  experience: GetExperience
}

defineProps<Props>()

const backUrl = import.meta.env.VITE_BACKEND_URL
</script>

<template>
  <div class="f-col a-cent">
    <img
      v-if="experience.thumbnail_path"
      :src="backUrl + experience.thumbnail_path"
      :alt="'Miniature de ' + experience.title"
      class="clickable-box mb1"
    />
    <p class="text-bold mb05">{{ experience.title }}</p>
    <p class="text-medium mb05">
      {{ formatExperienceDate(experience.start_date, experience.end_date) }}
    </p>
    <p>{{ experience.short_desc }}</p>
  </div>
</template>

<style scoped lang="scss">
div {
  width: 350px;
}
img {
  width: 350px;
  height: auto;
}
p {
  text-align: center;
}
</style>
