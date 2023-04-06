---
# 这是文章的标题
title: 第一个类
# 这是页面的图标
icon: 
# 这是侧边栏的顺序
order: 2
# 设置作者
author: Antvictor
# 设置写作时间
date: 2023-03-31
# 一个页面可以有多个分类
category:
  - Java基础
# 一个页面可以有多个标签
tag:
  - Java
# 此页面会在文章列表置顶
# sticky: true

# 此页面会出现在文章收藏中
# star: true

# 你可以自定义页脚
# footer: 这是测试显示的页脚

# 你可以自定义版权信息
# copyright: 
# 定义上一篇
prev: ./什么是对象.md
# 下一篇
next:
---
要写一个类很简单，只要将上一篇的例子找个文本编辑器写一遍，另存为`.java`即可，然而要想真正创建并启动，则需要配置一下环境。
## 环境配置
在[JDK下载地址](https://www.oracle.com/cn/java/technologies/javase/javase8u211-later-archive-downloads.html) 中选择适合你的安装包，因为使用的是JDK8，所以下载地址放的是JDK8的路径，想安装其他版本可在此选择[所有版本](https://www.oracle.com/cn/java/technologies/downloads/archive/)

::: tabs#home
@tab Mac
![image.png](https://img.exceedy.top/img/20230331093134.png)
选择该版本后下载安装，根据安装器提示一步步安装即可，安装完成后，文件在
`/Library/Java/JavaVirtualMachines/jdk1.8.0_351.jdk`下，
此时打开终端，使用命令`vim .bash_profile`查看`.bash_profile`中是否有如下配置，没有则需要配置
```shell
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_351.jdk/Contents/Home
PATH=$JAVA_HOME/bin:$PATH:.
CLASSPATH=$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar:.
export PATH
export CLASSPATH
```
配置完成后，点击`esc`,输入`:wq`保存推出。
@tab Win
win异曲同工，大体步骤也是下载安装包，安装后配置环境变量。没有win环境，等安装虚拟机后再更新。

:::
使用之前要打开一个新的终端，避免原终端未刷新环境。
验证`jdk`是否安装成功，使用如下命令：
```shell
java -version

# 输出如下内容为安装成功
java version "1.8.0_221"
Java(TM) SE Runtime Environment (build 1.8.0_221-b11)
Java HotSpot(TM) 64-Bit Server VM (build 25.221-b11, mixed mode)
```

![安装成功](https://img.exceedy.top/img/20230331102000.png)

## IDE
工欲善其事，必先利其器。
首先选择一个开发工具，如果想要开发项目则无论什么电脑都推荐`Intellij idea`,当然，`idea`收费，神通广大的网友是"**不会**"给你盗版的哦，免费工具推荐使用`Eclipse`。而我们现在学习只需要一些简单的工具即可。
::: tabs#home
@tab Mac
推荐使用 Sublime Text
@tab Win
推荐使用 Nodepade++
:::

## 开发
那么现在进入我们的开发阶段。
首先打开我们的开发工具，新建名称为`Hello`的文件，格式为`.java`，在Java中文件名要与类名保持一致，且命名规范要求单词首字母大写，多个单词则拼接在一起。如`HelloWorld`。 这种命名规范叫**驼峰式**。
```java
class Hello{
	// 这是主方法，Java运行时会调用的默认方法，格式固定
	public static void main(String[] args) {
		// System.out.println 的意思是：打印传入的内容并换行
		System.out.println("Hello world!");
	}
}
```
## 运行
依旧打开我们的终端，使用`javac`编译我们的Java文件，记得要进入到`Hello.java`同目录下。
```shell
javac Hello.java
```
运行通过后，会得到一个同名的`.class`文件。
![编译成功](https://img.exceedy.top/img/20230331102908.png)

这时我们运行：`java Hello`，便会打印我们传入的**Hello world!**.
```shell
java Hello

Hello world!
```

![运行成功](https://img.exceedy.top/img/20230331103021.png)

至此我们成功创建并运行了第一个Java类。