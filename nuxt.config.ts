export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css: [
    '~/assets/scss/reset.scss',
    '~/assets/scss/main.scss'
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/foundations/index.scss" as *;
          `
        }
      }
    }
  },
  modules: ['@pinia/nuxt'],
  components: [
    { path: '~/components', pathPrefix: false }
  ],

  runtimeConfig: {
    tmdbToken: process.env.TMDB_TOKEN,
  }
})