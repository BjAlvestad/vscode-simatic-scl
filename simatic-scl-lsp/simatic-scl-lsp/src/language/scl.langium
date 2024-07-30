grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    (declarationSubSection+=DeclarationSubSection | vars+=VariableDeclaration)*
    ('BEGIN'
    // (
    //     assignment+=Assignment
    //     | functionCalls+=FunctionCall
    //     | statementBlocks+=Statements
    // )*
    (expressions+=Expression)*
    )?
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

terminal MEMORY_AREA: /%[XBWD]\d+/;

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
    ) ( name=DOUBLE_QUOTE_STRING | name=ID) (':' type=(DataType | 'Void'))?;

VariableDeclaration returns NamedElement:
    {infer VariableDeclaration}
    name=ID
    attributes+=VariableAttribute?
    ('AT' refName=[NamedElement:ID])?
    ':'
    (isArray?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')?
    'REF_TO'? ((dataType=DataType) | dataTypeGlobal=[BlockStart:DOUBLE_QUOTE_STRING]) ((children+=VariableDeclaration)* 'END_STRUCT')?
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

Expression:
    Assignment
;

Assignment infers Expression:
    Addition ({infer BinaryExpression.left=current} operator=(':=' | '=>' | '?=' | '+=' | '-=' | '*=' | '/=' | '**=') right=Addition)*
;

Addition infers Expression:
    Multiplication ({infer BinaryExpression.left=current} operator=('+' | '-') right=Multiplication)*
;

Multiplication infers Expression:
    Logical ({infer BinaryExpression.left=current} operator=('*' | '/' | '**' | 'MOD') right=Logical)*
;

Logical infers Expression:
    Comparison ({infer BinaryExpression.left=current} operator=('AND' | '&' | 'OR' | 'XOR') right=Comparison)*
;

Comparison infers Expression:
    MemberCall ({infer BinaryExpression.left=current} operator=('<' | '<=' | '>' | '>=' | '=' | '<>') right=MemberCall)*
;

MemberCall infers Expression:
    Primary
	({infer MemberCall.previous=current} 
    // Member call with function call
        ("." '#'? element=[NamedElement:ID] '^'? (
		explicitOperationCall?='('
		(
		    arguments+=Expression (',' arguments+=Expression)*
		)?
		')')?
    // Array access on member
        | (
		explicitOperationCall?='['
		(
		    arguments+=Expression (',' arguments+=Expression)*
		)?
		']') 
    // Chained function call
        | (
		explicitOperationCall?='('
		(
		    arguments+=Expression (',' arguments+=Expression)*
		)?
		')')
        | ("." memoryArea=MEMORY_AREA)
        )
    )*
;

Primary infers Expression:
    '(' Expression ')'
    | LocalVariable
    // | StringExpression
    // | BooleanExpression
    // | NumberExpression
    // | TimeExpression
    // | GlobalReference
    // | ArrayAccess
    // | FeatureCall
    // | Referencing
    // | BuiltInFeatureCall
    // | TypeReference
;

LocalVariable:
    '#' var=[NamedElement:ID]
;

UnaryExpression:
    operator=('NOT' | '-' | '+') value=Expression
;

type NamedElement = VariableDeclaration;















ArrayRange:
    start+=Expression ('..' end+=Expression)? (',' start+=Expression ('..' end+=Expression)?)*
;

// Expression:
//     ((value+=NUMBER)* ('#' ref+=[VariableDeclaration:QualifiedName])* (looseRef+=QualifiedName)* (operator+=Operator)* ('(' args+=Expression (',' args+=Expression)* ')')*)*
// ;

FunctionCall:
    '#' var=[VariableDeclaration:QualifiedName] '(' args+=Expression (',' args+=Expression)* ')' ';'
;

// Assignment:
//     '#' var=[VariableDeclaration:QualifiedName] ':=' Expression ';'
// ;




// Statements:
//     IfStatement
//     | ForStatement
//     | WhileStatement
//     | RepeatStatement
//     | ContinueStatemen
//     // | ReturnStatement  // Errors out with "Max call stack size exceeded" for unknown reason
//     | ExitStatement
//     | JumpLabel
//     | ProgramJump
//     | CaseLabel
//     | CaseStatement
// ;

// ExpressionBlock:
//     Expression ';'
// ;

// IfStatement:
//     (('IF' | 'ELSIF') condition=Expression 'THEN')
//     | 'ELSE'
//     | ('END_IF' ';')
// ;

// ForStatement:
//     ('FOR' '#'? indexVariable=[VariableDeclaration:QualifiedName] '^'? ':=' initialValue=Expression 'TO' finalValue=Expression ('BY' execution=Expression)? 'DO')
//     | ('END_FOR' ';')
// ;

// WhileStatement:
//     'WHILE' condition=Expression 'DO' |
//     ('END_WHILE' ';')
// ;

// RepeatStatement:
//     'REPEAT' 
//     | ('UNTIL' condition=Expression 'END_REPEAT' ';')
// ;

// ContinueStatemen returns string:
//     'CONTINUE' ';'
// ;

// ReturnStatement:
//     'return' value=Expression? ';'
// ;

// ExitStatement returns string:
//     'EXIT' ';'
// ;

// JumpLabel:
//     name=ID ':'
// ;

// ProgramJump:
//     'GOTO' jumpLabel=[JumpLabel:ID] ';'
// ;

// CaseLabel:
//     (('#' var+=[VariableDeclaration:QualifiedName]) | start+=NUMBER ('..' end+=NUMBER)?)
//     (',' (('#' var+=[VariableDeclaration:QualifiedName]) | start+=NUMBER ('..' end+=NUMBER)?))*
//     ':'
// ;

// CaseStatement:
//     'CASE' '#' var=[VariableDeclaration:QualifiedName] 'OF'
//     | 'ELSE'
//     | 'END_CASE' ';'
// ;
