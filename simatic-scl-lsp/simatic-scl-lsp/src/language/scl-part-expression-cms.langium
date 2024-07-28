// Expression using Class Member Scoping - https://langium.org/docs/recipes/scoping/class-member/

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
