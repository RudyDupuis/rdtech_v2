<script setup lang="ts">
import ToolsboxFullSvg from '@/components/svgs/toolsbox/toolsboxFullSvg.vue'
</script>

<template>
  <main class="f-col a-cent j-cent">
    <h1 class="mb4">Page introuvable</h1>
    <p class="larger-text text-a-cent mb1 prl2">Désolé cette page n'existe pas ...</p>
    <RouterLink :to="{ name: 'home' }" class="button mb4">Revenir à l'acceuil ?</RouterLink>
    <ToolsboxFullSvg class="mb4" />
  </main>
</template>
