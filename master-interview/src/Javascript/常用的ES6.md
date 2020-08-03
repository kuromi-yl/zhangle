---
order: 14
nav:
  title: 面试知识点
  path: /konwledge
---

## 常用的 ES6

### let 和 const

1. let

   let 声明的变量是不可以重复定义的，且不支持声明提升

2. const

   const 和 let 是一样的，但 const 声明的变量是不允许修改值；
   <br>但是要修改也是可以的，可以把 const 定义的这个变量设置为数组或者对象，因为他们都是引用类型，地址是不变的，添加值就可以了，比如 arr[1]之类的。

let 和 const 还有一个非常大的优点，就是会形成块级作用域，原来 js 是不同于其他编程语言，例如 java，是不会在 for 循环等块形成作用域，所以引入 let 和 const 之后，js 也在块里有了自己的作用域；

### var、let、const 的区别

|       | 重复定义 | 声明提升 | 修改值                         | 块级作用域 |
| ----- | -------- | -------- | ------------------------------ | ---------- |
| let   | 不可     | 不会     | 可                             | 有         |
| const | 不可     | 不会     | 不可(但是可以通过引用类型改变) | 有         |
| var   | 可       | 会       | 可                             | 没有       |

### 解构赋值

按照一定模式，从数组和对象中提取值，对变量进行赋值

```js
let [a, [[b], c]] = [1, [[2], 3]];
foo; // 1
bar; // 2
baz; // 3
let [, , third] = [1, 2, 3];
third; // 3
let [a, , b] = [1, 2, 3];
x; // 1
y; // 3
let [x, y, ...z] = [1];
x; // 1
y; // undefined
z; // []
```

### 箭头函数

1. 箭头函数的 this 指向是不一样的

   它里面的 this 是指外层最近的一个不是箭头函数的 this。如果说外层没有普通函数，则在严格模式下 this 指向的是 window 对象;

2. 箭头函数的 this 指向普通函数时,它的 argumens 继承于该普通函数

3. 使用 new 调用箭头函数都会报错，因为箭头函数没有 constructor

4. 箭头函数都是匿名函数

并且都不用写 function，只有一个参数的时候可以省略括号:

```js
let numbers = [1, 2, 3];
numbers.forEach(item => {
  console.log(item);
});
// 1,2,3
```

### symbol

    symbol是ES6引入的一种数据类型，表示独一无二的值

### 模板字符串

    模板字符串使用反引号(`)标识模板字符串，使用${}来包裹变量，${}不仅可以放入任意JavaScript表达式，可以识别变量，可以进行运算，调用方法等：

```js
var hello = 'hello';
var hi = `${hello},my name is xixi~`;
```

### Set

Set 是 ES6 引入的一种新的数据结构，和数组相似，但是内部元素的值都是唯一的，**没有重复的值**

```js
let arr = [1, 2, 3, 4, 4];
let set = new Set(arr);
console.log(set); // {1, 2, 3, 4}
```

向 Set 加入值的时候，不会发生类型转换，所以 number 类型的 1 和 string 类型的"1"是两个不同的值;
<br>Set 内部判断两个值是否不同，类似于精确相等运算符（===)，但在 Set 内部，两个 NaN 是相等的;

### Map

Map 是一种键值对的集合

```js
const map = new Map();
map.set('name', 'miya');
map.get('name'); // "miya"
map.has('name'); // true
map.delete('name'); // true
map.has('name'); // false
```

如果对同一个键多次赋值，后面的值将覆盖前面的值:

```js
map.set('name', 'mia');
map.get('name'); // "mia"
```

### class

传统语言，例如 Java 或者 C 语言，都有定义类（class）这样的概念，而 JavaScript 生成实例对象的传统方法是通过构造函数：

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.introduce = function() {
  return 'My name is ' + this.name + ', my age is ' + this.age + '';
};

var mia = new Person('mia', 12);
```

但 ES6 引入的`class`可以接近传统语言去生成实例对象；
<br>class 可以看作只是一个语法糖，只是让对象原型的写法更像传统语言的语法而已：

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return 'My name is ' + this.name + ', my age is ' + this.age + '';
  }
}
var mia = new Person('mia', 12);
mia.introduce(); // My name is mia, my age is 12
```

class 还可以使用 extends 关键字继承类（学习 java 后看见 js 有这个真的很舒服了～）
<br>继承的时候,子类必须在 constructor 方法中调用 super 方法。

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    return 'My name is ' + this.name + ', my age is ' + this.age + '';
  }
}

class Baby extends Parent {
  constructor() {
    super() // 继承父类的方法和属性
    this.gender = ‘girl'
  }
}

const baby = new Baby()
child.introduce() // My name is mia, my age is 12
```
