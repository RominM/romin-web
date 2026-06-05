export const useTmdb = () => {
  const fetchTmdb = <T>(endpoint: string, params?: Record<string, string>): Promise<T> => {
    return $fetch<T>(`/api/tmdb${endpoint}`, { params })
  }

  return { fetchTmdb }
}