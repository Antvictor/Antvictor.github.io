
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { searchPlugin } from "@vuepress/plugin-search";
import { searchProPlugin } from "vuepress-plugin-search-pro";
export default([

    // docSearch
docsearchPlugin({
    // 从 DocSearch 团队收到的 apiKey
    apiKey:"0d931a2ea9e3aabba44aa2879e46fb02",
    // 从DocSearch团队收到的indexName
    indexName:"exceedytop",
    // docSearch的AppId
    appId:"8MU38TRSDV",
    // 搜索类型
    searchParameters:"query",
    // 搜索框默认字段
    placeholder:"搜索文章",
    // 打开弹窗时的初始请求
    initialQuery:"",
    translations:{button: {
        buttonText: '搜索文章',
      },
    },
    //允许替换 DocSearch 按钮和弹窗内的默认文字。
    // translations:"",
  }),
  // localSearch
//   searchPlugin({
//       locales:{
//           '/':{
//             placeholder:'搜索文章',
//           }
//       },
//   }),
//   searchProPlugin({
//     indexContent:true,
//     customFields: [
  
//     ],
//   }),

]);