---
order: 0 
nav:
  title: 面试知识点
  path: /konwledge
---
## CSS属性
## display属性
1. block:
<br>块类型。默认宽度为父元素宽度，可设置宽高，换行显示。

2. inline:
<br>行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。

3. inline-block:
<br>行内块级元素类型。默认宽度为内容宽度，可以设置宽高，同行显示。

4. none:
<br>元素不显示，并从文档流中移除。

5. list-item:
<br>列表元素类型。像块类型元素一样显示，并添加样式列表标记。

6. table:
<br>块级表格元素类型。会作为块级表格来显示。

7. inherit:
<br>规定应该从父元素继承display属性的值。

8. flex:
<br>Flex布局。 
          
9. grid:
<br>Grid布局。

## position 属性
position 有 5 个属性值，分别是 absolute、relative、fixed、static 和 sticky：

1. static:
<br>&emsp;&emsp;这是默认值，元素会出现在正常的流中。此时 top, right, bottom, left 和 z-index 属性无效。

2. absolute:
<br>&emsp;&emsp;绝对定位，元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
<br>&emsp;&emsp;top，right，bottom 和 left 属性决定了该元素的最终位置，position:absolute 常常和他们配套使用，完成对固定宽度元素的居中效果。

3. relative:
<br>&emsp;&emsp;相对定位，相对于其正常位置进行定位，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置。

4. fixed:
<br>&emsp;&emsp;固定定位，元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。
<br>&emsp;&emsp;元素的位置在屏幕滚动时不会改变。

5. sticky:
<br>&emsp;&emsp;粘性定位，元素根据正常文档流进行定位，然后相对它的最近滚动祖先，基于 top, right, bottom, 和 left 的值进行偏移。
