export class Req {
  constructor(public url: string,
              public date?: Date,
              public id?: string) {
    this.id = Math.random().toString(36).substr(2, 16);
    this.date = new Date();
  }
}
