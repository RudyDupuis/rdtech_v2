<script setup lang="ts">
import { PostHardSkill, PutHardSkill } from '@/entities/skills/HardSkill'
import { PostSoftSkill, PutSoftSkill } from '@/entities/skills/SoftSkill'
import { ApiMethods } from '@/helpers/api/ApiMethods'
import { HardSkillMapper } from '@/helpers/mappers/skills/HardSkillMapper'
import { SoftSkillMapper } from '@/helpers/mappers/skills/SoftSkillMapper'
import { computed, ref, watch } from 'vue'

interface Props {
  getSkills: () => void
  skill?: PutSoftSkill | PutHardSkill
}
const props = defineProps<Props>()
const api = new ApiMethods()
const hardSkillMapper = new HardSkillMapper()
const softSkillMapper = new SoftSkillMapper()

const fileInput = ref<HTMLInputElement | null>(null)

const selectedtype = ref<'softSkill' | 'hardSkill'>('hardSkill')
const editingSkill = ref<PostSoftSkill | PostHardSkill | PutSoftSkill | PutHardSkill>(
  hardSkillMapper.emptyPostHardSkill()
)
const imageUrl = computed<string>(() => {
  return isPutSkill(editingSkill.value)
    ? import.meta.env.VITE_BACKEND_URL + editingSkill.value.svg_path
    : ''
})

const skillType = computed<'hard-skills' | 'soft-skills' | undefined>(() => {
  if (isSoftSkill(editingSkill.value)) {
    return 'soft-skills'
  }
  if (isHardSkill(editingSkill.value)) {
    return 'hard-skills'
  }
  return undefined
})

function isPostSkill(skill: typeof editingSkill.value): skill is PostHardSkill | PostSoftSkill {
  return skill instanceof PostHardSkill || skill instanceof PostSoftSkill
}
function isPutSkill(skill: typeof editingSkill.value): skill is PutHardSkill | PutSoftSkill {
  return skill instanceof PutHardSkill || skill instanceof PutSoftSkill
}
function isHardSkill(skill: typeof editingSkill.value): skill is PostHardSkill | PutHardSkill {
  return skill instanceof PostHardSkill || skill instanceof PutHardSkill
}
function isSoftSkill(skill: typeof editingSkill.value): skill is PostSoftSkill | PutSoftSkill {
  return skill instanceof PostSoftSkill || skill instanceof PutSoftSkill
}

function resetForm() {
  switch (selectedtype.value) {
    case 'softSkill':
      editingSkill.value = softSkillMapper.emptyPostSoftSkill()
      break
    case 'hardSkill':
      editingSkill.value = hardSkillMapper.emptyPostHardSkill()
      break
    default:
      editingSkill.value = hardSkillMapper.emptyPostHardSkill()
  }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

async function handleSubmit() {
  try {
    if (skillType.value) {
      if (isPostSkill(editingSkill.value)) {
        await api.postData(skillType.value, editingSkill.value)
      }
      if (isPutSkill(editingSkill.value)) {
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
    if (isPutSkill(editingSkill.value)) {
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
      ? softSkillMapper.emptyPostSoftSkill()
      : hardSkillMapper.emptyPostHardSkill()
})
watch(
  () => props.skill,
  () => {
    if (props.skill) {
      editingSkill.value = props.skill
    }
  }
)
</script>

<template>
  <div class="f-col a-cent">
    <h3 class="mb2">
      {{ (isPostSkill(editingSkill) ? 'Créer' : 'Modifier ') + ' une compétence' }}
    </h3>

    <label for="type" class="text-a-cent">Type</label>
    <select id="type" v-if="isPostSkill(editingSkill)" v-model="selectedtype">
      <option value="softSkill">Soft Skill</option>
      <option value="hardSkill">Hard Skill</option>
    </select>

    <img v-if="isPutSkill(editingSkill)" :src="imageUrl" :alt="'Logo de ' + editingSkill.name" />

    <form @submit.prevent="handleSubmit" enctype="multipart/form-data" class="mb1">
      <input v-model="editingSkill.name" type="text" placeholder="Nom *" required />

      <select
        v-if="isHardSkill(editingSkill)"
        v-model="editingSkill.mastery"
        placeholder="Maîtrise"
        required
      >
        <option value="advanced">Avancé</option>
        <option value="intermediate">Intermédiaire</option>
        <option value="beginner">Débutant</option>
      </select>

      <label for="svg" class="text-a-cent">SVG - 80px par 80px *</label>
      <input
        ref="fileInput"
        type="file"
        id="svg"
        accept=".svg"
        @change="handleFileUpload"
        :required="isPostSkill(editingSkill)"
      />

      <div class="list-button f a-cent">
        <button
          v-if="isPutSkill(editingSkill)"
          type="button"
          class="bg-grey-1"
          @click="resetForm()"
        >
          Annuler
        </button>
        <button type="submit" :class="{ ml2: isPutSkill(editingSkill) }">
          {{ isPostSkill(editingSkill) ? 'Créer' : 'Modifier ' }}
        </button>
      </div>
    </form>
    <button
      v-if="isPutSkill(editingSkill)"
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
