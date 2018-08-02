export class Info {
  constructor(
    public status: Number,
    public responseTime: Number,
    public sizeKB: Number,
    public body: string,
    public url: string,
    public _id: string,
    public headers: any
  ) {}
}
