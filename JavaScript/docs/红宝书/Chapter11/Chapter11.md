# 前期准备
具体的教程可以参考
[nodejs安装教程](https://blog.csdn.net/Small_Yogurt/article/details/104968169)
1. 安装node.js环境,可以直接使用命令执行js文件，方便学习测试;
2. windows下载nodejs的msi文件直接执行；
3. 安装后需要重启电脑即可使用。
<br><br>
或者是通过chrome浏览器的console控制台进行测试也可以，非常方便，和书中的输出结果更相近，nodejs跑出来的结果可能会有所不同。当然这两都是同源的V8。

# 第十一章 期约与异步函数
包含三小部分：
- 异步编程
- 期约
- 异步函数

一些平时遇到的疑惑：
1. 在一个函数A中，调用到了另一个函数B，那么，这个函数B执行时间为什么是在函数A的主体程序结束后才会执行？
2. 在上一个疑惑的背景下，如果函数A中调用了多个外部函数，那么这些外部函数的执行顺序是如何？


## 11.1、异步编程
> 具体代码可以查看demo1.js

如果使用了太多的回调函数会导致“回调地狱”，以至于代码会难以维护。

有几点知识点是比较重要的：
- 异步行为是为了优化因计算量大而时间长的操作
- 异步代码不容易推断，函数运行时长对于JavaScript运行时（runtime）来说是一个黑盒，因此实际上是无法预知的。

## 11.2、期约（Promise）
> Promise 是ES6新增的引入类型，可以通过new操作符进行实例化，创建新期约时需要传入执行器函数作为参数。

```JavaScript
    let p = new Promise(()=> {});
    setTimeout(console.log, 0 , p); // Promise<pending>
```
这边传入了一个空函数对象`()=>{}`应付解释器，如果不提供执行器函数，就会抛出SyntaxError。

期约状态机
- 待定pending
- 兑现resolved
- 拒绝rejected

期约的状态是私有的，不能直接通过JavaScript检测到，这主要是为了避免根据读到的期约状态，以同步方法处理期约对象，隔绝外部代码。

执行器函数有两大职责：
- 初始化期约的异步行为
- 控制状态的最终转换

控制状态的最终转换
```javascript
    let p1 = new Promise((resolve, reject) => resolve());
    setTimeout(console.log, 0, p1);
```
期约的状态只能修改一次。

### Promise.resolve()
以下两种代码效果是一样的，使用的是promise的静态方法。
```javascript
    let p1 = new Promise((resolve, reject) => resolve());
    let p2 = Promise.resolve();
```
可以通过n层包装
```javascript
    let p = Promise.resolve(7);
    setTimeout(console.log, 0, p === Promise.resolve(p));
     // true
    setTimeout(console.log, 0, p === Promise.resolve(Promise.resolve(p))); 
    // true
```

### Promise.reject()
拒绝的期约理由就是传给Promise.reject()的第一个参数。
```javascript
    let p = Promise.reject(3);
    setTimeout(console.log, 0, p); // Promise <rejected>: 3
    p.then(null, (e) => setTimeout(console.log, 0, e)); // 3
```
