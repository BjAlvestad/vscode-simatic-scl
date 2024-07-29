grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    (declarationSubSection+=DeclarationSubSection | vars+=VariableDeclaration)*
    'BEGIN'
    (
        assignment+=Assignment
        | functionCalls+=FunctionCall
        | statementBlocks+=Statements
    )*
    BlockEnd;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
terminal SINGLE_QUOTE_STRING: /'([^'])*'/;
terminal NUMBER returns number: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9-][0-9_]*(\.?[0-9eE_+-]+)?))/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;


CompilerDirective:
    '{'name+=ID ':=' value+=SINGLE_QUOTE_STRING (';' name+=ID ':=' value+=SINGLE_QUOTE_STRING)* ';'? '}';

BlockAttribute:
    ID '=' value=SINGLE_QUOTE_STRING
    | ID ':' value=(ID | SINGLE_QUOTE_STRING | NUMBER)
;

BlockStart:
    (
        'FUNCTION_BLOCK' |
        'FUNCTION' |
        'TYPE' |
        'DATA_BLOCK' |
        'ORGANIZATION_BLOCK'
    ) ('"'name=ID'"' | name=ID) (':' type=(DataType | 'Void'))?;

VariableDeclaration:
    name=ID
    attributes+=VariableAttribute?
    ('AT' refName=[VariableDeclaration:ID])?
    ':'
    (isArray?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')?
    'REF_TO'? dataType=DataType ((children+=VariableDeclaration)* 'END_STRUCT')?
    (assignment?=':=' value=Expression)?
    ';'
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

QualifiedName returns string:
    ID ('.' ID)*
;

// ***********************
// ****  Expressions  ****
// ***********************

Operator returns string:
    // Assignment
    ':=' | '=>' | '?=' | '+=' | '-=' | '*=' | '/=' | '**='
    // Addition
    '+' | '-'
    // Multiplication
    | '*' | '/' | '**' | 'MOD'
    // Logical
    | 'AND' | '&' | 'OR' | 'XOR'
    // Comparison
    | '<' | '<=' | '>' | '>=' | '=' | '<>'
;

ArrayRange:
    start+=Expression ('..' end+=Expression)? (',' start+=Expression ('..' end+=Expression)?)*
;

Expression:
    ((value+=NUMBER)* ('#' ref+=[VariableDeclaration:QualifiedName])* (looseRef+=QualifiedName)* (operator+=Operator)* ('(' args+=Expression (',' args+=Expression)* ')')*)*
;

FunctionCall:
    '#' var=[VariableDeclaration:QualifiedName] '(' args+=Expression (',' args+=Expression)* ')' ';'
;

Assignment:
    '#' var=[VariableDeclaration:QualifiedName] ':=' Expression ';'
;

Statements:
    IfStatement
    | ForStatement
    | WhileStatement
    | RepeatStatement
    | ContinueStatemen
    // | ReturnStatement  // Errors out with "Max call stack size exceeded" for unknown reason
    | ExitStatement
    | JumpLabel
    | ProgramJump
    | CaseLabel
    | CaseStatement
;

ExpressionBlock:
    Expression ';'
;

IfStatement:
    (('IF' | 'ELSIF') condition=Expression 'THEN')
    | 'ELSE'
    | ('END_IF' ';')
;

ForStatement:
    ('FOR' '#'? indexVariable=[VariableDeclaration:QualifiedName] '^'? ':=' initialValue=Expression 'TO' finalValue=Expression ('BY' execution=Expression)? 'DO')
    | ('END_FOR' ';')
;

WhileStatement:
    'WHILE' condition=Expression 'DO' |
    ('END_WHILE' ';')
;

RepeatStatement:
    'REPEAT' 
    | ('UNTIL' condition=Expression 'END_REPEAT' ';')
;

ContinueStatemen returns string:
    'CONTINUE' ';'
;

ReturnStatement:
    'return' value=Expression? ';'
;

ExitStatement returns string:
    'EXIT' ';'
;

JumpLabel:
    name=ID ':'
;

ProgramJump:
    'GOTO' jumpLabel=[JumpLabel:ID] ';'
;

CaseLabel:
    (('#' var+=[VariableDeclaration:QualifiedName]) | start+=NUMBER ('..' end+=NUMBER)?)
    (',' (('#' var+=[VariableDeclaration:QualifiedName]) | start+=NUMBER ('..' end+=NUMBER)?))*
    ':'
;

CaseStatement:
    'CASE' '#' var=[VariableDeclaration:QualifiedName] 'OF'
    | 'ELSE'
    | 'END_CASE' ';'
;
