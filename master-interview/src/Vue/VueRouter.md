---
order: 3
nav:
  title: 面试知识点
  path: /konwledge
---

### Vue-Router

#### 导航守卫

`导航守卫`就是路由跳转过程中的一些函数，在这些跳转前后等时刻，可以通过这些函数进行一些操作，比如在登录后跳转进页面之前检查一下用户是不是真的登陆了。

`导航守卫`分为三种：全局、路由独享、组件内；

1. 全局导航守卫

   全局导航守卫是指写在路由实例上的，特点是触发路由就会触发，有三个，分别是`beforeEach`、`beforeResolve`和`afterEach`：

   1. 全局前置守卫 --- `beforeEach`

      在路由跳转前触发，接收三个参数：`to`、`from`和`next`:
      <br> `to`: 指目标路由对象；
      <br> `from`: 将要离开的路由对象;
      <br> `next`: 一定要调用该方法才能 resolve 当前这个钩子，继续往下执行下一个钩子！

      1. `next()`: 继续往下执行下一个钩子。如果钩子都执行完了，那么现在导航的状态就是 confirmed；
      2. `next(false)`: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址，运用场景可能是登录验证不通过的情况下进行一种处理）；
      3. `next('/') 或 next({ path: '/' })`: 跳转到一个不同的地址，如果当前的导航被中断，就会进行一个新的导航。可传递的参数与 router.push 中选项一致；
      4. `next(error)`: 导航会被终止且该错误会被传递给 router.onError() 注册过的回调；
      5. `next((vm)=>{})`: 在 beforeRouteEnter 钩子中内接收的回调函数参数为当前组件的实例；

   2. 全局解析守卫 --- `beforeResolve`

      和`beforeEach`类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，全局解析守卫被调用；

   3. 全局后置钩子 --- `afterEach`

      在路由跳转完成后触发；

2. 路由独享导航守卫
   路由独享导航守卫是指可以在单个路由配置时设置的守卫，有一个，为`beforeEnter`，和`beforeEach`相似，如果都设置则在先`beforeEach`再`beforeEnter`；

3. 组件内导航守卫
   组件内导航守卫是指在组件内执行的钩子函数，有三个，分别是：`beforeRouteEnter`、`beforeRouteUpdate`和`beforeRouteLeave`：
   1. `beforeRouteEnter`
      路由进入之前调用，因为当守卫执行前，组件实例还没被创建，所以**不能获取到 this**，但是可以通过传一个回调给 next 来访问组件实例：

```js
beforeRouteEnter (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
      })
  }
```

2.  `beforeRouteUpdate`
    在当前路由改变，但是该组件被复用时调用，**可以访问组件实例 this**，应用场景举个 🌰：对于一个带有动态参数的路径 /login/:name，在 /login/miya 和 /login/mia 之间跳转的时候，因为会渲染同样的 login 组件（即复用了组件），这个钩子就会在这个情况下被调用；

3.  `beforeRouteLeave`
    导航离开该组件的对应路由时调用，**可以访问组件实例 this**，可以通过 next(false) 来取消：

```js
beforeRouteLeave (to, from, next) {
    const leaveOrNot = window.confirm('Do you want to leave?')
      if (leaveOrNot) {
        next()
      } else {
        next(false)  // 取消离开
      }
}
```




