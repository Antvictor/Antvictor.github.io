---
title: 七天入门Python(六)之什么是循环
icon: 
order: 6
author: Antvictor
date: 2023-09-25
category: 
- 语言
tags: 
- Python
prev: 七天入门Python（五）.md
next:
---


大家好，我是Antvictor，励志要成为一名架构师的程序员。

上一篇我们说完了什么是集合、列表、字典及元组，而这些数据结构，我们好像只能一个个放入、一个个取出，那么，如果遇到不知道长度，还要取出所有，或者，将用户输入的某些内容记录，直到用户主动停止时，应该怎么办呢？

我们可以使用循环来做到上述的功能。

# 什么是循环

循环就是在满足条件前重复做事，就像在学校里围着操场跑圈一样，目标是跑10圈，不满足10圈就要一直跑，跑完一圈就计一次数，当计数满足10圈时就会停下。

# 为什么使用循环
数据放在一个集装箱里，而想一个个取出就需要重复工作，我们不可能一次性全部取出。也不清楚有多少数量，所以也不能安排对应数量的人去同时取出，所以我们只能重复的去搬运，直到集装箱里空了为止。
所以我们需要使用循环。

# 如何使用呢

在Python中有两种循环方式，分别为：`while` 和 `for`。

## while

首先看一下我们举的第一个例子，怎么用代码表示跑了10圈呢？ 这种边循环边计数的方式，在python大多使用while， 那么while怎么使用呢？

```python
runNumber = 0;
while runNumber < 10: 
	runNumber ++;
	print(f"这是第{runNumber}圈");
```

`while`的格式是：

```python
while 布尔表达式:
	满足要求时的处理
else:
	不满足时的处理
```

## for
`Python`的`for`循环很简洁，只有一个格式：
``` python
for <variable> in <sequence>: 
	<statements> 
else: 
	<statements>
```

`for`循环可以遍历所有可迭代的对象，如一个列表或字符串。

我们来创建一个`boxes`, 向里面添加随机数量的值，然后再查询它，看我们能不能得到全部的值。
```python
import random;

boxes = [];
for i in range(random.randint(0,10)):
    boxes.append(i);
print(boxes)

for i in boxes:
    print(i);

```

使用随机数需要引入`random`，正好可以复习下之前学到的引用。
`range(start, stop, step)` 可以创建一个整数列表，可以传入三个参数：
- `start`： 默认为0，可以不传。
- `stop`： 截止到哪个数，不包含`stop`, `range(2)`输出`[0,1]`
- `step`: 步长，默认1，`range(2)`, 相当于`range(0,2,1)`。步长代表从第一个数后的每个数都是前一个数`+step`。

# 跳出循环
有时我们并不想查看全部的数据，而是满足后就不再继续查询了，那么应该怎么做呢？

没错，跳出循环，那么如何跳出呢？

使用`break`就可以了，让我们看一个示例：

```python
boxes = [1,2,3,4,5,6];
for i in boxes:
	if (i == 3):
		break;
	print(i);
```

打印结果：

```shell
1
2
```

那么如果是仅仅不想打印3呢？

只需要将`break` 改成 `continue`， `continue`是什么作用呢？ 

它的作用是跳过本次循环继续下次循环。也就是说：这次循环进来，遇到了`continue`，然后`continue`之后的代码就不执行了，回到循环的开始位置继续下一次循环。

``` python
boxes = [1,2,3,4,5,6];
for i in boxes:
	if (i == 3):
		continue;
	print(i);
```


打印结果为：

```shell
1
2
4
5
6
```

# 结语
本篇我们了解了`Python`中`while`, `for`循环以及如何跳出循环。

下一篇我们来讲一下什么是异常，以及怎么处理异常。

如果有表达有误的地方，欢迎评论区讨论，我会及时回复并修改有误的内容，感谢观看