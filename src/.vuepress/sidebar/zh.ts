import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
//    "/" :[
//     "",
//    ],
  "/": [
    "",
    {
      text: "博文",
//       icon: "note",
      prefix: "blogs/",
      collapsible: true,
      // link: "blogs/",
      children: [
        "helloworld",
         "Java/"
      ],
    },
    "intro",
//     "slides",
  ],
  "/blogs":"structure",
//   "/demo":"structure"
});
