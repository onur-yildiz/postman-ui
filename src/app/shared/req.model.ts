export class Req {
  constructor(
    public url: string,
    public method: string,
    public date?: Date,
    public _id?: string
  ) {}
}
