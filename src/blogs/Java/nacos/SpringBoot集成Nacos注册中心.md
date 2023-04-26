---
# 这是文章的标题
title:  SpringBoot+Nacos注册中心
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 3
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
prev: ./SpringBoot集成Nacos配置中心.md
# 下一篇
next: ./SpringCloud集成Nacos配置中心
---
## 引入依赖
使用注册中心，和配置中心相同，需要引入一个新的依赖
```xml
<dependency>
    <groupId>com.alibaba.boot</groupId>
    <artifactId>nacos-discovery-spring-boot-starter</artifactId>
    <version>${latest.version}</version>
</dependency>
```
SpringBoot的注册中心，0.2.3之前不可用，没有对应配置。
建议使用和Nacos同版本，目前博主使用的是0.2.7. 如果即使用了config又使用了discovery，那么config的版本也要提升，不然会影响discovery的注册使用。原因是config中集成的`nacos-api`版本过低会影响discovery的自动注册。
## 进行服务注册
在`application.yml`|`applicatin.properties`中进行如下配置：
```properties
# 自动注册
nacos.discovery.auto-register=true
# 服务名称 等同但优先级低于：nacos.discovery.register.service-name，
spring.application.name=server-provider
```

上述为简单配置，配置成功后其他配置不需要填，这里简单介绍一下：
```properties
# 会自动检测为服务名
spring.application.name=SPRING_BOOT_SERVICE
# 是否开启自动注册
nacos.discovery.auto-register=true
# 注册Ip地址
nacos.discovery.register.ip=1.1.1.1
# 端口号
nacos.discovery.register.port=1
# 权重
nacos.discovery.register.weight=0.6D
# 健康状态
nacos.discovery.register.healthy=false
# 是否启用
nacos.discovery.register.enabled=true
# 是否为临时实例
nacos.discovery.register.ephemeral=true
# 集群名称
nacos.discovery.register.clusterName=SPRINGBOOT
# 分组名称
nacos.discovery.register.groupName=BOOT
# 服务名称，优先级高于spring.application.name
#nacos.discovery.register.serviceName=SPRING_BOOT_SERVICE
# 元数据 metadata 后面是map的key。=后面是值
nacos.discovery.register.metadata.username=test
```
## 验证
打开Nacos本地地址，登录后点击**服务管理**->**服务列表**， 可以看到我们注册的服务。
![image.png](https://img.exceedy.top/img/20230413113936.png)

点击详情后可以看到配置的`metadata`
![image.png](https://img.exceedy.top/img/20230413114024.png)
这样，我们就完成了一个服务注册，是不是很简单呢，只是引入了一个依赖，配置了两行代码即完成了一次服务注册。

那么接下来就是进行服务发现了，只有服务发现并成功调用了，才能算全部跑通。
## 服务发现
新建一个module，然后引入相同的`discovery`依赖。
然后写一个`controller`类,获取全部实例
```java
@RestController
@RequestMapper("consumer")
public class TestController{
	@NacosInjected  
	NamingService namingService;  
	@Autowired  
	RestTemplate template;  
	@GetMapping("/eho/{name}")  
	public Object eho(@PathVariable String name) throws NacosException {  
		return namingService.getAllInstances(name);  
	}
}
```
浏览器请求得到如下结果：
![image.png](https://img.exceedy.top/img/20230413171720.png)

格式如下：
```json
{
    "instanceId": "127.0.0.1#8080#DEFAULT#DEFAULT_GROUP@@server-provider1",
    "ip": "127.0.0.1",
    "port": 8080,
    "weight": 1,
    "healthy": true,
    "enabled": true,
    "ephemeral": true,
    "clusterName": "DEFAULT",
    "serviceName": "DEFAULT_GROUP@@server-provider1",
    "metadata": {
        "preserved.register.source": "SPRING_BOOT",
        "username": "test"
    },
    "ipDeleteTimeout": 30000,
    "instanceIdGenerator": null,
    "instanceHeartBeatInterval": 5000,
    "instanceHeartBeatTimeOut": 15000
}
```
## 结语
目前未发现Nacos+SpringBoot服务发现有什么应用场景。