// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/supabase'],
  devtools: { enabled: true },
  supabase: {
    redirectOptions: {
      login: '/',
      callback: '/confirm'
    },
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify'],
  },
  typescript: {
    typeCheck: true,
  }
})
