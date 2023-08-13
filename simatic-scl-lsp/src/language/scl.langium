grammar Scl

entry Model:
    (functionBlocks+=FunctionBlock)*; // persons+=Person | greetings+=Greeting | | assignments+=Assignment | expressions+=Expression)*;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

FunctionBlock:
    'FUNCTION_BLOCK' blockName=STRING Vars* 'BEGIN' Body 'END_FUNCTION_BLOCK';
// 'FUNCTION_BLOCK' blockName=STRING 'VAR_INPUT' (vars+=Var)* 'END_VAR' 'VAR_OUTPUT' (vars+=Var)* 'END_VAR' 'VAR_IN_OUT' (vars+=Var)* 'END_VAR' 'VAR_TEMP' (vars+=Var)* 'END_VAR' 'END_FUNCTION_BLOCK';

Vars:
    VarInput | VarOutput | VarInOut | VarStatic | VarTemp;

VarInput:
    'VAR_INPUT' (vars+=Var)* 'END_VAR';

VarOutput:
    'VAR_OUTPUT' (vars+=Var)* 'END_VAR';

VarInOut:
    'VAR_IN_OUT' (vars+=Var)* 'END_VAR';

VarStatic:
    'VAR' (vars+=Var)* 'END_VAR';

VarTemp:
    'VAR_TEMP' (vars+=Var)* 'END_VAR';

Var:
    Var_Real | Var_Int | Var_General;

// Declaration/assignment for elementary data types
// BOOL CHAR INT TIME BYTE DINT DATE WORD REAL TIME_OF_DAY DWORD S5TIME
Var_Real:
    name=ID ':' type='REAL' (':=' value=REAL_LITERAL)? ';';

Var_Int:
    name=ID ':' type='INT'|'DINT' (':=' value=INTEGER_LITERAL)? ';';

// Declaration/assignment for complex data types
// DATE_AND_TIME STRING ARRAY STRUCT

// Declaration/assignment catch all
Var_General:
    name=ID ':' type=ID (':=' value=Value)? ';';

Body:
    (statements+=Statement)*;

Statement:
    If | While | Assignment | Expression;

If:
    'IF' condition=Expression 'THEN' then=Expression 'ELSE' else=Expression;

While:
    'WHILE' condition=Expression 'DO' body=Body;

Assignment:
    LocalVariable ':=' expression=Expression ';';

Expression:
    If | Assignment | LocalVariable | INTEGER_LITERAL | REAL_LITERAL | StringLiteral;

LocalVariable:
    '#' variable=[Var:ID];

StringLiteral:
    string=STRING;

Value:
    INTEGER_LITERAL | REAL_LITERAL | StringLiteral;

// Assignment:
//     assignment=ASSIGNMENT;

// Expression:
//     If | Assignment;// | Variable | Number | String;
// If | While | Assignment | Variable | Number | String;

// If:
//     'IF' condition=Expression 'ELSE' else=Expression;
// 'IF' condition=Expression 'then' then=Expression 'ELSE' else=Expression;

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal LOCAL_VAR: /#[_a-zA-Z][\w_]*/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;
terminal SEMICOLON: /;/;
terminal COLON: /:/;
terminal EQUALS: /=/;
terminal BOOL: /true|false/;

terminal ASSIGNMENT: /:=/;
terminal EXPONENTIAL: /\*\*/;
terminal BASIC_MATH_OPERATOR: /[+-*/]|MOD|DIV/;
terminal BASIC_COMPARATIVE_OPERATOR: /<|>|<=|>=|=|<>/;
terminal BASIC_LOGICAL_OPERATOR: /AND|&|XOR|OR/;
// terminal fragment OPERATOR_MATH_EXPONENTIAL: /\\*\\*/;
// terminal fragment OPERATOR_MATH_PLUS: /\\+/;

terminal fragment BINARY_DIGIT: /2#([0-1](_[0-1])?)+/;
terminal fragment OCTAL_DIGIT: /8#([0-7](_[0-7])?)+/;
terminal fragment HEX_DIGIT: /16#([0-9a-fA-F](_[0-9a-fA-F])?)+/;
terminal fragment DECIMAL_DIGIT: /([0-9](_[0-9])?)+/;
terminal fragment EXPONENT: /[eE][+-]?/DECIMAL_DIGIT;
terminal REAL_LITERAL: /[+-]?/((DECIMAL_DIGIT('.'DECIMAL_DIGIT)?EXPONENT)|(DECIMAL_DIGIT'.'DECIMAL_DIGIT));
terminal INTEGER_LITERAL: /[+-]?/BINARY_DIGIT|OCTAL_DIGIT|HEX_DIGIT|DECIMAL_DIGIT;


// terminal IF: /if/;
// terminal THEN: /then/;
// terminal ELSE: /else/;
// terminal WHILE: /while/;
// terminal DO: /do/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
