grammar Scl

entry Model:
    blockAttributes=BlockAttributes (name=DeclarationSubSectionStart (vars+=Var)* 'END_VAR')* 'BEGIN' (statements+=Statement | localVars+=LocalVariable)* BlockEnd;

// #########################
// #### BlockAttributes ####
// #########################
BlockAttributes:
    BlockTitle;

BlockTitle:
    'FUNCTION_BLOCK' blockName=STRING;

BlockEnd returns string:
    'END_FUNCTION_BLOCK';

// #############################
// #### Declaration section ####
// #############################

DeclarationSubSectionStart returns string:
    'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR' | 'VAR_TEMP' | 'CONST';

Var:
    VarElementary | VarComplex | Var_General;

// Declaration/assignment for elementary data types
ElementaryTypes returns string:
    'BOOL' | 'CHAR' | 'INT' | 'TIME' | 'BYTE' | 'DINT' | 'DATE' | 'WORD' | 'REAL' | 'TIME_OF_DAY' | 'DWORD' | 'S5TIME';

VarElementary:
    name=ID ':' type=(ElementaryTypes) (':=' value=Value)? ';';

// Declaration/assignment for complex data types
VarComplex:
    StructureDatatype | VarArray;

VarArray:
    name=ID ':' ArrayDatatype;

ArrayDatatype:
    type='ARRAY' ArrayIndexRange 'OF' elementType=(ElementaryTypes) ';';

fragment ArrayIndexRange:
    '[' (indexStart=INTEGER_LITERAL '..' indexEnd=INTEGER_LITERAL) (',' indexNStart+=INTEGER_LITERAL '..' indexNEnd+=INTEGER_LITERAL)* ']';

StructureDatatype:
    type='STRUCT' (vars+=Var)* 'END_STRUCT';

//TODO: Define String

//TODO: Define DATE_AND_TIME

// Declaration/assignment catch all
Var_General:
    name=ID ':' type=(ID) (':=' value=Value)? ';';


// ######################
// #### Code section ####
// ######################

Body:
    (statements+=Statement)*;

Statement:
    If | While | Assignment | Expression;

If:
    'IF' condition=Expression 'THEN' then=Expression ('ELSE' else=Expression)? 'END_IF';

While:
    'WHILE' condition=Expression 'DO' body=Body;

Assignment:
    LocalVariable ':=' expression=Expression ';';

Expression:
    If | Assignment | LocalVariable | Value | MathExpr | StandardFunction | GeneralFunction;

LocalVariable:
    '#' variable=[Var:ID];

MathExpr:
    Add;

Add infers MathExpr:
    Mult ({infer BinExpr.e1=current} op=('+'|'-') e2=Mult)*;

Mult infers MathExpr:
    PrimExpr ({infer BinExpr.e1=current} op=('*'|'/') e2=PrimExpr)*;

PrimExpr:
    Lit | Ref | Group | NegExpr;

// literal int
Lit:
    val=REAL_LITERAL | INTEGER_LITERAL;
// cross-reference to a parameter
Ref:
    LocalVariable;
// grouped expression with parentheses
Group:
    '(' ge=MathExpr ')';
// negated expression
NegExpr:
    '-' ne=MathExpr;

StandardFunction:
    StandardFunctionSingleInput | BitStringStandardFunction;

StandardFunctionSingleInput:
    (TypeConversionStandardFunctionA | TypeConversionStandardFunctionB | NumericStandardFunction) '(' MathExpr ')' ';';

TypeConversionStandardFunctionA returns string:
    'BOOL_TO_BYTE' | 'BOOL_TO_DWORD' | 'BOOL_TO_WORD' | 'BYTE_TO_DWORD' | 'BYTE_TO_WORD' | 'CHAR_TO_STRING' | 'DINT_TO_REAL' | 'INT_TO_DINT' | 'INT_TO_REAL' | 'WORD_TO_DWORD';

TypeConversionStandardFunctionB returns string:
    'BYTE_TO_BOOL' | 'BYTE_TO_CHAR' | 'CHAR_TO_BYTE' | 'CHAR_TO_INT' | 'DATE_TO_DINT' | 'DINT_TO_DATE' | 'DINT_TO_DWORD' | 'DINT_TO_INT' | 'DINT_TO_TIME' | 'DINT_TO_TOD' | 'DWORD_TO_BOOL' | 'DWORD_TO_BYTE' | 'DWORD_TO_DINT' | 'DWORD_TO_REAL' | 'DWORD_TO_WORD' | 'INT_TO_CHAR' | 'INT_TO_WORD' | 'REAL_TO_DINT' | 'REAL_TO_DWORD' | 'REAL_TO_INT' | 'STRING_TO_CHAR' | 'TIME_TO_DINT' | 'TOD_TO_DINT' | 'WORD_TO_BOOL' | 'WORD_TO_BYTE' | 'WORD_TO_INT' | 'WORD_TO_BLOCK_DB' | 'BLOCK_DB_TO_WORD';

NumericStandardFunction returns string:
    'ABS' | 'SQR' | 'SQRT' | 'EXP' | 'EXPD' | 'LN' | 'LOG' | 'ACOS' | 'ASIN' | 'ATAN' | 'COS' | 'SIN' | 'TAN';

BitStringStandardFunction:
    ('ROL' | 'ROR' | 'SHL' | 'SHR') '(' 'IN' ':=' in=(INTEGER_LITERAL | LocalVariable) ',' 'N' ':=' n=(INTEGER_LITERAL | LocalVariable)')' ';';

GeneralFunction:
    name=(ID | LocalVariable) '(' paramName1=ID ':=' value1=(MathExpr | ID) (',' paramNames+=ID ':=' values+=(MathExpr | ID))* ')' ';';

// #################
// #### General ####
// #################

StringLiteral:
    string=STRING;

Value:
    REAL_LITERAL | INTEGER_LITERAL | StringLiteral;

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
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

terminal ASSIGNMENT: /:=/;
terminal EXPONENTIAL: /\*\*/;
terminal BASIC_MATH_OPERATOR: /[+-*/]|MOD|DIV/;
terminal BASIC_COMPARATIVE_OPERATOR: /<|>|<=|>=|=|<>/;
terminal BASIC_LOGICAL_OPERATOR: /AND|&|XOR|OR/;
// terminal fragment OPERATOR_MATH_EXPONENTIAL: /\\*\\*/;
// terminal fragment OPERATOR_MATH_PLUS: /\\+/;

terminal fragment BINARY_DIGIT: /2#([0-1](_[0-1])?)+/;
terminal fragment OCTAL_DIGIT: /8#([0-7](_[0-7])?)+/;
terminal fragment HEX_DIGIT: /16#([0-9a-fA-F](_[0-9a-fA-F])?)+/;
terminal fragment DECIMAL_DIGIT: /([0-9](_[0-9])?)+/;
terminal fragment EXPONENT: /[eE][+-]?/DECIMAL_DIGIT;
terminal REAL_LITERAL: /[+-]?/((DECIMAL_DIGIT('.'DECIMAL_DIGIT)?EXPONENT)|(DECIMAL_DIGIT'.'DECIMAL_DIGIT));
terminal INTEGER_LITERAL: /[+-]?/BINARY_DIGIT|OCTAL_DIGIT|HEX_DIGIT|DECIMAL_DIGIT;

// terminal NUMBERISH: /(\\+|-)?10/;//\\d[-+0-9.eE_#a-fA-F]*/;

// terminal IF: /if/;
// terminal THEN: /then/;
// terminal ELSE: /else/;
// terminal WHILE: /while/;
// terminal DO: /do/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

//TODO: Delete this
Person:
    'person' name=ID;
Greeting:
    'Hello' person=[Person:ID] '!';