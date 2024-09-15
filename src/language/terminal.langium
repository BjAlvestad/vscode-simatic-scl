
terminal REGION_TEXT: /REGION[^\r\n]*/;
terminal TITLE_TEXT: /TITLE = [^\r\n]*/;
hidden terminal WS: /\s+/;
terminal DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
terminal SINGLE_QUOTE_STRING: /'([^'])*'/;
terminal NUMBER returns string: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9][0-9_]*(\.?([0-9_]*[eE][+-]?)?[0-9_]+)?))/;

//TODO: Consider combining these terminals, to make them more relaxed, and handle correct entry in validator instead
terminal TIME_LITERAL: /[Ll]?[Tt]#[0-9DdHhMmNnSs_]+/;
terminal DATE_LITERAL: /[Dd]#[0-9-]+/;
terminal TIME_OF_DAY_LITERAL: /[Ll]?[Tt][Oo][Dd]#[0-9:\.]+/;
terminal DATE_AND_TIME_LITERAL: /(([Dd][Tt])|DATE_AND_TIME)#[0-9-]*[0-9:\.]*/;

terminal MEMORY_AREA: /\.%[XBWD]\d+/;  //TODO: Consider using positive look-behind for `.%`, and then instead use `.%` as operationCall in MemberCall

terminal ID: /[_a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;

TypeName returns string:
    DataType 
    | StringTypeName
    | 'Void'
;

DataType returns string:
    // Elementary types
    'BOOL'
    | 'BYTE' | 'WORD' | 'DWORD' | 'LWORD'  // LWORD is not not supported by S7-300
    | 'SINT' | 'INT' | 'DINT' | 'LINT' | 'USINT' | 'UINT' | 'UDINT' | 'ULINT'  // Only INT and DINT are supported by S7-300
    | 'REAL' | 'LREAL'
    | 'S5TIME' | 'TIME' | 'LTIME'
    | 'DATE'   | 'TIME_OF_DAY' | 'TOD' | 'LTOD' | 'LTIME_OF_DAY'
    | 'CHAR'  | 'WCHAR'
    // Complex - Data and time
    | 'DT' | 'DATE_AND_TIME' | 'LDT' | 'DATE_AND_LTIME' | 'DTL'
    // Misc
    | 'NULL'
    | 'DB_ANY'
    | 'BCD16' | 'BCD32'
    | 'VARIANT' | 'ANY' | 'POINTER'
    | 'HW_ANY' | 'HW_DEVICE' | 'HW_DPMASTER' | 'HW_DPSLAVE' | 'HW_HSC' | 'HW_IEPORT' | 'HW_INTERFACE'
    | 'HW_IO' | 'HW_IOSYSTEM' | 'HW_MODULE' | 'HW_PTO' | 'HW_PWM' | 'HW_SUBMODULE'
;

StringTypeName returns string:
    'STRING' | 'WSTRING'
;

NumberExpression: (type=TypeName '#')? value=NUMBER;
StringExpression: (type=StringTypeName '#')? value=SINGLE_QUOTE_STRING;
BooleanExpression: value?='true' | 'false';
TimeExpression:
    value=(
        TIME_LITERAL |
        DATE_LITERAL |
        TIME_OF_DAY_LITERAL |
        DATE_AND_TIME_LITERAL
    )
;
