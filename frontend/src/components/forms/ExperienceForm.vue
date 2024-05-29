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
import { ApiMethods } from '@/helpers/ApiMethods'
import { computed, ref, watch } from 'vue'

interface Props {
  getExperiences: () => void
  experience?: PutJobExperience | PutTrainingExperience | PutProjectExperience
}
const props = defineProps<Props>()
const api = new ApiMethods()

const thumbnailInput = ref<HTMLInputElement | null>(null)
const thumbnailUrl = computed<string>(() => {
  return isPutExperience(editingExperience.value)
    ? import.meta.env.VITE_BACKEND_URL + editingExperience.value.thumbnail_path
    : ''
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
>(new PostProjectExperience('', new Date(), null, '', null, '', [], null, null, null, null, false))

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
  editingExperience.value = new PostProjectExperience(
    '',
    new Date(),
    null,
    '',
    null,
    '',
    [],
    null,
    null,
    null,
    null,
    false
  )
  selectedtype.value = 'projectExperience'
  if (thumbnailInput.value) {
    thumbnailInput.value.value = ''
  }
}

const computedStartDateGetStringSetDate = computed({
  get: () => new Date(editingExperience.value.start_date).toISOString().split('T')[0],
  set: (value: string) => {
    editingExperience.value.start_date = new Date(value)
  }
})

const computedEndDateGetStringSetDate = computed({
  get: () =>
    editingExperience.value.end_date
      ? new Date(editingExperience.value.end_date).toISOString().split('T')[0]
      : '',
  set: (value: string) => {
    editingExperience.value.end_date = value ? new Date(value) : null
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

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    editingExperience.value.thumbnail = file
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

watch(selectedtype, () => {
  editingExperience.value = (() => {
    switch (selectedtype.value) {
      case 'projectExperience':
        return new PostProjectExperience(
          '',
          new Date(),
          null,
          '',
          null,
          '',
          [],
          null,
          null,
          null,
          null,
          false
        )
      case 'jobExperience':
        return new PostJobExperience('', new Date(), null, '', null)
      case 'trainingExperience':
        return new PostTrainingExperience('', new Date(), null, '', null)
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
</script>

<template>
  <div class="f-col a-cent">
    <h3 class="mb2">
      {{ (isPostExperience(editingExperience) ? 'Créer' : 'Modifier ') + ' une expérience' }}
    </h3>

    <select v-if="isPostExperience(editingExperience)" v-model="selectedtype" placeholder="Type">
      <option value="projectExperience">Projets</option>
      <option value="jobExperience">Emplois</option>
      <option value="trainingExperience">Formations</option>
    </select>

    <img
      v-if="isPutExperience(editingExperience)"
      :src="thumbnailUrl"
      :alt="'Image de ' + editingExperience.title"
      style="width: 300px; height: auto"
      class="mb1"
    />

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="mb1">
      <input v-model="editingExperience.title" type="text" placeholder="Titre" required />
      <label for="start_date" class="text-a-cent">Date de début</label>
      <input id="start_date" v-model="computedStartDateGetStringSetDate" type="date" required />
      <label for="end_date" class="text-a-cent">Date de fin</label>
      <input id="end_date" v-model="computedEndDateGetStringSetDate" type="date" />
      <textarea
        v-model="editingExperience.short_desc"
        placeholder="Description courte"
        required
      ></textarea>
      <label for="thumbnail" class="text-a-cent">PNG - 1000px par 500px</label>
      <input
        ref="thumbnailInput"
        type="file"
        id="thumbnail"
        accept=".png"
        @change="handleFileUpload"
      />

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
</style>
