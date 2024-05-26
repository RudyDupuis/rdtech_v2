<script setup lang="ts">
import { RouterView } from 'vue-router'
import FooterComp from '@/components/layout/FooterComp.vue'
import HeaderComp from '@/components/layout/HeaderComp.vue'
</script>

<template>
  <header-comp />
  <RouterView />
  <footer-comp />
</template>
