<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComp from '@/components/FooterComp.vue'
import HeaderComp from '@/components/HeaderComp.vue'
</script>

<template>
  <header-comp />
  <RouterView />
  <footer-comp />
</template>
