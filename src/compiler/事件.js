const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
    <span @click="handleClick">click</span>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',[_c('span',{on:{"click":handleClick}},[_v("click")])])}
 */
console.log('result', result.render)