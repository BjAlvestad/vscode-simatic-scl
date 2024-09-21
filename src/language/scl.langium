grammar Scl
import "./terminal"

entry Model:
    SclBlock
;

SclBlock: DbBlock | UdtBlock | FbBlock | FcBlock | ObBlock ;

DbBlock:
    type='DATA_BLOCK' ( name=DOUBLE_QUOTE_STRING | name=ID) (':' returnType=TypeName)?
        blockMetaData=BlockMetadata?
        isNonRetain?='NON_RETAIN'?
        ((isArrayDb?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')? (dbFromUdt=[SclBlock:DOUBLE_QUOTE_STRING] | dbFromBuiltInFunction=ID) ';'?)?
        decBlocks+=DecBlocks*
        ('BEGIN'
            (elements+=DbProgramElement)*
        )?
    'END_DATA_BLOCK'
;

UdtBlock:
    type='TYPE' ( name=DOUBLE_QUOTE_STRING | name=ID) (':' returnType=TypeName)?
        blockMetaData=BlockMetadata?
        isNonRetain?='NON_RETAIN'?
        (
            ((isArrayDb?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')? (dbFromUdt=[SclBlock:DOUBLE_QUOTE_STRING] | dbFromBuiltInFunction=ID) ';'?)?
            | decBlocks+=UdtVarDecBlock*
        )
        ('BEGIN'
            (elements+=DbProgramElement)*
        )?
    'END_TYPE'
;

FbBlock:
    type='FUNCTION_BLOCK' ( name=DOUBLE_QUOTE_STRING | name=ID)
        blockMetaData=BlockMetadata?
        decBlocks+=DecBlocks*
        ('BEGIN'
            (elements+=SclProgramElement)*
        )?
    'END_FUNCTION_BLOCK'
;

FcBlock:
    type='FUNCTION' ( name=DOUBLE_QUOTE_STRING | name=ID) (':' returnType=TypeName)?
        blockMetaData=BlockMetadata?
        decBlocks+=DecBlocks*
        ('BEGIN'
            (elements+=SclProgramElement)*
        )?
    'END_FUNCTION'
;

ObBlock:
    type='ORGANIZATION_BLOCK' ( name=DOUBLE_QUOTE_STRING | name=ID)
        blockMetaData=BlockMetadata?
        decBlocks+=DecBlocks*
        ('BEGIN'
            (elements+=SclProgramElement)*
        )?
    'END_ORGANIZATION_BLOCK'
;

BlockMetadata:
    title=Title?
    (compilerDirective+=CompilerDirective)*
    ('AUTHOR' ':' author=(SINGLE_QUOTE_STRING | ID))?
    ('FAMILY' ':' family=(SINGLE_QUOTE_STRING | ID))?
    ('NAME' ':' name=(SINGLE_QUOTE_STRING | ID))?
    ('VERSION' ':' version=NUMBER)?
;

CompilerDirective:
    '{'name+=ID ':=' value+=SINGLE_QUOTE_STRING (';' name+=ID ':=' value+=SINGLE_QUOTE_STRING)* ';'? '}';

BlockStart:
    blockType=(
        'FUNCTION_BLOCK' |
        'FUNCTION' |
        'TYPE' |
        'DATA_BLOCK' |
        'ORGANIZATION_BLOCK'
    ) ( name=DOUBLE_QUOTE_STRING | name=ID) (':' returnType=TypeName)?;

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
;

InputVarDecBlock: type='VAR_INPUT' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';
OutputVarDecBlock: type='VAR_OUTPUT' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';
InOutVarDecBlock: type='VAR_IN_OUT' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';
VarDecBlock: type='VAR' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';
TempVarDecBlock: type='VAR_TEMP' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';
ConstVarDecBlock: 'VAR' type='CONSTANT' DecBlockQualifier varDecs+=VariableDeclaration* 'END_VAR';

UdtVarDecBlock: 'STRUCT' varDecs+=VariableDeclaration* 'END_STRUCT' ';';

fragment DecBlockQualifier:
    dbSpesific?='DB_SPECIFIC'?
    retain?=RetainKeywordName?
;

Struct:
    'STRUCT'
        (varDecs+=VariableDeclaration)*
    'END_STRUCT'
;

VariableDeclaration returns NamedElement:
    {infer VariableDeclaration}
    (name=ID | name=DOUBLE_QUOTE_STRING | name=KeywordsAllowedElsewhere )
    attributes+=VariableAttribute?
    ('AT' refName=[NamedElement:ID])?
    ':'
    (isArray?='ARRAY' '[' arrayRange=ArrayRange ']' 'OF')?
    'REF_TO'?
    type=TypeReference
    (
        assignment?=':='
        (value=InitializationExpression
        | value=ArrayInitialization
        | value=UdtInitialization)
    )?
    ';'
;

UdtRef: udtRef=[SclBlock:DOUBLE_QUOTE_STRING] | udtRef=[SclBlock:ID];

StringType:
    type=StringTypeName ('[' (sizeLiteral=NUMBER | sizeRef=FeatureCall) ']')?
;

TypeReference: 
    udtRef = UdtRef
    | primitive=DataType
    | struct=Struct
    | string=StringType
;

VariableAttribute:
    '{' (name=ID ':=' value=SINGLE_QUOTE_STRING ';'?)+ '}';

ArrayRange:
    start+=(Expression|'*') ('..' end+=Expression)? (',' start+=(Expression|'*') ('..' end+=Expression)?)*
;

InitializationExpression:
    (('+'|'-')? NumberExpression)
    | StringExpression
    | BooleanExpression
    | TimeExpression
    | FeatureCall
;

UdtInitialization:
    '(' (('(' ')') | udtInitialization+=UdtInitialization | arrayInitialization+=ArrayInitialization | expressions+=InitializationExpression)
    (',' (('(' ')') | udtInitialization+=UdtInitialization | arrayInitialization+=ArrayInitialization | expressions+=InitializationExpression) )* ')'
;

ArrayInitialization:
    '[' (('(' ')') | udtInitialization+=UdtInitialization | (NUMBER '(' expressions+=InitializationExpression ')' | expressions+=InitializationExpression))
    (',' (('(' ')') |udtInitialization+=UdtInitialization | (NUMBER '(' expressions+=InitializationExpression ')' | expressions+=InitializationExpression)))* ']'
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
    | ReturnStatement
    | JumpLabel
    | ProgramJump
    | Region
    | Expression ';'
    | ';' // SCL allows just a `;` on its own
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

// In SCL we cannot have repeated array calls, and we cannot have ()[n]. But we can have [n]().
MemberCall infers Expression:
    Primary
	({infer MemberCall.previous=current} 
    // Member call with optional array access and/or with function call.
    // Note: Parse optional '#'? here since SCL actually allows the # prefix also on member calls.
    (
        '.' '#'?
        (element=[NamedElement:ID] | element=[NamedElement:DOUBLE_QUOTE_STRING] | element=[NamedElement:KeywordsAllowedElsewhere])
        '^'?
		(arrayAccessCall?='[' ( arguments+=Expression (',' arguments+=Expression)* )?']')?
        (explicitOperationCall?='('(arguments+=Expression (',' arguments+=Expression)*)?')')?
    )
    // Alternatively memory area access, where `.` is part of terminal.
    | (memoryArea=MEMORY_AREA)
    )*
;

Primary infers Expression:
    '(' Expression ')'
    | TypeName '#'?
    | UnaryExpression
    | NumberExpression
    | StringExpression
    | BooleanExpression
    | FeatureCall
    | TimeExpression
;

//TODO: Handle # prefix for local variables in validation. Optional here, so it can also parse usage in formal parameters in function call, (and DBs), where there is no prefix.
FeatureCall infers Expression:
	{infer MemberCall}
	'#'?
    (element=[NamedElement:ID] | element=[NamedElement:DOUBLE_QUOTE_STRING] | element=[NamedElement:KeywordsAllowedElsewhere])
    '^'?
    // Optional array access and/or function call after referencing an element
    (arrayAccessCall?='[' ( arguments+=Expression (',' arguments+=Expression)* )?']')?
    (explicitOperationCall?='('(arguments+=Expression (',' arguments+=Expression)*)?')')?
;

DbProgramElement:
    ('THIS[' index=NUMBER ']' '.')?
    element=DbMemberCall
    (':=' value=(
        NumberExpressionWithUnit
        | StringExpression
        | BooleanExpression
        | TimeExpression
        | DOUBLE_QUOTE_STRING
    ))?
    ';'
;

DbMemberCall:
    DbFeatureCall
	({infer DbMemberCall.previous=current} 
    // Member call with function call
        ("." (element=[NamedElement:ID] | element=[NamedElement:DOUBLE_QUOTE_STRING] | element=[NamedElement:KeywordsAllowedElsewhere]) '^'? (
		arrayAccessCall?='['
		(
		    NumberExpressionWithUnit (',' NumberExpressionWithUnit)*
		)?
		']')?
        )
    )*
;

DbFeatureCall infers DbMemberCall:
    {infer DbMemberCall}
    (element=[NamedElement:ID] | element=[NamedElement:DOUBLE_QUOTE_STRING])
    (arrayAccessCall?='['
		(
		    NumberExpressionWithUnit (',' NumberExpressionWithUnit)*
		)?
		']')?
;

NumberExpressionWithUnit returns string: (TypeName '#')? '-'? NUMBER;

UnaryExpression:
    operator=('NOT' | '-' | '+') value=Expression
;

type NamedElement = VariableDeclaration | SclBlock;

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
    label+=CaseLabelRange (',' label+=CaseLabelRange)* ':'
;

CaseLabelRange:
    (start=MemberCall) ('..' (end=MemberCall))?
;

CaseStatement:
    'CASE' var=Expression 'OF'
    (
        labels+=CaseLabel
        elements+=SclProgramElement*
    )*
    (
    'ELSE' ':'
        elements+=SclProgramElement*
    )?
    'END_CASE' ';'
;

KeywordsAllowedElsewhere returns string:
    RetainKeywordName
;

// Declaration/assignment for elementary data types
fragment ElementaryType returns string:
    'BOOL'
    | 'BYTE' | 'WORD' | 'DWORD' | 'LWORD'  // LWORD is not not supported by S7-300
    | 'SINT' | 'INT' | 'DINT' | 'LINT' | 'USINT' | 'UINT' | 'UDINT' | 'ULINT'  // Only INT and DINT are supported by S7-300
    | 'REAL' | 'LREAL'
    | 'S5TIME' | 'TIME' | 'LTIME'
    | 'DATE'   | 'TIME_OF_DAY' | 'TOD' | 'LTOD' | 'LTIME_OF_DAY'
    | 'CHAR'  | 'WCHAR'
;

fragment DateAndTime returns string:
    'DT' | 'DATE_AND_TIME' | 'LDT' | 'DATE_AND_LTIME' | 'DTL'
;

RetainKeywordName returns string: 'Retain';

BlockEnd returns string:
    'END_FUNCTION_BLOCK' |
    'END_FUNCTION' |
    'END_TYPE' |
    'END_DATA_BLOCK' |
    'END_ORGANIZATION_BLOCK'
;

hidden terminal ML_COMMENT_START: '(*';
hidden terminal ML_COMMENT_END: '*)';
hidden terminal ML_COMMENT_CONTENT: /(?=(\(\*))[\s\S]*?(?=(\*\)))/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
