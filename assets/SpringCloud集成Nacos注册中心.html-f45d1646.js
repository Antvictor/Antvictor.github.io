import{_ as e,X as t,Y as p,$ as a,a0 as n,a2 as l,a3 as i,Z as c,C as o}from"./framework-2b931fd9.js";const d={},r=a("h1",{id:"springcloud-nacos配置中心",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#springcloud-nacos配置中心","aria-hidden":"true"},"#"),n(" SpringCloud+Nacos配置中心")],-1),u=c(`<h1 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h1><p>利用服务注册中心，进行服务之间的调用和管理。 <img src="https://img.exceedy.top/img/20230421142231.png" alt="image.png" loading="lazy"> 因为无论是提供者还是消费者都需要进行服务注册，所以服务注册的步骤单独写一下</p><h1 id="服务注册" tabindex="-1"><a class="header-anchor" href="#服务注册" aria-hidden="true">#</a> 服务注册</h1><h2 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖" aria-hidden="true">#</a> 引入依赖</h2><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-web<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-bootstrap<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>3.0.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token comment">&lt;!-- nacos服务发现--&gt;</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-alibaba-nacos-discovery<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2022.0.0.0-RC1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h2><p>使用服务发现时可以直接使用<code>application.properties</code>|<code>application.yml</code></p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token key attr-name">server.port</span><span class="token punctuation">=</span><span class="token value attr-value">8085</span>
<span class="token key attr-name">spring.cloud.nacos.discovery.server-addr</span><span class="token punctuation">=</span><span class="token value attr-value">127.0.0.1:8848</span>
<span class="token comment"># 服务名，不同的项目名称不同，在同一namespace下名称唯一</span>
<span class="token key attr-name">spring.application.name</span><span class="token punctuation">=</span><span class="token value attr-value">service-consumer</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="服务提供者" tabindex="-1"><a class="header-anchor" href="#服务提供者" aria-hidden="true">#</a> 服务提供者</h1><p>新建一个<code>SpringBoot module</code> 使用上述的引入和配置，将服务名修改为<code>service-provider</code>，<code>port</code>改为<code>8084</code>. 在启动类上加入注解<code>@EnableDiscoveryClient</code>. 如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@SpringBootApplication
@EnableDiscoveryClient
public class ProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(ProviderApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建一个<code>controller</code>类,代码如下：</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapping(&quot;provider&quot;)
public class TestController {

    @GetMapping(&quot;say/{name}&quot;)
    public String say(@PathVariable String name) {
        return &quot;Hello, consumer: &quot; + name;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置步骤使用服务注册中的步骤。</p><p>查看nacos服务是否有注册成功的服务 <img src="https://img.exceedy.top/img/20230423104020.png" alt="image.png" loading="lazy"> 测试连接是否有效： <img src="https://img.exceedy.top/img/20230423104108.png" alt="image.png" loading="lazy"> 测试服务提供者无误后，我们开始搭建服务消费者</p><h1 id="服务消费者" tabindex="-1"><a class="header-anchor" href="#服务消费者" aria-hidden="true">#</a> 服务消费者</h1><p>同样新建一个<code>SpringBoot module</code>, 复制相同的依赖和配置， 然后将配置中的<code>port</code>改为<code>8085</code>， 服务名改为<code>service-consumer</code>，同样需要在启动类上加入<code>@EnableDiscoveryClient</code>. 同时需要在<code>pom</code>中额外引入以下依赖:</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>   <span class="token comment">&lt;!--openfeign--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>

        <span class="token comment">&lt;!--todo sentinel need to support GraalVM in future--&gt;</span>
        <span class="token comment">&lt;!--&lt;dependency&gt;
             &lt;groupId&gt;com.alibaba.cloud&lt;/groupId&gt;
             &lt;artifactId&gt;spring-cloud-starter-alibaba-sentinel&lt;/artifactId&gt;
         &lt;/dependency&gt;--&gt;</span>

        <span class="token comment">&lt;!--负载均衡--&gt;</span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-loadbalancer<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一定要引入，不然<code>SpringBoot</code>的<code>RestTemplate</code>只能使用<code>http://ip:port</code>请求，不支持<code>http://服务名</code>请求.</p><h2 id="进行resttemplate配置" tabindex="-1"><a class="header-anchor" href="#进行resttemplate配置" aria-hidden="true">#</a> 进行<code>RestTemplate</code>配置</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@Configuration
public class RestTemplateConfig {
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@LoadBalanced</code> 开启负载均衡，不开服务名请求也不好用。</p><h2 id="新建controller" tabindex="-1"><a class="header-anchor" href="#新建controller" aria-hidden="true">#</a> 新建Controller</h2><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapping(&quot;/consumer&quot;)
public class TestController {

    RestTemplate restTemplate;
    @Autowired
    public TestController(RestTemplate restTemplate){
	    this.restTemplate = restTemplate;
    }


    @GetMapping(&quot;say/{name}&quot;)
    public String say(@PathVariable String name) {
        return restTemplate.getForObject(&quot;http://service-provider/provider/say/&quot; + name, String.class);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询服务注册并测试" tabindex="-1"><a class="header-anchor" href="#查询服务注册并测试" aria-hidden="true">#</a> 查询服务注册并测试</h2><p>首先查询服务注册是否成功 <img src="https://img.exceedy.top/img/20230423110911.png" alt="image.png" loading="lazy"> 请求测试 <img src="https://img.exceedy.top/img/20230423110935.png" alt="image.png" loading="lazy"> 可以看到请求成功了，返回的结果是服务提供者返回的数据。至此大功告成</p><h1 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h1><p>进行服务消费者搭建的时候，不去看官方demo依旧会踩坑，大多数坑来自于官方文档依赖引入。有些已经被移除的依赖文档中不会告诉你引入，但是demo里面引入了... 并且使用最新版时demo要看<code>spring-cloud-alibaba</code>里面的，官方文档的demo是<code>nacos-examples</code>仓库下的，对应的两个module更新时间是4年前... 学了这几天，最大的感受就是找项目和文档很重要！！ 下一篇就是将已经集成进来的openFeign用上了。</p>`,28);function g(v,m){const s=o("RouterLink");return t(),p("div",null,[r,a("p",null,[n("在一开始，依旧要开启Nacos服务，如已开启则忽略，未开启则根据"),l(s,{to:"/blogs/Java/nacos/Nacos%E5%AE%89%E8%A3%85%E4%B8%8E%E5%90%AF%E5%8A%A8.html"},{default:i(()=>[n("Nacos安装与启动")]),_:1}),n("安装并启动")]),u])}const b=e(d,[["render",g],["__file","SpringCloud集成Nacos注册中心.html.vue"]]);export{b as default};
