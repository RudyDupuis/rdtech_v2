export class PostSkill {
  constructor(
    public name: string,
    public type: 'softSkill' | 'hardSkill',
    public svg: File | null
  ) {}
}

export class GetSkill {
  constructor(
    public name: string,
    public type: 'softSkill' | 'hardSkill',
    public svg_path: string
  ) {}
}
