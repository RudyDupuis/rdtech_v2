<script setup lang="ts">
import type { GetSkill } from '@/entities/Skill'

interface Props {
  skill: GetSkill
}

const url = import.meta.env.VITE_BACKEND_URL

defineProps<Props>()
</script>

<template>
  <div class="f-col a-cent">
    <img :src="url + skill.svg_path" :alt="'Logo de ' + skill.name" />
    <p>{{ skill.name }}</p>
  </div>
</template>
