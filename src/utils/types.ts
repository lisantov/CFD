export interface Story {
  by: string,
  descendants: number,
  id: number,
  kids: number[],
  score: number,
  time: number,
  title: string,
  url: string
}

export interface Comment {
  by: string,
  id: number,
  kids: number[],
  parent: number,
  text: string,
  time: number,
  dead?: boolean,
}
