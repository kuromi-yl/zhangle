---
order: 4  
nav:
  title: 面试知识点
  path: /konwledge
---

## 创建对象（new）
创建对象的方法很多，下面介绍几个比较常见的几种创建对象的方法

### 字面量创建

```js
var person = {
    name: 'mia',
    age: 22,
    job: 'dancer',
    sayName: function () {
      console.log(this.name);
    }
}
person.sayName(); // dancer

```

### 工厂模式
即：把实现同一事情的相同代码，放到一个函数中，以后如果再想实现这个功能，就不需要重新编写这些代码了，只要执行当前的函数即可，这就是函数的封装，体现了`高内聚`、`低耦合`的思想：减少页面的中的`冗余代码`，提高代码的`重复利用率`

```js
function createPerson(name, age) {
    var obj = {};
    obj.name = name;
    obj.age = age;
    obj.writeJs = function () {
        console.log(this.name + 'write js');
    }
    return obj;
}

var p1 = createPerson('mia' , 26);
p1.writeJs();

var p2 = createPerson('wind' , 25);
p2.writeJs();
```


### 通过构造函数和new来创建对象

构造函数模式的目的就是为了创建一个自定义`类`，并且创建这个`类`的实例。

并且在`new`的过程中发生什么事情呢？

- 新生成了一个对象 ({})
- 链接到原型 
- 绑定 this
- 返回新对象


```js

function CreateJsPerson(name, age) {
    this.name = name;
    this.age = age;
    this.writeJs = function () {
        console.log(this.name + 'write js');
    }
}
var p1 = new CreateJsPerson('mia' , 25);
p1.writeJs();
var p2 = new CreateJsPerson('wind' , 26);
p2.writeJs();

```
### 手写一个new的实现

``` js
function create() {
    // 创建一个空的对象
    let obj = new Object()
    // 获得构造函数,   删除第一项并返回第一项，即拿到传入的函数
    let Con = [].shift.call(arguments) 
    // 链接到原型
    obj.__proto__ = Con.prototype
    // 绑定 this，执行构造函数
    let result = Con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof result === 'object' ? result : obj
}
//测试一下
function CreateJsPerson(name, age) {
    this.name = name;
    this.age = age;
    this.writeJs = function () {
        console.log(this.name + 'write js');
    }
}

var p1 = create( CreateJsPerson,"mia",25)
p1.writeJs();  //miawrite js

```
高级实现

```js
function create(ctor) {
  if(typeof ctor !== "function"){
    throw "create function the first param must be a function"
  }

  //es6 new.target 是指构造函数
  create.target = ctor;
  //创建对象，并链接原型
  let obj=Object.create(ctor.prototype)
  //将虚数组转化成数组，并且除去第一个参数
  let argArr=[].slice.call(arguments,1);
  //绑定this
  let result = ctor.apply(obj, argArr);
  // 确保 new 出来的是个对象
  return typeof result === 'object' ? result : obj
}

```

### 小插曲
对于 `new` 来说，还需要注意下运算符优先级。

```js
function Foo() {
    return this;
}
Foo.getName = function () {
    console.log('1');
};
Foo.prototype.getName = function () {
    console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 2
```
`new Foo()` 的优先级大于 `new Foo` ，所以对于上述代码来说可以这样划分执行顺序

```js
new (Foo.getName());
(new Foo()).getName();
```
对于第一个函数来说，先执行了 `Foo.getName()` ，所以结果为 1；对于后者来说，先执行 n`ew Foo()` 产生了一个实例，然后通过原型链找到了 `Foo` 上的 `getName` 函数，所以结果为 2。