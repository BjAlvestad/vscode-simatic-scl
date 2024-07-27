grammar Scl

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
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;
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

DeclarationSubSection returns string:
    'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR' | 'VAR_TEMP' | 'CONST' |
    'VAR' 'CONSTANT' |
    'END_VAR'
;

TypeReference:
    elementary=ElementaryType
    // | complex=(
    //     ArrayType |
    //     StructureType |
    //     StringType |
    //     DateAndTime
    // )
    | 'ANY'
    // | (CustomType | '"' CustomType '"')
    | catchAll=ID
;

// Declaration/assignment for elementary data types
ElementaryType returns string:
    'BOOL'
    | 'BYTE' | 'WORD' | 'DWORD' | 'LWORD'  // LWORD is not not supported by S7-300
    | 'SINT' | 'INT' | 'DINT' | 'LINT' | 'USINT' | 'UINT' | 'UDINT' | 'ULINT'  // Only INT and DINT are supported by S7-300
    | 'REAL' | 'LREAL'
    | 'S5TIME' | 'TIME' | 'LTIME'
    | 'DATE'   | 'TIME_OF_DAY' | 'TOD' | 'LTOD' | 'LTIME_OF_DAY'
    | 'CHAR'  | 'WCHAR'
;

DateAndTime:
    type = 'DT' | 'DATE_AND_TIME' | 'LDT' | 'DATE_AND_LTIME' | 'DTL'
;

VariableDeclaration:
    name=ID attributes+=VariableAttribute? ('AT' refName=[VariableDeclaration:ID])? ':' 'REF_TO'? type=TypeReference (assignment?=':=' value=Expression)? ';'
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

Expression returns number:
    NUMBER
;

Assignment:
    '#' var=[VariableDeclaration:ID] ':=' Expression ';'
;

BlockEnd returns string:
    'END_FUNCTION_BLOCK' |
    'END_FUNCTION' |
    'END_TYPE' |
    'END_DATA_BLOCK' |
    'END_ORGANIZATION_BLOCK'
;