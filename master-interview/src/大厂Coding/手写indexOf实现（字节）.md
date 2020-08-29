---
order: 2
nav:
  title: 面试知识点
  path: /konwledge
---

## 手写indexOf实现
indexOf有两种
- 搜索字符串第一次出现的指定值的索引，如果未找到，返回 -1
- 返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 -1

### String.prototype.indexOf()
思路：正则，字符串匹配
```js
function sIndexOf(str, searchStr, fromIndex = 0){
    var regex = new RegExp(`${searchStr}`, 'ig')
    regex.lastIndex = fromIndex
    var result = regex.exec(str)
    return result ? result.index : -1
}

// 测试
var paragraph = 'The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?'
var searchTerm = 'dog'
// 测试一：不设置 fromIndex
console.log(sIndexOf(paragraph, searchTerm))
// 40
console.log(paragraph.indexOf(searchTerm));
// 40
// 测试二：设置 fromIndex
console.log(sIndexOf(paragraph, searchTerm, 41))
// 52
console.log(paragraph.indexOf(searchTerm, 41));
// 52
```

### Array.prototype.indexOf()
思路：遍历匹配
```js
function aIndexOf(arr, elem, fromIndex = 0){
    if(!elem) return -1
    for(let i = fromIndex; i < arr.length; i++) {
        if(arr[i] === elem) return i
    }
    return -1
}

// 测试
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']
// 测试一：不设置 fromIndex
console.log(aIndexOf(beasts, 'bison'))
// 1
console.log(beasts.indexOf('bison'))
// 1
// 测试二：设置 fromIndex
console.log(aIndexOf(beasts, 'bison', 2))
// 4
console.log(beasts.indexOf('bison', 2))
// 4
```

总结：
```js
function indexOf(items, item, fromIndex = 0) {
    let isArray = Array.isArray(items);
    let isString = Object.prototype.toString.call(items) == '[object String]';
    if (!isArray && !isString) throw new SyntaxError();
    if(isArray) return sIndexOf(items, item, fromIndex)
    else return aIndexOf(items, item, fromIndex)
}
```