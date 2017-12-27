var tokenTable = require('./TokenTable.js')

var tokenFunDepth = 0
var lineNum = 1
// var ifInFunction = false
module.exports = function tokenizer(input) {
    let WHITESPACE = /\s/
    let ENTER = /\n/
    let NUMBERS = /[0-9]/
  
    let current = 0
  
    let tokens = []
    while (current < input.length) {
  
      let char = input[current]

      if (ENTER.test(char)) {
        lineNum += 1
        current++
        continue
      }
  
      if (char === '+') {
  
        char = input[++current]
        if (char === '+') {
          tokens.push({ type: 'plusplus', value: '++' })
          current++
          continue
        } else {
          tokens.push({ type: 'plus', value: '+'})
          continue
        }
  
      }
  
      if (char === '-') {
  
        char = input[++current]
        if (char === '-') {
          tokens.push({ type: 'minusminus', value: '--' })
          current++
          continue
        } else if (NUMBERS.test(char)) {
          value = '-'
          while(NUMBERS.test(char)) {
            value += char
            char = input[++current]
          }
          tokens.push({type: 'number', value: value})
          continue
        } else {
          tokens.push({ type: 'minus', value: '-'})
          continue
        }
      }
  
      // 注释号
      if (char === '#') {
        char = input[++current]
        while(char != '#') {
          char = input[++current]
        }
        current++
        continue
      }
      if (char === '*') {
  
        tokens.push({
          type: 'star',
          value: '*',
        })
  
        current++
  
        continue
      }
  
      if (char === '/') {
        tokens.push({
          type: 'divi',
          value: '/',
        })
  
        current++
  
        continue
      }
  
      if (char === ',') {
  
        tokens.push({
          type: 'comma',
          value: ',',
        })
  
        current++
  
        continue
      }
  
      if (char === ':') {
  
        tokens.push({
          type: 'colon',
          value: ':',
        })
  
        current++
  
        continue
      }
 
      if (char === '?') {
  
        tokens.push({
          type: 'interrogation',
          value: '?',
        })
  
        current++
  
        continue
      }
  
      if (char === ';') {
  
        tokens.push({
          type: 'semicolon',
          value: ';',
        })
  
        current++
  
        continue
      }
  
      if (char === '{') {
  
        tokens.push({
          type: 'Lbrace',
          value: '{',
        })
  
        current++
  
        continue
      }
  
      if (char === '}') {
        tokens.push({
          type: 'Rbrace',
          value: '}',
        })
        tokenTable.popProgram()
        tokenFunDepth -= 1
        tokenTable.showTokens()
        current++
        continue
      }
  
      if (char === '(') {
  
        tokens.push({
          type: 'Lparen',
          value: '(',
        })
  
        current++
  
        continue
      }
  
      if (char === ')') {
        tokens.push({
          type: 'Rparen',
          value: ')',
        })
        current++
        continue
      }
  
      if (WHITESPACE.test(char)) {
        current++
        continue
      }
  
      if (NUMBERS.test(char)) {
  
        let value = ''
        while (NUMBERS.test(char)) {
          value += char
          char = input[++current]
        }
  
        tokens.push({ type: 'number', value: value })
  
        continue
      }
      
      if (char === "'") {
        let value = ''
        char = input[++current]
        console.log(char)
        while (char !== "'") {
            value += char
            char = input[++current]
        }
        current++
        tokens.push({type: 'string', value: value})
        continue
      }
      if (char === '<') {
  
        char = input[++current]
        if (char === '-') {
          tokens.push({ type: 'evaluate', value: '<-' })
          current++
          continue
        } else {
          tokens.push({ type: 'less', value: '<'})
          continue
        }
  
      }

      if (char === '=') {
  
        char = input[++current]
        if (char === '>') {
          tokens.push({ type: 'function', value: '=>' })
          current++
          continue
        } else {
          tokens.push({ type: 'equal', value: '='})
          continue
        }
  
      }
      
      if (char === '>') {
        tokens.push({
          type: 'bigger',
          value: '>',
        })
        current++
        continue
      }
      
  
      if (char === 'l') {
        let value = ''
  
        char = input[++current]
  
        if (char === 'e') {
          char = input[++current]
          if (char === 't') {
            char = input[++current]
            if (WHITESPACE.test(char)) {
              tokens.push({type: 'variable', value: 'let'})
              continue
            } else {
              current -= 3
              char = input[current]
            }
          } else {
            current -= 2
            char = input[current]
          }
        } else {
          char = input[--current]
        }
      }
      if (char === 'f') {
        let value = ''
  
        char = input[++current]
  
        if (char === 'u') {
          char = input[++current]
          if (char === 'n') {
            char = input[++current]
            if (WHITESPACE.test(char)) {
              tokens.push({type: 'function', value: 'fun'})
              tokenTable.pushProgram()
              tokenFunDepth += 1
              tokenTable.showTokens()
              continue
            } else {
              current -= 3
              char = input[current]
            }
          } else {
            current -= 2
            char = input[current]
          }
        } else {
          char = input[--current]
        }
      }
      let LETTERS = /[a-z]/i
      if (LETTERS.test(char)) {
        let value = ''
  
        while (LETTERS.test(char) || NUMBERS.test(char)) {
          value += char
          char = input[++current]
        }
  
        tokens.push({ type: 'name', value: value})
        tokenTable.pushToken({type: 'name', value: value, funDep: tokenFunDepth, lineNum: lineNum})
        continue
      }
  
      throw new TypeError('I dont know what this character is: ' + char)
    }
  
    return tokens
  }