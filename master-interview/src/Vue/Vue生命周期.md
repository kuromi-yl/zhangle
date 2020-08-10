---
order: 1
nav:
  title: 面试知识点
  path: /konwledge
---

### 生命周期与钩子函数

#### 普通钩子函数

Vue 的生命周期会经过创建、挂载、销毁三个过程，中间可能会涉及更新的过程，在这四个过程里关系到八个钩子函数；下面用引用以下 demo 做实验：

```js
<div id="a">
    <p>{{ num }}</p>
    <button @click="updateNum">update</button>
</div>
<button id="destroy">destroy</button>

<script>
    var vm = new Vue({
        el: '#a',
        data: {
          num: 0,
        },
        methods: {
          updateNum: function () {
            this.num++;
          },
        }
    })
</script>
```

1. beforeCreate()

   创建前钩子函数，会在实例初始化之后，data 数据监听和事件初始化配置之前触发。也就是说这时候的 data、method 等数据以及 DOM 都是获取不到的：

```js
beforeCreate: function () {
    console.log('beforeCreate的num:', this.num); // undefined
    console.log('beforeCreate的$el:', this.$el); // undefined
}
```

2. created()

   在 created 这个阶段，data 数据监听和事件初始化配置已经完成，但模版还未编译，获取不到 DOM：

```js
created: function () {
    console.log('created的num:', this.num); // 0
    console.log('created的$el:', this.$el); // undefined
}
```

3. beforeMount()

   在 beforeMount 这个阶段，是 template 编译或挂载到 HTML 之前:

```js
beforeMount: function () {
    console.log('beforeMount的$el:', this.$el); // <p>{{ num }}</p> // 未挂载到html
}
```

4. mounted()
   在 mounted 这个阶段，是 template 编译或挂载到 HTML 之后，这是的{{ num }} 被 0 替换：

```js
mounted: function () {
    console.log('mounted的$el:', this.$el); // <p> 0 </p>
}
```

5. beforeUpdate()
   数据更新变化之前会触发 beforeUpdate 钩子函数，当点击‘update’按钮之后，会更新 num 的值，更新前会触发该函数：

```js
beforeUpdate: function () {
    console.log('beforeUpdate的$el:', this.$el.querySelector('p').innerText); // beforeUpdate的$el: 0
}
```

6. updated()
   更新完成后会触发 updated：

```js
updated: function () {
    console.log('updated的$el:', this.$el.querySelector('p').innerText); // updated的$el: 1
}
```

7. beforeDestroy() 和 destroyed()

   Vue 实例销毁之前和之后会执行的钩子，要注意的是，销毁是指从 tag 上移除 Vue 实例，意思是 id 为 a 的这个 div 和我们创建的 vm 这个 Vue 实例没有关系了，而不是说把这个 div 从 DOM 树上摘下来。这时候再点击’update‘按钮是没有触发事件的哦。

#### keep-alive
当我们做动态组件的时候，动态组件切换会再展示的时候会重新渲染组件，先前在组件输入的内容就会丢失，而且会重新走一遍生命周期，对用户体验是不友好的，用`keep-alive`包裹的组件在切换时不会进行销毁，而是缓存到内存中，避免组件再次创建。

`keep-alive`有两个钩子函数：

1. activated
当用`keep-alive`包裹的组件在切换时会将被切换的组件（也就是背后的那个组件）会被缓存到内存中并执行`deactivated`钩子函数；

2. deactivated
命中缓存渲染后（切换出来展示组件）会执行`actived`钩子函数。

#### 路由守卫钩子函数
导航守卫也有几个钩子函数，可以去`VueRouter.md`查看；

