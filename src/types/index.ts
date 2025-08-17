export interface Film {
  adult: boolean;
  backdrop_path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  genres: any[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  status: string;
  tagline: string;
}

interface FilmsResponse {
  page: number;
  results: Film[];
  total_pages: number;
  total_results: number;
}

export default interface filmsInterface {
  isLoading: boolean;
  nowPlayingFilms: FilmsResponse | null;
  topRatedFilms: FilmsResponse | null;
  popularFilms: FilmsResponse | null;
}
