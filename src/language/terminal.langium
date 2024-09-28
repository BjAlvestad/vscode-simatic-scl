
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
    | 'CHAR'  | 'WCHAR'
    // Data and time
    | 'Date'            // (D#1990-01-01)
    | 'Date_And_Time'   // (DT#1990-01-01-00:00:00)
    | 'LDT'             // (LDT#1970-01-01-00:00:00)
    | 'LTime'           // (LT#0ns)
    | 'LTime_Of_Day'    // (LTOD#00:00:00)
    | 'S5Time'          // (S5T#0ms)
    | 'Time'            // (T#0ms)
    | 'Time_Of_Day'     // (TOD#00:00:00)
    // Misc
    | 'NULL'
    | 'BCD16' | 'BCD32'
    | 'VARIANT' | 'ANY' | 'POINTER'
    // Misc using integer value
    | 'DB_ANY' | 'DB_DYN' | 'DB_WWW'
    | 'HW_ANY' | 'HW_DEVICE' | 'HW_DPMASTER' | 'HW_DPSLAVE' | 'HW_HSC' | 'HW_IEPORT' | 'HW_INTERFACE'
    | 'HW_IO' | 'HW_IOSYSTEM' | 'HW_MODULE' | 'HW_PTO' | 'HW_PWM' | 'HW_SUBMODULE'
    | 'OB_ANY' | 'OB_ATT' | 'OB_CYCLIC' | 'OB_DELAY' | 'OB_DIAG' | 'OB_HWINT' | 'OB_PCYCLE' | 'OB_STARTUP' | 'OB_TIMEERROR' | 'OB_TOD'
    | 'OPC_UA_ByteStringActualLength'
    | 'PIP'
    | 'PORT'
    | 'RTM'
    // Misc using hex word value
    | 'AOM_IDENT'
    | 'CONN_ANY' | 'CONN_OUC' | 'CONN_PRG'
    | 'EVENT_ANY' | 'EVENT_ATT' | 'EVENT_HWINT'
    | 'OPC_UA_LocalizedTextEncodingMask'
    // Misc having do default value or elements under it 
    | 'PID_GradientEstimation' | 'PID_GradientParams' | 'PID_StandardDeviation'
    | 'Program_Alarm'
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
