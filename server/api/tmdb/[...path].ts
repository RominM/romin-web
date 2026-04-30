export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const path = getRouterParam(event, 'path')
  const query = getQuery(event) // ← récupère les params de l'URL

  const result = await $fetch(`https://api.themoviedb.org/3/${path}`, {
    params: {
      language: 'fr-FR',
      ...query
    },
    headers: {
      Authorization: `Bearer ${config.tmdbToken}`,
      accept: 'application/json',
    },
  })

  return result
})