import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https://antvictor.github.io",

  author: {
    name: "Antvictor",
    url: "https://blog.exceedy.top",
  },

  iconAssets: "iconfont",

  logo: "/cat.svg",
  favicon: '/cat.svg',
  repo: "Antvictor/Antvictor.github.io",

  docsDir: "src",

  // navbar
  navbar: zhNavbar,

  // sidebar
  sidebar: zhSidebar,

  footer: "welcome",

  displayFooter: true,
  // rtl: true,
  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  blog: {
      medias: {
        BiliBili: "https://space.bilibili.com/324770884",
        Email: "antvictor@163.com",
        // Gitee: "https://example.com",
        GitHub: "https://github.com/Antvictor",
        Gmail: "larryyangc@example.com",
        Antvictor: ["https://blog.exceedy.top"],
      },
      avatar:"/cat.svg",
      roundAvatar:true,
    },



  encrypt: {
    config: {

    },
  },

  plugins: {
        blog: {
            excerptLength: 200,
          },
      comment: {
          // @ts-expect-error: You should generate and use your own comment service
          provider: "Giscus",
          darkmode:true,
          repo:"Antvictor/Antvictor.github.io",
          repoId:"MDEwOlJlcG9zaXRvcnkzODc2NDk1MTg=",
          category:"Announcements",
          categoryId:"DIC_kwDOFxsP7s4CVAAr",
        },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
