import{_ as n,X as s,Y as a,a2 as e}from"./framework-69dceb4c.js";const t={},p=e(`<p>我是Ant，今天学习的是设计原则之一的开闭原则(Open Closed Principe, OCP)。</p><h2 id="什么是开闭原则" tabindex="-1"><a class="header-anchor" href="#什么是开闭原则" aria-hidden="true">#</a> 什么是开闭原则？</h2><p>开闭原则的定义是：对修改关闭，对扩展开放。 开闭原则是最基础的设计原则。</p><h2 id="为什么使用开闭原则呢" tabindex="-1"><a class="header-anchor" href="#为什么使用开闭原则呢" aria-hidden="true">#</a> 为什么使用开闭原则呢？</h2><p>我们假设一个场景：程序员小A开发了一个查询年月日的项目，别人可以直接使用他的Jar调用对应的接口查询。</p><p>有一天小A将这个接口修改了，不再返回年月日，而只返回年。那么使用的人如果升级了这个Jar之后，业务逻辑是不是就出现问题了呢？</p><p>如果小A想要一个只返回年的接口，那么他可以新增加一个，这样既不影响原业务逻辑，也扩展了新功能。</p><p>所以我们要对修改关闭，对扩展开放。</p><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2><p>假设我们有一个商品对象，商品包含了价格、名称等。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Goods</span><span class="token punctuation">{</span>
	<span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
	<span class="token keyword">private</span> <span class="token class-name">Double</span> price<span class="token punctuation">;</span>

	<span class="token class-name">Goods</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
		<span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> price<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> name<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在有了一个新业务，我们需要对商品进行打折，如果我们直接修改<code>getPrice()</code>, 那么我们可能再需要原价的时候就没有了入口，或者修改再修改代码，这样做系统明显不健壮，也不符合开闭原则：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> price <span class="token operator">*</span> <span class="token number">0.6</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么符合的做法是什么呢？ <strong>原接口不变，新增一个接口？</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">getDiscountsPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token keyword">return</span> price <span class="token operator">*</span> <span class="token number">0.6</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果这么做的话，看起来是符合的，但我们需要去修改对应的业务逻辑，比如：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GoodsTest</span><span class="token punctuation">{</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token class-name">Goods</span> goods <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Goods</span><span class="token punctuation">(</span><span class="token string">&quot;苹果&quot;</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
		<span class="token keyword">int</span> num <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
		<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;买了&quot;</span> <span class="token operator">+</span> num <span class="token operator">+</span> goods<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;, &quot;</span> <span class="token operator">+</span>
                <span class="token string">&quot;总价：&quot;</span> <span class="token operator">+</span> <span class="token function">getTotalPrice</span><span class="token punctuation">(</span>goods<span class="token punctuation">,</span> num<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token doc-comment comment">/**
	* 查询购买指定数量的商品总价
	*/</span>
	<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Double</span> <span class="token function">getTotalPrice</span><span class="token punctuation">(</span><span class="token class-name">Goods</span> goods<span class="token punctuation">,</span> <span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> goods<span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> num<span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况下，我们就需要将每个<code>goods.getPrice()</code>修改成<code>goods.getDiscountsPrice()</code>, 上面的例子中只有一个，但如果是有很多呢？要知道就算我们不改，代码也是不会报错的，但结果却不是我们想要的了。 那么有没有更好的办法呢？ <strong>使用继承，不修改原对象，在新对象中修改价格</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GoodsDiscounts</span> <span class="token keyword">extends</span> <span class="token class-name">Goods</span> <span class="token punctuation">{</span>
	<span class="token class-name">GoodsDiscounts</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token class-name">Double</span> price<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> price<span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>

	<span class="token keyword">public</span> <span class="token class-name">Double</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">0.6</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">public</span> <span class="token class-name">Double</span> <span class="token function">getOriginPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样我们只需要将<code>GoodsTest</code>中的<code>new Goods</code>修改即可</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Goods</span> goods <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GoodsDiscounts</span><span class="token punctuation">(</span><span class="token string">&quot;打折苹果&quot;</span><span class="token punctuation">,</span> <span class="token number">5.0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样就万事大吉了...吗？ 其实不然，这里虽然暂时符合了开闭原则，但违背了另一个原则：<strong>里氏替换原则</strong>。</p><p>那么具体怎么操作让上面的代码都符合呢？我们下回分解。</p>`,23),o=[p];function c(l,i){return s(),a("div",null,o)}const d=n(t,[["render",c],["__file","开闭原则.html.vue"]]);export{d as default};
