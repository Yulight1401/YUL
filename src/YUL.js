var tokenizer = require('./TokenAnalysis.js')
var lexicalAnalysis = require('./LexicalAnalysis.js')

var fs = require('fs')
var arguments = process.argv.splice(2)
var path = arguments[0]
var func = arguments[1]

fs.readFile(path, 'utf-8', (err, data) => {
  err ? console.log(err) : compiler(data)
})



function compiler (input) {
//   console.log('源程序:', input)
//   console.log('---------')
  let tokens = tokenizer(input)
  // let ast = parser(tokens)
//   console.log('词法表', tokens)
  // console.log('语法树')
  // console.dir(ast, {showHidden:true, depth:10})
}

// compiler('(add 1 (subtract 4 2))')
