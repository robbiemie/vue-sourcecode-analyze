const compiler = require('vue-template-compiler')

// 模板
const template = `<div>
    <img :src="imgUrl" />
</div>`

// 编译
const result = compiler.compile(template)

/**
 * 输出
 * with(this){return _c('div',[_c('img',{attrs:{"src":imgUrl}})])}
 */
console.log('result', result.render)