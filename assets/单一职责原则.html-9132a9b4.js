import{_ as n,X as s,Y as a,a2 as p}from"./framework-69dceb4c.js";const t={},e=p(`<p>大家好，我是Ant，今天我们来学习的是设计原则之一的<strong>单一职责原则（Single Responsibility Principle）</strong>.</p><h2 id="什么是单一职责原则" tabindex="-1"><a class="header-anchor" href="#什么是单一职责原则" aria-hidden="true">#</a> 什么是单一职责原则</h2><p>单一职责原则，顾名思义，就是只有一个职责，只负责一件事。</p><blockquote><p>单一职责原则：有且仅有一个原因引起类的变化</p></blockquote><h2 id="为什么用单一职责原则" tabindex="-1"><a class="header-anchor" href="#为什么用单一职责原则" aria-hidden="true">#</a> 为什么用单一职责原则</h2><p>如果一个类的职责类型过多，就像一个人同时做两件事一样。比如：在一个饭店里小A既做点菜员又做厨师， 那么我们可以想象一下，一个顾客进来了，小A出来给顾客点菜，然后顾客点完菜后去厨房做菜， 此时又进来一个顾客，小A是出来还是不出来呢？不出来顾客点不了菜，可能等不及就走了； 出来帮顾客点完菜，回到厨房一看上个顾客的菜糊了。</p><p>这就是因为职责的类型过多，导致了多个职责之前互相影响，因为修改其中的一个职责导致另一个职责出现错误。</p><p>同时我们需要注意，单一职责并不是代表只做一件事，而是做相同类型的事，比如厨师炒菜，不可能只炒一个菜，而是炒一个菜系的菜。</p><h2 id="单一职责原则的实现" tabindex="-1"><a class="header-anchor" href="#单一职责原则的实现" aria-hidden="true">#</a> 单一职责原则的实现</h2><p>我们来实现一下上面提到的例子： 首先是点菜员：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderTaker</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 厨师
     */</span>
    <span class="token class-name">Chef</span> chef<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">OrderTaker</span><span class="token punctuation">(</span><span class="token class-name">Chef</span> chef<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>chef <span class="token operator">=</span> chef<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 点菜
     * <span class="token keyword">@param</span> <span class="token parameter">name</span> 菜名
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客点菜：&quot;</span>  <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        chef<span class="token punctuation">.</span><span class="token function">addFood</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们再实现厨师类，要注意，厨师做菜的时候，点菜员还是可以工作的，所以厨师烹饪使用了线程：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">LinkedList</span></span><span class="token punctuation">;</span>   

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Chef</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> foodList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 做菜
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>foodList<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;等待点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">String</span> name <span class="token operator">=</span> foodList<span class="token punctuation">.</span><span class="token function">pollFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot; is cooking!&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot;is cooked&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 添加菜单
     * <span class="token keyword">@param</span> <span class="token parameter">name</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        foodList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后我们使用测试类来实验一下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Chef</span> chef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OrderTaker</span> orderTaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderTaker</span><span class="token punctuation">(</span>chef<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客A点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;鱼香肉丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客B点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;肉末茄子&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客C点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;酸辣土豆丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
输出：
等待点菜
顾客<span class="token class-name">A</span>点菜
顾客点菜：鱼香肉丝
顾客<span class="token class-name">B</span>点菜
顾客点菜：肉末茄子
顾客<span class="token class-name">C</span>点菜
顾客点菜：酸辣土豆丝
鱼香肉丝 is cooking<span class="token operator">!</span>
鱼香肉丝is cooked
肉末茄子 is cooking<span class="token operator">!</span>
肉末茄子is cooked
酸辣土豆丝 is cooking<span class="token operator">!</span>
酸辣土豆丝is cooked
等待点菜

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>此时，我们修改OrderTasker的takeOrder方法，让他也支持收钱找零的功能（这么做是不对的，不符合单一职责也不符合开闭原则，为了更容易理解单一职责带来的好处，所以这么做），而这样也丝毫不影响厨师做菜。：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客点菜：&quot;</span>  <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        chef<span class="token punctuation">.</span><span class="token function">addFood</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;收您100，找您50&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
输出：
等待点菜
顾客<span class="token class-name">A</span>点菜
顾客点菜：鱼香肉丝
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">B</span>点菜
顾客点菜：肉末茄子
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">C</span>点菜
顾客点菜：酸辣土豆丝
收您<span class="token number">100</span>，找您<span class="token number">50</span>
鱼香肉丝 is cooking<span class="token operator">!</span>
鱼香肉丝is cooked
肉末茄子 is cooking<span class="token operator">!</span>
肉末茄子is cooked
酸辣土豆丝 is cooking<span class="token operator">!</span>
酸辣土豆丝is cooked
等待点菜
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何判断一个类的职责是否单一呢" tabindex="-1"><a class="header-anchor" href="#如何判断一个类的职责是否单一呢" aria-hidden="true">#</a> 如何判断一个类的职责是否单一呢？</h3><p>以我们厨师的类来举例：他是否职责单一呢？看一个类职责是否单一，其实不能只看设计，还需要结合实际的业务。</p><p>比如一个夫妻店，点菜员点完菜，将点菜的单子给厨师就完事了，厨师看着单子去做菜，那么我们上面的例子就符合单一职责原则。因为处理单子和根据单子做菜都是他的职责。</p><p>后来店越做越大，厨师也越来越多，那么厨师再去处理单子就不合适了，因为每个厨师都有自己的单子，那么就很容易出问题了。</p><p>此时就需要将单子的职责划分出来，做一个<code>FoodManager</code>类，专门的人（厨师长、主厨）或工具来管理顾客的单子， 这样才能有效避免单子重复传给不同的厨师或者厨师做重了菜品。</p><p>那么我们可以这样重构代码： 首先将厨师管理单子的职责拆分出来：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">LinkedList</span></span><span class="token punctuation">;</span>  
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">Lock</span></span><span class="token punctuation">;</span>  
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span>locks<span class="token punctuation">.</span></span><span class="token class-name">ReentrantLock</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FoodManager</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> foodList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Lock</span> lock <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ReentrantLock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            foodList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> foodList<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        lock<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> foodList<span class="token punctuation">.</span><span class="token function">pollFirst</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            lock<span class="token punctuation">.</span><span class="token function">unlock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后厨师不再管理单据，而是从单据管理中查看是否有没做的菜品：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Chef</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">FoodManager</span> foodManager<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span><span class="token class-name">FoodManager</span> foodManager<span class="token punctuation">,</span> <span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>foodManager <span class="token operator">=</span> foodManager<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>foodManager<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;厨师 &quot;</span><span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;等待点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">try</span> <span class="token punctuation">{</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>

                <span class="token punctuation">}</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token class-name">String</span> food <span class="token operator">=</span> foodManager<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isNotBlank</span><span class="token punctuation">(</span>food<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot; is cooking &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot;is cooked &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>点菜员也不再和厨师直接对接，而且将单据交给单据管理者：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderTaker</span> <span class="token punctuation">{</span>
    <span class="token class-name">FoodManager</span> foodManager<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">OrderTaker</span><span class="token punctuation">(</span><span class="token class-name">FoodManager</span> foodManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>foodManager <span class="token operator">=</span> foodManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客点菜：&quot;</span>  <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        foodManager<span class="token punctuation">.</span><span class="token function">addFood</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;收您100，找您50&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后我们再测试一下，因为店大了吗，我们多弄两个厨师：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">FoodManager</span> foodManager <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FoodManager</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span>foodManager<span class="token punctuation">,</span> <span class="token string">&quot;Ant&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span>foodManager<span class="token punctuation">,</span> <span class="token string">&quot;Victor&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">new</span> <span class="token class-name">Chef</span><span class="token punctuation">(</span>foodManager<span class="token punctuation">,</span> <span class="token string">&quot;小王&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OrderTaker</span> orderTaker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderTaker</span><span class="token punctuation">(</span>foodManager<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客A点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;鱼香肉丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客B点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;肉末茄子&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客C点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;酸辣土豆丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客D点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;酸辣土豆丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;顾客F点菜&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        orderTaker<span class="token punctuation">.</span><span class="token function">takeOrder</span><span class="token punctuation">(</span><span class="token string">&quot;酸辣土豆丝&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">-</span>
输出：
厨师 <span class="token class-name">Ant</span>等待点菜
厨师 小王等待点菜
厨师 <span class="token class-name">Victor</span>等待点菜
顾客<span class="token class-name">A</span>点菜
顾客点菜：鱼香肉丝
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">B</span>点菜
顾客点菜：肉末茄子
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">C</span>点菜
顾客点菜：酸辣土豆丝
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">D</span>点菜
顾客点菜：风味茄子
收您<span class="token number">100</span>，找您<span class="token number">50</span>
顾客<span class="token class-name">F</span>点菜
顾客点菜：双头鲍
收您<span class="token number">100</span>，找您<span class="token number">50</span>
<span class="token class-name">Ant</span> is cooking 鱼香肉丝
<span class="token class-name">Victor</span> is cooking 肉末茄子
小王 is cooking 酸辣土豆丝
<span class="token class-name">Victoris</span> cooked 肉末茄子
<span class="token class-name">Antis</span> cooked 鱼香肉丝
<span class="token class-name">Ant</span> is cooking 双头鲍
小王is cooked 酸辣土豆丝
厨师 小王等待点菜
<span class="token class-name">Victor</span> is cooking 风味茄子
<span class="token class-name">Antis</span> cooked 双头鲍
<span class="token class-name">Victoris</span> cooked 风味茄子
厨师 <span class="token class-name">Victor</span>等待点菜
厨师 小王等待点菜
厨师 <span class="token class-name">Ant</span>等待点菜
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结语" tabindex="-1"><a class="header-anchor" href="#结语" aria-hidden="true">#</a> 结语</h2><p>至此我们完成单一原则代码的示例，并模拟业务升级重构了代码，让代码耦合度更低，代码逻辑更清晰。</p><p>上面的代码有缺点吗？那定然是有的，比如<code>FoodManager</code> 是否可以考虑升级为接口呢？</p><p>下一篇我们来学习<code>接口隔离原则</code>，看看如何使用接口隔离原则重构我们的代码。</p><p>如果有表达有误的地方，欢迎评论区讨论，我会及时回复并修改有误的内容，感谢观看！</p><p>同时也欢迎到我的公众号<code>迷途架构</code>, 也欢迎链接我的个人微信<code>CodeJourneyTop</code>.</p>`,36),c=[e];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","单一职责原则.html.vue"]]);export{k as default};
