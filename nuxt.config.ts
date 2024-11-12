// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["@/assets/scss/global.scss"],
  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "nuxt-svgo",
    "@nuxt/image",
  ],
});