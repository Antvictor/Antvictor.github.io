import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
//   { text: "演示", icon: "discover", link: "/demo/" },
  {text:"博客", link:"/blog.md"},
  { text: "成长", icon: "edit", link: "/blogs/helloworld.md" },
]);
