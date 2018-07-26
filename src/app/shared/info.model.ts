export class Info {
  constructor(public contents: string,
              public contentType: string,
              public contentLength: string,
              public status: number,
              public responseTime: number,
              public url: string,
              public id: string) {
  }
}
