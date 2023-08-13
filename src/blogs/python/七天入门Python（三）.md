---
# 这是文章的标题
title: 七天入门Python（三）之模块、类与包
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 3
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-07-27
# 一个页面可以有多个分类
category:
  - 语言
# 一个页面可以有多个标签
tag:
  - Python
# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在文章收藏中
# star: true

# 你可以自定义页脚
# footer: 这是测试显示的页脚

# 你可以自定义版权信息
# copyright: 
# 定义上一篇
prev: 七天入门Python（二）.md
# 下一篇
next: 七天入门Python（四）.md
---
# 七天入门Python（三）
大家好，我是Antvictor，一个励志要成为架构师的程序员。
欢迎收看《七天入门Python》第三篇，在上一篇我们了解了什么是函数，
那么现在我们要了解一下和函数息息相关的模块、类以及包。

# 模块
简单来讲，我们在一个`Python`文件`A`中写了一个函数，而对于其他`Python`文件`A`就是一个模块，而我们要在其他`Python`文件中调用A模块中的函数，就需要引入`A`。那么我们来实践一下：
首先第一步我们写一个模块文件`say.py`
```python
def say(name):
    print(f"hello, {name}")
```
第二步，我们写一个文件`call.py`， 注意一定要写在一个目录下哦
```python
import say
say.say("AntVictor")
```
运行可以看到结果：
```
hello, AntVictor
```
在上述的模块中我们直接引入了模块文件并使用了模块名，其实模块还可以重命名，我们可以起一些别名。
使用别名：
```Python
import say as s
s.say("AntVictor")
```
除此之外，还可以直接引入对应的函数，而不需要再使用别名或模块名进行调用，具体代码如下：
```python
from say import say
say("AntVictor")
```
多了一个`from`, 那么它是什么意思呢？`from`代表了从哪里获取，上面整句代码的意思可以翻译为：从（`from`）`say`模块引入（`import`）函数`say`。
既然可以引入一个函数，那么就可以引入多个函数，我们可以在原来的say.py文件中新增一个函数say1:
```python
def say1(name):
	print(f"Hi,{name}")
```
就可以在引入时，引入两个函数,引入时通过,分割：
```python
from say import say, say1
```
模块到这里便讲完了，模块很重要，因为只要是一个`py`文件都能算是模块，那么类文件也是，而只要牵扯到引入，都和模块引入差不多。
# 类
类在面向对象语言中可以说是至关重要的了，在面向对象语言中**万物皆可为类**。<br>
如鸟，鸟是一种类，大多鸟类都拥有相同的属性，
如：翅膀、羽毛等，同样他们拥有一些相同的行为，如：飞、跑等，那么我们便可以对鸟写一个类。<br>
类一般使用`class`关键字表示，并且命名一般采用驼峰式（首字母大写），
现在我们写一个示例`bird.py`：
```python
class Bird:
      def __init__(self,  wings, feather):
          self.wings = wings
          self.feather = feather
      def fly(self):
          print(f"this bird use {self.wings} fly and it has {self.feather}")
```
同时我们再写一个`main.py`，来引入并创建对象，最终调用类的接口。
```python
from bird import Bird

b = Bird("big wings", "green feather");
b.fly()
```
现在来解释一下，`def`是函数必须要的关键字，而有一个特殊的`__init__`这是什么意思呢？<br>
这是初始化的意思。如果没有写，则会默认生成
```python
def __init__(self):
```
此时创建对象的时候可以直接使用`Bird()`。<br>
但在上述的例子中我们使用了`__init__`，并新增了两个形参，那么在创建对象时就必须传对应的实参。<br>

在每个类的函数中都有一个self关键字，这代表了对象本身，有时我们会创建多个相同类的对象，那么`self`就可以保证每个对象的函数调用的值都是这个对象自身的值。所以每个函数都需要传`self`。<br>

那么对象是什么呢？创建对象又是怎么做的呢？<br>

其实`Bird("big wings", "green feather")`便是创建对象，而`b`便是对象的引用，通过b可以让`Python`找到对象真实存放的地址。<br>

对象在代码中其实并不可见，一般对象的引用也可以理解为对象，因为我们必须通过它才能找到对象本身，也必须通过它才能调用方法。
## 使用对象的属性
除了在类里面的方法中使用对象的属性外，还可以在外部使用，如：
```python
print(b.wings)
```
## 修改对象属性的值
也可以直接修改对象属性的值：
```python
b.feather = "red feather"
```
## 删除对象的属性
```python
del b.wings
# b.fly() 删除后不能再用
b.wings = "small wings"
b.fly() #重新赋值后才能使用
```
需要注意的是：删除掉对象的属性后，该对象中的函数如果使用了被删除的属性会报错，所以必须重新赋值后才能使用。
## 删除对象
```python
del b
```
删除对象后，便不能再使用该对象。

# 继承
有时候一个类并不能完整的表达某些事物，比如鸟类，虽然大多数的鸟都会飞，但依旧有一些鸟类是不会飞的，比如鸵鸟、企鹅等。<br>

那么我们怎么让他们既能有鸟的特征又能表达属于自己的特征呢？没错，就是使用继承，那么Python中怎么使用继承呢？<br>

让我们先看一个示例：
我们继续在bird.py中加入类
```python
class Penguin(Bird) :
  def run(self):
    print(f"yes, I`m run")
```
继承需要在类名后面加一个()，将需要继承的类放进入即可。<br>

在上面的例子中，鸟类这种被继承的被称为父类，而企鹅这种继承鸟类的被称为鸟类的子类，就像父子关系一样，而他们的特性也和父子关系很像，子类拥有父类的全部属性及函数。也就是说子类可以像父类调用自己的方法一样去调用父类的方法。<br>

我们在main.py写一下代码打印一下来看看是否是这样的：
```python
p = Penguin("small wings","villus");
p.fly()
p.run()
```
![image.png](https://img.codejourney.top/img/20230728111257.png)

通过打印结果可以看到，就算`Penguin`中没有`fly`函数，依旧打印出了和`Bird`相同的结果，这就是因为子类继承了父类的属性和函数。
## 重写
我们都知道`Penguin`是不能飞的，他最多是滑翔，那么我们怎么让`fly`可以和`Bird`不一样，打印我们需要的内容呢？<br>

这就用到了**重写**，那就是我们可以在子类写一个和父类中同名同参的函数，而函数的内容由子类自己定义：
```python
class Penguin(Bird) :
	...
	def fly(self):
		print(f"I`m Penguin, I`m can`t fly, I just glide")
```
![image.png](https://img.codejourney.top/img/20230728111316.png)
`main.py`中的代码并没有修改，依旧调用的是fly方法，但打印结果已经改成了`Penguin`类独有的内容。
## 私有
有时候类中的函数、属性是该类私有，不希望在类之外的地方被使用，那么我们就可以设置私有的属性或函数，在`Python`这种属性或函数需要一些特殊的命名方式，那就是在函数名或属性名前加两个下划线:`__`
```python
class Penguin(Brid):
	...
	
	def __cry(self):
		print("I only bark at home")
	def cry(self):
		print("嘎嘎，这是我在外面的叫声")
		self.__cry()
```
在`main.py`新增：
```python
p.cry()
# p.__cry() 报错
```
在`main`中可以看到，我们能调用`cry`，但不能调用`__cry`, 而`cry`内部则可以调用`__cry`，这就是私有方法
# 包
一般写项目的时候是要将同一项目的文件放在一个包下的，也就意味着模块文件、类都是可以放在包里的，那么什么是包？又怎么做呢？<br>

包是一种组织模块，可以进行模块的引用和分发。
+ 包中必须要有`__init__.py`， 内容可以为空
+ 引用包的模块必须要在模块引用的基础上加上包名，如：`import package.moudle` `from package import moudle`
+ `__init__.py`可以包含包的初始化方法
+ 同包下可以直接引用<br>

首先我们建立如下结构的包：
```
mypackage/
├── __init__.py
├── moudle1.py
├── moudle2.py
└── subpackage
    ├── __init__.py
    └── moudle3.py
```
建完后，在各个`moudle`文件中打印对应的名称，如：`print("This is moudle1")`.
然后在`moudle2.py`引入`moudle3`
```python
from subpackage import moudle3
```
运行可以看到会打印moudle2和3中的打印结果。<br>
这便是包结构，可以让模块更有层次，可以将相同作用或同一功能下的文件放在一个包内，进行结构分层，一个真实项目的包会更复杂，只有用包才能更好的划分模块。

# 结语
至此我们学完了模块、类、包，接下来计划学习什么是条件判断。<br>
如果有表达有误的地方，欢迎评论区讨论，我会及时回复并修改有误的内容，感谢观看