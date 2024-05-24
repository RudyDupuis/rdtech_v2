<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router'
import LogoSvg from '@/components/svg/logo/logoSvg.vue'
import useIsSmallScreen from '@/helpers/useIsSmallScreen'

const route = useRoute()
const isSmallScreen = useIsSmallScreen()
</script>

<template>
  <header class="f a-cent j-betw prl4">
    <router-link to="/"><logo-svg /></router-link>
    <nav>
      <ul class="f">
        <li>
          <router-link
            to="/mon-parcours"
            class="text-medium"
            :class="{ isCurrentPage: route.path === '/mon-parcours' }"
          >
            {{ isSmallScreen ? 'Parcours' : 'Mon parcours' }}
          </router-link>
        </li>
        <li class="ml2">
          <router-link
            to="/me-contacter"
            class="text-medium"
            :class="{ isCurrentPage: route.path === '/me-contacter' }"
          >
            {{ isSmallScreen ? 'Contact' : 'Me contacter' }}
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  height: 96px;

  @media (max-width: 850px) {
    padding-right: 64px;
    padding-left: 64px;
  }

  @media (max-width: 380px) {
    padding-right: 40px;
    padding-left: 40px;
  }

  @media (max-width: 330px) {
    padding-right: 30px;
    padding-left: 30px;
  }
}
</style>
