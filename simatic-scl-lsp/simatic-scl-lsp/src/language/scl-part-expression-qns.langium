// Expression using Qualified Name Scoping - https://langium.org/docs/recipes/scoping/qualified-name/

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
    Primary ('.' | '(' | '[') arguments+=Expression (',' arguments+=Expression)* (')' | ']')?
;

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