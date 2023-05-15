---
# 这是文章的标题
title:  SpringCloud+Nacos注册中心
# 这是页面的图标
icon:
# 这是侧边栏的顺序
order: 5
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-05-15
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
prev: ./SpringCloud集成Nacos配置中心.md
# 下一篇
next:
---
# SpringCloud+Nacos配置中心
在一开始，依旧要开启Nacos服务，如已开启则忽略，未开启则根据[Nacos安装与启动](./Nacos安装与启动.md)安装并启动
# 服务发现
利用服务注册中心，进行服务之间的调用和管理。
![image.png](https://img.exceedy.top/img/20230421142231.png)
因为无论是提供者还是消费者都需要进行服务注册，所以服务注册的步骤单独写一下
# 服务注册
## 引入依赖
```xml

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-bootstrap</artifactId>
        <version>3.0.3</version>
    </dependency>
    <!-- nacos服务发现-->
    <dependency>
        <groupId>com.alibaba.cloud</groupId>
        <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        <version>2022.0.0.0-RC1</version>
    </dependency>
</dependencies>

```
## 配置文件
使用服务发现时可以直接使用`application.properties`|`application.yml`
```properties
server.port=8085
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848
# 服务名，不同的项目名称不同，在同一namespace下名称唯一
spring.application.name=service-consumer
```
# 服务提供者
新建一个`SpringBoot module` 使用上述的引入和配置，将服务名修改为`service-provider`，`port`改为`8084`.
在启动类上加入注解`@EnableDiscoveryClient`. 如下：
```Java
@SpringBootApplication
@EnableDiscoveryClient
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
```
新建一个`controller`类,代码如下：
```Java
@RestController
@RequestMapping("provider")
public class TestController {

    @GetMapping("say/{name}")
    public String say(@PathVariable String name) {
        return "Hello, consumer: " + name;
    }
}
```
配置步骤使用服务注册中的步骤。

查看nacos服务是否有注册成功的服务
![image.png](https://img.exceedy.top/img/20230423104020.png)
测试连接是否有效：
![image.png](https://img.exceedy.top/img/20230423104108.png)
测试服务提供者无误后，我们开始搭建服务消费者
# 服务消费者
同样新建一个`SpringBoot module`, 复制相同的依赖和配置， 然后将配置中的`port`改为`8085`， 服务名改为`service-consumer`，同样需要在启动类上加入`@EnableDiscoveryClient`.
同时需要在`pom`中额外引入以下依赖:
```xml
   <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
            <version>4.0.0</version>
        </dependency>

        <!--todo sentinel need to support GraalVM in future-->
        <!--<dependency>
             <groupId>com.alibaba.cloud</groupId>
             <artifactId>spring-cloud-starter-alibaba-sentinel</artifactId>
         </dependency>-->

        <!--负载均衡-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-loadbalancer</artifactId>
            <version>4.0.0</version>
        </dependency>
```
一定要引入，不然`SpringBoot`的`RestTemplate`只能使用`http://ip:port`请求，不支持`http://服务名`请求.
## 进行`RestTemplate`配置
```Java
@Configuration
public class RestTemplateConfig {
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
```
`@LoadBalanced` 开启负载均衡，不开服务名请求也不好用。
## 新建Controller
```Java
@RestController
@RequestMapping("/consumer")
public class TestController {

    RestTemplate restTemplate;
    @Autowired
    public TestController(RestTemplate restTemplate){
	    this.restTemplate = restTemplate;
    }


    @GetMapping("say/{name}")
    public String say(@PathVariable String name) {
        return restTemplate.getForObject("http://service-provider/provider/say/" + name, String.class);
    }
}
```
## 查询服务注册并测试
首先查询服务注册是否成功
![image.png](https://img.exceedy.top/img/20230423110911.png)
请求测试
![image.png](https://img.exceedy.top/img/20230423110935.png)
可以看到请求成功了，返回的结果是服务提供者返回的数据。至此大功告成
# 结语
进行服务消费者搭建的时候，不去看官方demo依旧会踩坑，大多数坑来自于官方文档依赖引入。有些已经被移除的依赖文档中不会告诉你引入，但是demo里面引入了...
并且使用最新版时demo要看`spring-cloud-alibaba`里面的，官方文档的demo是`nacos-examples`仓库下的，对应的两个module更新时间是4年前...
学了这几天，最大的感受就是找项目和文档很重要！！
下一篇就是将已经集成进来的openFeign用上了。
