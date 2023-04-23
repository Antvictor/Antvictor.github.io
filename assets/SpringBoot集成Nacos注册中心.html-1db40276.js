import{_ as n,X as s,Y as a,Z as e}from"./framework-2b931fd9.js";const t={},p=e(`<h2 id="引入依赖" tabindex="-1"><a class="header-anchor" href="#引入依赖" aria-hidden="true">#</a> 引入依赖</h2><p>使用注册中心，和配置中心相同，需要引入一个新的依赖</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>nacos-discovery-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>\${latest.version}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringBoot的注册中心，0.2.3之前不可用，没有对应配置。 建议使用和Nacos同版本，目前博主使用的是0.2.7. 如果即使用了config又使用了discovery，那么config的版本也要提升，不然会影响discovery的注册使用。原因是config中集成的<code>nacos-api</code>版本过低会影响discovery的自动注册。</p><h2 id="进行服务注册" tabindex="-1"><a class="header-anchor" href="#进行服务注册" aria-hidden="true">#</a> 进行服务注册</h2><p>在<code>application.yml</code>|<code>applicatin.properties</code>中进行如下配置：</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment"># 自动注册</span>
<span class="token key attr-name">nacos.discovery.auto-register</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 服务名称 等同但优先级低于：nacos.discovery.register.service-name，</span>
<span class="token key attr-name">spring.application.name</span><span class="token punctuation">=</span><span class="token value attr-value">server-provider</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述为简单配置，配置成功后其他配置不需要填，这里简单介绍一下：</p><div class="language-properties line-numbers-mode" data-ext="properties"><pre class="language-properties"><code><span class="token comment"># 会自动检测为服务名</span>
<span class="token key attr-name">spring.application.name</span><span class="token punctuation">=</span><span class="token value attr-value">SPRING_BOOT_SERVICE</span>
<span class="token comment"># 是否开启自动注册</span>
<span class="token key attr-name">nacos.discovery.auto-register</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 注册Ip地址</span>
<span class="token key attr-name">nacos.discovery.register.ip</span><span class="token punctuation">=</span><span class="token value attr-value">1.1.1.1</span>
<span class="token comment"># 端口号</span>
<span class="token key attr-name">nacos.discovery.register.port</span><span class="token punctuation">=</span><span class="token value attr-value">1</span>
<span class="token comment"># 权重</span>
<span class="token key attr-name">nacos.discovery.register.weight</span><span class="token punctuation">=</span><span class="token value attr-value">0.6D</span>
<span class="token comment"># 健康状态</span>
<span class="token key attr-name">nacos.discovery.register.healthy</span><span class="token punctuation">=</span><span class="token value attr-value">false</span>
<span class="token comment"># 是否启用</span>
<span class="token key attr-name">nacos.discovery.register.enabled</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 是否为临时实例</span>
<span class="token key attr-name">nacos.discovery.register.ephemeral</span><span class="token punctuation">=</span><span class="token value attr-value">true</span>
<span class="token comment"># 集群名称</span>
<span class="token key attr-name">nacos.discovery.register.clusterName</span><span class="token punctuation">=</span><span class="token value attr-value">SPRINGBOOT</span>
<span class="token comment"># 分组名称</span>
<span class="token key attr-name">nacos.discovery.register.groupName</span><span class="token punctuation">=</span><span class="token value attr-value">BOOT</span>
<span class="token comment"># 服务名称，优先级高于spring.application.name</span>
<span class="token comment">#nacos.discovery.register.serviceName=SPRING_BOOT_SERVICE</span>
<span class="token comment"># 元数据 metadata 后面是map的key。=后面是值</span>
<span class="token key attr-name">nacos.discovery.register.metadata.username</span><span class="token punctuation">=</span><span class="token value attr-value">test</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="验证" tabindex="-1"><a class="header-anchor" href="#验证" aria-hidden="true">#</a> 验证</h2><p>打开Nacos本地地址，登录后点击<strong>服务管理</strong>-&gt;<strong>服务列表</strong>， 可以看到我们注册的服务。 <img src="https://img.exceedy.top/img/20230413113936.png" alt="image.png" loading="lazy"></p><p>点击详情后可以看到配置的<code>metadata</code><img src="https://img.exceedy.top/img/20230413114024.png" alt="image.png" loading="lazy"> 这样，我们就完成了一个服务注册，是不是很简单呢，只是引入了一个依赖，配置了两行代码即完成了一次服务注册。</p><p>那么接下来就是进行服务发现了，只有服务发现并成功调用了，才能算全部跑通。</p><h2 id="服务发现" tabindex="-1"><a class="header-anchor" href="#服务发现" aria-hidden="true">#</a> 服务发现</h2><p>新建一个module，然后引入相同的<code>discovery</code>依赖。 然后写一个<code>controller</code>类,获取全部实例</p><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapper(&quot;consumer&quot;)
public class TestController{
	@NacosInjected  
	NamingService namingService;  
	@Autowired  
	RestTemplate template;  
	@GetMapping(&quot;/eho/{name}&quot;)  
	public Object eho(@PathVariable String name) throws NacosException {  
		return namingService.getAllInstances(name);  
	}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>浏览器请求得到如下结果： <img src="https://img.exceedy.top/img/20230413171720.png" alt="image.png" loading="lazy"></p><p>格式如下：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">&quot;instanceId&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1#8080#DEFAULT#DEFAULT_GROUP@@server-provider1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ip&quot;</span><span class="token operator">:</span> <span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;port&quot;</span><span class="token operator">:</span> <span class="token number">8080</span><span class="token punctuation">,</span>
    <span class="token property">&quot;weight&quot;</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">&quot;healthy&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;enabled&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ephemeral&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
    <span class="token property">&quot;clusterName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;DEFAULT&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;serviceName&quot;</span><span class="token operator">:</span> <span class="token string">&quot;DEFAULT_GROUP@@server-provider1&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;metadata&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">&quot;preserved.register.source&quot;</span><span class="token operator">:</span> <span class="token string">&quot;SPRING_BOOT&quot;</span><span class="token punctuation">,</span>
        <span class="token property">&quot;username&quot;</span><span class="token operator">:</span> <span class="token string">&quot;test&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;ipDeleteTimeout&quot;</span><span class="token operator">:</span> <span class="token number">30000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;instanceIdGenerator&quot;</span><span class="token operator">:</span> <span class="token null keyword">null</span><span class="token punctuation">,</span>
    <span class="token property">&quot;instanceHeartBeatInterval&quot;</span><span class="token operator">:</span> <span class="token number">5000</span><span class="token punctuation">,</span>
    <span class="token property">&quot;instanceHeartBeatTimeOut&quot;</span><span class="token operator">:</span> <span class="token number">15000</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>目前未发现Nacos+SpringBoot服务发现有什么应用场景。</p>`,21),o=[p];function i(c,l){return s(),a("div",null,o)}const u=n(t,[["render",i],["__file","SpringBoot集成Nacos注册中心.html.vue"]]);export{u as default};
