import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import myPlugin from "./plugin.js";
// import { searchProPlugin } from "vuepress-plugin-search-pro";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "Antvictor",
      description: "一个开源的Java博客",
    },
  },

  theme,
  plugins:myPlugin,

  // Enable it with pwa
  // shouldPrefetch: false,
});
