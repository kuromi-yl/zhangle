---
order: 1
nav:
title: 面试知识点
path: /konwledge
---

## CSS 选择器

### 1.CSS 选择器有哪些？

&emsp;&emsp; 1. id 选择器 &emsp; <span style="color:#607fda;">(#)</span>

&emsp;&emsp; 2. 类选择器 &emsp; <span style="color:#607fda;">(.)</span>

&emsp;&emsp; 3. 标签选择器 &emsp; <span style="color:#607fda;">(p)</span>

&emsp;&emsp; 4. 后代选择器 &emsp; <span style="color:#607fda;">(h1 p)</span>

&emsp;&emsp; 5. 相邻后代选择器 &emsp; <span style="color:#607fda;">(ul > li) (紧跟着的第一层)</span>

&emsp;&emsp; 6. 兄弟选择器 &emsp; <span style="color:#607fda;">(li ~ a)</span>

&emsp;&emsp; 7. 相邻兄弟选择器 &emsp; <span style="color:#607fda;">(li + a)</span>

&emsp;&emsp; 8. 属性选择器 &emsp; <span style="color:#607fda;">(a[rel="external"])</span>

&emsp;&emsp; 9. 伪类选择器 &emsp; <span style="color:#607fda;">(a:hover,li:nth-child)</span>

&emsp;&emsp; 10. 伪元素选择器 &emsp; <span style="color:#607fda;">(::before、::after)</span>

&emsp;&emsp; 11. 通配符选择器 &emsp; <span style="color:#607fda;">(\*)</span>

### 2.CSS 选择器的优先级如何计算？

如果有多个选择器同时指向一个元素，则优先级高的选择器的样式会应用到这个属性。而优先级是用权重来计算的。
权重从高到低分别是：

&emsp;&emsp; 1. !important

&emsp;&emsp; 2. 行内样式

&emsp;&emsp; 3. ID 选择器

&emsp;&emsp; 4. 类选择器 / 属性选择器 / 伪类选择器

&emsp;&emsp; 5. 标签选择器 / 伪元素选择器

&emsp;&emsp;<p style="color:#333"> 其中 !important 优先级最高，但是需要谨慎使用，因为它没有上下文结构的，很多时候 CSS 样式不理想就可能是你不小心将 !important 应用到一个样式，但却忘记了。</p>
当有多个不一样权重的选择器一起出现的时候，用`(行内样式, ID 选择器数量, 类/属性/伪类选择器数量, 标签/伪元素选择器数量)`这样的向量进行计算：

```css
------- html -------

<div id="box" class="container">
<p id="content" class="article">hello</p>
</div>

------- css --------

/* 优先级为(0, 2, 0, 0) */
#box #content {
  color: red;
}
/* 优先级为(0, 0, 1, 1) */
div .article {
  color: blue;
}

// 最后应用color为red
```
