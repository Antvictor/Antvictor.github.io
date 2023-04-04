import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    // {
    //   text: "如何使用",
    //   icon: "creative",
    //   prefix: "demo/",
    //   link: "demo/",
    //   children: "structure",
    // },
    {
      text: "博文",
      icon: "note",
      prefix: "blogs/",
      link: "blogs/",
      collapsible: true,
      // link: "blogs/",
      children: [
        "helloworld",
        {
          text:"Java",
          prefix:"Java/",
          collapsible: true,
          children:[
            {
              text:"基础",
              prefix:"基础/",
              collapsible: true,
              children:"structure"
            },
            {
              text:"nacos",
              prefix:"nacos/",
              collapsible: true,
              children:"structure"
            }
            
          ]
        }
      ],
    },
    "intro",
    "slides",
  ],
});
