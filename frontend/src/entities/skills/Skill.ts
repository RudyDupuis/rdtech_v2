export abstract class PostSkill {
  constructor(
    public name: string,
    public svg: File | null
  ) {}
}

export abstract class PutSkill {
  constructor(
    public id: string,
    public name: string,
    public svg: File | null,
    public svg_path: string
  ) {}
}

export abstract class GetSkill {
  constructor(
    public id: string,
    public name: string,
    public svg_path: string
  ) {}
}
