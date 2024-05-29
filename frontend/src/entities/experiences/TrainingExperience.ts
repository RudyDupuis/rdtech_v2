import { GetExperience, PostExperience } from './Experience'

export class PostTrainingExperience extends PostExperience {
  constructor(
    title: string,
    startDate: Date,
    endDate: Date | null,
    shortDesc: string,
    thumbnail: File | null
  ) {
    super(title, startDate, endDate, shortDesc, thumbnail)
  }
}

export class GetTrainingExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    endDate: Date | null,
    shortDesc: string,
    thumbnail_path: string | null
  ) {
    super(id, title, startDate, endDate, shortDesc, thumbnail_path)
  }
}
