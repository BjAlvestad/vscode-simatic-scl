
// Basic brute force expressions

Operator returns string:
    // Assignment
    ':=' | '=>' | '?=' | '+=' | '-=' | '*=' | '/=' | '**='
    // Addition
    '+' | '-'
    // Multiplication
    | '*' | '/' | '**' | 'MOD'
    // Logical
    | 'AND' | '&' | 'OR' | 'XOR'
    // Comparison
    | '<' | '<=' | '>' | '>=' | '=' | '<>'
;

Expression:
    ((value+=NUMBER)* ('#' ref+=[VariableDeclaration:QualifiedName])* (looseRef+=QualifiedName)* (operator+=Operator)* ('(' args+=Expression (',' args+=Expression) ')')*)*
;

Assignment:
    '#' var=[VariableDeclaration:QualifiedName] ':=' Expression ';'
;
