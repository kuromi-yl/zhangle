---
order: 7
nav:
  title: 面试知识点
  path: /konwledge
---

## 手写promise.all、race
### all
```js
Promise.myall = function (arr) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0) {
            return resolve([])
        } else {
            let res = [],
                count = 0
            for (let i = 0; i < arr.length; i++) {
                // 同时也能处理arr数组中非Promise对象
                if (!(arr[i] instanceof Promise)) {
                    res[i] = arr[i]
                    if (++count === arr.length)
                        resolve(res)
                } else {
                    arr[i].then(data => {
                        res[i] = data
                        if (++count === arr.length)
                            resolve(res)
                    }, err => {
                        reject(err)
                    })
                }

            }
        }
    })
}

```

### race
```js
Promise.myrace = function (arr) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < arr.length; i++) {
            // 同时也能处理arr数组中非Promise对象
            if (!(arr[i] instanceof Promise)) {
                Promise.resolve(arr[i]).then(resolve, reject)
            } else {
                arr[i].then(resolve, reject)
            }

        }
    })
}
```

关于promise的用法请看《异步编程》