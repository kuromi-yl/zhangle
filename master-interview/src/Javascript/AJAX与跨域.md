---
order: 18  
nav:
  title: 面试知识点
  path: /konwledge
---

## ajax与跨域
什么是ajax
- Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
- Ajax是异步 `JavaScript `和XML的简写。
- Ajax技术的核心是`XMLHttpRequest` 对象简称XHR。能以异步方式从服务器获取新数据，意味着用户点击按钮，请求数据后，可以不必刷新页面也能获取新数据来更新当前页面。

### XMLHttpRequest 对象
用`XMLHttpReques`对象实现ajax

```js
var xhr = new XMLHttpRequest();

# open() 方法 启动一个请求以备发送，还未发送请求
# 第一个参数用于指定发送请求的方式，这个字符串，不区分大小写，但通常使用大写字母，"GET"和"POST"
# 第二个参数是URL，该URL相对于执行代码的当前页面，也可以使绝对路径
# 第三个参数是表示是否异步发送请求的布尔值，如果不填写，默认为true，表示异步发送
xhr.open("get","ex.txt",false); // 同步

# post 请求如下
xhr.open('post',"login.php",true)
xhr.setRequestHeader("Content-Type","application/x-www-from-urlencoded")
var form = $('#user-info').serialize(); 
// serialize() 方法通过序列化表单值创建 URL 编码文本字符串。
// 格式：FirstName=Mickey&LastName=Mouse
xhr.send(form) // 发送序列化表单数据

# send() 发送请求,调用后请求会被分派到服务器
xhr.send(null);

# 接收响应前，还可以通过 abort() 来取消异步请求。

# 接收到响应，第一件事，检查 status属性，以确定响应已经成功返回。http 标志码为200 视为成功
# 此时，responseText属性的内容已经就绪，responesXML 也可以访问，状态码为304 表示请求的资源并没有被修改。直接使用浏览器中的缓冲的版本。

xhr.onreadystatechange = function(){
  if(xhr.readyState ==4 ){  // 完成，已经接收到全部响应数据，可以在客户端使用
    if((xhr.status >=200 && xhr.status < 300) || xhr.status ==304){
     console.log('请求成功', xhr.responseText)
  }else{
    console.log('请求失败')
  }
  }
}
# readyState 状态值
# 0 未初始化，没有调用open()方法
# 1 启动，调用open()方法，没有调用send()
# 2 发送，调用send(),没有接收到响应
# 3 接收，已经接收到部分数据响应
# 4 完成，已经接收到全部响应数据，可以在客户端使用

```

### XHR的超时设定

```js
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
  if(xhr.readyState ==4 ){  // 完成，已经接收到全部响应数据，可以在客户端使用
    try {
      if((xhr.status >=200 && xhr.status < 300) || xhr.status ==304){
      console.log('请求成功', xhr.responseText)
   }else{
     console.log('请求失败')
   }
    } catch (ex){
      // 由 ontimeout 事件处理
    }
  }
}
xhr.open("get","ex.txt",true); // 异步
xhr.timeout = 1000
xhr.ontimeout = function(){
  console.log('请求超时')
}

xhr.send(null);
```


### 什么是跨域（高频面试）

是指一个域下的文档或者脚本试图去请求另一个域下的资源，这里是广义上的跨域。包含以下：

- 资源跳转：A链接、重定向、表单提交
- 资源嵌入：`<link>、<script>、<img>、<frame>等dom标签`，还有样式中`background:url()、@font-face()`等文件外链脚本请求：js发起的`ajax`请求、`dom和js`对象的跨域操作等
- 我们经常遇到的是狭义的跨域是由浏览器`同源策略`限制的一类请求场景。

**那什么是同源策略呢**
👉同源策略是一个重要的安全策略，它用于限制一个👉origin的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。

**同源的定义：**如果两个 URL 的 `protocol（协议）、port（端口）` (如果有指定的话)和 `host（ip）` 都相同的话，则这两个 URL 是同源。

**同源政策的目的：**是为了保证用户信息的安全，防止恶意的网站窃取数据。

**限制以下几种行为：**
- Cookie、LocalStorage 和 IndexDB 无法读取

- Cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。但是，两个网页一级域名相同，只是二级域名不同，浏览器允许通过设置document.domain共享 Cookie。
- DOM 和 Js对象无法获得
- AJAX 请求不能发送

### 跨域的解决办法（高频面试）
**1. jsonp跨域：只能实现get一种请求。**
实现原理：script、link、img 标签可以加载静态资源，被浏览器允许。

简易代码实现：




```js
> script
> window.abc = function (data) {
>  console.log(data)
> }
> script
> script src="http://localhost:8002/jsonp.js?username=xxx&callback=abc" script
```

前端通过`<script>`请求`http://localhost:8002/jsonp.js并传入相应参数?username=xxx&callback=abc`
后端收到请求，根据路径和参数等信息，动态处理拼接出jsonp.js文件返回给前端。
前端根据jsonp.js文件内容，执行window.abc函数，输出内部数据。

现在让我们封装一下

```js
const request = ({url, data}) => {
  return new Promise((resolve, reject) => {
    // 处理传参成xx=yy&aa=bb的形式
    const handleData = (data) => {
      const keys = Object.keys(data)
      const keysLen = keys.length
      return keys.reduce((pre, cur, index) => {
        const value = data[cur]
        const flag = index !== keysLen - 1 ? '&' : ''
        return `${pre}${cur}=${value}${flag}`
      }, '')
    }
    // 动态创建script标签
    const script = document.createElement('script')
    // 接口返回的数据获取
    window.jsonpCb = (res) => {
      document.body.removeChild(script)
      delete window.jsonpCb
      resolve(res)
    }
    script.src = `${url}?${handleData(data)}&cb=jsonpCb`
    document.body.appendChild(script)
  })
}
// 使用方式
request({
  url: 'xxxxx',
  data: {
    // 传参
    msg: 'helloJsonp'
  }
}).then(res => {
  console.log(res)
})
```

**2. 空iframe加form**
细心的朋友可能发现，JSONP只能发GET请求，因为本质上script加载资源就是GET，那么如果要发POST请求怎么办呢？


```js
const requestPost = ({url, data}) => {
  // 首先创建一个用来发送数据的iframe.
  const iframe = document.createElement('iframe')
  iframe.name = 'iframePost'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const form = document.createElement('form')
  const node = document.createElement('input')
  // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
  iframe.addEventListener('load', function () {
    console.log('post success')
  })

  form.action = url
  // 在指定的iframe中执行form
  form.target = iframe.name
  form.method = 'post'
  for (let name in data) {
    node.name = name
    node.value = data[name].toString()
    form.appendChild(node.cloneNode())
  }
  // 表单元素需要添加到主文档中.
  form.style.display = 'none'
  document.body.appendChild(form)
  form.submit()

  // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
  document.body.removeChild(form)
}
// 使用方式
requestPost({
  url: 'http://localhost:9871/api/iframePost',
  data: {
    msg: 'helloIframePost'
  }
})
```

**3. CORS**

服务器对于CORS的支持，主要就是通过设置`Access-Control-Allow-Origin`来进行的。如果浏览器检测到相应的设置，就可以允许Ajax进行跨域的访问。

浏览器将CORS请求分为两类：`简单请求`和`非简单请求`
只要满足以下两大条件，就属于简单请求：

请求方法是以下三种方法之一：`HEAD、GET、POST`

HTTP的头信息不超出以下几种字段：Accept、Accept-Language、Content-Language、Last-Event-ID。Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain

不同时满足上面两个条件，就是非简单请求

**4. 通过修改`document.domain`来跨域**

将子域和主域的`document.domain`设为同一个主域。 前提条件：这两个域名必须属于同一个基础域名，而且所用的协议，端口都要一致，否则无法使用`document.domain`来进行跨域。
比如主域名是http://crossdomain.com:9099，子域名是http://child.crossdomain.com:9099，这种情况下给两个页面指定一下document.domain即document.domain = crossdomain.com就可以访问各自的window对象了




**5. 使用window.name来进行跨域**
window对象有个`name`属性，该属性有个特征：即在一个窗口（window）的生命周期内，窗口载入的所有页面都是共享一个`window.name`的,每个页面对`window.name`都有读写的权限，`window.name`是持久存在一个窗口载入过的所有页面中的。

**6. Nginx代理**
Nginx配置
```js
server{
    # 监听9099端口
    listen 9099;
    # 域名是localhost
    server_name localhost;
    #凡是localhost:9099/api这个样子的，都转发到真正的服务端地址http://localhost:9871 
    location ^~ /api {
        proxy_pass http://localhost:9871;
    }    
}
```

**7. postMessage跨域**

window.postMessage() 是HTML5的一个接口，专注实现不同窗口不同页面的跨域通讯。

**8. nodejs中间件代理跨域**

node中间件实现跨域代理，原理大致与nginx相同，都是通过启一个代理服务器，实现数据的转发，也可以通过设置cookieDomainRewrite参数修改响应头中cookie中域名，实现当前域的cookie写入，方便接口登录认证。

**9. websocket协议跨域**
WebSocket protocol是HTML5一种新的协议。它实现了浏览器与服务器全双工通信，同时允许跨域通讯，是server push技术的一种很好的实现。


## GET 和 POST 请求的区别（面试高频）
- Get
  - GET请求的数据会附加在URL之后，用问号分割，多个参数用&进行连接。
  - GET请求的数据会暴露在地址栏中。
  - GET请求URL的编码格式采用的是ASCII编码，而不是Unicode编码。
  - GET请求传输大小有限制，大小在2KB。
  - GET相对安全性较差，会被浏览器主动缓存。
  - GET产生一个TCP数据包，head和data一起发送。
  - GET浏览器回退无害。

- POST
  - POST请求会把数据放置在HTTP请求包的包体中，不会直接暴露给用户。
  - POST请求，理论上大小是不会限制的，但是实际上各个服务器会规定POST提交数据大小。
  - POST相对Get更安全，因为参数不会保存浏览器立式或者是web服务器日志中。
  - POST产生两个TCP数据包，header先发送，服务器响应100ms然后继续，发送data，服务器200然后返回数据。
  - POST浏览器回退重新请求。

但是:

大神们会回答， `GET`和`POST`只是`HTTP`协议中的两种请求方式，而HTTP协议之基于`TCP/IP`的应用层协议，无论`POST`和`GET`都是用同一个传输层协议，所以传输上没有区别。
`GET`和`POST`能做的事情是一样的，只要给`GET`加上`request body`，给`POST`加上`url`参数，技术上完全是行得通的。

