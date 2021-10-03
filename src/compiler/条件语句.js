const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
    <span v-if="flag">1</span>
    <span v-else>1</span>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',[(flag)?_c('span',[_v("1")]):_c('span',[_v("1")])])}
 */
console.log('result', result.render)