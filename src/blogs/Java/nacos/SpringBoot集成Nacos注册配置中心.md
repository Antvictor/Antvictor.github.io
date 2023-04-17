---
# 这是文章的标题
title:  Nacos+SpringBoot注册配置中心
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-04-17
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
next:
---

## 集成
首先启动Nacos，参考前置章节。
然后正常创建一个`SpringBoot`项目，在`pom`文件中引入`Nacos`。
`Nacos 0.2x`对应`SpringBoot2.x`, `Nacos 0.1x`对应`SpringBoot1.x`.
```pom
<dependency>  
    <groupId>com.alibaba.boot</groupId>  
    <artifactId>nacos-config-spring-boot-starter</artifactId>  
    <version>0.2.1</version>  
</dependency>
<!--SpringBoot--> 
<dependency>  
    <groupId>org.springframework.boot</groupId>  
    <artifactId>spring-boot-starter-web</artifactId>  
    <version>2.1.0.RELEASE</version>
</dependency>
```
## 使用
在启动类上面增加注解
```java
@SpringBootApplication  
@EnableNacosConfig  
@NacosPropertySource(dataId = "test", autoRefreshed = true)
public class Application{
	public static void main(String[] args) {
		SpringApplication.run(StudyApplication.class, args);
	}
}
```
写一个Controller类，使用`@NacosValue(value=${test}, autoR=true)`.可以动态修改值。
```Java
@RestController
@RequestMapper("/config")
public class TestController{
	// 必须添加默认值，不然报错
	@NacosValue(value="${test:hello}", autoRefreshed=true)
	private String test;

	@GetMapping("/get")
	public String get() {
		return test;
	}
}
```

:::tabs
@tab Nacos界面
首先请求本地项目地址，查看test值

![初始请求.png](https://img.exceedy.top/img/20230404095024.png)

然后打开Nacos页面`localhost:8848/nacos` 登录后进行配置。
配置管理->配置列表->创建配置

![image.png](https://img.exceedy.top/img/20230404095155.png)

点击发布后刷新本地项目请求，查看test值

![image.png](https://img.exceedy.top/img/20230404095249.png)

发生变化，说明配置生效
@tab OpenAPI
```shell
curl -d 'dataId=test' \
>   -d 'group=DEFAULT_GROUP' \
>   -d 'namespaceId=public' \
>   -d 'content=test=HelloWorld!' \
>   -X POST 'http://127.0.0.1:8848/nacos/v2/cs/config'
```
`dataId` 是启动类上配置的值。`group`是默认值，`namespaceId`也是默认值,`content`是传入的参数，格式为key=value。

查看本地连接一样发生修改。

![image.png](https://img.exceedy.top/img/20230404095756.png)
:::

至此一个简单的配置管理中心就完成了。较为复杂的配置：如MySql配置等，测试时发现和SpringBoot配合的不是很好。

方式一：使用SpringBoot默认注入（只写配置文件）。然而如果不在配置文件中写入数据库连接，项目启动就会报错。如果写了，Nacos也无法更新对应的数据库配置信息。

方式二：手写Config类，使用注解注入获取值。可以不在配置文件中写数据库连接。然而Nacos依旧无法更新对应的数据库配置。
## 一些其他坑
需要注意的是：虽然Nacos在github的SpringBoot使用中写了properties配置文件的配置方式，然而如果不在启动类上再配置一次对应的dataId，是不生效的。
以及明明在配置文件中配置了自动更新，但不在`@NacosValve`中配置自动更新，依旧是无效的。

再次测试发现`properties`中的配置都不生效，就算修改了`group`为其他的，在启动类注解中未配置也不会修改注解中的`group`。

结论：配置文件和注解互不影响，且SpringBoot中使用配置文件无效！

查看源码发现注解和配置文件走的不是同路线，猜测配置文件可能是为了配合`SpringCloud`。这个在后面`SpringCloud+Nacos`时研究。
