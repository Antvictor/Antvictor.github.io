---
# 这是文章的标题
title: Nacos安装与启动
# 这是页面的图标
icon: nacos
# 这是侧边栏的顺序
order: 1
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-04-04
# 一个页面可以有多个分类
category:
  - 分布式
# 一个页面可以有多个标签
tag:
  - Nacos
# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在文章收藏中
# star: true

# 你可以自定义页脚
# footer: 这是测试显示的页脚

# 你可以自定义版权信息
# copyright: 
# 定义上一篇
prev: 
# 下一篇
next: ./SpringBoot集成Nacos配置中心.md
---
## 预备环境
要具备jdk8+、maven3.2+的环境。
## 下载安装
:::tabs
@tab github下载源码
```shell
git clone https://github.com/alibaba/nacos.git 
cd nacos/ 
mvn -Prelease-nacos -Dmaven.test.skip=true clean install -U 
ls -al distribution/target/ 
// change the $version to your actual path 
cd distribution/target/nacos-server-$version/nacos/bin
```
@tab 下载编译后的压缩包 推荐使用

您可以从 [最新稳定版本](https://github.com/alibaba/nacos/releases) 下载 `nacos-server-$version.zip` 包。
```bash
  unzip nacos-server-$version.zip 或者 tar -xvf nacos-server-$version.tar.gz
  cd nacos/bin
```
:::

推荐使用压缩包下载方式，因为可以更便利的选择版本，且不需要手动编译。

### 修改配置文件
修改`conf`目录下的`application.properties`文件。

设置其中的`nacos.core.auth.plugin.nacos.token.secret.key`值，详情可查看[鉴权-自定义密钥](https://nacos.io/zh-cn/docs/v2/plugin/auth-plugin.html).
必须要设置，不然启动报错！！可以先用默认值，如果不用默认值，则生成Base64编码字符不低于32的字符串。
> 注意，文档中的默认值`SecretKey012345678901234567890123456789012345678901234567890123456789`和`VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg=`为公开默认值，可用于临时测试，实际使用时请**务必**更换为自定义的其他有效值。
## 启动

启动命令(standalone代表着单机模式运行，非集群模式):
:::tabs
@tab Linux/Unix/Mac
`sh startup.sh -m standalone`
如果您使用的是ubuntu系统，或者运行脚本报错提示[[符号找不到，可尝试如下运行：
`bash startup.sh -m standalone`
@tab Windows
`startup.cmd -m standalone`
:::
## 登录
启动后，打开`localhost:8848/nacos`登录，账号密码默认均为`nacos`。
进入后为启动成功。
![image.png](https://img.exceedy.top/img/20230404104745.png)



