---
order: 3
nav:
  title: 面试知识点
  path: /konwledge
---

### 手写实现 call 和 apply、bind

#### apply
```js
Function.prototype.myApply = function (context, args) {
   // 处理容错
    context = (typeof context === 'object' ? context : window)
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol();
    context[key] = this;
    //通过隐式绑定的方式调用函数
    const result = context[key](...args);
    //删除添加的属性
    delete context[key]
    //返回函数调用的返回值
    return result
}

```

#### call

与apply几乎一摸一样

```js
//传递参数从一个数组变成逐个传参了,不用...扩展运算符的也可以用arguments代替
Function.prototype.NealCall = function (context, ...args) {
    //这里默认不传就是给window,也可以用es6给参数设置默认参数
     context = (typeof context === 'object' ? context : window)
    args = args ? args : []
    //给context新增一个独一无二的属性以免覆盖原有属性
    const key = Symbol();
    context[key] = this;
    //通过隐式绑定的方式调用函数
    const result = context[key](...args);
    //删除添加的属性
    delete context[key];
    //返回函数调用的返回值
    return result;
}


```

#### bind
bind的实现要稍微麻烦一点，因为bind是返回一个绑定好的函数,apply是直接调用.但其实简单来说就是返回一个函数,里面执行了apply上述的操作而已.不过有一个需要判断的点,因为返回新的函数,要考虑到使用`new`去调用,并且new的优先级比较高,所以需要判断new的调用,还有一个特点就是bind调用的时候可以传参,调用之后生成的新的函数也可以传参,效果是一样的,所以这一块也要做处理。

```js
Function.prototype.myBind = function (objThis, ...params) {
    const thisFn = this; // 存储源函数以及上方的params(函数参数)
    // 对返回的函数 secondParams 二次传参
    let fToBind = function (...secondParams) {
        const isNew = this instanceof fToBind // this是否是fToBind的实例 也就是返回的fToBind是否通过new调用
        const context = isNew ? this : Object(objThis) // new调用就绑定到this上,否则就绑定到传入的objThis上
        return thisFn.call(context, ...params, ...secondParams); // 用call调用源函数绑定this的指向并传递参数,返回执行结果
    };
    if (thisFn.prototype) {
        // 复制源函数的prototype给fToBind 一些情况下函数没有prototype，比如箭头函数
        fToBind.prototype = Object.create(thisFn.prototype);
    }
    return fToBind; // 返回拷贝的函数
};


```