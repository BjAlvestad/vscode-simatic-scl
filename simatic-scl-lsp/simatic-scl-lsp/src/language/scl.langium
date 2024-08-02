grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    (declarationSubSection+=DeclarationSubSection | vars+=VariableDeclaration)*
    ('BEGIN'
        (elements+=SclProgramElement)*
    )?
    ReturnStatement?
    BlockEnd
;

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
    'REF_TO'?
    type=TypeReference
    (assignment?=':=' value=Expression)?
    ';'
;

Struct:
    'STRUCT'
        (vars+=VariableDeclaration)*
    'END_STRUCT'
;

TypeReference: 
    UdtRef = [BlockStart:DOUBLE_QUOTE_STRING] 
    | primitive=DataType
    | struct=Struct
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

ArrayRange:
    start+=Expression ('..' end+=Expression)? (',' start+=Expression ('..' end+=Expression)?)*
;

// ***********************
// ****  Expressions  ****
// ***********************

SclProgramElement:
    Struct ';'
    | IfStatement
    | ForStatement
    | WhileStatement
    | RepeatStatement
    | ContinueStatemen
    | ExitStatement
    | JumpLabel
    | ProgramJump
    // | CaseLabel  //BUG: Causes auto completion to break (but strangely enough not scoping itself (i.e. valid name is valid, and red lies on invalid ones))
    | CaseStatement
    | Expression ';'
;

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
        ("." element=[NamedElement:ID] '^'? (
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
		    parameters+=ID (':=' | '=>') arguments+=Expression
            (',' parameters+=ID (':=' | '=>') arguments+=Expression)*
		)?
		')')
        // | ("." memoryArea=MEMORY_AREA)  //BUG: causes issue since this also has "dot"
        )
    )*
;

Primary infers Expression:
    '(' Expression ')'
    | UnaryExpression
    | NumberExpression
    | StringExpression
    | BooleanExpression
    | FeatureCall
    // | TimeExpression
;

FeatureCall infers Expression:
	{infer MemberCall}
	(('#'? element=[NamedElement:ID]) | element=[NamedElement:DOUBLE_QUOTE_STRING] | functionBuiltin=BuiltInFunctionName)
    // Optional function call after referencing an element
    (explicitOperationCall?='('
	(
        parameters+=ID (':=' | '=>') arguments+=Expression
        (',' parameters+=ID (':=' | '=>') arguments+=Expression)*
	)?
	')')?;

GlobalVariable:
    var=[NamedElement:DOUBLE_QUOTE_STRING]
;


UnaryExpression:
    operator=('NOT' | '-' | '+') value=Expression
;

NumberExpression: value=NUMBER;
StringExpression: value=SINGLE_QUOTE_STRING;
BooleanExpression: value?='true' | 'false';

type NamedElement = VariableDeclaration;

IfStatement:
    (('IF' | 'ELSIF') condition=Expression 'THEN')
    | 'ELSE'
    | ('END_IF' ';')
;

ForStatement:
    ('FOR' indexVariable=Expression '^'? ':=' initialValue=Expression 'TO' finalValue=Expression ('BY' execution=Expression)? 'DO')
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
    ((var+=Expression) | start+=NUMBER ('..' end+=NUMBER)?)
    (',' ((var+=Expression) | start+=NUMBER ('..' end+=NUMBER)?))*
    ':'
;

CaseStatement:
    'CASE' var=Expression 'OF'
    | 'ELSE'
    | 'END_CASE' ';'
;
