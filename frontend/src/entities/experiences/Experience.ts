export abstract class PostExperience {
  constructor(
    public title: string,
    public startDate: Date,
    public endDate: Date | null,
    public shortDesc: string,
    public thumbnail: File | null
  ) {}
}

export abstract class GetExperience {
  constructor(
    public id: string,
    public title: string,
    public startDate: Date,
    public endDate: Date | null,
    public shortDesc: string,
    public thumbnail_path: string | null
  ) {}
}
