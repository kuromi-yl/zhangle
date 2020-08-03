---
order: 5
nav:
  title: 面试知识点
  path: /konwledge
---

某个时间后就去执行某个函数，使用Promise封装
```js
function sleep(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn);
        }, time);
    });
}
let saySomething = (name) => console.log(`hello,${name}`)
async function autoPlay() {
    let demo = await sleep(saySomething('lele'),1000)
    let demo2 = await sleep(saySomething('miya'),1000)
    let demo3 = await sleep(saySomething('haha'),1000)
}
autoPlay()
```

```jsx
import React from 'react';
import { Button,message,Space } from 'antd';
function sleep(fn, time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn);
        }, time);
    });
}
let saySomething = (name) => message.success(`hello,${name}`)
async function autoPlay() {
    let demo = await sleep(saySomething('lele'),1000)
    let demo2 = await sleep(saySomething('miya'),1000)
    let demo3 = await sleep(saySomething('haha'),1000)
}

export default () => {
    return (
        <Space>
            <Button type="primary" onClick={autoPlay}>点击</Button>
        </Space>
    )
}

```