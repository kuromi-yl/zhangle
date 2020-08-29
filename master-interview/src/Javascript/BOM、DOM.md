---
order: 16  
nav:
  title: 面试知识点
  path: /konwledge
---

## BOM、DOM
### 什么是DOM
 指的是`文档对象模型`，它指的是把文档当做一个`对象`来对待，这个对象主要定义了处理`网页内容`的方法和接口。

 ### 什么是BOM
 指的是`浏览器对象模型`，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM
的核心是 `window`，而 `window` 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 `Global（全局）`
对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。`window`对象含有`location` 对象、`navigator` 对象、`screen` 对象等子对象，并且 `DOM` 的最根本的对象 `document` 对象也是 `BOM` 的 `window` 对象的子对象。

### 基本的DOM操作
- 创建新节点
```js

  createDocumentFragment()    //创建一个DOM片段
  createElement()   //创建一个具体的元素
  createTextNode()   //创建一个文本节点

```

- 添加、移除、替换、插入
```js

appendChild(node)
removeChild(node)
replaceChild(new,old)
insertBefore(new,old)


```

- 查找
```js
getElementById();
getElementsByName();
getElementsByTagName();
getElementsByClassName();
querySelector();
querySelectorAll();

```

- 属性操作
```js
getAttribute(key);
setAttribute(key, value);
hasAttribute(key);
removeAttribute(key);
```
