// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxtjs/supabase'],
  ssr: true,
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      viewport:
        'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1',
    },
  },
  devServer: {
    port: 3000,
    host: 'localhost',
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/auth/**'],
    },
  },
})
