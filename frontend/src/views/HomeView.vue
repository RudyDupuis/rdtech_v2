<script setup lang="ts">
import ToolsboxAnimComp from '@/components/animations/ToolsboxAnimComp.vue'
import SkillComp from '@/components/contents/SkillComp.vue'
import type { GetHardSkill } from '@/entities/skills/HardSkill'
import type { GetSoftSkill } from '@/entities/skills/SoftSkill'
import { SkillApi } from '@/helpers/api/SkillApi'
import useIsSmallScreen from '@/helpers/useIsSmallScreen'
import { computed, onMounted, ref } from 'vue'

const isSmallScreen = useIsSmallScreen()

const skillApi = new SkillApi()
const softSkills = ref<Array<GetSoftSkill>>([])
const hardSkills = ref<Array<GetHardSkill>>([])
const hardSkillsFilter = ref<GetHardSkill['mastery'] | null>(null)
const filteredHardSkills = computed<Array<GetHardSkill>>(() => {
  if (hardSkillsFilter.value === null) {
    return hardSkills.value
  }
  return hardSkills.value.filter((skill) => skill.mastery === hardSkillsFilter.value)
})

function toggleFilter(filter: GetHardSkill['mastery']) {
  hardSkillsFilter.value = hardSkillsFilter.value === filter ? null : filter
}

onMounted(async () => {
  softSkills.value = await skillApi.getAllSoftSkills()
  hardSkills.value = await skillApi.getAllHardSkills()
})
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
        <router-link to="" class="button">Me contacter</router-link>
      </div>
    </section>

    <section id="skills" class="f-col a-cent bg-grey-3 ptb3 mb4">
      <h2 class="mb3">Mes compétences</h2>
      <div class="prl2">
        <h3 class="mb2">Hard skills</h3>
        <div class="button-list f a-cent j-betw mb2">
          <button
            class="choice-button"
            :class="{ 'choice-button--active': hardSkillsFilter === 'advanced' }"
            @click="toggleFilter('advanced')"
          >
            Avancé
          </button>
          <button
            class="choice-button ml1"
            :class="{ 'choice-button--active': hardSkillsFilter === 'intermediate' }"
            @click="toggleFilter('intermediate')"
          >
            Intermédiaire
          </button>
          <button
            class="choice-button ml1"
            :class="{ 'choice-button--active': hardSkillsFilter === 'beginner' }"
            @click="toggleFilter('beginner')"
          >
            Débutant
          </button>
        </div>

        <div class="skill-list mb3">
          <skill-comp
            v-for="(skill, index) in filteredHardSkills"
            :key="index"
            :skill="skill"
            :color="skill.mastery === 'advanced' ? 'primary' : 'secondary'"
            size="medium"
          />
        </div>
        <h3 class="mb3">Soft skills</h3>
        <div class="skill-list">
          <skill-comp
            v-for="(skill, index) in softSkills"
            :key="index"
            :skill="skill"
            color="secondary"
            size="medium"
          />
        </div>
      </div>
    </section>

    <section id="favorite-projects">
      <h2 class="mb3">Mes projets favoris</h2>
      <router-link to="" class="button">Voir mon parcours</router-link>
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

#skills {
  h3 {
    text-align: left;
  }

  .skill-list {
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;

    @media (max-width: 1000px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 800px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media (max-width: 600px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 400px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .button-list {
    @media (max-width: 800px) {
      flex-direction: column;
      button {
        margin-left: 0;
        margin-bottom: 16px;
        width: 300px;
      }
    }
    @media (max-width: 400px) {
      button {
        width: 80vw;
      }
    }
  }
}
</style>
