// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    supabaseUrl: '',
    supabaseKey: '',
    public: {
      tipTapAPPID: 'q9g4nz9g',
      supabaseUrl: '234',
      supabaseKey: ''
    }
  },

  modules: ["@nuxt/eslint", "@nuxt/ui"]
})