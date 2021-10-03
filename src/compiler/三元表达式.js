const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
        <span>{{flag ? message : 'hello'}}</span>
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',[_c('span',[_v(_s(flag ? message : 'hello'))])])}
 */
console.log('result', result.render)