import { BuiltInsUtils } from "../built-ins-utils.js";

export module ConversionBuiltIns {
    // Built in CONVERT functions
    
    export const BCD16_TO_INT = BuiltInsUtils.createConvertFunction('BCD16', 'INT');
    export const BCD32_TO_DINT = BuiltInsUtils.createConvertFunction('BCD32', 'DINT');
    
    export const BOOL_TO_BYTE = BuiltInsUtils.createConvertFunction('BOOL', 'BYTE');
    export const BOOL_TO_DINT = BuiltInsUtils.createConvertFunction('BOOL', 'DINT');
    export const BOOL_TO_DWORD = BuiltInsUtils.createConvertFunction('BOOL', 'DWORD');
    export const BOOL_TO_INT = BuiltInsUtils.createConvertFunction('BOOL', 'INT');
    export const BOOL_TO_LINT = BuiltInsUtils.createConvertFunction('BOOL', 'LINT');
    export const BOOL_TO_LWORD = BuiltInsUtils.createConvertFunction('BOOL', 'LWORD');
    export const BOOL_TO_SINT = BuiltInsUtils.createConvertFunction('BOOL', 'SINT');
    export const BOOL_TO_UDINT = BuiltInsUtils.createConvertFunction('BOOL', 'UDINT');
    export const BOOL_TO_UINT = BuiltInsUtils.createConvertFunction('BOOL', 'UINT');
    export const BOOL_TO_ULINT = BuiltInsUtils.createConvertFunction('BOOL', 'ULINT');
    export const BOOL_TO_USINT = BuiltInsUtils.createConvertFunction('BOOL', 'USINT');
    export const BOOL_TO_WORD = BuiltInsUtils.createConvertFunction('BOOL', 'WORD');
    
    export const BYTE_TO_BOOL = BuiltInsUtils.createConvertFunction('BYTE', 'BOOL');
    export const BYTE_TO_CHAR = BuiltInsUtils.createConvertFunction('BYTE', 'CHAR');
    export const BYTE_TO_DINT = BuiltInsUtils.createConvertFunction('BYTE', 'DINT');
    export const BYTE_TO_DWORD = BuiltInsUtils.createConvertFunction('BYTE', 'DWORD');
    export const BYTE_TO_INT = BuiltInsUtils.createConvertFunction('BYTE', 'INT');
    export const BYTE_TO_LINT = BuiltInsUtils.createConvertFunction('BYTE', 'LINT');
    export const BYTE_TO_LWORD = BuiltInsUtils.createConvertFunction('BYTE', 'LWORD');
    export const BYTE_TO_SINT = BuiltInsUtils.createConvertFunction('BYTE', 'SINT');
    export const BYTE_TO_UDINT = BuiltInsUtils.createConvertFunction('BYTE', 'UDINT');
    export const BYTE_TO_UINT = BuiltInsUtils.createConvertFunction('BYTE', 'UINT');
    export const BYTE_TO_ULINT = BuiltInsUtils.createConvertFunction('BYTE', 'ULINT');
    export const BYTE_TO_USINT = BuiltInsUtils.createConvertFunction('BYTE', 'USINT');
    export const BYTE_TO_WCHAR = BuiltInsUtils.createConvertFunction('BYTE', 'WCHAR');
    export const BYTE_TO_WORD = BuiltInsUtils.createConvertFunction('BYTE', 'WORD');
    
    export const CHAR_TO_BYTE = BuiltInsUtils.createConvertFunction('CHAR', 'BYTE');
    export const CHAR_TO_DINT = BuiltInsUtils.createConvertFunction('CHAR', 'DINT');
    export const CHAR_TO_DWORD = BuiltInsUtils.createConvertFunction('CHAR', 'DWORD');
    export const CHAR_TO_INT = BuiltInsUtils.createConvertFunction('CHAR', 'INT');
    export const CHAR_TO_LINT = BuiltInsUtils.createConvertFunction('CHAR', 'LINT');
    export const CHAR_TO_LWORD = BuiltInsUtils.createConvertFunction('CHAR', 'LWORD');
    export const CHAR_TO_SINT = BuiltInsUtils.createConvertFunction('CHAR', 'SINT');
    export const CHAR_TO_UDINT = BuiltInsUtils.createConvertFunction('CHAR', 'UDINT');
    export const CHAR_TO_UINT = BuiltInsUtils.createConvertFunction('CHAR', 'UINT');
    export const CHAR_TO_ULINT = BuiltInsUtils.createConvertFunction('CHAR', 'ULINT');
    export const CHAR_TO_USINT = BuiltInsUtils.createConvertFunction('CHAR', 'USINT');
    export const CHAR_TO_WCHAR = BuiltInsUtils.createConvertFunction('CHAR', 'WCHAR');
    export const CHAR_TO_WORD = BuiltInsUtils.createConvertFunction('CHAR', 'WORD');
    
    export const DB_ANY_TO_UINT = BuiltInsUtils.createConvertFunction('DB_ANY', 'UINT');
    
    export const DINT_TO_BCD32 = BuiltInsUtils.createConvertFunction('DINT', 'BCD32');
    export const DINT_TO_BOOL = BuiltInsUtils.createConvertFunction('DINT', 'BOOL');
    export const DINT_TO_BYTE = BuiltInsUtils.createConvertFunction('DINT', 'BYTE');
    export const DINT_TO_CHAR = BuiltInsUtils.createConvertFunction('DINT', 'CHAR');
    export const DINT_TO_DWORD = BuiltInsUtils.createConvertFunction('DINT', 'DWORD');
    export const DINT_TO_INT = BuiltInsUtils.createConvertFunction('DINT', 'INT');
    export const DINT_TO_LINT = BuiltInsUtils.createConvertFunction('DINT', 'LINT');
    export const DINT_TO_LREAL = BuiltInsUtils.createConvertFunction('DINT', 'LREAL');
    export const DINT_TO_LWORD = BuiltInsUtils.createConvertFunction('DINT', 'LWORD');
    export const DINT_TO_REAL = BuiltInsUtils.createConvertFunction('DINT', 'REAL');
    export const DINT_TO_SINT = BuiltInsUtils.createConvertFunction('DINT', 'SINT');
    export const DINT_TO_UDINT = BuiltInsUtils.createConvertFunction('DINT', 'UDINT');
    export const DINT_TO_UINT = BuiltInsUtils.createConvertFunction('DINT', 'UINT');
    export const DINT_TO_ULINT = BuiltInsUtils.createConvertFunction('DINT', 'ULINT');
    export const DINT_TO_USINT = BuiltInsUtils.createConvertFunction('DINT', 'USINT');
    export const DINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('DINT', 'WCHAR');
    export const DINT_TO_WORD = BuiltInsUtils.createConvertFunction('DINT', 'WORD');
    
    export const DWORD_TO_BOOL = BuiltInsUtils.createConvertFunction('DWORD', 'BOOL');
    export const DWORD_TO_BYTE = BuiltInsUtils.createConvertFunction('DWORD', 'BYTE');
    export const DWORD_TO_CHAR = BuiltInsUtils.createConvertFunction('DWORD', 'CHAR');
    export const DWORD_TO_DINT = BuiltInsUtils.createConvertFunction('DWORD', 'DINT');
    export const DWORD_TO_INT = BuiltInsUtils.createConvertFunction('DWORD', 'INT');
    export const DWORD_TO_LINT = BuiltInsUtils.createConvertFunction('DWORD', 'LINT');
    export const DWORD_TO_LWORD = BuiltInsUtils.createConvertFunction('DWORD', 'LWORD');
    export const DWORD_TO_REAL = BuiltInsUtils.createConvertFunction('DWORD', 'REAL');
    export const DWORD_TO_SINT = BuiltInsUtils.createConvertFunction('DWORD', 'SINT');
    export const DWORD_TO_UDINT = BuiltInsUtils.createConvertFunction('DWORD', 'UDINT');
    export const DWORD_TO_UINT = BuiltInsUtils.createConvertFunction('DWORD', 'UINT');
    export const DWORD_TO_ULINT = BuiltInsUtils.createConvertFunction('DWORD', 'ULINT');
    export const DWORD_TO_USINT = BuiltInsUtils.createConvertFunction('DWORD', 'USINT');
    export const DWORD_TO_WCHAR = BuiltInsUtils.createConvertFunction('DWORD', 'WCHAR');
    export const DWORD_TO_WORD = BuiltInsUtils.createConvertFunction('DWORD', 'WORD');
    
    export const INT_TO_BCD32 = BuiltInsUtils.createConvertFunction('INT', 'BCD16');
    export const INT_TO_BOOL = BuiltInsUtils.createConvertFunction('INT', 'BOOL');
    export const INT_TO_BYTE = BuiltInsUtils.createConvertFunction('INT', 'BYTE');
    export const INT_TO_CHAR = BuiltInsUtils.createConvertFunction('INT', 'CHAR');
    export const INT_TO_DINT = BuiltInsUtils.createConvertFunction('INT', 'DINT');
    export const INT_TO_DWORD = BuiltInsUtils.createConvertFunction('INT', 'DWORD');
    export const INT_TO_LINT = BuiltInsUtils.createConvertFunction('INT', 'LINT');
    export const INT_TO_LREAL = BuiltInsUtils.createConvertFunction('INT', 'LREAL');
    export const INT_TO_LWORD = BuiltInsUtils.createConvertFunction('INT', 'LWORD');
    export const INT_TO_REAL = BuiltInsUtils.createConvertFunction('INT', 'REAL');
    export const INT_TO_SINT = BuiltInsUtils.createConvertFunction('INT', 'SINT');
    export const INT_TO_UDINT = BuiltInsUtils.createConvertFunction('INT', 'UDINT');
    export const INT_TO_UINT = BuiltInsUtils.createConvertFunction('INT', 'UINT');
    export const INT_TO_ULINT = BuiltInsUtils.createConvertFunction('INT', 'ULINT');
    export const INT_TO_USINT = BuiltInsUtils.createConvertFunction('INT', 'USINT');
    export const INT_TO_WCHAR = BuiltInsUtils.createConvertFunction('INT', 'WCHAR');
    export const INT_TO_WORD = BuiltInsUtils.createConvertFunction('INT', 'WORD');
    
    export const LINT_TO_BOOL = BuiltInsUtils.createConvertFunction('LINT', 'BOOL');
    export const LINT_TO_BYTE = BuiltInsUtils.createConvertFunction('LINT', 'BYTE');
    export const LINT_TO_CHAR = BuiltInsUtils.createConvertFunction('LINT', 'CHAR');
    export const LINT_TO_DINT = BuiltInsUtils.createConvertFunction('LINT', 'DINT');
    export const LINT_TO_DWORD = BuiltInsUtils.createConvertFunction('LINT', 'DWORD');
    export const LINT_TO_INT = BuiltInsUtils.createConvertFunction('LINT', 'INT');
    export const LINT_TO_LREAL = BuiltInsUtils.createConvertFunction('LINT', 'LREAL');
    export const LINT_TO_LWORD = BuiltInsUtils.createConvertFunction('LINT', 'LWORD');
    export const LINT_TO_REAL = BuiltInsUtils.createConvertFunction('LINT', 'REAL');
    export const LINT_TO_SINT = BuiltInsUtils.createConvertFunction('LINT', 'SINT');
    export const LINT_TO_UDINT = BuiltInsUtils.createConvertFunction('LINT', 'UDINT');
    export const LINT_TO_UINT = BuiltInsUtils.createConvertFunction('LINT', 'UINT');
    export const LINT_TO_ULINT = BuiltInsUtils.createConvertFunction('LINT', 'ULINT');
    export const LINT_TO_USINT = BuiltInsUtils.createConvertFunction('LINT', 'USINT');
    export const LINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('LINT', 'WCHAR');
    export const LINT_TO_WORD = BuiltInsUtils.createConvertFunction('LINT', 'WORD');
    
    export const LREAL_TO_DINT = BuiltInsUtils.createConvertFunction('LREAL', 'DINT');
    export const LREAL_TO_INT = BuiltInsUtils.createConvertFunction('LREAL', 'INT');
    export const LREAL_TO_LINT = BuiltInsUtils.createConvertFunction('LREAL', 'LINT');
    export const LREAL_TO_LWORD = BuiltInsUtils.createConvertFunction('LREAL', 'LWORD');
    export const LREAL_TO_REAL = BuiltInsUtils.createConvertFunction('LREAL', 'REAL');
    export const LREAL_TO_SINT = BuiltInsUtils.createConvertFunction('LREAL', 'SINT');
    export const LREAL_TO_UDINT = BuiltInsUtils.createConvertFunction('LREAL', 'UDINT');
    export const LREAL_TO_UINT = BuiltInsUtils.createConvertFunction('LREAL', 'UINT');
    export const LREAL_TO_ULINT = BuiltInsUtils.createConvertFunction('LREAL', 'ULINT');
    export const LREAL_TO_USINT = BuiltInsUtils.createConvertFunction('LREAL', 'USINT');
    
    export const LWORD_TO_BOOL = BuiltInsUtils.createConvertFunction('LWORD', 'BOOL');
    export const LWORD_TO_BYTE = BuiltInsUtils.createConvertFunction('LWORD', 'BYTE');
    export const LWORD_TO_CHAR = BuiltInsUtils.createConvertFunction('LWORD', 'CHAR');
    export const LWORD_TO_DINT = BuiltInsUtils.createConvertFunction('LWORD', 'DINT');
    export const LWORD_TO_DWORD = BuiltInsUtils.createConvertFunction('LWORD', 'DWORD');
    export const LWORD_TO_INT = BuiltInsUtils.createConvertFunction('LWORD', 'INT');
    export const LWORD_TO_LINT = BuiltInsUtils.createConvertFunction('LWORD', 'LINT');
    export const LWORD_TO_LREAL = BuiltInsUtils.createConvertFunction('LWORD', 'LREAL');
    export const LWORD_TO_SINT = BuiltInsUtils.createConvertFunction('LWORD', 'SINT');
    export const LWORD_TO_UDINT = BuiltInsUtils.createConvertFunction('LWORD', 'UDINT');
    export const LWORD_TO_UINT = BuiltInsUtils.createConvertFunction('LWORD', 'UINT');
    export const LWORD_TO_ULINT = BuiltInsUtils.createConvertFunction('LWORD', 'ULINT');
    export const LWORD_TO_USINT = BuiltInsUtils.createConvertFunction('LWORD', 'USINT');
    export const LWORD_TO_WCHAR = BuiltInsUtils.createConvertFunction('LWORD', 'WCHAR');
    export const LWORD_TO_WORD = BuiltInsUtils.createConvertFunction('LWORD', 'WORD');
    
    export const REAL_TO_DINT = BuiltInsUtils.createConvertFunction('REAL', 'DINT');
    export const REAL_TO_DWORD = BuiltInsUtils.createConvertFunction('REAL', 'DWORD');
    export const REAL_TO_INT = BuiltInsUtils.createConvertFunction('REAL', 'INT');
    export const REAL_TO_LINT = BuiltInsUtils.createConvertFunction('REAL', 'LINT');
    export const REAL_TO_LREAL = BuiltInsUtils.createConvertFunction('REAL', 'LREAL');
    export const REAL_TO_SINT = BuiltInsUtils.createConvertFunction('REAL', 'SINT');
    export const REAL_TO_UDINT = BuiltInsUtils.createConvertFunction('REAL', 'UDINT');
    export const REAL_TO_UINT = BuiltInsUtils.createConvertFunction('REAL', 'UINT');
    export const REAL_TO_ULINT = BuiltInsUtils.createConvertFunction('REAL', 'ULINT');
    export const REAL_TO_USINT = BuiltInsUtils.createConvertFunction('REAL', 'USINT');
    
    export const SINT_TO_BOOL = BuiltInsUtils.createConvertFunction('SINT', 'BOOL');
    export const SINT_TO_BYTE = BuiltInsUtils.createConvertFunction('SINT', 'BYTE');
    export const SINT_TO_CHAR = BuiltInsUtils.createConvertFunction('SINT', 'CHAR');
    export const SINT_TO_DINT = BuiltInsUtils.createConvertFunction('SINT', 'DINT');
    export const SINT_TO_DWORD = BuiltInsUtils.createConvertFunction('SINT', 'DWORD');
    export const SINT_TO_INT = BuiltInsUtils.createConvertFunction('SINT', 'INT');
    export const SINT_TO_LINT = BuiltInsUtils.createConvertFunction('SINT', 'LINT');
    export const SINT_TO_LREAL = BuiltInsUtils.createConvertFunction('SINT', 'LREAL');
    export const SINT_TO_LWORD = BuiltInsUtils.createConvertFunction('SINT', 'LWORD');
    export const SINT_TO_REAL = BuiltInsUtils.createConvertFunction('SINT', 'REAL');
    export const SINT_TO_UDINT = BuiltInsUtils.createConvertFunction('SINT', 'UDINT');
    export const SINT_TO_UINT = BuiltInsUtils.createConvertFunction('SINT', 'UINT');
    export const SINT_TO_ULINT = BuiltInsUtils.createConvertFunction('SINT', 'ULINT');
    export const SINT_TO_USINT = BuiltInsUtils.createConvertFunction('SINT', 'USINT');
    export const SINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('SINT', 'WCHAR');
    export const SINT_TO_WORD = BuiltInsUtils.createConvertFunction('SINT', 'WORD');
    
    export const UDINT_TO_BOOL = BuiltInsUtils.createConvertFunction('UDINT', 'BOOL');
    export const UDINT_TO_BYTE = BuiltInsUtils.createConvertFunction('UDINT', 'BYTE');
    export const UDINT_TO_CHAR = BuiltInsUtils.createConvertFunction('UDINT', 'CHAR');
    export const UDINT_TO_DINT = BuiltInsUtils.createConvertFunction('UDINT', 'DINT');
    export const UDINT_TO_DWORD = BuiltInsUtils.createConvertFunction('UDINT', 'DWORD');
    export const UDINT_TO_INT = BuiltInsUtils.createConvertFunction('UDINT', 'INT');
    export const UDINT_TO_LINT = BuiltInsUtils.createConvertFunction('UDINT', 'LINT');
    export const UDINT_TO_LREAL = BuiltInsUtils.createConvertFunction('UDINT', 'LREAL');
    export const UDINT_TO_LWORD = BuiltInsUtils.createConvertFunction('UDINT', 'LWORD');
    export const UDINT_TO_REAL = BuiltInsUtils.createConvertFunction('UDINT', 'REAL');
    export const UDINT_TO_SINT = BuiltInsUtils.createConvertFunction('UDINT', 'SINT');
    export const UDINT_TO_UINT = BuiltInsUtils.createConvertFunction('UDINT', 'UINT');
    export const UDINT_TO_ULINT = BuiltInsUtils.createConvertFunction('UDINT', 'ULINT');
    export const UDINT_TO_USINT = BuiltInsUtils.createConvertFunction('UDINT', 'USINT');
    export const UDINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('UDINT', 'WCHAR');
    export const UDINT_TO_WORD = BuiltInsUtils.createConvertFunction('UDINT', 'WORD');
    
    export const UINT_TO_BOOL = BuiltInsUtils.createConvertFunction('UINT', 'BOOL');
    export const UINT_TO_BYTE = BuiltInsUtils.createConvertFunction('UINT', 'BYTE');
    export const UINT_TO_CHAR = BuiltInsUtils.createConvertFunction('UINT', 'CHAR');
    export const UINT_TO_DB_ANY = BuiltInsUtils.createConvertFunction('UINT', 'DB_ANY');
    export const UINT_TO_DINT = BuiltInsUtils.createConvertFunction('UINT', 'DINT');
    export const UINT_TO_DWORD = BuiltInsUtils.createConvertFunction('UINT', 'DWORD');
    export const UINT_TO_INT = BuiltInsUtils.createConvertFunction('UINT', 'INT');
    export const UINT_TO_LINT = BuiltInsUtils.createConvertFunction('UINT', 'LINT');
    export const UINT_TO_LREAL = BuiltInsUtils.createConvertFunction('UINT', 'LREAL');
    export const UINT_TO_LWORD = BuiltInsUtils.createConvertFunction('UINT', 'LWORD');
    export const UINT_TO_REAL = BuiltInsUtils.createConvertFunction('UINT', 'REAL');
    export const UINT_TO_SINT = BuiltInsUtils.createConvertFunction('UINT', 'SINT');
    export const UINT_TO_UDINT = BuiltInsUtils.createConvertFunction('UINT', 'UDINT');
    export const UINT_TO_ULINT = BuiltInsUtils.createConvertFunction('UINT', 'ULINT');
    export const UINT_TO_USINT = BuiltInsUtils.createConvertFunction('UINT', 'USINT');
    export const UINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('UINT', 'WCHAR');
    export const UINT_TO_WORD = BuiltInsUtils.createConvertFunction('UINT', 'WORD');
    
    export const ULINT_TO_BOOL = BuiltInsUtils.createConvertFunction('ULINT', 'BOOL');
    export const ULINT_TO_BYTE = BuiltInsUtils.createConvertFunction('ULINT', 'BYTE');
    export const ULINT_TO_CHAR = BuiltInsUtils.createConvertFunction('ULINT', 'CHAR');
    export const ULINT_TO_DINT = BuiltInsUtils.createConvertFunction('ULINT', 'DINT');
    export const ULINT_TO_DWORD = BuiltInsUtils.createConvertFunction('ULINT', 'DWORD');
    export const ULINT_TO_INT = BuiltInsUtils.createConvertFunction('ULINT', 'INT');
    export const ULINT_TO_LINT = BuiltInsUtils.createConvertFunction('ULINT', 'LINT');
    export const ULINT_TO_LREAL = BuiltInsUtils.createConvertFunction('ULINT', 'LREAL');
    export const ULINT_TO_LWORD = BuiltInsUtils.createConvertFunction('ULINT', 'LWORD');
    export const ULINT_TO_REAL = BuiltInsUtils.createConvertFunction('ULINT', 'REAL');
    export const ULINT_TO_SINT = BuiltInsUtils.createConvertFunction('ULINT', 'SINT');
    export const ULINT_TO_UDINT = BuiltInsUtils.createConvertFunction('ULINT', 'UDINT');
    export const ULINT_TO_UINT = BuiltInsUtils.createConvertFunction('ULINT', 'UINT');
    export const ULINT_TO_USINT = BuiltInsUtils.createConvertFunction('ULINT', 'USINT');
    export const ULINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('ULINT', 'WCHAR');
    export const ULINT_TO_WORD = BuiltInsUtils.createConvertFunction('ULINT', 'WORD');
    
    export const USINT_TO_BOOL = BuiltInsUtils.createConvertFunction('USINT', 'BOOL');
    export const USINT_TO_BYTE = BuiltInsUtils.createConvertFunction('USINT', 'BYTE');
    export const USINT_TO_CHAR = BuiltInsUtils.createConvertFunction('USINT', 'CHAR');
    export const USINT_TO_DINT = BuiltInsUtils.createConvertFunction('USINT', 'DINT');
    export const USINT_TO_DWORD = BuiltInsUtils.createConvertFunction('USINT', 'DWORD');
    export const USINT_TO_INT = BuiltInsUtils.createConvertFunction('USINT', 'INT');
    export const USINT_TO_LINT = BuiltInsUtils.createConvertFunction('USINT', 'LINT');
    export const USINT_TO_LREAL = BuiltInsUtils.createConvertFunction('USINT', 'LREAL');
    export const USINT_TO_LWORD = BuiltInsUtils.createConvertFunction('USINT', 'LWORD');
    export const USINT_TO_REAL = BuiltInsUtils.createConvertFunction('USINT', 'REAL');
    export const USINT_TO_SINT = BuiltInsUtils.createConvertFunction('USINT', 'SINT');
    export const USINT_TO_UDINT = BuiltInsUtils.createConvertFunction('USINT', 'UDINT');
    export const USINT_TO_UINT = BuiltInsUtils.createConvertFunction('USINT', 'UINT');
    export const USINT_TO_ULINT = BuiltInsUtils.createConvertFunction('USINT', 'ULINT');
    export const USINT_TO_WCHAR = BuiltInsUtils.createConvertFunction('USINT', 'WCHAR');
    export const USINT_TO_WORD = BuiltInsUtils.createConvertFunction('USINT', 'WORD');
    
    export const WCHAR_TO_BYTE = BuiltInsUtils.createConvertFunction('WCHAR', 'BYTE');
    export const WCHAR_TO_CHAR = BuiltInsUtils.createConvertFunction('WCHAR', 'CHAR');
    export const WCHAR_TO_DINT = BuiltInsUtils.createConvertFunction('WCHAR', 'DINT');
    export const WCHAR_TO_DWORD = BuiltInsUtils.createConvertFunction('WCHAR', 'DWORD');
    export const WCHAR_TO_INT = BuiltInsUtils.createConvertFunction('WCHAR', 'INT');
    export const WCHAR_TO_LINT = BuiltInsUtils.createConvertFunction('WCHAR', 'LINT');
    export const WCHAR_TO_LWORD = BuiltInsUtils.createConvertFunction('WCHAR', 'LWORD');
    export const WCHAR_TO_SINT = BuiltInsUtils.createConvertFunction('WCHAR', 'SINT');
    export const WCHAR_TO_UDINT = BuiltInsUtils.createConvertFunction('WCHAR', 'UDINT');
    export const WCHAR_TO_UINT = BuiltInsUtils.createConvertFunction('WCHAR', 'UINT');
    export const WCHAR_TO_ULINT = BuiltInsUtils.createConvertFunction('WCHAR', 'ULINT');
    export const WCHAR_TO_USINT = BuiltInsUtils.createConvertFunction('WCHAR', 'USINT');
    export const WCHAR_TO_WORD = BuiltInsUtils.createConvertFunction('WCHAR', 'WORD');
    
    export const WORD_TO_BOOL = BuiltInsUtils.createConvertFunction('WORD', 'BOOL');
    export const WORD_TO_BYTE = BuiltInsUtils.createConvertFunction('WORD', 'BYTE');
    export const WORD_TO_CHAR = BuiltInsUtils.createConvertFunction('WORD', 'CHAR');
    export const WORD_TO_DINT = BuiltInsUtils.createConvertFunction('WORD', 'DINT');
    export const WORD_TO_DWORD = BuiltInsUtils.createConvertFunction('WORD', 'DWORD');
    export const WORD_TO_INT = BuiltInsUtils.createConvertFunction('WORD', 'INT');
    export const WORD_TO_LINT = BuiltInsUtils.createConvertFunction('WORD', 'LINT');
    export const WORD_TO_LWORD = BuiltInsUtils.createConvertFunction('WORD', 'LWORD');
    export const WORD_TO_SINT = BuiltInsUtils.createConvertFunction('WORD', 'SINT');
    export const WORD_TO_UDINT = BuiltInsUtils.createConvertFunction('WORD', 'UDINT');
    export const WORD_TO_UINT = BuiltInsUtils.createConvertFunction('WORD', 'UINT');
    export const WORD_TO_ULINT = BuiltInsUtils.createConvertFunction('WORD', 'ULINT');
    export const WORD_TO_USINT = BuiltInsUtils.createConvertFunction('WORD', 'USINT');
    export const WORD_TO_WCHAR = BuiltInsUtils.createConvertFunction('WORD', 'WCHAR');

    export const uriMap: { [K: string]: string } = {
        // Built in CONVERT functions
        '/builtinLibrary.BCD16_TO_INT.scl': BCD16_TO_INT,
        '/builtinLibrary.BCD32_TO_DINT.scl': BCD32_TO_DINT,
        '/builtinLibrary.BOOL_TO_BYTE.scl': BOOL_TO_BYTE,
        '/builtinLibrary.BOOL_TO_DINT.scl': BOOL_TO_DINT,
        '/builtinLibrary.BOOL_TO_DWORD.scl': BOOL_TO_DWORD,
        '/builtinLibrary.BOOL_TO_INT.scl': BOOL_TO_INT,
        '/builtinLibrary.BOOL_TO_LINT.scl': BOOL_TO_LINT,
        '/builtinLibrary.BOOL_TO_LWORD.scl': BOOL_TO_LWORD,
        '/builtinLibrary.BOOL_TO_SINT.scl': BOOL_TO_SINT,
        '/builtinLibrary.BOOL_TO_UDINT.scl': BOOL_TO_UDINT,
        '/builtinLibrary.BOOL_TO_UINT.scl': BOOL_TO_UINT,
        '/builtinLibrary.BOOL_TO_ULINT.scl': BOOL_TO_ULINT,
        '/builtinLibrary.BOOL_TO_USINT.scl': BOOL_TO_USINT,
        '/builtinLibrary.BOOL_TO_WORD.scl': BOOL_TO_WORD,
        '/builtinLibrary.BYTE_TO_BOOL.scl': BYTE_TO_BOOL,
        '/builtinLibrary.BYTE_TO_CHAR.scl': BYTE_TO_CHAR,
        '/builtinLibrary.BYTE_TO_DINT.scl': BYTE_TO_DINT,
        '/builtinLibrary.BYTE_TO_DWORD.scl': BYTE_TO_DWORD,
        '/builtinLibrary.BYTE_TO_INT.scl': BYTE_TO_INT,
        '/builtinLibrary.BYTE_TO_LINT.scl': BYTE_TO_LINT,
        '/builtinLibrary.BYTE_TO_LWORD.scl': BYTE_TO_LWORD,
        '/builtinLibrary.BYTE_TO_SINT.scl': BYTE_TO_SINT,
        '/builtinLibrary.BYTE_TO_UDINT.scl': BYTE_TO_UDINT,
        '/builtinLibrary.BYTE_TO_UINT.scl': BYTE_TO_UINT,
        '/builtinLibrary.BYTE_TO_ULINT.scl': BYTE_TO_ULINT,
        '/builtinLibrary.BYTE_TO_USINT.scl': BYTE_TO_USINT,
        '/builtinLibrary.BYTE_TO_WCHAR.scl': BYTE_TO_WCHAR,
        '/builtinLibrary.BYTE_TO_WORD.scl': BYTE_TO_WORD,
        '/builtinLibrary.CHAR_TO_BYTE.scl': CHAR_TO_BYTE,
        '/builtinLibrary.CHAR_TO_DINT.scl': CHAR_TO_DINT,
        '/builtinLibrary.CHAR_TO_DWORD.scl': CHAR_TO_DWORD,
        '/builtinLibrary.CHAR_TO_INT.scl': CHAR_TO_INT,
        '/builtinLibrary.CHAR_TO_LINT.scl': CHAR_TO_LINT,
        '/builtinLibrary.CHAR_TO_LWORD.scl': CHAR_TO_LWORD,
        '/builtinLibrary.CHAR_TO_SINT.scl': CHAR_TO_SINT,
        '/builtinLibrary.CHAR_TO_UDINT.scl': CHAR_TO_UDINT,
        '/builtinLibrary.CHAR_TO_UINT.scl': CHAR_TO_UINT,
        '/builtinLibrary.CHAR_TO_ULINT.scl': CHAR_TO_ULINT,
        '/builtinLibrary.CHAR_TO_USINT.scl': CHAR_TO_USINT,
        '/builtinLibrary.CHAR_TO_WCHAR.scl': CHAR_TO_WCHAR,
        '/builtinLibrary.CHAR_TO_WORD.scl': CHAR_TO_WORD,
        '/builtinLibrary.DB_ANY_TO_UINT.scl': DB_ANY_TO_UINT,
        '/builtinLibrary.DINT_TO_BCD32.scl': DINT_TO_BCD32,
        '/builtinLibrary.DINT_TO_BOOL.scl': DINT_TO_BOOL,
        '/builtinLibrary.DINT_TO_BYTE.scl': DINT_TO_BYTE,
        '/builtinLibrary.DINT_TO_CHAR.scl': DINT_TO_CHAR,
        '/builtinLibrary.DINT_TO_DWORD.scl': DINT_TO_DWORD,
        '/builtinLibrary.DINT_TO_INT.scl': DINT_TO_INT,
        '/builtinLibrary.DINT_TO_LINT.scl': DINT_TO_LINT,
        '/builtinLibrary.DINT_TO_LREAL.scl': DINT_TO_LREAL,
        '/builtinLibrary.DINT_TO_LWORD.scl': DINT_TO_LWORD,
        '/builtinLibrary.DINT_TO_REAL.scl': DINT_TO_REAL,
        '/builtinLibrary.DINT_TO_SINT.scl': DINT_TO_SINT,
        '/builtinLibrary.DINT_TO_UDINT.scl': DINT_TO_UDINT,
        '/builtinLibrary.DINT_TO_UINT.scl': DINT_TO_UINT,
        '/builtinLibrary.DINT_TO_ULINT.scl': DINT_TO_ULINT,
        '/builtinLibrary.DINT_TO_USINT.scl': DINT_TO_USINT,
        '/builtinLibrary.DINT_TO_WCHAR.scl': DINT_TO_WCHAR,
        '/builtinLibrary.DINT_TO_WORD.scl': DINT_TO_WORD,
        '/builtinLibrary.DWORD_TO_BOOL.scl': DWORD_TO_BOOL,
        '/builtinLibrary.DWORD_TO_BYTE.scl': DWORD_TO_BYTE,
        '/builtinLibrary.DWORD_TO_CHAR.scl': DWORD_TO_CHAR,
        '/builtinLibrary.DWORD_TO_DINT.scl': DWORD_TO_DINT,
        '/builtinLibrary.DWORD_TO_INT.scl': DWORD_TO_INT,
        '/builtinLibrary.DWORD_TO_LINT.scl': DWORD_TO_LINT,
        '/builtinLibrary.DWORD_TO_LWORD.scl': DWORD_TO_LWORD,
        '/builtinLibrary.DWORD_TO_REAL.scl': DWORD_TO_REAL,
        '/builtinLibrary.DWORD_TO_SINT.scl': DWORD_TO_SINT,
        '/builtinLibrary.DWORD_TO_UDINT.scl': DWORD_TO_UDINT,
        '/builtinLibrary.DWORD_TO_UINT.scl': DWORD_TO_UINT,
        '/builtinLibrary.DWORD_TO_ULINT.scl': DWORD_TO_ULINT,
        '/builtinLibrary.DWORD_TO_USINT.scl': DWORD_TO_USINT,
        '/builtinLibrary.DWORD_TO_WCHAR.scl': DWORD_TO_WCHAR,
        '/builtinLibrary.DWORD_TO_WORD.scl': DWORD_TO_WORD,
        '/builtinLibrary.INT_TO_BCD32.scl': INT_TO_BCD32,
        '/builtinLibrary.INT_TO_BOOL.scl': INT_TO_BOOL,
        '/builtinLibrary.INT_TO_BYTE.scl': INT_TO_BYTE,
        '/builtinLibrary.INT_TO_CHAR.scl': INT_TO_CHAR,
        '/builtinLibrary.INT_TO_DINT.scl': INT_TO_DINT,
        '/builtinLibrary.INT_TO_DWORD.scl': INT_TO_DWORD,
        '/builtinLibrary.INT_TO_LINT.scl': INT_TO_LINT,
        '/builtinLibrary.INT_TO_LREAL.scl': INT_TO_LREAL,
        '/builtinLibrary.INT_TO_LWORD.scl': INT_TO_LWORD,
        '/builtinLibrary.INT_TO_REAL.scl': INT_TO_REAL,
        '/builtinLibrary.INT_TO_SINT.scl': INT_TO_SINT,
        '/builtinLibrary.INT_TO_UDINT.scl': INT_TO_UDINT,
        '/builtinLibrary.INT_TO_UINT.scl': INT_TO_UINT,
        '/builtinLibrary.INT_TO_ULINT.scl': INT_TO_ULINT,
        '/builtinLibrary.INT_TO_USINT.scl': INT_TO_USINT,
        '/builtinLibrary.INT_TO_WCHAR.scl': INT_TO_WCHAR,
        '/builtinLibrary.INT_TO_WORD.scl': INT_TO_WORD,
        '/builtinLibrary.LINT_TO_BOOL.scl': LINT_TO_BOOL,
        '/builtinLibrary.LINT_TO_BYTE.scl': LINT_TO_BYTE,
        '/builtinLibrary.LINT_TO_CHAR.scl': LINT_TO_CHAR,
        '/builtinLibrary.LINT_TO_DINT.scl': LINT_TO_DINT,
        '/builtinLibrary.LINT_TO_DWORD.scl': LINT_TO_DWORD,
        '/builtinLibrary.LINT_TO_INT.scl': LINT_TO_INT,
        '/builtinLibrary.LINT_TO_LREAL.scl': LINT_TO_LREAL,
        '/builtinLibrary.LINT_TO_LWORD.scl': LINT_TO_LWORD,
        '/builtinLibrary.LINT_TO_REAL.scl': LINT_TO_REAL,
        '/builtinLibrary.LINT_TO_SINT.scl': LINT_TO_SINT,
        '/builtinLibrary.LINT_TO_UDINT.scl': LINT_TO_UDINT,
        '/builtinLibrary.LINT_TO_UINT.scl': LINT_TO_UINT,
        '/builtinLibrary.LINT_TO_ULINT.scl': LINT_TO_ULINT,
        '/builtinLibrary.LINT_TO_USINT.scl': LINT_TO_USINT,
        '/builtinLibrary.LINT_TO_WCHAR.scl': LINT_TO_WCHAR,
        '/builtinLibrary.LINT_TO_WORD.scl': LINT_TO_WORD,
        '/builtinLibrary.LREAL_TO_DINT.scl': LREAL_TO_DINT,
        '/builtinLibrary.LREAL_TO_INT.scl': LREAL_TO_INT,
        '/builtinLibrary.LREAL_TO_LINT.scl': LREAL_TO_LINT,
        '/builtinLibrary.LREAL_TO_LWORD.scl': LREAL_TO_LWORD,
        '/builtinLibrary.LREAL_TO_REAL.scl': LREAL_TO_REAL,
        '/builtinLibrary.LREAL_TO_SINT.scl': LREAL_TO_SINT,
        '/builtinLibrary.LREAL_TO_UDINT.scl': LREAL_TO_UDINT,
        '/builtinLibrary.LREAL_TO_UINT.scl': LREAL_TO_UINT,
        '/builtinLibrary.LREAL_TO_ULINT.scl': LREAL_TO_ULINT,
        '/builtinLibrary.LREAL_TO_USINT.scl': LREAL_TO_USINT,
        '/builtinLibrary.LWORD_TO_BOOL.scl': LWORD_TO_BOOL,
        '/builtinLibrary.LWORD_TO_BYTE.scl': LWORD_TO_BYTE,
        '/builtinLibrary.LWORD_TO_CHAR.scl': LWORD_TO_CHAR,
        '/builtinLibrary.LWORD_TO_DINT.scl': LWORD_TO_DINT,
        '/builtinLibrary.LWORD_TO_DWORD.scl': LWORD_TO_DWORD,
        '/builtinLibrary.LWORD_TO_INT.scl': LWORD_TO_INT,
        '/builtinLibrary.LWORD_TO_LINT.scl': LWORD_TO_LINT,
        '/builtinLibrary.LWORD_TO_LREAL.scl': LWORD_TO_LREAL,
        '/builtinLibrary.LWORD_TO_SINT.scl': LWORD_TO_SINT,
        '/builtinLibrary.LWORD_TO_UDINT.scl': LWORD_TO_UDINT,
        '/builtinLibrary.LWORD_TO_UINT.scl': LWORD_TO_UINT,
        '/builtinLibrary.LWORD_TO_ULINT.scl': LWORD_TO_ULINT,
        '/builtinLibrary.LWORD_TO_USINT.scl': LWORD_TO_USINT,
        '/builtinLibrary.LWORD_TO_WCHAR.scl': LWORD_TO_WCHAR,
        '/builtinLibrary.LWORD_TO_WORD.scl': LWORD_TO_WORD,
        '/builtinLibrary.REAL_TO_DINT.scl': REAL_TO_DINT,
        '/builtinLibrary.REAL_TO_DWORD.scl': REAL_TO_DWORD,
        '/builtinLibrary.REAL_TO_INT.scl': REAL_TO_INT,
        '/builtinLibrary.REAL_TO_LINT.scl': REAL_TO_LINT,
        '/builtinLibrary.REAL_TO_LREAL.scl': REAL_TO_LREAL,
        '/builtinLibrary.REAL_TO_SINT.scl': REAL_TO_SINT,
        '/builtinLibrary.REAL_TO_UDINT.scl': REAL_TO_UDINT,
        '/builtinLibrary.REAL_TO_UINT.scl': REAL_TO_UINT,
        '/builtinLibrary.REAL_TO_ULINT.scl': REAL_TO_ULINT,
        '/builtinLibrary.REAL_TO_USINT.scl': REAL_TO_USINT,
        '/builtinLibrary.SINT_TO_BOOL.scl': SINT_TO_BOOL,
        '/builtinLibrary.SINT_TO_BYTE.scl': SINT_TO_BYTE,
        '/builtinLibrary.SINT_TO_CHAR.scl': SINT_TO_CHAR,
        '/builtinLibrary.SINT_TO_DINT.scl': SINT_TO_DINT,
        '/builtinLibrary.SINT_TO_DWORD.scl': SINT_TO_DWORD,
        '/builtinLibrary.SINT_TO_INT.scl': SINT_TO_INT,
        '/builtinLibrary.SINT_TO_LINT.scl': SINT_TO_LINT,
        '/builtinLibrary.SINT_TO_LREAL.scl': SINT_TO_LREAL,
        '/builtinLibrary.SINT_TO_LWORD.scl': SINT_TO_LWORD,
        '/builtinLibrary.SINT_TO_REAL.scl': SINT_TO_REAL,
        '/builtinLibrary.SINT_TO_UDINT.scl': SINT_TO_UDINT,
        '/builtinLibrary.SINT_TO_UINT.scl': SINT_TO_UINT,
        '/builtinLibrary.SINT_TO_ULINT.scl': SINT_TO_ULINT,
        '/builtinLibrary.SINT_TO_USINT.scl': SINT_TO_USINT,
        '/builtinLibrary.SINT_TO_WCHAR.scl': SINT_TO_WCHAR,
        '/builtinLibrary.SINT_TO_WORD.scl': SINT_TO_WORD,
        '/builtinLibrary.UDINT_TO_BOOL.scl': UDINT_TO_BOOL,
        '/builtinLibrary.UDINT_TO_BYTE.scl': UDINT_TO_BYTE,
        '/builtinLibrary.UDINT_TO_CHAR.scl': UDINT_TO_CHAR,
        '/builtinLibrary.UDINT_TO_DINT.scl': UDINT_TO_DINT,
        '/builtinLibrary.UDINT_TO_DWORD.scl': UDINT_TO_DWORD,
        '/builtinLibrary.UDINT_TO_INT.scl': UDINT_TO_INT,
        '/builtinLibrary.UDINT_TO_LINT.scl': UDINT_TO_LINT,
        '/builtinLibrary.UDINT_TO_LREAL.scl': UDINT_TO_LREAL,
        '/builtinLibrary.UDINT_TO_LWORD.scl': UDINT_TO_LWORD,
        '/builtinLibrary.UDINT_TO_REAL.scl': UDINT_TO_REAL,
        '/builtinLibrary.UDINT_TO_SINT.scl': UDINT_TO_SINT,
        '/builtinLibrary.UDINT_TO_UINT.scl': UDINT_TO_UINT,
        '/builtinLibrary.UDINT_TO_ULINT.scl': UDINT_TO_ULINT,
        '/builtinLibrary.UDINT_TO_USINT.scl': UDINT_TO_USINT,
        '/builtinLibrary.UDINT_TO_WCHAR.scl': UDINT_TO_WCHAR,
        '/builtinLibrary.UDINT_TO_WORD.scl': UDINT_TO_WORD,
        '/builtinLibrary.UINT_TO_BOOL.scl': UINT_TO_BOOL,
        '/builtinLibrary.UINT_TO_BYTE.scl': UINT_TO_BYTE,
        '/builtinLibrary.UINT_TO_CHAR.scl': UINT_TO_CHAR,
        '/builtinLibrary.UINT_TO_DB_ANY.scl': UINT_TO_DB_ANY,
        '/builtinLibrary.UINT_TO_DINT.scl': UINT_TO_DINT,
        '/builtinLibrary.UINT_TO_DWORD.scl': UINT_TO_DWORD,
        '/builtinLibrary.UINT_TO_INT.scl': UINT_TO_INT,
        '/builtinLibrary.UINT_TO_LINT.scl': UINT_TO_LINT,
        '/builtinLibrary.UINT_TO_LREAL.scl': UINT_TO_LREAL,
        '/builtinLibrary.UINT_TO_LWORD.scl': UINT_TO_LWORD,
        '/builtinLibrary.UINT_TO_REAL.scl': UINT_TO_REAL,
        '/builtinLibrary.UINT_TO_SINT.scl': UINT_TO_SINT,
        '/builtinLibrary.UINT_TO_UDINT.scl': UINT_TO_UDINT,
        '/builtinLibrary.UINT_TO_ULINT.scl': UINT_TO_ULINT,
        '/builtinLibrary.UINT_TO_USINT.scl': UINT_TO_USINT,
        '/builtinLibrary.UINT_TO_WCHAR.scl': UINT_TO_WCHAR,
        '/builtinLibrary.UINT_TO_WORD.scl': UINT_TO_WORD,
        '/builtinLibrary.ULINT_TO_BOOL.scl': ULINT_TO_BOOL,
        '/builtinLibrary.ULINT_TO_BYTE.scl': ULINT_TO_BYTE,
        '/builtinLibrary.ULINT_TO_CHAR.scl': ULINT_TO_CHAR,
        '/builtinLibrary.ULINT_TO_DINT.scl': ULINT_TO_DINT,
        '/builtinLibrary.ULINT_TO_DWORD.scl': ULINT_TO_DWORD,
        '/builtinLibrary.ULINT_TO_INT.scl': ULINT_TO_INT,
        '/builtinLibrary.ULINT_TO_LINT.scl': ULINT_TO_LINT,
        '/builtinLibrary.ULINT_TO_LREAL.scl': ULINT_TO_LREAL,
        '/builtinLibrary.ULINT_TO_LWORD.scl': ULINT_TO_LWORD,
        '/builtinLibrary.ULINT_TO_REAL.scl': ULINT_TO_REAL,
        '/builtinLibrary.ULINT_TO_SINT.scl': ULINT_TO_SINT,
        '/builtinLibrary.ULINT_TO_UDINT.scl': ULINT_TO_UDINT,
        '/builtinLibrary.ULINT_TO_UINT.scl': ULINT_TO_UINT,
        '/builtinLibrary.ULINT_TO_USINT.scl': ULINT_TO_USINT,
        '/builtinLibrary.ULINT_TO_WCHAR.scl': ULINT_TO_WCHAR,
        '/builtinLibrary.ULINT_TO_WORD.scl': ULINT_TO_WORD,
        '/builtinLibrary.USINT_TO_BOOL.scl': USINT_TO_BOOL,
        '/builtinLibrary.USINT_TO_BYTE.scl': USINT_TO_BYTE,
        '/builtinLibrary.USINT_TO_CHAR.scl': USINT_TO_CHAR,
        '/builtinLibrary.USINT_TO_DINT.scl': USINT_TO_DINT,
        '/builtinLibrary.USINT_TO_DWORD.scl': USINT_TO_DWORD,
        '/builtinLibrary.USINT_TO_INT.scl': USINT_TO_INT,
        '/builtinLibrary.USINT_TO_LINT.scl': USINT_TO_LINT,
        '/builtinLibrary.USINT_TO_LREAL.scl': USINT_TO_LREAL,
        '/builtinLibrary.USINT_TO_LWORD.scl': USINT_TO_LWORD,
        '/builtinLibrary.USINT_TO_REAL.scl': USINT_TO_REAL,
        '/builtinLibrary.USINT_TO_SINT.scl': USINT_TO_SINT,
        '/builtinLibrary.USINT_TO_UDINT.scl': USINT_TO_UDINT,
        '/builtinLibrary.USINT_TO_UINT.scl': USINT_TO_UINT,
        '/builtinLibrary.USINT_TO_ULINT.scl': USINT_TO_ULINT,
        '/builtinLibrary.USINT_TO_WCHAR.scl': USINT_TO_WCHAR,
        '/builtinLibrary.USINT_TO_WORD.scl': USINT_TO_WORD,
        '/builtinLibrary.WCHAR_TO_BYTE.scl': WCHAR_TO_BYTE,
        '/builtinLibrary.WCHAR_TO_CHAR.scl': WCHAR_TO_CHAR,
        '/builtinLibrary.WCHAR_TO_DINT.scl': WCHAR_TO_DINT,
        '/builtinLibrary.WCHAR_TO_DWORD.scl': WCHAR_TO_DWORD,
        '/builtinLibrary.WCHAR_TO_INT.scl': WCHAR_TO_INT,
        '/builtinLibrary.WCHAR_TO_LINT.scl': WCHAR_TO_LINT,
        '/builtinLibrary.WCHAR_TO_LWORD.scl': WCHAR_TO_LWORD,
        '/builtinLibrary.WCHAR_TO_SINT.scl': WCHAR_TO_SINT,
        '/builtinLibrary.WCHAR_TO_UDINT.scl': WCHAR_TO_UDINT,
        '/builtinLibrary.WCHAR_TO_UINT.scl': WCHAR_TO_UINT,
        '/builtinLibrary.WCHAR_TO_ULINT.scl': WCHAR_TO_ULINT,
        '/builtinLibrary.WCHAR_TO_USINT.scl': WCHAR_TO_USINT,
        '/builtinLibrary.WCHAR_TO_WORD.scl': WCHAR_TO_WORD,
        '/builtinLibrary.WORD_TO_BOOL.scl': WORD_TO_BOOL,
        '/builtinLibrary.WORD_TO_BYTE.scl': WORD_TO_BYTE,
        '/builtinLibrary.WORD_TO_CHAR.scl': WORD_TO_CHAR,
        '/builtinLibrary.WORD_TO_DINT.scl': WORD_TO_DINT,
        '/builtinLibrary.WORD_TO_DWORD.scl': WORD_TO_DWORD,
        '/builtinLibrary.WORD_TO_INT.scl': WORD_TO_INT,
        '/builtinLibrary.WORD_TO_LINT.scl': WORD_TO_LINT,
        '/builtinLibrary.WORD_TO_LWORD.scl': WORD_TO_LWORD,
        '/builtinLibrary.WORD_TO_SINT.scl': WORD_TO_SINT,
        '/builtinLibrary.WORD_TO_UDINT.scl': WORD_TO_UDINT,
        '/builtinLibrary.WORD_TO_UINT.scl': WORD_TO_UINT,
        '/builtinLibrary.WORD_TO_ULINT.scl': WORD_TO_ULINT,
        '/builtinLibrary.WORD_TO_USINT.scl': WORD_TO_USINT,
        '/builtinLibrary.WORD_TO_WCHAR.scl': WORD_TO_WCHAR,
    }

    /* List of functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        // Built in CONVERT functions
        'BCD16_TO_INT',
        'BCD32_TO_DINT',
        'BOOL_TO_BYTE',
        'BOOL_TO_DINT',
        'BOOL_TO_DWORD',
        'BOOL_TO_INT',
        'BOOL_TO_LINT',
        'BOOL_TO_LWORD',
        'BOOL_TO_SINT',
        'BOOL_TO_UDINT',
        'BOOL_TO_UINT',
        'BOOL_TO_ULINT',
        'BOOL_TO_USINT',
        'BOOL_TO_WORD',
        'BYTE_TO_BOOL',
        'BYTE_TO_CHAR',
        'BYTE_TO_DINT',
        'BYTE_TO_DWORD',
        'BYTE_TO_INT',
        'BYTE_TO_LINT',
        'BYTE_TO_LWORD',
        'BYTE_TO_SINT',
        'BYTE_TO_UDINT',
        'BYTE_TO_UINT',
        'BYTE_TO_ULINT',
        'BYTE_TO_USINT',
        'BYTE_TO_WCHAR',
        'BYTE_TO_WORD',
        'CHAR_TO_BYTE',
        'CHAR_TO_DINT',
        'CHAR_TO_DWORD',
        'CHAR_TO_INT',
        'CHAR_TO_LINT',
        'CHAR_TO_LWORD',
        'CHAR_TO_SINT',
        'CHAR_TO_UDINT',
        'CHAR_TO_UINT',
        'CHAR_TO_ULINT',
        'CHAR_TO_USINT',
        'CHAR_TO_WCHAR',
        'CHAR_TO_WORD',
        'DB_ANY_TO_UINT',
        'DINT_TO_BCD32',
        'DINT_TO_BOOL',
        'DINT_TO_BYTE',
        'DINT_TO_CHAR',
        'DINT_TO_DWORD',
        'DINT_TO_INT',
        'DINT_TO_LINT',
        'DINT_TO_LREAL',
        'DINT_TO_LWORD',
        'DINT_TO_REAL',
        'DINT_TO_SINT',
        'DINT_TO_UDINT',
        'DINT_TO_UINT',
        'DINT_TO_ULINT',
        'DINT_TO_USINT',
        'DINT_TO_WCHAR',
        'DINT_TO_WORD',
        'DWORD_TO_BOOL',
        'DWORD_TO_BYTE',
        'DWORD_TO_CHAR',
        'DWORD_TO_DINT',
        'DWORD_TO_INT',
        'DWORD_TO_LINT',
        'DWORD_TO_LWORD',
        'DWORD_TO_REAL',
        'DWORD_TO_SINT',
        'DWORD_TO_UDINT',
        'DWORD_TO_UINT',
        'DWORD_TO_ULINT',
        'DWORD_TO_USINT',
        'DWORD_TO_WCHAR',
        'DWORD_TO_WORD',
        'INT_TO_BCD32',
        'INT_TO_BOOL',
        'INT_TO_BYTE',
        'INT_TO_CHAR',
        'INT_TO_DINT',
        'INT_TO_DWORD',
        'INT_TO_LINT',
        'INT_TO_LREAL',
        'INT_TO_LWORD',
        'INT_TO_REAL',
        'INT_TO_SINT',
        'INT_TO_UDINT',
        'INT_TO_UINT',
        'INT_TO_ULINT',
        'INT_TO_USINT',
        'INT_TO_WCHAR',
        'INT_TO_WORD',
        'LINT_TO_BOOL',
        'LINT_TO_BYTE',
        'LINT_TO_CHAR',
        'LINT_TO_DINT',
        'LINT_TO_DWORD',
        'LINT_TO_INT',
        'LINT_TO_LREAL',
        'LINT_TO_LWORD',
        'LINT_TO_REAL',
        'LINT_TO_SINT',
        'LINT_TO_UDINT',
        'LINT_TO_UINT',
        'LINT_TO_ULINT',
        'LINT_TO_USINT',
        'LINT_TO_WCHAR',
        'LINT_TO_WORD',
        'LREAL_TO_DINT',
        'LREAL_TO_INT',
        'LREAL_TO_LINT',
        'LREAL_TO_LWORD',
        'LREAL_TO_REAL',
        'LREAL_TO_SINT',
        'LREAL_TO_UDINT',
        'LREAL_TO_UINT',
        'LREAL_TO_ULINT',
        'LREAL_TO_USINT',
        'LWORD_TO_BOOL',
        'LWORD_TO_BYTE',
        'LWORD_TO_CHAR',
        'LWORD_TO_DINT',
        'LWORD_TO_DWORD',
        'LWORD_TO_INT',
        'LWORD_TO_LINT',
        'LWORD_TO_LREAL',
        'LWORD_TO_SINT',
        'LWORD_TO_UDINT',
        'LWORD_TO_UINT',
        'LWORD_TO_ULINT',
        'LWORD_TO_USINT',
        'LWORD_TO_WCHAR',
        'LWORD_TO_WORD',
        'REAL_TO_DINT',
        'REAL_TO_DWORD',
        'REAL_TO_INT',
        'REAL_TO_LINT',
        'REAL_TO_LREAL',
        'REAL_TO_SINT',
        'REAL_TO_UDINT',
        'REAL_TO_UINT',
        'REAL_TO_ULINT',
        'REAL_TO_USINT',
        'SINT_TO_BOOL',
        'SINT_TO_BYTE',
        'SINT_TO_CHAR',
        'SINT_TO_DINT',
        'SINT_TO_DWORD',
        'SINT_TO_INT',
        'SINT_TO_LINT',
        'SINT_TO_LREAL',
        'SINT_TO_LWORD',
        'SINT_TO_REAL',
        'SINT_TO_UDINT',
        'SINT_TO_UINT',
        'SINT_TO_ULINT',
        'SINT_TO_USINT',
        'SINT_TO_WCHAR',
        'SINT_TO_WORD',
        'UDINT_TO_BOOL',
        'UDINT_TO_BYTE',
        'UDINT_TO_CHAR',
        'UDINT_TO_DINT',
        'UDINT_TO_DWORD',
        'UDINT_TO_INT',
        'UDINT_TO_LINT',
        'UDINT_TO_LREAL',
        'UDINT_TO_LWORD',
        'UDINT_TO_REAL',
        'UDINT_TO_SINT',
        'UDINT_TO_UINT',
        'UDINT_TO_ULINT',
        'UDINT_TO_USINT',
        'UDINT_TO_WCHAR',
        'UDINT_TO_WORD',
        'UINT_TO_BOOL',
        'UINT_TO_BYTE',
        'UINT_TO_CHAR',
        'UINT_TO_DB_ANY',
        'UINT_TO_DINT',
        'UINT_TO_DWORD',
        'UINT_TO_INT',
        'UINT_TO_LINT',
        'UINT_TO_LREAL',
        'UINT_TO_LWORD',
        'UINT_TO_REAL',
        'UINT_TO_SINT',
        'UINT_TO_UDINT',
        'UINT_TO_ULINT',
        'UINT_TO_USINT',
        'UINT_TO_WCHAR',
        'UINT_TO_WORD',
        'ULINT_TO_BOOL',
        'ULINT_TO_BYTE',
        'ULINT_TO_CHAR',
        'ULINT_TO_DINT',
        'ULINT_TO_DWORD',
        'ULINT_TO_INT',
        'ULINT_TO_LINT',
        'ULINT_TO_LREAL',
        'ULINT_TO_LWORD',
        'ULINT_TO_REAL',
        'ULINT_TO_SINT',
        'ULINT_TO_UDINT',
        'ULINT_TO_UINT',
        'ULINT_TO_USINT',
        'ULINT_TO_WCHAR',
        'ULINT_TO_WORD',
        'USINT_TO_BOOL',
        'USINT_TO_BYTE',
        'USINT_TO_CHAR',
        'USINT_TO_DINT',
        'USINT_TO_DWORD',
        'USINT_TO_INT',
        'USINT_TO_LINT',
        'USINT_TO_LREAL',
        'USINT_TO_LWORD',
        'USINT_TO_REAL',
        'USINT_TO_SINT',
        'USINT_TO_UDINT',
        'USINT_TO_UINT',
        'USINT_TO_ULINT',
        'USINT_TO_WCHAR',
        'USINT_TO_WORD',
        'WCHAR_TO_BYTE',
        'WCHAR_TO_CHAR',
        'WCHAR_TO_DINT',
        'WCHAR_TO_DWORD',
        'WCHAR_TO_INT',
        'WCHAR_TO_LINT',
        'WCHAR_TO_LWORD',
        'WCHAR_TO_SINT',
        'WCHAR_TO_UDINT',
        'WCHAR_TO_UINT',
        'WCHAR_TO_ULINT',
        'WCHAR_TO_USINT',
        'WCHAR_TO_WORD',
        'WORD_TO_BOOL',
        'WORD_TO_BYTE',
        'WORD_TO_CHAR',
        'WORD_TO_DINT',
        'WORD_TO_DWORD',
        'WORD_TO_INT',
        'WORD_TO_LINT',
        'WORD_TO_LWORD',
        'WORD_TO_SINT',
        'WORD_TO_UDINT',
        'WORD_TO_UINT',
        'WORD_TO_ULINT',
        'WORD_TO_USINT',
        'WORD_TO_WCHAR',
    ]);

}
