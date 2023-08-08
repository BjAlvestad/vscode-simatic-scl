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
    name=ID ':' type=ID (':=' value=INT)? ';';

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
    If | Assignment | LocalVariable | NumberLiteral | StringLiteral;

LocalVariable:
    '#' variable=[Var:ID];

NumberLiteral:
    number=INT;

StringLiteral:
    string=STRING;

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
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;
terminal ASSIGNMENT: /[:][=]/;
terminal SEMICOLON: /;/;
terminal COLON: /:/;
terminal EQUALS: /=/;

// terminal IF: /if/;
// terminal THEN: /then/;
// terminal ELSE: /else/;
// terminal WHILE: /while/;
// terminal DO: /do/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
