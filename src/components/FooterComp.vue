<script setup lang="ts">
import LinkedinLogoSvg from '@/components/svg/logo/linkedinLogoSvg.vue'
import GithubLogoSvg from '@/components/svg/logo/githubLogoSvg.vue'
</script>

<template>
  <footer class="f a-cent j-betw bg-primary prl4 ptb2">
    <div>
      <a href="https://www.linkedin.com/in/rudy-dupuis/" target="_blank" class="svg-link">
        <linkedin-logo-svg />
      </a>
      <a href="https://github.com/RudyDupuis" target="_blank" class="svg-link ml2">
        <github-logo-svg />
      </a>
    </div>
    <p>Copyright © {{ new Date().getFullYear() }} Rudy Dupuis</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  @media (max-width: 650px) {
    flex-direction: column;
    padding: 32px 0;

    p {
      margin-top: 32px;
    }
  }
}
</style>
