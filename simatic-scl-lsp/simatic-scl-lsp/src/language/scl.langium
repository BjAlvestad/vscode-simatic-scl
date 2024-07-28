grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    (declarationSubSection+=DeclarationSubSection | vars+=VariableDeclaration)*
    'BEGIN'
    // (assignment+=AssignmentToStruct)*
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
terminal NUMBER returns number: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9-][0-9_]*(\.[0-9eE_]+)?))/;

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
    ) ('"'name=ID'"' | name=ID) (':' type=(TypeReference | 'Void'))?;


TypeReference:
    elementary=ElementaryType
    | 'STRUCT'
    | complex=(
        ArrayType
        | StringType
        | DateAndTime
    )
    | 'ANY'
    // | (CustomType | '"' CustomType '"')
    | catchAll=ID
;

ArrayType:
    type='ARRAY' ArrayIndexRange 'OF' elementType=TypeReference;

fragment ArrayIndexRange:
    '[' ArrayIndexRangeElement (',' ArrayIndexRangeElement)* ']';

fragment ArrayIndexRangeElement:
    (indexStart+=Expression '..' indexEnd+=Expression) | '*';

StringType:
    ('WSTRING' | 'STRING') ('[' value=Expression ']')?;

VariableDeclaration:
    name=ID attributes+=VariableAttribute? ('AT' refName=[VariableDeclaration:ID])? ':' 'REF_TO'? structure=TypeReference ((children+=VariableDeclaration)* 'END_STRUCT')? (assignment?=':=' value=Expression)? ';'
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

Expression returns number:
    NUMBER
;

// VariableCall:
//     '#' var=[VariableDeclaration:ID]

// StructCall:
//     '#' var=[StructDeclaration:ID]

// AssignmentToStruct:
//     '#' var=[StructDeclaration:ID] '.' internal=ID ':=' Expression ';'
// ;

Assignment:
    '#' var=[VariableDeclaration:QualifiedName] ':=' Expression ';'
;

QualifiedName returns string:
    ID ('.' ID)*
;
