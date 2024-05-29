import { GetExperience, PostExperience } from './Experience'
import type { GetSkill } from '../skills/Skill'

export class PostProjectExperience extends PostExperience {
  constructor(
    title: string,
    startDate: Date,
    endDate: Date | null,
    shortDesc: string,
    thumbnail: File | null,
    public longDesc: string,
    public hardSkills: Array<GetSkill>,
    public images: Array<File> | null,
    public projectLink: string | null,
    public codeLink: string | null,
    public docLink: string | null
  ) {
    super(title, startDate, endDate, shortDesc, thumbnail)
  }
}

export class GetProjectExperience extends GetExperience {
  constructor(
    id: string,
    title: string,
    startDate: Date,
    endDate: Date | null,
    shortDesc: string,
    thumbnail_path: string | null,
    public longDesc: string,
    public hardSkills: Array<GetSkill>,
    public images_path: Array<string> | null,
    public projectLink: string | null,
    public codeLink: string | null,
    public docLink: string | null
  ) {
    super(id, title, startDate, endDate, shortDesc, thumbnail_path)
  }
}
