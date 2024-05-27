export class PostSkill {
  constructor(
    public name: string,
    public type: 'softSkill' | 'hardSkill',
    public mastery: 'advanced' | 'intermediate' | 'beginner',
    public svg: File | null
  ) {}
}

export class GetSkill {
  constructor(
    public id: string,
    public name: string,
    public type: 'softSkill' | 'hardSkill',
    public mastery: 'advanced' | 'intermediate' | 'beginner',
    public svg_path: string
  ) {}
}
