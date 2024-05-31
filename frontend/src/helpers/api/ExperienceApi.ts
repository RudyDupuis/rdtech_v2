import type { GetProjectExperience } from '@/entities/experiences/ProjectExperience'
import { ApiMethods } from './ApiMethods'
import {
  ProjectExperienceMapper,
  type ProjectExperienceJson
} from '../mappers/experiences/ProjectExperienceMapper'
import type { GetJobExperience } from '@/entities/experiences/JobExperience'
import {
  JobExperienceMapper,
  type JobExperienceJson
} from '../mappers/experiences/JobExperienceMapper'
import {
  TrainingExperienceMapper,
  type TrainingExperienceJson
} from '../mappers/experiences/TrainingExperienceMapper'
import type { GetTrainingExperience } from '@/entities/experiences/TrainingExperience'

export class ExperienceApi {
  private api = new ApiMethods()
  private projectMapper = new ProjectExperienceMapper()
  private jobMapper = new JobExperienceMapper()
  private trainingMapper = new TrainingExperienceMapper()

  async getAllProjectExperiences(): Promise<Array<GetProjectExperience>> {
    try {
      const rawProjectExperiences = await this.api.getData('project-experiences')
      const projectExperiences = rawProjectExperiences.map((value: ProjectExperienceJson) =>
        this.projectMapper.jsonToGetProjectExperience(value)
      )

      return projectExperiences.sort(
        (a: GetProjectExperience, b: GetProjectExperience) =>
          a.start_date.getTime() - b.start_date.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching project experiences: ${error}`)
    }
  }

  async getAllFavoriteProjectExperiences(): Promise<Array<GetProjectExperience>> {
    try {
      const rawProjectExperiences = await this.api.getData('project-experiences/favorites')
      const projectExperiences = rawProjectExperiences.map((value: ProjectExperienceJson) =>
        this.projectMapper.jsonToGetProjectExperience(value)
      )

      return projectExperiences.sort(
        (a: GetProjectExperience, b: GetProjectExperience) =>
          a.start_date.getTime() - b.start_date.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching project experiences: ${error}`)
    }
  }

  async getAllJobExperiences(): Promise<Array<GetJobExperience>> {
    try {
      const rawJobExperiences = await this.api.getData('job-experiences')
      const jobExperiences = rawJobExperiences.map((value: JobExperienceJson) =>
        this.jobMapper.jsonToGetJobExperience(value)
      )

      return jobExperiences.sort(
        (a: GetJobExperience, b: GetJobExperience) =>
          a.start_date.getTime() - b.start_date.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching job experiences: ${error}`)
    }
  }

  async getAllTrainingExperiences(): Promise<Array<GetTrainingExperience>> {
    try {
      const rawTrainingExperiences = await this.api.getData('training-experiences')
      const trainingExperiences = rawTrainingExperiences.map((value: TrainingExperienceJson) =>
        this.trainingMapper.jsonToGetTrainingExperience(value)
      )

      return trainingExperiences.sort(
        (a: GetTrainingExperience, b: GetTrainingExperience) =>
          a.start_date.getTime() - b.start_date.getTime()
      )
    } catch (error) {
      throw new Error(`Error fetching training experiences: ${error}`)
    }
  }
}
