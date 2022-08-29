import Technologies from "@/const/technologies";

export default [
  {
    id: "assamblage_point",
    name: "Assamblage Point",
    src: "assemblage-point",
    href: {
      live: "https://assemblage-point.vercel.app",
      code: "https://github.com/stLucky/AssemblagePoint"
    },
    technology: Technologies.VUE
  },
  {
    id: "clone_medium",
    name: "Clone Medium",
    src: "clone-medium",
    href: {
      live: "https://clone-medium.herokuapp.com",
      code: "https://github.com/stLucky/CloneMedium"
    },
    technology: Technologies.VUE
  },
  {
    id: "what_to_watch",
    name: "What To Watch",
    src: "what-to-watch",
    href: {
      live: "https://wtw-stlucky.vercel.app",
      code: "https://github.com/stLucky/WhatToWatch"
    },
    technology: Technologies.REACT
  },
  {
    id: "personal_website",
    name: "Personal Website",
    src: "my-site",
    href: {
      live: "#",
      code: "#"
    },
    technology: Technologies.NUXT
  },
  {
    id: "movie_vue",
    name: "Movie Vue",
    src: "movie-vue",
    href: {
      live: "https://movie-loader-eight.vercel.app",
      code: "https://github.com/stLucky/MovieVue"
    },
    technology: Technologies.VUE
  },
  {
    id: "pognali",
    name: "Pognali",
    src: "pognali",
    href: {
      live: "https://stlucky.github.io/Pognali",
      code: "https://github.com/stLucky/Pognali"
    },
    technology: Technologies.NATIVE
  },
  {
    id: "kekso_booking",
    name: "KeksoBooking",
    src: "kekso-booking",
    href: {
      live: "https://stlucky.github.io/KeksoBooking",
      code: "https://github.com/stLucky/KeksoBooking"
    },
    technology: Technologies.NATIVE
  },
  {
    id: "cat_energy",
    name: "Cat Energy",
    src: "cat-energy",
    href: {
      live: "https://stlucky.github.io/CatEnergy",
      code: "https://github.com/stLucky/CatEnergy"
    },
    technology: Technologies.NATIVE
  }
] as const;
