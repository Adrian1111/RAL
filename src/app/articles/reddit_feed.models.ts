export class Article {
  constructor(
    public id: string,
    public title: string,
    public url: string,
    public author: string,
    public created_utc: string
  ) {
  }
}
export class Comment {
  constructor(
      public id: string,
      public body: string,
      public author: string,
      public created_utc: string
  ) {
  }
}
