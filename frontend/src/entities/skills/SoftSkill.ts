import { GetSkill, PostSkill, PutSkill } from './Skill'

export class PostSoftSkill extends PostSkill {
  constructor(name: string, svg: File | null) {
    super(name, svg)
  }
}

export class PutSoftSkill extends PutSkill {
  constructor(id: string, name: string, svg: File | null, svg_path: string) {
    super(id, name, svg, svg_path)
  }
}

export class GetSoftSkill extends GetSkill {
  constructor(id: string, name: string, svg_path: string) {
    super(id, name, svg_path)
  }
}
