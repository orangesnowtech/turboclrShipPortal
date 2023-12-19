// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  ssr: true,
  modules: [
    "nuxt-vuefire",
    "nuxt-icon",
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/image',

  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: true,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
  vuefire: {
    config: {
      apiKey: "AIzaSyDxX_78cZwJJRvJgG64b_ZeNfC7C1DwSog",
      authDomain: "turboclr-e5281.firebaseapp.com",
      databaseURL: "https://turboclr-e5281-default-rtdb.firebaseio.com",
      projectId: "turboclr-e5281",
      storageBucket: "turboclr-e5281.appspot.com",
      messagingSenderId: "574966441549",
      appId: "1:574966441549:web:320c8254da94b0e4661e04",
      measurementId: "G-G3FK6NWPVC",
    },
    auth: {
      enabled: true,
    },
  },
  nitro: {
    firebase: {
      gen: 2
    }
  },
  extends:[
    
  ]
  
});