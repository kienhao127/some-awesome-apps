export interface ReplacementMap {
  [key: string]: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  path: string;
}

export interface Response<T> {
  code: number;
  message: string;
  data: T;
}
