<script setup lang="ts">
import { PostJobExperience, PutJobExperience } from '@/entities/experiences/JobExperience'
import {
  PostProjectExperience,
  PutProjectExperience
} from '@/entities/experiences/ProjectExperience'
import {
  PostTrainingExperience,
  PutTrainingExperience
} from '@/entities/experiences/TrainingExperience'
import type { GetHardSkill } from '@/entities/skills/HardSkill'
import { ApiMethods } from '@/helpers/api/ApiMethods'
import { SkillApi } from '@/helpers/api/SkillApi'
import { JobExperienceMapper } from '@/helpers/mappers/experiences/JobExperienceMapper'
import { ProjectExperienceMapper } from '@/helpers/mappers/experiences/ProjectExperienceMapper'
import { TrainingExperienceMapper } from '@/helpers/mappers/experiences/TrainingExperienceMapper'
import { computed, onMounted, ref, watch } from 'vue'

interface Props {
  getExperiences: () => void
  experience?: PutJobExperience | PutTrainingExperience | PutProjectExperience
}
const props = defineProps<Props>()

const api = new ApiMethods()
const projectExperienceMapper = new ProjectExperienceMapper()
const jobExperienceMapper = new JobExperienceMapper()
const trainningExperienceMapper = new TrainingExperienceMapper()

const skillApi = new SkillApi()
const hardSkills = ref<Array<GetHardSkill>>([])

const backUrl = import.meta.env.VITE_BACKEND_URL
const thumbnailInput = ref<HTMLInputElement | null>(null)
const thumbnailUrl = computed<string>(() => {
  return isPutExperience(editingExperience.value)
    ? backUrl + editingExperience.value.thumbnail_path
    : ''
})
const imagesInput = ref<HTMLInputElement | null>(null)
const imagesUrl = computed<Array<string>>(() => {
  let urls: Array<string> = []
  if (isPutExperience(editingExperience.value) && isProjectExperience(editingExperience.value)) {
    editingExperience.value.images_path?.forEach((path) => urls.push(backUrl + path))
  }
  return urls
})

const selectedtype = ref<'projectExperience' | 'jobExperience' | 'trainingExperience'>(
  'projectExperience'
)
const editingExperience = ref<
  | PutJobExperience
  | PutTrainingExperience
  | PutProjectExperience
  | PostJobExperience
  | PostTrainingExperience
  | PostProjectExperience
>(projectExperienceMapper.emptyPostProjectExperience())

const experienceType = computed<
  'project-experiences' | 'job-experiences' | 'training-experiences' | undefined
>(() => {
  if (isProjectExperience(editingExperience.value)) {
    return 'project-experiences'
  }
  if (isJobExperience(editingExperience.value)) {
    return 'job-experiences'
  }
  if (isTrainingExperience(editingExperience.value)) {
    return 'training-experiences'
  }
  return undefined
})

function isPostExperience(
  experience: typeof editingExperience.value
): experience is PostJobExperience | PostTrainingExperience | PostProjectExperience {
  return (
    experience instanceof PostJobExperience ||
    experience instanceof PostTrainingExperience ||
    experience instanceof PostProjectExperience
  )
}
function isPutExperience(
  experience: typeof editingExperience.value
): experience is PutJobExperience | PutTrainingExperience | PutProjectExperience {
  return (
    experience instanceof PutJobExperience ||
    experience instanceof PutTrainingExperience ||
    experience instanceof PutProjectExperience
  )
}
function isProjectExperience(
  experience: typeof editingExperience.value
): experience is PostProjectExperience | PutProjectExperience {
  return experience instanceof PostProjectExperience || experience instanceof PutProjectExperience
}
function isJobExperience(
  experience: typeof editingExperience.value
): experience is PostJobExperience | PutJobExperience {
  return experience instanceof PostJobExperience || experience instanceof PutJobExperience
}
function isTrainingExperience(
  experience: typeof editingExperience.value
): experience is PostTrainingExperience | PutTrainingExperience {
  return experience instanceof PostTrainingExperience || experience instanceof PutTrainingExperience
}

function resetForm() {
  switch (selectedtype.value) {
    case 'projectExperience':
      editingExperience.value = projectExperienceMapper.emptyPostProjectExperience()
      break
    case 'jobExperience':
      editingExperience.value = jobExperienceMapper.emptyPostJobExperience()
      break
    case 'trainingExperience':
      editingExperience.value = trainningExperienceMapper.emptyPostTrainingExperience()
      break
    default:
      editingExperience.value = projectExperienceMapper.emptyPostProjectExperience()
  }
  if (thumbnailInput.value) {
    thumbnailInput.value.value = ''
  }
  if (imagesInput.value) {
    imagesInput.value.value = ''
  }
}

const computedStartDateGetStringSetDate = computed({
  get: () => editingExperience.value.start_date.toISOString().split('T')[0],
  set: (value: string) => {
    editingExperience.value.start_date = new Date(value)
  }
})

const computedEndDateGetStringSetDate = computed({
  get: () =>
    editingExperience.value.end_date !== null
      ? editingExperience.value.end_date.toISOString().split('T')[0]
      : '',
  set: (value: string) => {
    editingExperience.value.end_date = value !== '' ? new Date(value) : null
  }
})

async function handleSubmit() {
  try {
    if (experienceType.value) {
      if (isPostExperience(editingExperience.value)) {
        await api.postData(experienceType.value, editingExperience.value)
      }
      if (isPutExperience(editingExperience.value)) {
        await api.putData(
          experienceType.value + '/' + editingExperience.value.id,
          editingExperience.value
        )
      }
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function handleThumbnailUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    editingExperience.value.thumbnail = file
  }
}

function handleImagesUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files
  if (files && isProjectExperience(editingExperience.value)) {
    editingExperience.value.images = Array.from(files)
  }
}

async function handleDelete() {
  try {
    if (isPutExperience(editingExperience.value)) {
      await api.deleteData(experienceType.value + '/' + editingExperience.value.id)
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

async function handleRemoveImage(imagePath: string) {
  try {
    if (isPutExperience(editingExperience.value)) {
      await api.postData(experienceType.value + '/remove-image/' + editingExperience.value.id, {
        image_path: imagePath
      })
      resetForm()
      props.getExperiences()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

watch(selectedtype, () => {
  editingExperience.value = (() => {
    switch (selectedtype.value) {
      case 'projectExperience':
        return projectExperienceMapper.emptyPostProjectExperience()
      case 'jobExperience':
        return jobExperienceMapper.emptyPostJobExperience()
      case 'trainingExperience':
        return trainningExperienceMapper.emptyPostTrainingExperience()
    }
  })()
})
watch(
  () => props.experience,
  () => {
    if (props.experience) {
      editingExperience.value = props.experience
    }
  }
)

onMounted(async () => {
  hardSkills.value = await skillApi.getAllHardSkills()
})
</script>

<template>
  <div class="f-col a-cent">
    <h3 class="mb2">
      {{ (isPostExperience(editingExperience) ? 'Créer' : 'Modifier ') + ' une expérience' }}
    </h3>

    <label v-if="isPostExperience(editingExperience)" for="type" class="text-a-cent">Type</label>
    <select id="type" v-if="isPostExperience(editingExperience)" v-model="selectedtype">
      <option value="projectExperience">Projets</option>
      <option value="jobExperience">Emplois</option>
      <option value="trainingExperience">Formations</option>
    </select>

    <div
      v-if="isPutExperience(editingExperience) && editingExperience.thumbnail_path !== null"
      class="remove-img mb1"
      @dblclick="handleRemoveImage(editingExperience.thumbnail_path)"
    >
      <p class="text-a-cent larger-text">Miniature</p>
      <img
        :src="thumbnailUrl"
        :alt="'Miniature de ' + editingExperience.title"
        style="width: 300px; height: auto"
        class="mb1"
      />
      <p class="text-error text-a-cent">Double cliquer pour supprimer l'image</p>
    </div>

    <div v-if="isPutExperience(editingExperience) && imagesUrl.length > 0" class="remove-img mb1">
      <p class="text-a-cent larger-text">Images</p>
      <div
        v-for="(url, index) in imagesUrl"
        :key="index"
        @dblclick="handleRemoveImage(url.replace(backUrl, ''))"
      >
        <img
          :src="url"
          :alt="'Image de ' + editingExperience.title"
          style="width: 300px; height: auto"
          class="mb1"
        />
        <p class="text-error text-a-cent">Double cliquer pour supprimer l'image</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="mb1">
      <input v-model="editingExperience.title" type="text" placeholder="Titre *" required />
      <label for="start_date" class="text-a-cent">Date de début *</label>
      <input id="start_date" v-model="computedStartDateGetStringSetDate" type="date" required />
      <label for="end_date" class="text-a-cent">Date de fin</label>
      <input id="end_date" v-model="computedEndDateGetStringSetDate" type="date" />
      <textarea
        v-model="editingExperience.short_desc"
        placeholder="Description courte *"
        required
      ></textarea>
      <label for="thumbnail" class="text-a-cent">Miniature | PNG - 1000px par 500px</label>
      <input
        ref="thumbnailInput"
        type="file"
        id="thumbnail"
        accept=".png"
        @change="handleThumbnailUpload"
      />
      <textarea
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.long_desc"
        placeholder="Description longue *"
        rows="5"
        required
      ></textarea>
      <label v-if="isProjectExperience(editingExperience)" for="hardskills" class="text-a-cent">
        Hard skills liés *
      </label>
      <select
        id="hardskills"
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.hard_skill_ids"
        multiple
        required
      >
        <option v-for="(hardskill, index) in hardSkills" :key="index" :value="hardskill.id">
          {{ hardskill.name }}
        </option>
      </select>
      <label v-if="isProjectExperience(editingExperience)" for="images" class="text-a-cent"
        >Images | PNG - 1000px par 500px</label
      >
      <input
        v-if="isProjectExperience(editingExperience)"
        ref="imagesInput"
        type="file"
        id="images"
        accept=".png"
        multiple
        @change="handleImagesUpload"
      />
      <input
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.project_link"
        type="text"
        placeholder="Lien du projet"
      />
      <input
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.code_link"
        type="text"
        placeholder="Lien du dépot de code"
      />
      <input
        v-if="isProjectExperience(editingExperience)"
        v-model="editingExperience.doc_link"
        type="text"
        placeholder="Lien de la documentation"
      />
      <div v-if="isProjectExperience(editingExperience)" class="f a-cent j-betw mb2">
        <input v-model="editingExperience.is_favorite" id="favorite" type="checkbox" />
        <label for="favorite" class="text-a-cent ml2">Ajouter aux favories</label>
      </div>

      <div class="list-button f a-cent">
        <button
          v-if="isPutExperience(editingExperience)"
          type="button"
          class="bg-grey-1"
          @click="resetForm()"
        >
          Annuler
        </button>
        <button type="submit" :class="{ ml2: isPutExperience(editingExperience) }">
          {{ isPostExperience(editingExperience) ? 'Créer' : 'Modifier ' }}
        </button>
      </div>
    </form>
    <button
      v-if="isPutExperience(editingExperience)"
      type="button"
      class="bg-warning mb3"
      @dblclick="handleDelete()"
    >
      Double cliquer pour supprimer
    </button>
  </div>
</template>

<style scoped lang="scss">
.list-button {
  @media (max-width: 500px) {
    flex-direction: column;

    button {
      margin-left: 0;
      margin-top: 16px;
    }
  }
}

.remove-img {
  cursor: pointer;
}
</style>
