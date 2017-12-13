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

<表达式> :: = '('{<表达式>}')'

<赋值语句> :: = <变量>' <- '<变量名>

<变量> ::= 'let '<变量名>

<变量名> ::= <名字>
