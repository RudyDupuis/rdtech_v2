import { GetSkill, PostSkill, PutSkill } from './Skill'

export class PostHardSkill extends PostSkill {
  constructor(
    name: string,
    svg: File | null,
    public mastery: 'advanced' | 'intermediate' | 'beginner'
  ) {
    super(name, svg)
  }
}

export class PutHardSkill extends PutSkill {
  constructor(
    id: string,
    name: string,
    svg: File | null,
    svg_path: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner'
  ) {
    super(id, name, svg, svg_path)
  }
}

export class GetHardSkill extends GetSkill {
  constructor(
    id: string,
    name: string,
    svg_path: string,
    public mastery: 'advanced' | 'intermediate' | 'beginner'
  ) {
    super(id, name, svg_path)
  }
}
