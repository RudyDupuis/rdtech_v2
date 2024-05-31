import {
  GetProjectExperience,
  PostProjectExperience,
  PutProjectExperience
} from '@/entities/experiences/ProjectExperience'
import { GetHardSkill } from '@/entities/skills/HardSkill'

export interface ProjectExperienceJson {
  id: string
  title: string
  start_date: string
  end_date: string
  short_desc: string
  thumbnail_path: string
  long_desc: string
  hard_skills: Array<{
    ProjectExperienceHardSkills: JSON
    createdAt: string
    id: string
    mastery: 'advanced' | 'intermediate' | 'beginner'
    name: string
    svg_path: string
    updatedAt: string
  }>
  images_path: Array<string>
  project_link: string
  code_link: string
  doc_link: string
  is_favorite: boolean
}

export class ProjectExperienceMapper {
  jsonToGetProjectExperience(projectExperienceJson: ProjectExperienceJson) {
    return new GetProjectExperience(
      projectExperienceJson.id,
      projectExperienceJson.title,
      new Date(projectExperienceJson.start_date),
      projectExperienceJson.end_date !== null ? new Date(projectExperienceJson.end_date) : null,
      projectExperienceJson.short_desc,
      projectExperienceJson.thumbnail_path,
      projectExperienceJson.long_desc,
      projectExperienceJson.hard_skills.map(
        (hardSkillJson) =>
          new GetHardSkill(
            hardSkillJson.id,
            hardSkillJson.name,
            hardSkillJson.svg_path,
            hardSkillJson.mastery
          )
      ),
      projectExperienceJson.images_path,
      projectExperienceJson.project_link !== 'null' ? projectExperienceJson.project_link : null,
      projectExperienceJson.code_link !== 'null' ? projectExperienceJson.code_link : null,
      projectExperienceJson.doc_link !== 'null' ? projectExperienceJson.doc_link : null,
      projectExperienceJson.is_favorite
    )
  }

  getProjectExperienceToPutProjectExperience(getProjectExperience: GetProjectExperience) {
    return new PutProjectExperience(
      getProjectExperience.id,
      getProjectExperience.title,
      getProjectExperience.start_date,
      getProjectExperience.end_date,
      getProjectExperience.short_desc,
      null,
      getProjectExperience.thumbnail_path,
      getProjectExperience.long_desc,
      getProjectExperience.hard_skills,
      getProjectExperience.hard_skills.map((skill) => skill.id),
      null,
      getProjectExperience.images_path,
      getProjectExperience.project_link,
      getProjectExperience.code_link,
      getProjectExperience.doc_link,
      getProjectExperience.is_favorite
    )
  }

  emptyPostProjectExperience() {
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
  }
}
