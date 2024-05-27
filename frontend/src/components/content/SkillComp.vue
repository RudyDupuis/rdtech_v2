<script setup lang="ts">
import type { GetSkill } from '@/entities/Skill'
import { onMounted, ref, watch } from 'vue'

interface Props {
  skill: GetSkill
  size: 'medium' | 'small'
  color: 'primary' | 'secondary' | 'grey'
}

const props = defineProps<Props>()
const svgContent = ref()

function fetchSvg() {
  fetch(import.meta.env.VITE_BACKEND_URL + props.skill.svg_path)
    .then((response) => response.text())
    .then((text) => (svgContent.value = text))
}

watch(
  () => props.skill,
  () => {
    fetchSvg()
  }
)

onMounted(() => {
  fetchSvg()
})
</script>

<template>
  <div class="f-col a-cent">
    <div v-html="svgContent" :class="`skill-size-${props.size} skill-color-${props.color}`"></div>
    <p class="text-a-cent" :style="`font-size: ${size == 'small' ? 10 : 12}px;`">
      {{ skill.name }}
    </p>
  </div>
</template>
