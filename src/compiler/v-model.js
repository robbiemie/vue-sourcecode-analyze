const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
    <inpu v-model="data" type="text"/>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',[_c('inpu',{attrs:{"type":"text"},model:{value:(data),callback:function ($$v) {data=$$v},expression:"data"}})],1)}
 */
console.log('result', result.render)