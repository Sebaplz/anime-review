export interface Genre {
  id: number;
  name: string;
}

export interface Anime {
  id: number;
  title: string;
  urlImage: string;
  synopsis: string;
  releaseYear: number;
  genres: Genre[];
}

export interface PageInfo {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface AnimeResponse {
  content: Anime[];
  page: PageInfo;
}
