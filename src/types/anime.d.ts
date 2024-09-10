export interface Genre {
  id: number;
  name: string;
}

export interface GenreId {
  id: number;
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

export interface GenreResponse {
  content: Genre[];
  page: Page;
}

export interface UpdateAnimeResponse {
  success: boolean;
  message: string;
}

export interface UpdateAnime {
  title: string;
  urlImage: string;
  synopsis: string;
  releaseYear: number;
  genres: GenreId[];
}
