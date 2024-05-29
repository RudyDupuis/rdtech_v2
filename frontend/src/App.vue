<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComp from '@/components/layouts/FooterComp.vue'
import HeaderComp from '@/components/layouts/HeaderComp.vue'
</script>

<template>
  <header-comp />
  <RouterView />
  <footer-comp />
</template>
