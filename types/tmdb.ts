export interface TmdbMovie {
  id: number
  title: string
  overview: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
}

export interface TmdbResponse<T = TmdbMovie> {
  results: T[]
  page: number
  total_pages: number
  total_results: number
}