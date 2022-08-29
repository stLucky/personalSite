import { defineNuxtConfig } from "nuxt";
import eslintPlugin from "vite-plugin-eslint";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "@/assets/sass/main.scss"
  ],
  typescript: {
    typeCheck: true,
    strict: true
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  },
  modules: [
    "@vueuse/nuxt"
  ]
});
