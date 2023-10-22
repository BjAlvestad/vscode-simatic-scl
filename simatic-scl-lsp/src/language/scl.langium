grammar Scl

entry Model:
    compilerDirectives+=CompilerDirective*
    blockStart=BlockStart
    compilerDirectives+=CompilerDirective*
    blockAttributes+=BlockAttribute* 
    (
    (
        udtRef=[BlockStart:ID] |
        'CONST' consts+=ConstantDeclaration* 'END_CONST') |
        'STRUCT' vars+=VariableDeclaration* 'END_STRUCT' ';'? |
        (name=DeclarationSubSectionStart attribute=DeclarationSubSectionAttribute? vars+=VariableDeclaration* 'END_VAR')
    )* 
    'BEGIN'?
    elements+=SclElement*
    BlockEnd;

// #########################
// #### BlockAttributes ####
// #########################
CompilerDirective:
    '{'name+=ID ':=' value+=SINGLE_QUOTE_STRING (';' name+=ID ':=' value+=SINGLE_QUOTE_STRING)* ';'? '}';

BlockAttribute:
    'TITLE' '=' value=SINGLE_QUOTE_STRING
    | 'Version' ':' value=(SINGLE_QUOTE_STRING | NUMBER)
    | 'KNOW_HOW_PROTECT'
    | 'AUTHOR' ':' value=(ID | SINGLE_QUOTE_STRING)
    | 'NAME' ':' value=(ID | SINGLE_QUOTE_STRING)
    | 'FAMILY' ':' value=(ID | SINGLE_QUOTE_STRING)
    | 'NON_RETAIN'
;

BlockStart:
    (
        'FUNCTION_BLOCK' |
        'FUNCTION' |
        'TYPE' |
        'DATA_BLOCK' |
        'ORGANIZATION_BLOCK'
    ) ('"'name=ID'"' | name=ID) (':' type=(TypeReference | 'Void'))?;

BlockEnd returns string:
    'END_FUNCTION_BLOCK' |
    'END_FUNCTION' |
    'END_TYPE' |
    'END_DATA_BLOCK' |
    'END_ORGANIZATION_BLOCK';

// #############################
// #### Declaration section ####
// #############################

DeclarationSubSectionStart returns string:
    'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR' | 'VAR_TEMP' | 'CONST' |
    'VAR' 'CONSTANT'
;

DeclarationSubSectionAttribute returns string:
    'RETAIN' | 'NON_RETAIN' | 'DB_SPECIFIC'
;

ConstantDeclaration:
    name=ID assignment?=':=' value=Expression ';'
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

VariableDeclaration:
    name=ID attributes+=VariableAttribute? ('AT' refName=[VariableDeclaration:ID])? ':' 'REF_TO'? type=TypeReference (assignment?=':=' value=Expression)? ';'
;

// VariableDeclaration returns NamedElement:
//     {infer VariableDeclaration} 'var' name=ID (':' type=TypeReference)? (assignment?='=' value=Expression)?
// ;

TypeReference:
    elementary=ElementaryType
    | complex=(
        ArrayType |
        StructureType |
        StringType |
        DateAndTime
    )
    | 'ANY'
    | (CustomType | '"' CustomType '"')
    | catchAll=ID
;

// Declaration/assignment for elementary data types
ElementaryType returns string:
    'BOOL' | 'CHAR' | 'INT' | 'TIME' | 'BYTE' | 'DINT' | 'DATE' | 'WORD' | 'REAL' | 'TIME_OF_DAY' | 'DWORD' | 'S5TIME';

ArrayType:
    type='ARRAY' ArrayIndexRange 'OF' elementType=TypeReference;

fragment ArrayIndexRange:
    '[' ArrayIndexRangeElement (',' ArrayIndexRangeElement)* ']';

fragment ArrayIndexRangeElement:
    (indexStart+=Expression '..' indexEnd+=Expression) | '*';

StructureType:
    type='STRUCT' (vars+=VariableDeclaration)* 'END_STRUCT';

StringType:
    'String' ('[' value=Expression ']')?;

DateAndTime:
    type='DATE_AND_TIME';

CustomType:
    type=[BlockStart:ID]
;

// ######################
// #### Code section ####
// ######################

SclElement:
    IfStatement |
    CaseStatement |
    ForStatement |
    WhileStatement |
    RepeatStatement |
    ContinueStatemen |
    ReturnStatement ';' | 
    ExitStatement |
    ProgramJump |
    JumpLabel ':' |
    CaseLabel ':' |
    Expression ';' |
    ';'
;

IfStatement:
    'IF' condition=Expression 'THEN' block=ExpressionBlock
    ('ELSIF' condition=Expression 'THEN' elseIfBlocks+=ExpressionBlock)*
    ('ELSE' elseBlock=ExpressionBlock)?
    'END_IF' ';'
;

CaseStatement:
    'CASE' MemberCall 'OF' 
    (
        blocks+=ExpressionBlock
    )+
    ('ELSE' ':'? defaultBlock=ExpressionBlock)?
    'END_CASE' ';'
;

ForStatement:
    'FOR' '#'? indexVariable=[NamedElement:ID] '^'? ':=' initialValue=Expression 'TO' finalValue=Expression ('BY' execution=Expression)? 'DO' block=ExpressionBlock 'END_FOR' ';'
;

WhileStatement:
    'WHILE' condition=Expression 'DO' block=ExpressionBlock 'END_WHILE' ';'
;

RepeatStatement:
    'REPEAT' block=ExpressionBlock 'UNTIL' condition=Expression 'END_REPEAT' ';'
;

ContinueStatemen returns string:
    'CONTINUE' ';'
;

ReturnStatement:
    'return' value=Expression?;

ExitStatement returns string:
    'EXIT' ';'
;

ProgramJump:
    'GOTO' jumpLabel=[JumpLabel:ID] ';'
;

ExpressionBlock:
    elements+=SclElement*
;

JumpLabel:
    element=ID;

CaseLabel:
    element+=MemberCall ('..' element+=MemberCall)? (',' MemberCall ('..' element+=MemberCall)?)* | element = TypeReference;

Expression:
    Assignment;

Assignment infers Expression:
    Addition ({infer BinaryExpression.left=current} operator=(':=' | '=>' | '?=' | '+=' | '-=' | '*=' | '/=' | '**=') right=Addition)*;

Addition infers Expression:
    Multiplication ({infer BinaryExpression.left=current} operator=('+' | '-') right=Multiplication)*;

Multiplication infers Expression:
    Logical ({infer BinaryExpression.left=current} operator=('*' | '/' | '**' | 'MOD') right=Logical)*;

Logical infers Expression:
    Comparison ({infer BinaryExpression.left=current} operator=('AND' | '&' | 'OR' | 'XOR') right=Comparison)*;

Comparison infers Expression:
    MemberCall ({infer BinaryExpression.left=current} operator=('<' | '<=' | '>' | '>=' | '=' | '<>') right=MemberCall)*;

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
    )*;

Primary infers Expression:
    '(' Expression? (',' Expression)* ')' |
    '[' Expression (',' Expression)*']' |
    UnaryExpression |
    StringExpression |
    BooleanExpression |
    NumberExpression |
    TimeExpression |
    GlobalReference |
    ArrayAccess |
    FeatureCall |
    Referencing |
    BuiltInFeatureCall |
    TypeReference;

ArrayAccess infers Expression:
    {infer MemberCall}
	(
        '#'? element=[NamedElement:ID] '^'?
    )
    (explicitOperationCall?='['
	(
	    arguments+=Expression (',' arguments+=Expression)*
	)?
	']');

FeatureCall infers Expression:
    {infer MemberCall}
	(
        '#'? element=[NamedElement:ID] '^'?
    )
    // Optional function call after referencing an element
    (explicitOperationCall?='('
	(
	    arguments+=Expression (',' arguments+=Expression)*
	)?
	')')?;

UnaryExpression:
    operator=('NOT' | '-' | '+') value=Expression
;

NumberExpression:
    (type=ElementaryType '#')? value=NUMBER;
StringExpression:
    value=SINGLE_QUOTE_STRING;
BooleanExpression:
    value?='true' | 'false';
TimeExpression:
    value=(
        TIME_LITERAL |
        DATE_LITERAL |
        TIME_OF_DAY_LITERAL |
        DATE_AND_TIME_LITERAL
    );

GlobalReference:
    '"' name=ID '"';  //TODO: Implement as cross reference insted

type NamedElement = 
    VariableDeclaration
    | ConstantDeclaration
// | Parameter
// | FunctionDeclaration
// | MethodMember
// | FieldMember
;

Referencing:
    'REF' '(' '#'? element=[NamedElement:ID] '^'? ')';

BuiltInFeatureCall infers expression:
    (
        element=TypeConversionStandardFunctionA
        | element=TypeConversionStandardFunctionB
        | element=NumericStandardFunction
        | element=BitStringStandardFunction
        | element=TiaPortalStandardFunctions
    )
    '('
	(
	    arguments+=Expression (',' arguments+=Expression)*
	)?
	')';

TypeConversionStandardFunctionA returns string:
    'BOOL_TO_BYTE'
    | 'BOOL_TO_DWORD'
    | 'BOOL_TO_WORD'
    | 'BYTE_TO_DWORD'
    | 'BYTE_TO_WORD'
    | 'CHAR_TO_STRING'
    | 'DINT_TO_REAL'
    | 'INT_TO_DINT'
    | 'INT_TO_REAL'
    | 'WORD_TO_DWORD'
;

TypeConversionStandardFunctionB returns string:
    'BYTE_TO_BOOL'
    | 'BYTE_TO_CHAR'
    | 'CHAR_TO_BYTE'
    | 'CHAR_TO_INT'
    | 'DATE_TO_DINT'
    | 'DINT_TO_DATE'
    | 'DINT_TO_DWORD'
    | 'DINT_TO_INT'
    | 'DINT_TO_TIME'
    | 'DINT_TO_TOD'
    | 'DWORD_TO_BOOL'
    | 'DWORD_TO_BYTE'
    | 'DWORD_TO_DINT'
    | 'DWORD_TO_REAL'
    | 'DWORD_TO_WORD'
    | 'INT_TO_CHAR'
    | 'INT_TO_WORD'
    | 'REAL_TO_DINT'
    | 'REAL_TO_DWORD'
    | 'REAL_TO_INT'
    | 'STRING_TO_CHAR'
    | 'TIME_TO_DINT'
    | 'TOD_TO_DINT'
    | 'WORD_TO_BOOL'
    | 'WORD_TO_BYTE'
    | 'WORD_TO_INT'
    | 'WORD_TO_BLOCK_DB'
    | 'BLOCK_DB_TO_WORD'
;

NumericStandardFunction returns string:
    'ABS'
    | 'SQR'
    | 'SQRT'
    | 'EXP'
    | 'EXPD'
    | 'LN'
    | 'LOG'
    | 'ACOS'
    | 'ASIN'
    | 'ATAN'
    | 'COS'
    | 'SIN'
    | 'TAN'
;

BitStringStandardFunction returns string:
    'ROL'
    | 'ROR'
    | 'SHL'
    | 'SHR';

TiaPortalStandardFunctions returns string:
    'UDINT_TO_TIME'
    | 'REAL_TO_UDINT'
    | 'CONCAT'
;

// BitStringStandardFunction:
//     ('ROL' | 'ROR' | 'SHL' | 'SHR') '(' 'IN' ':=' in=(INTEGER_LITERAL | LocalVariable) ',' 'N' ':=' n=(INTEGER_LITERAL | LocalVariable)')' ';';

// GeneralFunction:
//     name=(ID | LocalVariable) '(' paramName1=ID ':=' value1=(MathExpr | ID) (',' paramNames+=ID ':=' values+=(MathExpr | ID))* ')' ';';

// #################
// #### General ####
// #################

// StringLiteral:
//     string=STRING;

// Value:
//     REAL_LITERAL | INTEGER_LITERAL | StringLiteral;

// Assignment:
//     assignment=ASSIGNMENT;

// Expression:
//     If | Assignment;// | Variable | Number | String;
// If | While | Assignment | Variable | Number | String;

// If:
//     'IF' condition=Expression 'ELSE' else=Expression;
// 'IF' condition=Expression 'then' then=Expression 'ELSE' else=Expression;

hidden terminal WS: /\s+/;
terminal NUMBER returns number: /([Dd]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9-][0-9_]*(\.[0-9eE_]+)?))/;
terminal TIME_LITERAL: /[Ll]?[Tt]#[0-9DdHhMmSs_]+/;
terminal DATE_LITERAL: /[Dd]#[0-9-]+/;
terminal TIME_OF_DAY_LITERAL: /[Ll]?[Tt][Oo][Dd]#[0-9:\.]+/;
terminal DATE_AND_TIME_LITERAL: /(([Dd][Tt])|DATE_AND_TIME)#[0-9-]*[0-9:\.]*/;
terminal ID: ID_CHARACTERS | DOUBLE_QUOTE_STRING;
terminal fragment ID_CHARACTERS: /[_a-zA-Z][\w_]*/;
terminal fragment DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
terminal SINGLE_QUOTE_STRING: /'([^'])*'/;
terminal MEMORY_AREA: /%[XBWD]\d+/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

//TODO: Delete this
Person:
    'person' name=ID;
Greeting:
    'Hello' person=[Person:ID] '!';