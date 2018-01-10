module.exports = function parser(tokens) {
  let current = 0
  let temp = 0
  function letSent () {
    let nextToken = tokens[++current]
    let left = {}
    let right = {}
    if (nextToken.type === 'name') {
      nextToken = tokens[++current]
      left = nextToken
      if (nextToken.type === 'evaluate') {
        nextToken = tokens[++current]
        right = nextToken
        if (nextToken.type === 'string' || nextToken.type === 'number' || nextToken.type === 'name') {
          return {
            type: 'declearSentence',
            left: left,
            right: right 
          }
        } else {
          throw new Error('except string|number|name')
        }
      } else {
        throw new Error('except evaluate')
      }
    } else {
      throw new Error('except name')
    }
  }
  function argumentsSent () {
    let nextToken = tokens[++current]
    let tokens = []
    while (nextToken.type === 'name') {
      tokens.push(nextToken)
      nextToken = tokens[++current]
      if (nextToken.type === 'Rparen') {
        --current
        break
      }
    }
    return {
      type: 'arguments',
      value: tokens
    }
  }
  function funcSent () {
    let params = []
    let name = ''
    let body = []
    let nextToken = tokens[++current]
    if (nextToken.type === 'name') {
      nextToken = tokens[++current]
      if (nextToken.type === 'Lparen') {
        let arguments = argumentsSent()
        nextToken = tokens[++current]
        if (nextToken.type === 'Rparen') {
          nextToken = tokens[++current]
          if (nextToken.type === 'Lbrace') {
            nextToken = tokens[++current]
            while(nextToken.type !== 'Rbrace') {
              body.push(walk())
              nextToken = tokens[++current]
            }
            if (nextToken.type === 'Rbrace') {
              return {
                type: 'function',
                arguments: arguments,
                body: body
              }
            }
          }  else {
            throw new Error('function needs a block')
          }
        }  else {
          throw new Error('function needs a arguments block')
        }
      } else {
        throw new Error('function needs arguments')
      }
    } else {
      throw new Error('function needs a name')
    }
  }
  function expressionSent () {
    let nextToken = tokens[++current]
    if (nextToken.type === 'number') {
      return {
        type: 'expressionBlock',
        value: nextToken.value
      }
    } else if (nextToken.type === 'name') {
      let tokens = []
      tokens.push(nextToken)
      if (nextToken.type === 'expression') {
        nextToken = tokens[++current]
        tokens.push(nextToken)
        if (nextToken.type === 'name') {
          nextToken = tokens[++current]
          tokens.push(nextToken)
          return {
            type: 'expressionBlock',
            value: tokens
          }
        } else {
          throw new Error('needs a name after expression')
        }
      } else {
        throw new Error('needs a expression')
      }
    } else {
      throw new Error('expression dont fit the lex')
    }
  }
  function whileSent () {
    let body = {}
    let nextToken = tokens[++current]
    if (nextToken.type === 'Lparen') {
      let expression = expressionSent()
      nextToken = tokens[++current]
      if (nextToken.type === 'Rparen') {
        nextToken = tokens[++current]
        if (nextToken.type === 'Lbrace') {
          nextToken = tokens[++current]
          while(nextToken.type !== 'Rbrace') {
            body.push(walk())
            nextToken = tokens[++current]
          }
          if (nextToken.type === 'Rbrace') {
            return {
              type: 'while',
              arguments: expression,
              body: body
            }
          }
        }  else {
          throw new Error('function needs a block')
        }
      }  else {
        throw new Error('while needs a expression block')
      }
    } else {
      throw new Error('while needs expression')
    }
  }
  function walk() {
    let token = tokens[current]
    if (token.type === 'let') {
      temp = current
      let result = letSent()
      return result
    }
    if (token.type === 'function') {
      temp = current
      let result = funcSent()
      return result
    }
    if (token.type === 'while') {
      temp = current
      let result = whileSent()
      return result
    }
    if (token.type === 'name') {
      temp = current
      return {
        type: 'NumberLiteral',
        value: token.value,
      }
    }
    if (token.type === 'string') {
      current++

      return {
        type: 'StringLiteral',
        value: token.value,
      }
    }

    if (
      token.type === 'paren' &&
      token.value === '('
    ) {

      token = tokens[++current]

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      }

      token = tokens[++current]
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }

    throw new TypeError(token.type + ':' + token.value)
  }
  let ast = {
    type: 'Program',
    body: [],
  }

  while (current < tokens.length) {
    ast.body.push(walk())
  }

  return ast
}