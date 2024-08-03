
DeclarationSubSection returns string:
    'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR' | 'VAR_TEMP' | 'CONST'
     | 'VAR' 'CONSTANT'
     | 'RETAIN' | 'NON_RETAIN'
     | 'END_VAR'
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

BlockEnd returns string:
    'END_FUNCTION_BLOCK' |
    'END_FUNCTION' |
    'END_TYPE' |
    'END_DATA_BLOCK' |
    'END_ORGANIZATION_BLOCK'
;
