---
order: 13
nav:
  title: 面试知识点
  path: /konwledge
---

## 数组对象方法专题

以下的方法中改变原数组的方法有 push()、pop()、shift()、unshift()、splice()、reverse()

1. `pop()`

从数组中删除最后一个元素

```js
var mood = ['happy', 'sad', 'angry'];
var x = mood.pop(); // 'angry'
```

<br>

2. `push()`

在末尾添加数组元素

```js
mood.push('bored');
console.log(mood); // ['happy', 'sad', 'angry, 'bored']
```

<br>

3. `shift()`

删除数组的首个元素

```js
var y = mood.shift(); // 'happy'
```

<br>

4. `unshift()`

在开头向数组添加新元素

```js
mood.push('depressed');
console.log(mood); // ['depressed', 'happy', 'sad', 'angry']
```

<br>

5. `toString()`

把数组转换为数组元素（逗号分隔）的字符串

```js
mood.toString(); // happy,sad,angry
```

<br>

6. `join()`

同 toString()，但是 join 可以规定分隔符

```js
mood.join('*'); // happy*sad*angry
```

<br>

7. `concat()`

合并现有数组来创建新的数组

```js
var arr1 = ['hello', 'hi'];
var arr2 = ['nihao'];
var arr3 = ['ninhao'];
var arr4 = arr1.concat(arr2, arr3); // ['hello', 'hi', 'nihao', 'ninhao']
// 连接 arr1 和 arr2 和 arr3
```

<br>

8. `indexOf()`

返回元素的索引

```js
mood.indexOf('happy'); // 0
```

<br>

9. `lastIndexOf()`

同 indexOf()，但是是从后面开始

```js
mood.lastIndexOf('happy'); // 2
```

<br>

10. `sort()`

数组排序，sort()是以字母顺序对数组排序

```js
var fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
fruits.sort();
document.getElementById('demo').innerHTML = fruits;
//返回Apple,Banana,Mango,Orange
```

因为 sort()按照字符串的规则，所以在 25 和 100 之间的比较中得出 25 大于 100 的结论，因为 2 字符编码大于 1
<br>这种情况下，嵌入使用比值函数来处理会更好：

```js
var points = [40, 100, 1, 5, 25, 10];
points.sort(function(a, b) {
  return a - b;
});
```

这里的原理是当 sort() 函数比较两个值时，会将值发送到比较函数，并根据所返回的值（负、零或正值）对这些值进行排序，举例子：

<br>当比较 40 和 100 时，sort() 方法会调用比较函数 function(40,100)，该函数计算 40-100，然后返回 -60（负值，排序函数将把 40 排序为比 100 更低的值
<br>

11. `reverse()`

反转数组中的元素

```js
var mood = ['happy', 'sad', 'angry'];
mood.reverse(); // ['angry', 'sad', 'happy']
```

<br>

12. `forEach()`

对数组进行遍历循环

```js
var numbers = [1, 2, 3, 4, 5];
numbers.forEach(item => {
  console.log(item);
});
// 1,2,3,4,5
```

<br>

13. `map()`

对每个数组元素执行函数来创建新数组，不会对没有值的数组元素执行函数

```js
var numbers1 = [1, 2, 3, 4, 5];
var numbers2 = numbers1.map(myFunction);

function myFunction(value, index, array) {
  return value * 2;
}
//返回2,4,6,8,10
```

<br>

14. `filter()`

创建一个包含通过测试的数组元素的新数组，也就是进行过滤

```js
var numbers = [1, 2, 3, 4, 5];
var over2 = numbers.filter(myFunction);

function myFunction(value, index, array) {
  return value > 2;
}
//返回3,4,5
```

<br>

15. `some()`

检查是否有数组值通过测试，也是一种过滤，只要有一个通过测试就返回 true

```js
var numbers = [1, 2, 3, 4, 5];
var someOver2 = numbers.some(myFunction);

function myFunction(value, index, array) {
  return value > 2;
}
//返回true
```

<br>

16. `every()`

检查是否有数组值通过测试，也是一种过滤，必须所有通过测试才返回 true

```js
var numbers = [1, 2, 3, 4, 5];
var someOver2 = numbers.some(myFunction);

function myFunction(value, index, array) {
  return value > 2;
}
//返回false
```

<br>

17. `find()`

返回通过测试的第一个数组元素的值

```js
var numbers = [1, 2, 3, 4, 5];
var first = numbers.find(myFunction);

function myFunction(value, index, array) {
  return value > 2;
}
//返回3
```

<br>

18. `reduce()`

在每个数组元素上运行函数，以生成单个值，是从左到右工作的

```js
var numbers1 = [1, 2, 3, 4, 5];
var sum = numbers1.reduce(myFunction);

function myFunction(total, value, index, array) {
  return total + value;
}
//total：初始值；value：项目值；index：索引；array：数组
//这个例子确定数组中所有数字的总和
// 返回15
```

<br>

19. `splice()`

该方法向或者从数组中添加\删除项目
2 个参数(要删除的 index 和删除的元素个数)，删除操作
3 个参数(起始位置、删除元素个数、插入的项)，添加操作

```js
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(0, 2)); // [1,2]
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.splice(1, 0, 6, 8)); // [1,6,8,2,3,4,5]
```

<br>

20. `slice(start,end)`
    可从已有数组中返回选定的元素，返回一个新数组，包含从 start 到 end（不包含该元素）的数组元素。

```js
var numbers = [1, 2, 3, 4, 5];
console.log(numbers.slice(2)); // [3,4,5] 从下标2开始一直截取到最后
console.log(numbers.slice(2, 3)); // [3]
```
