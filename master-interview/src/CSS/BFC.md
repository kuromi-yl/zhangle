---
order: 2
nav:
  title: 面试知识点
  path: /konwledge
---

## BFC
### BFC 是什么？
&emsp;&emsp; BFC 是**块级格式化上下文**，它的表现原则是如果一个元素具有 BFC，则其内部子元素不会影响外面的元素，像被封了一个二次元结界一样。
<br>&emsp;&emsp; 所以 BFC 元素是不会方式 margin 重叠，也可以用于清除浮动。

### 哪些元素会触发 BFC？

&emsp;&emsp; 1.根元素
<br>&emsp;&emsp; 2.float 的值不为 none 的
<br>&emsp;&emsp; 3.position 为 fixed 和 absolute 的元素
<br>&emsp;&emsp; 4.display 的值为 inline-block、table-cell、table-caption、flex、inline-flex 的元素
<br>&emsp;&emsp; 5.overflow 不为 visble 的元素
