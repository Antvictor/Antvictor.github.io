import{_ as d,X as u,Y as h,a1 as n,a2 as s,$ as e,a0 as a,C as r}from"./framework-628e9f5b.js";const p={},_=e("h2",{id:"预备环境",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#预备环境","aria-hidden":"true"},"#"),a(" 预备环境")],-1),b=e("p",null,"要具备jdk8+、maven3.2+的环境。",-1),v=e("h2",{id:"下载安装",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#下载安装","aria-hidden":"true"},"#"),a(" 下载安装")],-1),m=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[e("span",{class:"token function"},"git"),a(` clone https://github.com/alibaba/nacos.git 
`),e("span",{class:"token builtin class-name"},"cd"),a(` nacos/ 
mvn -Prelease-nacos `),e("span",{class:"token parameter variable"},"-Dmaven.test.skip"),e("span",{class:"token operator"},"="),a("true clean "),e("span",{class:"token function"},"install"),a(),e("span",{class:"token parameter variable"},"-U"),a(` 
`),e("span",{class:"token function"},"ls"),a(),e("span",{class:"token parameter variable"},"-al"),a(` distribution/target/ 
// change the `),e("span",{class:"token variable"},"$version"),a(` to your actual path 
`),e("span",{class:"token builtin class-name"},"cd"),a(" distribution/target/nacos-server-"),e("span",{class:"token variable"},"$version"),a(`/nacos/bin
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),g={href:"https://github.com/alibaba/nacos/releases",target:"_blank",rel:"noopener noreferrer"},k=e("code",null,"nacos-server-$version.zip",-1),f=e("div",{class:"language-bash line-numbers-mode","data-ext":"sh"},[e("pre",{class:"language-bash"},[e("code",null,[a("  "),e("span",{class:"token function"},"unzip"),a(" nacos-server-"),e("span",{class:"token variable"},"$version"),a(".zip 或者 "),e("span",{class:"token function"},"tar"),a(),e("span",{class:"token parameter variable"},"-xvf"),a(" nacos-server-"),e("span",{class:"token variable"},"$version"),a(`.tar.gz
  `),e("span",{class:"token builtin class-name"},"cd"),a(` nacos/bin
`)])]),e("div",{class:"line-numbers","aria-hidden":"true"},[e("div",{class:"line-number"}),e("div",{class:"line-number"})])],-1),x=e("p",null,"推荐使用压缩包下载方式，因为可以更便利的选择版本，且不需要手动编译。",-1),z=e("h3",{id:"修改配置文件",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#修改配置文件","aria-hidden":"true"},"#"),a(" 修改配置文件")],-1),N=e("p",null,[a("修改"),e("code",null,"conf"),a("目录下的"),e("code",null,"application.properties"),a("文件。")],-1),y=e("code",null,"nacos.core.auth.plugin.nacos.token.secret.key",-1),T={href:"https://nacos.io/zh-cn/docs/v2/plugin/auth-plugin.html",target:"_blank",rel:"noopener noreferrer"},$=e("blockquote",null,[e("p",null,[a("注意，文档中的默认值"),e("code",null,"SecretKey012345678901234567890123456789012345678901234567890123456789"),a("和"),e("code",null,"VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg="),a("为公开默认值，可用于临时测试，实际使用时请"),e("strong",null,"务必"),a("更换为自定义的其他有效值。")])],-1),X=e("h2",{id:"启动",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#启动","aria-hidden":"true"},"#"),a(" 启动")],-1),A=e("p",null,"启动命令(standalone代表着单机模式运行，非集群模式):",-1),B=e("p",null,[e("code",null,"sh startup.sh -m standalone"),a(" 如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：")],-1),L=e("p",null,[e("code",null,"bash startup.sh -m standalone")],-1),V=e("p",null,[e("code",null,"startup.cmd -m standalone")],-1),w=e("h2",{id:"登录",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#登录","aria-hidden":"true"},"#"),a(" 登录")],-1),C=e("p",null,[a("启动后，打开"),e("code",null,"localhost:8848/nacos"),a("登录，账号密码默认均为"),e("code",null,"nacos"),a("。 进入后为启动成功。 "),e("img",{src:"https://img.exceedy.top/img/20230404104745.png",alt:"image.png",loading:"lazy"})],-1);function D(E,I){const i=r("ExternalLinkIcon"),c=r("Tabs");return u(),h("div",null,[_,b,v,n(c,{id:"9",data:[{title:"github下载源码"},{title:"下载编译后的压缩包 推荐使用"}]},{tab0:s(({title:t,value:l,isActive:o})=>[m]),tab1:s(({title:t,value:l,isActive:o})=>[e("p",null,[a("您可以从 "),e("a",g,[a("最新稳定版本"),n(i)]),a(" 下载 "),k,a(" 包。")]),f]),_:1}),x,z,N,e("p",null,[a("设置其中的"),y,a("值，详情可查看"),e("a",T,[a("鉴权-自定义密钥"),n(i)]),a(". 必须要设置，不然启动报错！！可以先用默认值，如果不用默认值，则生成Base64编码字符不低于32的字符串。")]),$,X,A,n(c,{id:"43",data:[{title:"Linux/Unix/Mac"},{title:"Windows"}]},{tab0:s(({title:t,value:l,isActive:o})=>[B,L]),tab1:s(({title:t,value:l,isActive:o})=>[V]),_:1}),w,C])}const Z=d(p,[["render",D],["__file","Nacos安装与启动.html.vue"]]);export{Z as default};
