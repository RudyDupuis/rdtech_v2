import {
  GetJobExperience,
  PostJobExperience,
  PutJobExperience
} from '@/entities/experiences/JobExperience'

export interface JobExperienceJson {
  id: string
  title: string
  start_date: string
  end_date: string
  short_desc: string
  thumbnail_path: string
}

export class JobExperienceMapper {
  jsonToGetJobExperience(jobExperienceJson: JobExperienceJson) {
    return new GetJobExperience(
      jobExperienceJson.id,
      jobExperienceJson.title,
      new Date(jobExperienceJson.start_date),
      jobExperienceJson.end_date !== null ? new Date(jobExperienceJson.end_date) : null,
      jobExperienceJson.short_desc,
      jobExperienceJson.thumbnail_path
    )
  }

  getJobExperienceToPutJobExperience(getJobExperience: GetJobExperience) {
    return new PutJobExperience(
      getJobExperience.id,
      getJobExperience.title,
      getJobExperience.start_date,
      getJobExperience.end_date,
      getJobExperience.short_desc,
      null,
      getJobExperience.thumbnail_path
    )
  }

  emptyPostJobExperience() {
    return new PostJobExperience('', new Date(), null, '', null)
  }
}
