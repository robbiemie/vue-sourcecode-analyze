# vue sourcecode analyze

## 实现一个响应式系统


### 1. 实现基础结构

- 通过 defineReactive 达到属性监听目的

该 API 的缺点

- 不能深度监听对象属性，需要递归遍历
- 如果对象嵌套层数过深，递归过深，一次性计算量大
- 无法监听新值属性/删除属性 (需要使用 Vue.set、Vue.delete 方法)
- 无法监听原生数组，需要特殊处理


```js
function updateView() {
    console.log('更新视图')
}
// 重新定义属性
function defineReactive(target, key, value)  {
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newVal) {
            if(newVal !== value) {
                // 重新赋值
                // 注意！！！此处的value处于闭包中，修改value
                // 在 get 函数中是可以获取到最新的值
                value = newVal
                // 重新更新视图
                updateView()
            }
        }
    })
}

function observer(target) {

    if(!target || typeof target !== 'object') return target

    Object.keys(target).forEach(key => {
        defineReactive(target, key, target[key])
    })
}


// 1.定义数据
const data = {
    name: "robbie",
    age: 27
}
// 2.响应式数据 
observer(data)

// 3.修改数据
data.name = 'yolo' // 更新视图
data.name = 'yolo'
data.age = 18 // 更新视图

```

### 2. 深度监听对象

可以通过递归的方式，深度监听对象

```js
function updateView() {
    console.log('更新视图')
}
// 重新定义属性
function defineReactive(target, key, value)  {
    if(typeof value === 'object') {
        // 递归进行深度监听
        observer(value)
    }
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newVal) {
            if(newVal !== value) {
                // 重新赋值
                // 注意！！！此处的value处于闭包中，修改value
                // 在 get 函数中是可以获取到最新的值
                value = newVal
                // 重新更新视图
                updateView()
            }
        }
    })
}

function observer(target) {

    if(!target || typeof target !== 'object') return target

    Object.keys(target).forEach(key => {
        defineReactive(target, key, target[key])
    })
}


// 1.定义数据
const data = {
    name: "robbie",
    age: 27,
    info: {
        sex: 0
    }
}
// 2.响应式数据 
observer(data)

// 3.修改数据
data.name = 'yolo' // 更新视图
data.name = 'yolo'
data.age = 18 // 更新视图
data.info.sex = 1 // 更新视图
```

### 3.监听数组

将数组类型的原型对象方法覆写，达到响应式目的

```js
function updateView() {
    console.log('更新视图')
}


const originArrayProto = Array.prototype;
const arrayProto = Object.create(originArrayProto);
// 覆写数组原型方法
['push', 'pop', 'shift', 'unshift', 'splice'].forEach(key =>  {
    arrayProto[key] = function() {
        updateView()
        originArrayProto[key].call(this, ...arguments)
    }
})

// 重新定义属性
function defineReactive(target, key, value)  {
    if(typeof value === 'object') {
        // 递归进行深度监听
        observer(value)
    }
    // 核心 API
    Object.defineProperty(target, key, {
        get() {
            return value
        },
        set(newVal) {
            if(newVal !== value) {
                // 如果新值是个对象类型,此时需要深度监听
                observer(newVal)
                // 重新赋值
                // 注意！！！此处的value处于闭包中，修改value
                // 在 get 函数中是可以获取到最新的值
                value = newVal
                // 重新更新视图
                updateView()
            }
        }
    })
}

function observer(target) {

    if(!target || typeof target !== 'object') return target
    if(Array.isArray(target)) {
        // 覆写当前数组的原型
        target.__proto__ = arrayProto
    }
    Object.keys(target).forEach(key => {
        defineReactive(target, key, target[key])
    })
}


// 1.定义数据
const data = {
    name: "robbie",
    age: 27,
    info: {
        sex: 0
    },
    address: [1,2,3]
}
// 2.响应式数据 
observer(data)

// 3.修改数据
data.name = 'yolo' // 更新视图
data.name = 'yolo'
data.age = 18 // 更新视图
data.info.sex = 1 // 更新视图
data.name = {test: '1'} // 更新视图
data.name.test = 2 // 更新视图
data.age1 = 19
data.address.push(4) // 更新视图
```


