import {
  GetTrainingExperience,
  PostTrainingExperience,
  PutTrainingExperience
} from '@/entities/experiences/TrainingExperience'

export interface TrainingExperienceJson {
  id: string
  title: string
  start_date: string
  end_date: string
  short_desc: string
  thumbnail_path: string
}

export class TrainingExperienceMapper {
  jsonToGetTrainingExperience(trainingExperienceJson: TrainingExperienceJson) {
    return new GetTrainingExperience(
      trainingExperienceJson.id,
      trainingExperienceJson.title,
      new Date(trainingExperienceJson.start_date),
      trainingExperienceJson.end_date !== null ? new Date(trainingExperienceJson.end_date) : null,
      trainingExperienceJson.short_desc,
      trainingExperienceJson.thumbnail_path
    )
  }

  getTrainingExperienceToPutTrainingExperience(getTrainingExperience: GetTrainingExperience) {
    return new PutTrainingExperience(
      getTrainingExperience.id,
      getTrainingExperience.title,
      getTrainingExperience.start_date,
      getTrainingExperience.end_date,
      getTrainingExperience.short_desc,
      null,
      getTrainingExperience.thumbnail_path
    )
  }

  emptyPostTrainingExperience() {
    return new PostTrainingExperience('', new Date(), null, '', null)
  }
}
