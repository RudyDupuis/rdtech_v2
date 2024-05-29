export abstract class PostExperience {
  constructor(
    public title: string,
    public start_date: Date,
    public end_date: Date | null,
    public short_desc: string,
    public thumbnail: File | null
  ) {}
}

export abstract class PutExperience {
  constructor(
    public id: string,
    public title: string,
    public start_date: Date,
    public end_date: Date | null,
    public short_desc: string,
    public thumbnail: File | null,
    public thumbnail_path: string | null
  ) {}
}

export abstract class GetExperience {
  constructor(
    public id: string,
    public title: string,
    public start_date: Date,
    public end_date: Date | null,
    public short_desc: string,
    public thumbnail_path: string | null
  ) {}
}
