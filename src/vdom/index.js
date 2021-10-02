const snabbdom = window.snabbdom

// 定义 patch 函数
const patch = snabbdom.init([
    snabbdom_class,
    snabbdom_props,
    snabbdom_style,
    snabbdom_eventlisteners
])

// 定义 h 函数
const h = snabbdom.h

const data = [
    {
        name: 'a',
        age: 18,
        sex: '男'
    },{
        name: 'b',
        age: 19,
        sex: '男'
    },{
        name: 'c',
        age: 12,
        sex: '女'
    }
]


const app = document.getElementById('app')

let vnode = null

// 渲染函数
function render(data) {
    // 创建新元素
    const newVnode = h('ul', {}, data.map(item => {
        let spans = []
        for(let i in item) {
            spans.push(h('span', {}, item[i]))
        }
        return h('li', {}, spans)
    }))
    if(vnode) {
        // re-render
        patch(vnode, newVnode)
    } else {
        // 将第一次渲染插入容器
        patch(app, newVnode)
    }
    vnode = newVnode
}
// 渲染数据
render(data)
document.getElementById('btn').addEventListener('click', () => {
    data[1].age = 20
    data[2].name = '张长'
    render(data)
})