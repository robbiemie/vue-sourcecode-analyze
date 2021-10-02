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
data.address.push(4)