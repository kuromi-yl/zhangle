---
order: 2
nav:
  title: 面试知识点
  path: /konwledge
---

## BFC

### BFC 是什么？

&emsp;&emsp; BFC 是**块级格式化上下文**，它的表现原则是如果一个元素具有 BFC，则其内部子元素不会影响外面的元素，像被封了一个二次元结界一样。
<br>&emsp;&emsp; 所以 BFC 元素是不会发生 margin 重叠，也可以用于清除浮动。

### 哪些元素会触发 BFC？

&emsp;&emsp; 1.根元素
<br>&emsp;&emsp; 2.float 的值不为 none 的
<br>&emsp;&emsp; 3.position 为 fixed 和 absolute 的元素
<br>&emsp;&emsp; 4.display 的值为 inline-block、table-cell、table-caption、flex、inline-flex 的元素
<br>&emsp;&emsp; 5.overflow 不为 visble 的元素

### BFC 的作用

1. 清除浮动

```
<style>
  .box1, .box2{
    width:100px;
    height:100px;
    float:left;
    border: 1px solid #333;
  }
  .box{
    background:#9fd09f;
    overflow:hidden;  /* BFC */
  }
</style>
<div class="box">
    <div class="box1"></div>
    <div class="box2"></div>
</div>
```

清除前会导致父级高度崩塌：
![清除前](http://121.199.7.48/image/bfcafter.jpg)
<br>清除后父级高度正常：
![清除后](http://121.199.7.48/image/bfcbefore.jpg)

2. 自适应两栏布局

```
<style type="text/css">
  .father {
    border: 1px solid #444;
    max-width: 400px;
    height: 100px;
  }
  .float {
    width: 100px;
    height: 100%;
    background-color: red;
    float: left;
  }
  .girl {
    overflow: hidden;
  }
</style>
<div class="father">
  <div class="float"></div>
  <p class="girl">hello it is a little girl.hello it is a little girl.hello it is a little girl.hello it is a little girl.hello it is a little girl.</p>
</div>
```

![两栏布局](http://121.199.7.48/image/two.jpg)
