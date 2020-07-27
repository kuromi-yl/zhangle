---
order: 8  
nav:
  title: 面试知识点
  path: /konwledge
---

## call、bind、aplly

每个函数都包含两个非继承而来的方法：`apply()`和 `call()`。这两个方法的用途都是在特定的作用域中调用函数，实际上等于设置函数体内 `this` 对象的值。

### apply
apply()方法接收两个参数：一个是在其中运行函数的作用域，另一个是参数数组。其中，第二个参数可以是 `Array`的实例，也可以是`arguments` 对象。

```js
function sum(num1, num2){ 
 return num1 + num2; 
} 
function callSum1(num1, num2){ 
 return sum.apply(this, arguments); // 传入 arguments 对象
} 
function callSum2(num1, num2){ 
 return sum.apply(this, [num1, num2]); // 传入数组
} 
console.log(callSum1(10,10)); //20
console.log(callSum2(10,10)); //20
```

### call
call()方法与 apply()方法的作用相同，它们的唯一区别在于接收参数的方式不同。在使用call()方法时，传递给函数的参数必须`逐个列举`出来。

```js
function sum(num1, num2){ 
 return num1 + num2; 
}
function callSum(num1, num2){ 
 return sum.call(this, num1, num2); 
} 
console.log(callSum(10,10)); //20

```

### bind
bind()方法会创建一个函数的实例，其 `this` 值会被绑定到传给 bind()函数的值。意思就是 bind() 会返回一个`新函数`。例如：
```js
window.color = "red"; 
var o = { color: "blue" }; 
function sayColor(){ 
 alert(this.color); 
} 
var objectSayColor = sayColor.bind(o); 
objectSayColor(); //blue

```


### call, apply, bind 区别
call()方法与 apply()方法返回的结果是完全相同的，至于是使用 apply()还是 call()，完全取决于你采取哪种给函数传递参数的方式最方便。

除了第一个参数外，call 可以接收一个参数列表，apply 只接受一个参数数组。

call/apply改变了函数的this上下文后`马上执行该函数`

bind则是返回改变了上下文后的函数,`不执行该函数`

```js
function add (a, b) {
    return a + b;
}

function sub (a, b) {
    return a - b;
}

add.bind(sub, 5, 3); // 这时，并不会返回 8
add.bind(sub, 5, 3)(); // 调用后，返回 8


```


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

### 使用场景
- 对象继承

```js
function superClass () {
    this.a = 1;
    this.print = function () {
        console.log(this.a);
    }
}

function subClass () {
    superClass.call(this);
    this.print();
}

subClass();
// 1

```

- 方法借用
如判断数据类型

```js
var a = Object.prototype.toString.call();
```
