const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
    <span v-for="item in list" :key="item.id">1</span>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',_l((list),function(item){return _c('span',{key:item.id},[_v("1")])}),0)}
 */
console.log('result', result.render)