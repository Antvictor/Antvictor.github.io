import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "如何使用",
      icon: "creative",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "博文",
      icon: "note",
      prefix: "blogs/",
      link: "blogs/",
      // link: "blogs/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
