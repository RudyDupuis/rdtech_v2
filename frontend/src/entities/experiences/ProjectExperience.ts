import { GetExperience, PostExperience, PutExperience } from './Experience'
import type { GetSkill } from '../skills/Skill'

export class PostProjectExperience extends PostExperience {
  constructor(
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail: File | null,
    public long_desc: string,
    public hard_skills: Array<GetSkill>,
    public images: Array<File> | null,
    public project_link: string | null,
    public code_link: string | null,
    public doc_link: string | null,
    public is_favorite: boolean
  ) {
    super(title, start_date, end_date, short_desc, thumbnail)
  }
}

export class PutProjectExperience extends PutExperience {
  constructor(
    id: string,
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail: File | null,
    thumbnail_path: string | null,
    public long_desc: string,
    public hard_skills: Array<GetSkill>,
    public images: Array<File> | null,
    public images_path: Array<string> | null,
    public project_link: string | null,
    public code_link: string | null,
    public doc_link: string | null,
    public is_favorite: boolean
  ) {
    super(id, title, start_date, end_date, short_desc, thumbnail, thumbnail_path)
  }
}

export class GetProjectExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    start_date: Date,
    end_date: Date | null,
    short_desc: string,
    thumbnail_path: string | null,
    public long_desc: string,
    public hard_skills: Array<GetSkill>,
    public images_path: Array<string> | null,
    public project_link: string | null,
    public code_link: string | null,
    public doc_link: string | null,
    public is_favorite: boolean
  ) {
    super(id, title, start_date, end_date, short_desc, thumbnail_path)
  }
}
