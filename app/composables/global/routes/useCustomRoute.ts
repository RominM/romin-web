import { ERoute } from "~/types/enum/global/navigation"

export const useCustomRoute = () => {
  const router = useRouter()

   const availableRoutes = router.getRoutes().filter(route => {
    return (
      route.meta?.showInNav !== false &&
      !route.path.includes(':') &&
      route.name !== undefined &&
      route.path !== '/404'
    )
  })

  return {
    getAll() {
      return availableRoutes
    },

    excludes(excludedRoutes: ERoute[]) {
     return availableRoutes.filter(route => {
        return !excludedRoutes.some(excluded =>
          route.path.includes(excluded)
        )
      })
    },

    includes(includedRoutes: ERoute[]) {
      return availableRoutes.filter(route => {
        return includedRoutes.some(included =>
          route.path.includes(included)
        )
      })
    }
  }
}