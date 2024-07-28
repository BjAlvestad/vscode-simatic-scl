grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    (declarationSubSection+=DeclarationSubSection | vars+=VariableDeclaration)*
    'BEGIN'
    (assignment+=Assignment)*
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

Expression:
    ((value+=NUMBER)* ('#' ref+=[VariableDeclaration:QualifiedName])* (looseRef+=QualifiedName)* (operator+=Operator)* ('(' args+=Expression (',' args+=Expression)* ')')*)*
;

Assignment:
    '#' var=[VariableDeclaration:QualifiedName] ':=' Expression ';'
;
