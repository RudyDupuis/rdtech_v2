import { GetExperience, PostExperience, PutExperience } from './Experience'

export class PostTrainingExperience extends PostExperience {
  constructor(
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail: File | null
  ) {
    super(title, start_date, end_date, short_desc, thumbnail)
  }
}

export class PutTrainingExperience extends PutExperience {
  constructor(
    id: string,
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail: File | null,
    thumbnail_path: string | null
  ) {
    super(id, title, start_date, end_date, short_desc, thumbnail, thumbnail_path)
  }
}

export class GetTrainingExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail_path: string | null
  ) {
    super(id, title, start_date, end_date, short_desc, thumbnail_path)
  }
}
