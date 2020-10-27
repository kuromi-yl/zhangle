---
order: 4
nav:
  title: 面试知识点
  path: /konwledge
---

### Vue常用指令

Vue的指令书写位置在HTML的开标签中，直白一点，就相当于HTML的特殊属性。不过，这些只指令适用于vue。

说到这儿，就不得不提一嘴HTML的属性。那么HTML的属性有什么特点呢？
- 写在开标签前里面
- 可以写入多个属性
- 属性间空格隔开，然后属性值写在双引号里面
- 扩展了HTML标签的功能

Vue中的指令扩展的不是HTML标签的功能。指令是带有 v- 前缀的特殊属性。它们作用于HTML元素，指令<font color="tomato">提供了一些特殊的特性</font>，将指令绑定在元素上时，指令会为绑定的目标元素添加一些特殊的行为，我们可以将指令看作特殊的HTML属性（attribute）。

下面详细介绍下几种常用的Vue指令。

---

### 1、v-model ：双向数据绑定
v-model 指令**必须**绑定在**表单元素**上（绑其他上面，它也不生效，亲证）。

实现的特性：视图中绑定的data数据，如果发生了改变，模型中的数据也会随之发生改变；然后，模型中的数据发生了改变，视图中的内容也会改变。

然后现在要用m-model指令实现一个小功能：改变view中的数据，模型数据随之发生改变，然后将改变的数据体现在view中。
```html
<script src="./node_modules/vue/dist/vue.js"></script>
<div id="vonDemo">
    <input type="text" v-model="inputData">
    {{inputData}}
</div>
<script>
    new Vue({
        el:"#vonDemo",
        data:{
            inputData:"hello sky"
        },
        methods:{}
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714205242500.gif)

**双向绑定的原理：**<font color="tomato">Vue框架核心的功能就是双向的数据绑定。</font> 双向是指：HTML标签数据 绑定到 Vue对象，另外反方向数据也是绑定的。

而 v-model 指令能够实现双向数据绑定，把视图数据与模型数据相互绑定。

另外，<u>vue数据双向绑定</u> 是通过**数据劫持**结合**发布者-订阅者模式的**方式来实现的。

<font color="0079BA">原理1：数据劫持</font>

&emsp;当我们<u>访问或设置对象的属性</u>的时候，都会触发Object.defineProperty()函数来拦截（劫持），然后返回(get)或设置(set)对象的属性的值。并且当数据发生改变的时候做出反应。

&emsp;通俗点解释的话，通过数据劫持，把改动让vue知道，然后告诉模型中的数据，通知view进行改变。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715091317895.png)

<font color="0079BA">原理2：发布者---订阅者模式</font>

&emsp;定义对象间**一对多**的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知（是不是跟js的发布-监听很像）。

&emsp;这样，当修改了模型数据，只要是关联过的view部分，都会随着模型数据的改变而改变。

### 2、v-show ：通过属性display控制元素隐藏或显示
- 作用：控制切换一个元素的显示和隐藏
- 语法：v-show = 表达式
  + 根据表达式结果的真假，确定是否显示当前元素
  + true表示显示该元素；false(默认)表示隐藏该元素
  + **元素一直存在只是被动态设置了display：none**

```html
<div id="demodiv">
    <p>something</p>
    <p v-show="bool">something</p>
</div>
<script>
    new Vue({
        el:"#demodiv",
        data:{
            bool:true,
        }
    })
</script>
```

效果图：![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714001509953.png)

### 3、v-on ：事件指令
- 作用：为 HTML 元素绑定事件监听
- 语法2种：（以时间click为例）
   - 正式繁写：`v-on:click="fun()"`
   - 简写方式：`@click="fun()"`    &emsp;  常用，推荐
   - 双引号里不仅可以写函数，还可以直接写表达式，比如 `@click="number=-100"`
- 注意：函数定义在 methods 配置项中

```html
<div id="vonDemo">
    <button v-on:click="fun()">点我触发函数</button>
    <button @click="fun()">事件绑定简写版</button>
</div>
<script>
    new Vue({
        el:"#vonDemo",
        data:{},
        // methods来创建函数，比如触发事件的处理函数
        methods:{
            fun(){
                console.log("函数6666666");
            }
        }
    })
</script>
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714001607975.png)

##### 小栗子1：这里还有一个v-show与v-on合作使用
所要实现的功能是，点击button按钮，p标签不断显示、隐藏。
```html
<div id="vonDemo">
    <button @click="fun2()">vue点击</button>
    <p v-show="bool">隐藏与显示的不断切换</p>
</div>
<script>
    new Vue({
        el: "#vonDemo",
        data: {
            bool:true
        },
        methods: {
            fun2() {
                this.bool=!this.bool;
            }
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714002050108.png)  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714002152191.png)

那么如果用原生js来实现的话，会怎样呢，我们来看看：
```html
<div id="vonDemo">
    <button>js点击</button>
    <p>隐藏于显示的不断切换</p>
</div>

<script>
    var bool=false;
    var p=document.querySelector("p");
    var button=document.querySelector("button");
    button.addEventListener("click",clickHandler);
    function clickHandler(e){
        bool=!bool;
        if(bool){
            p.style.display="none";
        }else{
            p.style.display="block";
        }
    }
</script>
```
好像看起来也不是很麻烦的样子，但是如果程序比较大的话，vue的y优势就足以体现出来了。vue不需要对DOM元素进行复杂繁多的操作，而是将创建的变量通过表达式放到DOM元素中的相关位置处，简洁明了。

总体来说，vue比js更加简便。
<br>


##### 小栗子2：v-model v-on v-show   联合使用
```html
<div id="demodiv">
    <p @click="fun()">{{text}}</p>
    <input type="text" v-show="bool" v-model="text">
</div>
<script>
    new Vue({
        el: "#demodiv",
        data: {
            bool: false,
            text:"Edit me",
        },
        methods: {
            fun(){
                this.bool=!this.bool;
                this.text="Edit me";
            }
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715094904784.gif)

### 4、v-for ：遍历展示指令
- 作用：遍历 data 中的数据，并在页面进行数据展示
- 语法：v-for = ‘(item, index) in arr’
  +  item 表示每次遍历得到的元素
  + index 表示item的索引，可选参数
```html
<div id="demodiv">
    <ul>
        <li v-for="(item,index) in arr">{{item}}---{{index}}</li>
    </ul>
    <table>
        <tr>
            <td>姓名</td>
            <td>年龄</td>
            <td>性别</td>
        </tr>
        <tr v-for="(item,index) in obj">
            <td>{{item.name}}</td>
            <td>{{item.age}}</td>
            <td>{{item.sex}}</td>
        </tr>
    </table>
</div>
<!-- VM层 -->
<script>
    // Vue实例，vm层，关联m与v层
    new Vue({
        // 视图层关联 用el
        el: "#demodiv",
        // 模型层关联，用data，创建数据
        data: {
           arr:[100,200,300],
           obj:[
               {name:"jj",age:100,sex:"girl"},
               {name:"jj",age:101,sex:"girl"},
               {name:"jj",age:102,sex:"girl"},
               {name:"jj",age:103,sex:"girl"},
           ]
        },
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200714001425407.png)


### 5、v-bind ：绑定HTML属性
- 作用：如果希望把一个变量插入到HTML属性值中，不能直接{{}}直接插入，或者直接将属性值替换成模型数据变量名。不过vue提供了一个指令，能够**将变量插入到HTML标签的属性值中**。
- 语法：
   + 繁写：`v-bind:属性名 = '表达式'`
   + 简写：`:属性名='表达式'`
- 绑定一个属性：`<img v-bind:src='myUrl' />`
- 绑定多个属性(不能使用简写)：`<img v-bind='{src:myUrl, title: msg}' />` 不能简写

我们通过一个小栗子来看一下v-bind指令的用法。想要实现的功能是，点击a标签，跳转到百度。
```html
<div id="demoSky">
    <a :href="ahref">{{atext}}</a>
</div>
<script>
    new Vue({
        el:"#demoSky",
        data:{
            ahref:"http://baidu.com",
            atext:"点击跳转到百度"
        }
    })
</script>
```
能看到，ahref已经被插入到a标签的href属性值中，并且成功的可以跳转。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020071510034793.png)


#### 小栗子3：v-for v-on v-bind 联合 --- 购物车总价计算
要求1：点击商品选项，改变颜色（用class属性的增添 v-bind）
要求2：计算价格
```html
<div id="demoSky">
    <h4>Services</h4>
    <ul>
        <li v-bind:class="item.status?'yellow':'tomato'" @click="fun(item)" v-for="(item,index) in arr">
            {{item.name}} --------------- {{item.price}}</li>
    </ul>
    <hr> <br>
    <p>Total: {{total}}</p>
</div>
<script>
    new Vue({
        el: "#demoSky",
        data: {
            arr: [
                { name: "apple", price: 10, status: false }, // 设置所有的商品刚开始是未被选中的状态，即status:false
                { name: "bananer", price: 20, status: false },
                { name: "pair", price: 8, status: false },
                { name: "cookie", price: 30, status: false },
            ],
            total: 0,
        },
        methods: {
            fun(item) {
                // 改变li的颜色，改变status的值就好
                item.status = !item.status;

                // 计算总价：每次点击都重新计算一次总价
                if(item.status) this.total+=item.price;
                else this.total-=item.price;
            }
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715105437860.gif)
### 6、v-if ：个人理解 --- 隐藏、显示整个DOM元素  
- 作用：判断是否加载固定的内容
- 语法：v-if = 表达式
  - 根据表达式结果的真假，确定是否显示当前元素
  - true表示加载该元素；false表示不加载该元素
  - 元素的显示和隐藏，是对**Dom元素**进行添加和删除

小练习，点击复选框，显示或者隐藏DOM元素。
```html
<div id="demodiv">
    <input type="checkbox" v-model="bool">模型里的数据：{{bool}}
    <p v-if="bool">九九九</p>
</div>
<script>
    new Vue({
        el: "#demodiv",
        data: {
            // bool: true,//非0就是真，所以如果写字符串或其他，最终会切换成bool值
            bool: "dd",
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715113137907.gif)
###### v-if 与 v-show 的区别 
与v-show不同的是，v-show是对dom元素的dispaly属性进行操作；但是v-if是对dom整个元素进行隐藏或者显示的操作。

另外，v-if有更高的切换消耗；v-show有更高的初始化的渲染消耗（因为元素一直存在，v-show在一开始就要进行渲染）；v-if的安全性高，但v-show随安全性没有要求选择。

### 7、v-else
- **必须配合 v-if 使用**，否则无效。
- 当 v-if 条件不成立的时候执行。
```html
<div id="demoSky">
    <button @click="fun()">点击切换状态</button> 模型里的数据：{{bool}}
   <p v-if="bool">已登录，欢迎-----------v-if</p>
   <p v-else>未登录，请登录---------v-else</p>
</div>
<script>
    new Vue({
        el: "#demoSky",
        data: {
            bool:false
        },
        methods:{
            fun(){
                this.bool=!this.bool;
            }
        }
    })
</script>
```
要么渲染 if 里的，要么渲染 else 里的，二选一。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715113720475.gif)
### 8、v-else-if
- 作用：当有一项成立时执行。
- 多重条件渲染。
```html
<div id="demoSky">
   <!-- v-else-if  多重条件渲染 -->
   <select name="" id="" v-model="text">
       <option value="浏览">浏览</option>
       <option value="哈哈">哈哈</option>
       <option value="哦哦">哦哦</option>
       <option value="慢慢">慢慢</option>
   </select>
   {{text}}
   <p v-if="text=='浏览'">浏览---</p>
   <p v-else-if="text=='哈哈'">哈哈---</p>
   <p v-else-if="text=='哦哦'">哦哦---</p>
   <p v-else-if="text=='慢慢'">慢慢---</p>
   <p v-else>啥都没选</p>
</div>
<script>
    new Vue({
        el: "#demoSky",
        data: {
            text:"",
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715114035300.gif)
### 9、v-text  用得少
- 作用：操作网页元素中的纯文本内容。{{}}算是它的简写。
- v-text 与 {{}} 等价，{{}} 叫模板插值，v-text 叫指令，但是还是有不同之处：
{{}} 有个闪烁的问题，当在渲染数据比较多，可能把大括号显示出来，俗称屏幕闪动；
但 v-text 操作的文本内容要么不显示，要么就显示正确。

小栗子：
```html
<script src="./node_modules/vue/dist/vue.js"></script>
<div id="demoSky">
    <span>{{context}}</span>  ------花括号 {{}}
    <br> <br>
    <span v-text="context"></span>  ------指令 v-text
</div>

<script>
    new Vue({
        el: "#demoSky",
        data: {
            context: "我是文字"
        }
    })
</script>
```
可以看出，正常加载vue.js资源的话，是正常显示的。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715114532198.png)

如果现在去掉`<script src="./node_modules/vue/dist/vue.js"></script>`资源加载，那么情况是下面这样的。可以看出，{{}} 就会成为字符串渲染出来，但v-text 指令控制的内容却没有显示出来。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715114734708.png)

如果是因为网速或其他原因导致vue资源加载缓慢，大括号就会先失效，等资源加载出来才正常显示文本内容。这个过程一般是短暂的，会闪一下，故称为屏幕闪动。

**屏幕闪动出现原因：** 以前是因为网速问题，现在嘛，设备问题。

为了解决屏幕闪动，可以采用以下两种方式：
①：v-text 来渲染数据；
②：{{}} 渲染数据，同时使用 v-cloak 指令 ，然后css中  写 [v-cloak]{display:none;}

v-cloak 用来保持在元素上直到关联实例结束时候进行编译，可以动态判断 是否被vue所管理，比如说在vue没被加载过来时，v-cloak就发挥作用，不会有大括号{{变量}}显示在页面上。
v-cloak要放在什么位置呢，v-cloak并不需要添加到每个标签，只要在el挂载的标签上添加就可以。

之前 v-text 的解决办法已经体现过了，下面用 v-cloak 指令解决一下：
只需要给使用 {{}} 的标签加一条v-cloak指令`<span v-cloak>{{context}}</span>  ------花括号 {{}}`，然后在style标签中写下:
```html
<style>
    [v-cloak] {
        display: none;
    }
</style>
```
，就可以当资源没有加过来的时候不显示文本内容。如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715115201228.png)
### 10、v-html
- 作用：双大括号会将数据解释为纯文本，而非 HTML 。为了输出真正的 HTML ，你需要使用 v-html 指令。
- 语法：`<p v-html="text"></p>`
```html
<div id="demoSky">
   <div>模型数据的变量内容：{{text}}，下面把这个内容变成节点</div> 
   <div v-html="text"></div>
</div>
<script>
    new Vue({
        el: "#demoSky",
        data: {
            text:"<h1>我是h1标签</h1>"
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715115522191.png)

### 11、v-once
**一次性插值，一旦数据插入之后，就不会改变。**

- 作用：当数据改变时，插值处的内容不会更新（会影响到该节点上的所有属性）。
- 语法：`<p v-once>{{text}}</p>`
```html
<div id="demoSky">
    <input type="text" v-model="inputValue" />
    <p>{{inputValue}}</p>
    <p v-once>{{inputValue}}</p>
</div>
<script>
    new Vue({
        el: "#demoSky",
        data: {
            inputValue: "默认值"
        }
    })
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715115645201.png)

<hr>



### 小结
有对DOM元素的操控，有对属性值的操控，对事件的操控，对数据与视图的桥梁操控......

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200715112638258.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzI5NzMyMQ==,size_16,color_FFFFFF,t_70)
