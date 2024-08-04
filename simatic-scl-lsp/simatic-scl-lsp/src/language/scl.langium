grammar Scl
import "./scl-part-types"

entry Model:
    blockStart+=BlockStart
    title=Title?
    (compilerDirective+=CompilerDirective)*
    (blockAttribute+=BlockAttribute)*
    isNonRetain?='NON_RETAIN'?
    dbFromUdt=[BlockStart:DOUBLE_QUOTE_STRING]?
    decBlocks+=DecBlocks*
    ('BEGIN'
        (elements+=SclProgramElement)*
    )?
    return=ReturnStatement?
    BlockEnd
;

Person:
    'person' name=ID;

Greeting:
    'Hello' person=[Person:ID] '!';

terminal REGION_TEXT: /REGION [^\r\n]*/;
terminal TITLE_TEXT: /TITLE = [^\r\n]*/;
hidden terminal WS: /\s+/;
terminal DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
terminal SINGLE_QUOTE_STRING: /'([^'])*'/;
terminal NUMBER returns string: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9][0-9_]*(\.?([0-9_]*[eE][+-]?)?[0-9_]+)?))/;

//TODO: Consider combining these terminals, to make them more relaxed, and handle correct entry in validator instead
terminal TIME_LITERAL: /[Ll]?[Tt]#[0-9DdHhMmSs_]+/;
terminal DATE_LITERAL: /[Dd]#[0-9-]+/;
terminal TIME_OF_DAY_LITERAL: /[Ll]?[Tt][Oo][Dd]#[0-9:\.]+/;
terminal DATE_AND_TIME_LITERAL: /(([Dd][Tt])|DATE_AND_TIME)#[0-9-]*[0-9:\.]*/;

terminal MEMORY_AREA: /\.%[XBWD]\d+/;  //TODO: Consider using positive look-behind for `.%`, and then instead use `.%` as operationCall in MemberCall

terminal ID: /[_a-zA-Z][\w_]*/;

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

Title:
    value=TITLE_TEXT
;

DecBlocks:
    InputVarDecBlock
    | OutputVarDecBlock
    | InOutVarDecBlock
    | VarDecBlock
    | TempVarDecBlock
    | ConstVarDecBlock
    | (Struct ';')  // Struct is used as top level section in UDT
;

InputVarDecBlock: type='VAR_INPUT' varDecs+=VariableDeclaration* 'END_VAR';
OutputVarDecBlock: type='VAR_OUTPUT' varDecs+=VariableDeclaration* 'END_VAR';
InOutVarDecBlock: type='VAR_IN_OUT' varDecs+=VariableDeclaration* 'END_VAR';
VarDecBlock: type='VAR' retain?='RETAIN'? varDecs+=VariableDeclaration* 'END_VAR';
TempVarDecBlock: type='VAR_TEMP' varDecs+=VariableDeclaration* 'END_VAR';
ConstVarDecBlock: 'VAR' type='CONSTANT' varDecs+=VariableDeclaration* 'END_VAR';

Struct:
    'STRUCT'
        (varDecs+=VariableDeclaration)*
    'END_STRUCT'
;

VariableDeclaration returns NamedElement:
    {infer VariableDeclaration}
    (name=ID | name=DOUBLE_QUOTE_STRING)
    attributes+=VariableAttribute?
    ('AT' refName=[NamedElement:ID])?
    ':'
    (isArray?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')?
    'REF_TO'?
    type=TypeReference
    (
        assignment?=':='
        (value=Expression
        | value=ArrayInitialization
        | value=UdtInitialization)
    )?
    ';'
;

UdtRef: udtRef=[BlockStart:DOUBLE_QUOTE_STRING];

StringType:
    (isString?='STRING' | isWideString?='WSTRING') ('[' size=NUMBER ']')?
;

TypeReference: 
    udtRef = UdtRef
    | primitive=DataType
    | struct=Struct
    | string=StringType
    | builtIn=ID
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

ArrayRange:
    start+=(Expression|'*') ('..' end+=Expression)? (',' start+=(Expression|'*') ('..' end+=Expression)?)*
;

UdtInitialization:
    '(' (('(' ')') | arrayInitialization+=ArrayInitialization | expressions+=Expression)
    (',' (('(' ')') | arrayInitialization+=ArrayInitialization | expressions+=Expression) )* ')'
;

ArrayInitialization:
    '[' (('(' ')') | udtInitialization+=UdtInitialization | (NUMBER '(' expressions+=Expression ')' | expressions+=Expression))
    (',' (('(' ')') |udtInitialization+=UdtInitialization | (NUMBER '(' expressions+=Expression ')' | expressions+=Expression)))* ']'
;

// ***********************
// ****  Expressions  ****
// ***********************

SclProgramElement:
    IfStatement
    | CaseStatement
    | ForStatement
    | WhileStatement
    | RepeatStatement
    | ContinueStatemen
    | ExitStatement
    | JumpLabel
    | ProgramJump
    | Region
    | Expression ';'
;

Region:
    value=REGION_TEXT
    | regionEnd?='END_REGION'
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
        ("." (('#'? element=[NamedElement:ID]) | element=[NamedElement:DOUBLE_QUOTE_STRING]) '^'? (
		explicitOperationCall?='('
		(
		    arguments+=Expression (',' arguments+=Expression)*
		)?
		')')?
    // Array access on member
        | (
		arrayAccessCall?='['
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
        | (memoryArea=MEMORY_AREA)
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
    | BuiltInFunction
    | TimeExpression
;

//TODO: Handle # prefix for local variables in validation. Optional here, so it can also parse usage in DBs, where there is no prefix.
FeatureCall infers Expression:
	{infer MemberCall}
	(('#'? element=[NamedElement:ID]) | element=[NamedElement:DOUBLE_QUOTE_STRING]) '^'?
    // Optional function call after referencing an element
    (explicitOperationCall?='('
	(
        parameters+=ID (':=' | '=>') arguments+=Expression
        (',' parameters+=ID (':=' | '=>') arguments+=Expression)*
	)?
	')')?;

BuiltInFunction:
    name=ID '(' argument=Expression? ')'
;

UnaryExpression:
    operator=('NOT' | '-' | '+') value=Expression
;

NumberExpression: value=NUMBER;
StringExpression: value=SINGLE_QUOTE_STRING;
BooleanExpression: value?='true' | 'false';
TimeExpression:
    value=(
        TIME_LITERAL |
        DATE_LITERAL |
        TIME_OF_DAY_LITERAL |
        DATE_AND_TIME_LITERAL
    )
;


type NamedElement = VariableDeclaration;

IfStatement:
    (('IF' | 'ELSIF') condition=Expression 'THEN')
    | 'ELSE'
    | ('END_IF' ';')
;

ForStatement:
    ('FOR' indexVariable=Expression 'TO' finalValue=Expression ('BY' execution=Expression)? 'DO')
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
    ((var+=MemberCall) | (start+=NUMBER ('..' end+=NUMBER)?))
    (',' (var+=MemberCall | (start+=NUMBER ('..' end+=NUMBER)?)))*
    ':'
;

CaseStatement:
    'CASE' var=Expression 'OF'
    (
        labels+=CaseLabel
        elements+=SclProgramElement*
    )*
    (
    'ELSE'
        elements+=SclProgramElement*
    )?
    'END_CASE' ';'
;
