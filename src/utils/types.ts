export interface Story {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  type: "story",
  url: string
}

export interface Comment {
  by: string,
  id: number,
  kids: number[],
  type: "comment"
  parent: number,
  text: string,
  time: number,
}
