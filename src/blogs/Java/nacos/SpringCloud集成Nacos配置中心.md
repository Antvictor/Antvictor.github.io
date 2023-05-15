---
# 这是文章的标题
title:  SpringCloud+Nacos配置中心
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 4
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-04-26
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
prev: ./SpringBoot集成Nacos注册中心.md
# 下一篇
next: ./SpringCloud集成Nacos注册中心.md
---
# 版本选择
版本选择最新的版本`2022.0.0.0-RC1`，学一样的新的东西最好直接学最新版。
[alibaba-cloud文档](https://github.com/alibaba/spring-cloud-alibaba/blob/2022.x/spring-cloud-alibaba-examples/nacos-example/nacos-discovery-example/readme-zh.md)
# 配置中心
## 引入依赖
```xml
       <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.0.0</version>
        </dependency>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
            <version>2022.0.0.0-RC1</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-bootstrap</artifactId>
            <version>3.0.3</version>
        </dependency>
```
需要注意：
1. SpringBoot3.* 支持最低的JDK是17，要记得升级JDK版本哦！
2. 为什么引入bootstrap？因为SpringCloud移除了，不引入加载配置文件会报错
## 配置文件
`bootstrap.properties`|`bootstrap.yml`
``` xml
spring.cloud.nacos.config.server-addr: 127.0.0.1:8848  
spring.application.name=test
```
**配置中心必须在bootstrap中配置, 和服务发现一起用时也必须在bootstrap中配置，单独使用服务发现则可以在application中配置**
## 动态配置
在进行配置之前需要注意一点，在dataId的配置上SpringCloud和SpringBoot是不同的，SpringBoot中可以直接配置dataId，而SpringCloud中dataId是由：`${prefix}-${spring.profies.active}.${file-extension}`组成的。具体规则如下：
+ `${prefix}` 是: `spring.applicatin.name` 或 `spring.cloud.nacos.config.prefix`. 同时存在时以`nacos`的配置为准
+ `${spring.profies.active}` 这个是SpringBoot的`spring.profies.active`配置，如果该配置不存在，那么`-${spring.profies.active}`也不存在
+ `${file-extension}` 可以通过`spring.cloud.nacos.config.file-extension`进行配置，目前支持`properties`和`yaml`, 默认`properties`, 默认情况下，配置中心进行配置时，使用`${prefix}` 或 `${prefix}.properties`都可以，如果两个都存在，则`${prefix}` 不生效
### 具体代码
正常写一个`controller`类，然后通过`@Value`注解读取信息
```java
@RestController
@RequestMapping("/config")
// 如果想自动刷新，则必须加该注解，这是SpringCloud的注解
@RefreshScope
public class ConfigController {

    @Value("${name:hello}")
    private String test;

    @GetMapping("/get")
    public String get() {
        return test;
    }
}
```
启动后进行测试。
## 测试
测试步骤与上一篇SpringBoot的配置一样，需要注意的就是配置时使用的`dataId`需要按上述的规则使用。
首次查看，显示默认数据：

![image.png](https://img.exceedy.top/img/20230420142433.png)

根据规则配置dataId

![image.png](https://img.exceedy.top/img/20230420142823.png)

发布后测试：

![image.png](https://img.exceedy.top/img/20230420142845.png)

成功！！再次修改，将`Antvictor1`改为`Antvictor`发布：

![image.png](https://img.exceedy.top/img/20230420142946.png)

动态更新成功！
## 结语
Nacos不愧是阿里的项目，更不愧是开源给了Spring家族，文档一如既往的残缺...
Nacos的官方文档以及github中`SpringCloudAlibaba`里面的文档，都没有说需要引入`bootstrap`，而更坑的还在后面，服务发现里面也有几个依赖需要引入，但官方的文档提都没提, 必须研究他们的用例才能发现。
