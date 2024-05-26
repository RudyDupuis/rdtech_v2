<script setup lang="ts">
import ToolsboxAnimComp from '@/components/animation/ToolsboxAnimComp.vue'
import SkillComp from '@/components/content/SkillComp.vue'
import { GetSkill } from '@/entities/Skill'
import { ApiMethods } from '@/helpers/ApiMethods'
import useIsSmallScreen from '@/helpers/useIsSmallScreen'
import { ref } from 'vue'

const isSmallScreen = useIsSmallScreen()

const api = new ApiMethods()
const skills = ref<Array<GetSkill>>([])
api.getData('skills').then((returnedValue) => (skills.value = returnedValue))
</script>

<template>
  <main>
    <section id="hero-banner" class="f a-cent j-even">
      <div class="f-col a-cent j-around">
        <h1 class="mb2">Rudy Dupuis</h1>
        <p class="larger-text mb2">Développeur Web et Web mobile</p>
        <toolsbox-anim-comp v-if="isSmallScreen" />
        <a href="#presentation" class="button">Découvrir mon profil</a>
      </div>
      <toolsbox-anim-comp v-if="!isSmallScreen" />
    </section>

    <section id="presentation" class="f a-cent j-even ptb4">
      <img
        v-if="!isSmallScreen"
        src="/images/rudy-picture.svg"
        alt="Une photo de rudy dupuis"
        class="mb2"
      />
      <div class="f-col a-cent">
        <h2 class="mb3">Qui suis je ?</h2>
        <img
          v-if="isSmallScreen"
          src="/images/rudy-picture.svg"
          alt="Une photo de rudy dupuis"
          class="mb3"
        />
        <p class="mb3">
          Passionné par le bricolage et le numérique, j&apos;ai fusionné ces deux univers dans la
          conception de ce site. Tout comme le bricolage nécessite l&apos;utilisation d&apos;outils,
          je donne vie à des concepts numériques à l&apos;aide des langages de programmation et des
          logiciels.
          <br />
          <br />
          Je suis <strong>développeur Web</strong> avec une appétence pour l&apos;
          <strong>UX design</strong>, impliqué dans toutes les étapes du processus, de la
          <strong>recherche utilisateur</strong> à la
          <strong>conception graphique</strong> jusqu&apos;au <strong>développement</strong>.
          <br />
          <br />
          Contactez moi pour discuter de vos besoins en développement web et UX design. Ensemble,
          nous réaliserons votre projet numérique.
        </p>
        <router-link to="/me-contacter" class="button">Me contacter</router-link>
      </div>
    </section>

    <section id="skills">
      <h2>Mes compétences</h2>

      <h3>Hard skills</h3>
      <skill-comp v-for="(skill, index) in skills" :key="index" :skill="skill" />
      <h3>Soft skills</h3>
    </section>
  </main>
</template>

<style scoped lang="scss">
#hero-banner {
  height: calc(100dvh - 96px);
}

#presentation {
  p {
    width: 40vw;
    text-align: justify;
  }

  @media (max-width: 1100px) {
    img {
      margin-top: 64px;
      width: 273px;
      height: 272px;
    }

    p {
      width: 60vw;
    }
  }

  @media (max-width: 500px) {
    img {
      width: 212px;
      height: 211px;
    }

    p {
      width: 80vw;
    }
  }
}
</style>
