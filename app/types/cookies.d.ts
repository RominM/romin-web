import { Cookies } from 'universal-cookie'

declare module '#app' {
  interface NuxtApp {
    $cookies: Cookies
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $cookies: Cookies
  }
}
