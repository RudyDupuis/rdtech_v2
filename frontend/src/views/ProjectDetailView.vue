<script setup lang="ts">
import SkillComp from '@/components/contents/SkillComp.vue'
import { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import { ExperienceApi } from '@/helpers/api/ExperienceApi'
import { formatExperienceDate } from '@/helpers/formatting'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const projectId = route.params.id.toString()
const backUrl = import.meta.env.VITE_BACKEND_URL

const experienceApi = new ExperienceApi()

const project = ref<GetProjectExperience | undefined>(undefined)
const carouselIndex = ref<number>(0)
const carouselUrls = ref<Array<string | undefined>>([])

function handleCarousel(direction: 'right' | 'left') {
  if (direction === 'right' && carouselIndex.value < carouselUrls.value.length - 1) {
    carouselIndex.value += 1
  }
  if (direction === 'left' && carouselIndex.value > 0) carouselIndex.value -= 1
}

onMounted(async () => {
  project.value = await experienceApi.getProjectExperienceById(projectId)

  const thumbnailUrl = project.value.thumbnail_path ? [backUrl + project.value.thumbnail_path] : []
  const imageUrls = project.value.images_path
    ? project.value.images_path.map((path) => backUrl + path)
    : []
  carouselUrls.value = [...thumbnailUrl, ...imageUrls]
})
</script>

<template>
  <main v-if="project !== undefined">
    <section class="f a-cent j-even mb2">
      <div class="title f-col a-start">
        <h1>{{ project.title }}</h1>
        <p class="text-medium larger-text">
          {{ formatExperienceDate(project.start_date, project.end_date) }}
        </p>
      </div>
      <div class="carousel f a-cent j-cent" v-if="carouselUrls.length != 0">
        <p
          v-if="carouselUrls.length > 1"
          :class="{ 'carousel-btn--disabled': carouselIndex === 0 }"
          class="carousel-btn"
          @click="handleCarousel('left')"
        >
          《
        </p>
        <img
          :src="carouselUrls[carouselIndex]"
          :alt="'Image n°' + carouselIndex + ' du projet ' + project.title"
          class="primary-border mb1"
        />
        <p
          v-if="carouselUrls.length > 1"
          :class="{ 'carousel-btn--disabled': carouselIndex === carouselUrls.length - 1 }"
          class="carousel-btn"
          @click="handleCarousel('right')"
        >
          》
        </p>
      </div>
    </section>

    <section class="bg-grey-3 f a-cent j-even ptb2 mb3">
      <pre class="long-desc prl2">{{ project.long_desc }}</pre>
      <div>
        <h3 class="mb2">Technologie utilisées :</h3>
        <div class="small-skill-list prl2">
          <SkillComp
            v-for="hardSkill in project.hard_skills"
            :key="hardSkill.id"
            :skill="hardSkill"
            size="small"
            color="secondary"
          />
        </div>
      </div>
    </section>

    <section class="f a-cent j-even mb4">
      <a
        v-if="project.project_link !== null"
        :href="project.project_link"
        target="_blank"
        class="button"
      >
        Découvrir le projet
      </a>
      <a v-if="project.code_link !== null" :href="project.code_link" target="_blank" class="button">
        Voir le code
      </a>
      <a v-if="project.doc_link !== null" :href="project.doc_link" target="_blank" class="button">
        Lire la documentation
      </a>
    </section>
  </main>
</template>

<style scoped lang="scss">
img {
  width: 600px;
  height: auto;

  @media (max-width: 1300px) {
    width: 500px;
  }
  @media (max-width: 700px) {
    width: 400px;
  }
  @media (max-width: 520px) {
    width: 300px;
  }
  @media (max-width: 400px) {
    width: 280px;
  }
}
.long-desc {
  max-width: 600px;
  white-space: pre-wrap;
  text-align: justify;
}
.small-skill-list {
  width: 600px;
  @media (max-width: 1300px) {
    width: 500px;
  }
}
.carousel {
  max-width: 100vw;
  overflow: hidden;
}

@media (max-width: 1050px) {
  section {
    .title {
      margin-bottom: 64px;
      align-items: center;
    }

    .long-desc {
      margin-bottom: 64px;
      max-width: 100%;
    }

    .small-skill-list {
      width: 80vw;
    }

    flex-direction: column;
  }

  .button {
    width: 80%;
    margin-bottom: 32px;
  }
}
</style>
