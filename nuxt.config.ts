// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      tipTapAPPID: 'q9g4nz9g'
    }
  },

  modules: ["@nuxt/eslint"]
})