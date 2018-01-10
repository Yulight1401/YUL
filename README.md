# YUL
A Compiler that compile YUL language to nodeJS program

Use YACC to generate FrontEnd
Use LLVM to generate BackEnd

语言例子：
```
# 123 #
let a <- -2;
let b <- 1;
(b > 1) ? {
a++;
b--;
} (a > 0) ? {
a + b;
};
```

符号类型： value, equal, semicolon, Lbrace, Rbrace, Lparen, Rparen

> 文法：

<条件语句> :: = <表达式>'?'<语句>{<表达式>'?'<语句>}[':'<语句>]

<循环语句> ::= 'while('<表达式>'){'<语句>'}'

<表达式> :: = '('{<表达式>}')'

<赋值语句> :: = <变量> | <声明语句> '<-' <变量名>|<基础类型>|<函数句>

<函数语句> ::= '('<参数>')' '=>' '{' <语句> '}'

<参数> ::= <变量>{','<变量>}

<函数执行语句> ::= <变量>'('<参数>')'

<声明语句> :: = 'let' <变量名>

<变量> ::= <变量名>

<变量名> ::= [a-z|A-Z|0-9]
