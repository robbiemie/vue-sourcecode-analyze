const compiler = require('vue-template-compiler')

// 模板
const template = `<div id="app">
        <span>{{message}}</span>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',{attrs:{"id":"app"}},[_c('span',[_v(_s(message))])])}
 * 翻译
 * with(this){return createElement('div',{attrs:{"id":"app"}},[createElement('span',[createTextVNode(toString(message))])])}
 */
console.log('result', result.render)

/**
 * 缩写翻译
  export function installRenderHelpers (target: any) {
    target._c = createElement
    target._o = markOnce
    target._n = toNumber // 数字
    target._s = toString // 字符串
    target._l = renderList // 列表
    target._t = renderSlot
    target._q = looseEqual
    target._i = looseIndexOf
    target._m = renderStatic
    target._f = resolveFilter
    target._k = checkKeyCodes
    target._b = bindObjectProps
    target._v = createTextVNode
    target._e = createEmptyVNode
    target._u = resolveScopedSlots
    target._g = bindObjectListeners
}
 */