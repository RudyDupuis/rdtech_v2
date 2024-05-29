<script setup lang="ts">
import { PostHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'
import { PostSoftSkill, PutSoftSkill } from '@/entities/skills/SoftSkill'
import { ApiMethods } from '@/helpers/ApiMethods'
import { computed, ref, watch } from 'vue'

interface Props {
  getSkills: () => void
  skill?: PutSoftSkill | PutHardSkill
}
const props = defineProps<Props>()
const api = new ApiMethods()

const selectedtype = ref<'softSkill' | 'hardSkill'>('hardSkill')
const editingSkill = ref<PostSoftSkill | PostHardSkill | PutSoftSkill | PutHardSkill>(
  new PostHardSkill('', null, 'beginner')
)
const imageUrl = ref<string>('')

const isPostMode = computed(
  () => editingSkill.value instanceof PostSoftSkill || editingSkill.value instanceof PostHardSkill
)
const skillType = computed<'hard-skills' | 'soft-skills' | undefined>(() => {
  if (editingSkill.value instanceof PostSoftSkill || editingSkill.value instanceof PutSoftSkill) {
    return 'soft-skills'
  }
  if (editingSkill.value instanceof PostHardSkill || editingSkill.value instanceof PutHardSkill) {
    return 'hard-skills'
  }
  return undefined
})

function resetForm() {
  editingSkill.value = new PostHardSkill('', null, 'beginner')
  selectedtype.value = 'hardSkill'
}

async function handleSubmit() {
  try {
    if (skillType.value) {
      if (isPostMode.value) {
        await api.postData(skillType.value, editingSkill.value)
      } else if (
        editingSkill.value instanceof PutHardSkill ||
        editingSkill.value instanceof PutSoftSkill
      ) {
        await api.putData(skillType.value + '/' + editingSkill.value.id, editingSkill.value)
      }
      resetForm()
      props.getSkills()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

function handleFileUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    editingSkill.value.svg = file
  }
}

async function handleDelete() {
  try {
    if (editingSkill.value instanceof PutHardSkill || editingSkill.value instanceof PutSoftSkill) {
      await api.deleteData(skillType.value + '/' + editingSkill.value.id)
      resetForm()
      props.getSkills()
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

watch(selectedtype, () => {
  editingSkill.value =
    selectedtype.value === 'softSkill'
      ? new PostSoftSkill('', null)
      : new PostHardSkill('', null, 'beginner')
})
watch(
  () => props.skill,
  () => {
    if (props.skill) {
      editingSkill.value = props.skill
    }
    if (editingSkill.value instanceof PutSoftSkill || editingSkill.value instanceof PutHardSkill) {
      imageUrl.value = import.meta.env.VITE_BACKEND_URL + editingSkill.value.svg_path
    }
  }
)
</script>

<template>
  <div class="f-col a-cent">
    <h3 class="mb2">
      {{ (isPostMode ? 'Créer' : 'Modifier ') + ' une compétence' }}
    </h3>

    <select v-if="isPostMode" v-model="selectedtype" placeholder="Type">
      <option value="softSkill">Soft Skill</option>
      <option value="hardSkill">Hard Skill</option>
    </select>

    <img v-if="!isPostMode" :src="imageUrl" alt="'Logo de ' + editingSkill.name" />

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="mb1">
      <input v-model="editingSkill.name" type="text" placeholder="Nom" required />

      <select
        v-if="editingSkill instanceof PostHardSkill || editingSkill instanceof PutHardSkill"
        v-model="editingSkill.mastery"
        placeholder="Maîtrise"
        required
      >
        <option value="advanced">Avancé</option>
        <option value="intermediate">Intermédiaire</option>
        <option value="beginner">Débutant</option>
      </select>

      <label for="svg_path">SVG | 80px par 80px | Ex nommage: 'Vue-js.svg'</label>
      <input
        type="file"
        id="svg_path"
        accept=".svg"
        @change="handleFileUpload"
        :required="isPostMode"
      />

      <div class="f a-cent">
        <button v-if="!isPostMode" type="button" class="bg-secondary" @click="resetForm()">
          Annuler
        </button>
        <button type="submit" :class="{ ml2: !isPostMode }">
          {{ isPostMode ? 'Créer' : 'Modifier ' }}
        </button>
      </div>
    </form>
    <button v-if="!isPostMode" type="button" class="bg-warning mb3" @dblclick="handleDelete()">
      Double cliquer pour supprimer
    </button>
  </div>
</template>
