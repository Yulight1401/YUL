var fs = require('fs')
fs.readFile('../examples/main.txt', 'utf-8', (err, data) => {
  err ? console.log(err) : compiler(data)
})

function tokenizer(input) {
  let WHITESPACE = /\s/;
  let NUMBERS = /[0-9]/;

  let current = 0;

  let tokens = [];
  while (current < input.length) {

    let char = input[current];

    if (char === '+') {

      char = input[++current];
      if (char === '+') {
        tokens.push({ type: 'plusplus', value: '++' });
        current++
        continue;
      } else {
        tokens.push({ type: 'plus', value: '+'})
        continue
      }

    }

    if (char === '-') {

      char = input[++current];
      if (char === '-') {
        tokens.push({ type: 'minusminus', value: '--' });
        current++
        continue;
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
      });

      current++;

      continue;
    }

    if (char === '/') {

      tokens.push({
        type: 'divi',
        value: '/',
      });

      current++;

      continue;
    }

    if (char === ',') {

      tokens.push({
        type: 'comma',
        value: ',',
      });

      current++;

      continue;
    }

    if (char === ':') {

      tokens.push({
        type: 'colon',
        value: ':',
      });

      current++;

      continue;
    }

    if (char === '?') {

      tokens.push({
        type: 'interrogation',
        value: '?',
      });

      current++;

      continue;
    }

    if (char === ';') {

      tokens.push({
        type: 'semicolon',
        value: ';',
      });

      current++;

      continue;
    }

    if (char === '{') {

      tokens.push({
        type: 'Lbrace',
        value: '{',
      });

      current++;

      continue;
    }

    if (char === '}') {
      tokens.push({
        type: 'Rbrace',
        value: '}',
      });
      current++;
      continue;
    }

    if (char === '(') {

      tokens.push({
        type: 'Lparen',
        value: '(',
      });

      current++;

      continue;
    }

    if (char === ')') {
      tokens.push({
        type: 'Rparen',
        value: ')',
      });
      current++;
      continue;
    }

    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (NUMBERS.test(char)) {

      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value });

      continue;
    }
    if (char === '<') {

      char = input[++current];
      if (char === '-') {
        tokens.push({ type: 'evaluate', value: '<-' });
        current++
        continue;
      } else {
        tokens.push({ type: 'less', value: '<'})
        continue
      }

    }
    if (char === '>') {
      tokens.push({
        type: 'bigger',
        value: '>',
      });
      current++;
      continue;
    }
    if (char === '"') {
      let value = '';

      char = input[++current];

      while (char !== '"') {
        value += char;
        char = input[++current];
      }

      char = input[++current];

      tokens.push({ type: 'string', value });

      continue;
    }

    if (char === 'l') {
      let value = '';

      char = input[++current];

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
    let LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = '';

      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'name', value });

      continue;
    }

    throw new TypeError('I dont know what this character is: ' + char);
  }

  return tokens;
}


function parser(tokens) {

  let current = 0;
  function walk() {
    let token = tokens[current];
    if (token.type === 'number') {
      current++;
      return {
        type: 'NumberLiteral',
        value: token.value,
      };
    }
    if (token.type === 'string') {
      current++;

      return {
        type: 'StringLiteral',
        value: token.value,
      };
    }

    if (
      token.type === 'paren' &&
      token.value === '('
    ) {

      token = tokens[++current];

      let node = {
        type: 'CallExpression',
        name: token.value,
        params: [],
      };

      token = tokens[++current];
      while (
        (token.type !== 'paren') ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      current++;
      return node;
    }

    throw new TypeError(token.type + ':' + token.value);
  }
  let ast = {
    type: 'Program',
    body: [],
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
}

function compiler (input) {
  let tokens = tokenizer(input)
  // let ast = parser(tokens)
  console.log('源程序:', input)
  console.log('词法表', tokens)
  // console.log('语法树')
  // console.dir(ast, {showHidden:true, depth:10})
}

// compiler('(add 1 (subtract 4 2))')
