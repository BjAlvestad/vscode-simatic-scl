import { createConvertFunction } from "../built-in-utils.js";

export namespace ConversionBuiltIns {
    // Built in CONVERT functions
    
    export const BCD16_TO_INT = createConvertFunction('BCD16', 'INT');
    export const BCD32_TO_DINT = createConvertFunction('BCD32', 'DINT');
    
    export const BOOL_TO_BYTE = createConvertFunction('BOOL', 'BYTE');
    export const BOOL_TO_DINT = createConvertFunction('BOOL', 'DINT');
    export const BOOL_TO_DWORD = createConvertFunction('BOOL', 'DWORD');
    export const BOOL_TO_INT = createConvertFunction('BOOL', 'INT');
    export const BOOL_TO_LINT = createConvertFunction('BOOL', 'LINT');
    export const BOOL_TO_LWORD = createConvertFunction('BOOL', 'LWORD');
    export const BOOL_TO_SINT = createConvertFunction('BOOL', 'SINT');
    export const BOOL_TO_UDINT = createConvertFunction('BOOL', 'UDINT');
    export const BOOL_TO_UINT = createConvertFunction('BOOL', 'UINT');
    export const BOOL_TO_ULINT = createConvertFunction('BOOL', 'ULINT');
    export const BOOL_TO_USINT = createConvertFunction('BOOL', 'USINT');
    export const BOOL_TO_WORD = createConvertFunction('BOOL', 'WORD');
    
    export const BYTE_TO_BOOL = createConvertFunction('BYTE', 'BOOL');
    export const BYTE_TO_CHAR = createConvertFunction('BYTE', 'CHAR');
    export const BYTE_TO_DINT = createConvertFunction('BYTE', 'DINT');
    export const BYTE_TO_DWORD = createConvertFunction('BYTE', 'DWORD');
    export const BYTE_TO_INT = createConvertFunction('BYTE', 'INT');
    export const BYTE_TO_LINT = createConvertFunction('BYTE', 'LINT');
    export const BYTE_TO_LWORD = createConvertFunction('BYTE', 'LWORD');
    export const BYTE_TO_SINT = createConvertFunction('BYTE', 'SINT');
    export const BYTE_TO_UDINT = createConvertFunction('BYTE', 'UDINT');
    export const BYTE_TO_UINT = createConvertFunction('BYTE', 'UINT');
    export const BYTE_TO_ULINT = createConvertFunction('BYTE', 'ULINT');
    export const BYTE_TO_USINT = createConvertFunction('BYTE', 'USINT');
    export const BYTE_TO_WCHAR = createConvertFunction('BYTE', 'WCHAR');
    export const BYTE_TO_WORD = createConvertFunction('BYTE', 'WORD');
    
    export const CHAR_TO_BYTE = createConvertFunction('CHAR', 'BYTE');
    export const CHAR_TO_DINT = createConvertFunction('CHAR', 'DINT');
    export const CHAR_TO_DWORD = createConvertFunction('CHAR', 'DWORD');
    export const CHAR_TO_INT = createConvertFunction('CHAR', 'INT');
    export const CHAR_TO_LINT = createConvertFunction('CHAR', 'LINT');
    export const CHAR_TO_LWORD = createConvertFunction('CHAR', 'LWORD');
    export const CHAR_TO_SINT = createConvertFunction('CHAR', 'SINT');
    export const CHAR_TO_UDINT = createConvertFunction('CHAR', 'UDINT');
    export const CHAR_TO_UINT = createConvertFunction('CHAR', 'UINT');
    export const CHAR_TO_ULINT = createConvertFunction('CHAR', 'ULINT');
    export const CHAR_TO_USINT = createConvertFunction('CHAR', 'USINT');
    export const CHAR_TO_WCHAR = createConvertFunction('CHAR', 'WCHAR');
    export const CHAR_TO_WORD = createConvertFunction('CHAR', 'WORD');
    
    export const DB_ANY_TO_UINT = createConvertFunction('DB_ANY', 'UINT');
    
    export const DINT_TO_BCD32 = createConvertFunction('DINT', 'BCD32');
    export const DINT_TO_BOOL = createConvertFunction('DINT', 'BOOL');
    export const DINT_TO_BYTE = createConvertFunction('DINT', 'BYTE');
    export const DINT_TO_CHAR = createConvertFunction('DINT', 'CHAR');
    export const DINT_TO_DWORD = createConvertFunction('DINT', 'DWORD');
    export const DINT_TO_INT = createConvertFunction('DINT', 'INT');
    export const DINT_TO_LINT = createConvertFunction('DINT', 'LINT');
    export const DINT_TO_LREAL = createConvertFunction('DINT', 'LREAL');
    export const DINT_TO_LWORD = createConvertFunction('DINT', 'LWORD');
    export const DINT_TO_REAL = createConvertFunction('DINT', 'REAL');
    export const DINT_TO_SINT = createConvertFunction('DINT', 'SINT');
    export const DINT_TO_UDINT = createConvertFunction('DINT', 'UDINT');
    export const DINT_TO_UINT = createConvertFunction('DINT', 'UINT');
    export const DINT_TO_ULINT = createConvertFunction('DINT', 'ULINT');
    export const DINT_TO_USINT = createConvertFunction('DINT', 'USINT');
    export const DINT_TO_WCHAR = createConvertFunction('DINT', 'WCHAR');
    export const DINT_TO_WORD = createConvertFunction('DINT', 'WORD');
    
    export const DWORD_TO_BOOL = createConvertFunction('DWORD', 'BOOL');
    export const DWORD_TO_BYTE = createConvertFunction('DWORD', 'BYTE');
    export const DWORD_TO_CHAR = createConvertFunction('DWORD', 'CHAR');
    export const DWORD_TO_DINT = createConvertFunction('DWORD', 'DINT');
    export const DWORD_TO_INT = createConvertFunction('DWORD', 'INT');
    export const DWORD_TO_LINT = createConvertFunction('DWORD', 'LINT');
    export const DWORD_TO_LWORD = createConvertFunction('DWORD', 'LWORD');
    export const DWORD_TO_REAL = createConvertFunction('DWORD', 'REAL');
    export const DWORD_TO_SINT = createConvertFunction('DWORD', 'SINT');
    export const DWORD_TO_UDINT = createConvertFunction('DWORD', 'UDINT');
    export const DWORD_TO_UINT = createConvertFunction('DWORD', 'UINT');
    export const DWORD_TO_ULINT = createConvertFunction('DWORD', 'ULINT');
    export const DWORD_TO_USINT = createConvertFunction('DWORD', 'USINT');
    export const DWORD_TO_WCHAR = createConvertFunction('DWORD', 'WCHAR');
    export const DWORD_TO_WORD = createConvertFunction('DWORD', 'WORD');
    
    export const INT_TO_BCD32 = createConvertFunction('INT', 'BCD16');
    export const INT_TO_BOOL = createConvertFunction('INT', 'BOOL');
    export const INT_TO_BYTE = createConvertFunction('INT', 'BYTE');
    export const INT_TO_CHAR = createConvertFunction('INT', 'CHAR');
    export const INT_TO_DINT = createConvertFunction('INT', 'DINT');
    export const INT_TO_DWORD = createConvertFunction('INT', 'DWORD');
    export const INT_TO_LINT = createConvertFunction('INT', 'LINT');
    export const INT_TO_LREAL = createConvertFunction('INT', 'LREAL');
    export const INT_TO_LWORD = createConvertFunction('INT', 'LWORD');
    export const INT_TO_REAL = createConvertFunction('INT', 'REAL');
    export const INT_TO_SINT = createConvertFunction('INT', 'SINT');
    export const INT_TO_UDINT = createConvertFunction('INT', 'UDINT');
    export const INT_TO_UINT = createConvertFunction('INT', 'UINT');
    export const INT_TO_ULINT = createConvertFunction('INT', 'ULINT');
    export const INT_TO_USINT = createConvertFunction('INT', 'USINT');
    export const INT_TO_WCHAR = createConvertFunction('INT', 'WCHAR');
    export const INT_TO_WORD = createConvertFunction('INT', 'WORD');
    
    export const LINT_TO_BOOL = createConvertFunction('LINT', 'BOOL');
    export const LINT_TO_BYTE = createConvertFunction('LINT', 'BYTE');
    export const LINT_TO_CHAR = createConvertFunction('LINT', 'CHAR');
    export const LINT_TO_DINT = createConvertFunction('LINT', 'DINT');
    export const LINT_TO_DWORD = createConvertFunction('LINT', 'DWORD');
    export const LINT_TO_INT = createConvertFunction('LINT', 'INT');
    export const LINT_TO_LREAL = createConvertFunction('LINT', 'LREAL');
    export const LINT_TO_LWORD = createConvertFunction('LINT', 'LWORD');
    export const LINT_TO_REAL = createConvertFunction('LINT', 'REAL');
    export const LINT_TO_SINT = createConvertFunction('LINT', 'SINT');
    export const LINT_TO_UDINT = createConvertFunction('LINT', 'UDINT');
    export const LINT_TO_UINT = createConvertFunction('LINT', 'UINT');
    export const LINT_TO_ULINT = createConvertFunction('LINT', 'ULINT');
    export const LINT_TO_USINT = createConvertFunction('LINT', 'USINT');
    export const LINT_TO_WCHAR = createConvertFunction('LINT', 'WCHAR');
    export const LINT_TO_WORD = createConvertFunction('LINT', 'WORD');
    
    export const LREAL_TO_DINT = createConvertFunction('LREAL', 'DINT');
    export const LREAL_TO_INT = createConvertFunction('LREAL', 'INT');
    export const LREAL_TO_LINT = createConvertFunction('LREAL', 'LINT');
    export const LREAL_TO_LWORD = createConvertFunction('LREAL', 'LWORD');
    export const LREAL_TO_REAL = createConvertFunction('LREAL', 'REAL');
    export const LREAL_TO_SINT = createConvertFunction('LREAL', 'SINT');
    export const LREAL_TO_UDINT = createConvertFunction('LREAL', 'UDINT');
    export const LREAL_TO_UINT = createConvertFunction('LREAL', 'UINT');
    export const LREAL_TO_ULINT = createConvertFunction('LREAL', 'ULINT');
    export const LREAL_TO_USINT = createConvertFunction('LREAL', 'USINT');
    
    export const LWORD_TO_BOOL = createConvertFunction('LWORD', 'BOOL');
    export const LWORD_TO_BYTE = createConvertFunction('LWORD', 'BYTE');
    export const LWORD_TO_CHAR = createConvertFunction('LWORD', 'CHAR');
    export const LWORD_TO_DINT = createConvertFunction('LWORD', 'DINT');
    export const LWORD_TO_DWORD = createConvertFunction('LWORD', 'DWORD');
    export const LWORD_TO_INT = createConvertFunction('LWORD', 'INT');
    export const LWORD_TO_LINT = createConvertFunction('LWORD', 'LINT');
    export const LWORD_TO_LREAL = createConvertFunction('LWORD', 'LREAL');
    export const LWORD_TO_SINT = createConvertFunction('LWORD', 'SINT');
    export const LWORD_TO_UDINT = createConvertFunction('LWORD', 'UDINT');
    export const LWORD_TO_UINT = createConvertFunction('LWORD', 'UINT');
    export const LWORD_TO_ULINT = createConvertFunction('LWORD', 'ULINT');
    export const LWORD_TO_USINT = createConvertFunction('LWORD', 'USINT');
    export const LWORD_TO_WCHAR = createConvertFunction('LWORD', 'WCHAR');
    export const LWORD_TO_WORD = createConvertFunction('LWORD', 'WORD');
    
    export const REAL_TO_DINT = createConvertFunction('REAL', 'DINT');
    export const REAL_TO_DWORD = createConvertFunction('REAL', 'DWORD');
    export const REAL_TO_INT = createConvertFunction('REAL', 'INT');
    export const REAL_TO_LINT = createConvertFunction('REAL', 'LINT');
    export const REAL_TO_LREAL = createConvertFunction('REAL', 'LREAL');
    export const REAL_TO_SINT = createConvertFunction('REAL', 'SINT');
    export const REAL_TO_UDINT = createConvertFunction('REAL', 'UDINT');
    export const REAL_TO_UINT = createConvertFunction('REAL', 'UINT');
    export const REAL_TO_ULINT = createConvertFunction('REAL', 'ULINT');
    export const REAL_TO_USINT = createConvertFunction('REAL', 'USINT');
    
    export const SINT_TO_BOOL = createConvertFunction('SINT', 'BOOL');
    export const SINT_TO_BYTE = createConvertFunction('SINT', 'BYTE');
    export const SINT_TO_CHAR = createConvertFunction('SINT', 'CHAR');
    export const SINT_TO_DINT = createConvertFunction('SINT', 'DINT');
    export const SINT_TO_DWORD = createConvertFunction('SINT', 'DWORD');
    export const SINT_TO_INT = createConvertFunction('SINT', 'INT');
    export const SINT_TO_LINT = createConvertFunction('SINT', 'LINT');
    export const SINT_TO_LREAL = createConvertFunction('SINT', 'LREAL');
    export const SINT_TO_LWORD = createConvertFunction('SINT', 'LWORD');
    export const SINT_TO_REAL = createConvertFunction('SINT', 'REAL');
    export const SINT_TO_UDINT = createConvertFunction('SINT', 'UDINT');
    export const SINT_TO_UINT = createConvertFunction('SINT', 'UINT');
    export const SINT_TO_ULINT = createConvertFunction('SINT', 'ULINT');
    export const SINT_TO_USINT = createConvertFunction('SINT', 'USINT');
    export const SINT_TO_WCHAR = createConvertFunction('SINT', 'WCHAR');
    export const SINT_TO_WORD = createConvertFunction('SINT', 'WORD');
    
    export const UDINT_TO_BOOL = createConvertFunction('UDINT', 'BOOL');
    export const UDINT_TO_BYTE = createConvertFunction('UDINT', 'BYTE');
    export const UDINT_TO_CHAR = createConvertFunction('UDINT', 'CHAR');
    export const UDINT_TO_DINT = createConvertFunction('UDINT', 'DINT');
    export const UDINT_TO_DWORD = createConvertFunction('UDINT', 'DWORD');
    export const UDINT_TO_INT = createConvertFunction('UDINT', 'INT');
    export const UDINT_TO_LINT = createConvertFunction('UDINT', 'LINT');
    export const UDINT_TO_LREAL = createConvertFunction('UDINT', 'LREAL');
    export const UDINT_TO_LWORD = createConvertFunction('UDINT', 'LWORD');
    export const UDINT_TO_REAL = createConvertFunction('UDINT', 'REAL');
    export const UDINT_TO_SINT = createConvertFunction('UDINT', 'SINT');
    export const UDINT_TO_UINT = createConvertFunction('UDINT', 'UINT');
    export const UDINT_TO_ULINT = createConvertFunction('UDINT', 'ULINT');
    export const UDINT_TO_USINT = createConvertFunction('UDINT', 'USINT');
    export const UDINT_TO_WCHAR = createConvertFunction('UDINT', 'WCHAR');
    export const UDINT_TO_WORD = createConvertFunction('UDINT', 'WORD');
    
    export const UINT_TO_BOOL = createConvertFunction('UINT', 'BOOL');
    export const UINT_TO_BYTE = createConvertFunction('UINT', 'BYTE');
    export const UINT_TO_CHAR = createConvertFunction('UINT', 'CHAR');
    export const UINT_TO_DB_ANY = createConvertFunction('UINT', 'DB_ANY');
    export const UINT_TO_DINT = createConvertFunction('UINT', 'DINT');
    export const UINT_TO_DWORD = createConvertFunction('UINT', 'DWORD');
    export const UINT_TO_INT = createConvertFunction('UINT', 'INT');
    export const UINT_TO_LINT = createConvertFunction('UINT', 'LINT');
    export const UINT_TO_LREAL = createConvertFunction('UINT', 'LREAL');
    export const UINT_TO_LWORD = createConvertFunction('UINT', 'LWORD');
    export const UINT_TO_REAL = createConvertFunction('UINT', 'REAL');
    export const UINT_TO_SINT = createConvertFunction('UINT', 'SINT');
    export const UINT_TO_UDINT = createConvertFunction('UINT', 'UDINT');
    export const UINT_TO_ULINT = createConvertFunction('UINT', 'ULINT');
    export const UINT_TO_USINT = createConvertFunction('UINT', 'USINT');
    export const UINT_TO_WCHAR = createConvertFunction('UINT', 'WCHAR');
    export const UINT_TO_WORD = createConvertFunction('UINT', 'WORD');
    
    export const ULINT_TO_BOOL = createConvertFunction('ULINT', 'BOOL');
    export const ULINT_TO_BYTE = createConvertFunction('ULINT', 'BYTE');
    export const ULINT_TO_CHAR = createConvertFunction('ULINT', 'CHAR');
    export const ULINT_TO_DINT = createConvertFunction('ULINT', 'DINT');
    export const ULINT_TO_DWORD = createConvertFunction('ULINT', 'DWORD');
    export const ULINT_TO_INT = createConvertFunction('ULINT', 'INT');
    export const ULINT_TO_LINT = createConvertFunction('ULINT', 'LINT');
    export const ULINT_TO_LREAL = createConvertFunction('ULINT', 'LREAL');
    export const ULINT_TO_LWORD = createConvertFunction('ULINT', 'LWORD');
    export const ULINT_TO_REAL = createConvertFunction('ULINT', 'REAL');
    export const ULINT_TO_SINT = createConvertFunction('ULINT', 'SINT');
    export const ULINT_TO_UDINT = createConvertFunction('ULINT', 'UDINT');
    export const ULINT_TO_UINT = createConvertFunction('ULINT', 'UINT');
    export const ULINT_TO_USINT = createConvertFunction('ULINT', 'USINT');
    export const ULINT_TO_WCHAR = createConvertFunction('ULINT', 'WCHAR');
    export const ULINT_TO_WORD = createConvertFunction('ULINT', 'WORD');
    
    export const USINT_TO_BOOL = createConvertFunction('USINT', 'BOOL');
    export const USINT_TO_BYTE = createConvertFunction('USINT', 'BYTE');
    export const USINT_TO_CHAR = createConvertFunction('USINT', 'CHAR');
    export const USINT_TO_DINT = createConvertFunction('USINT', 'DINT');
    export const USINT_TO_DWORD = createConvertFunction('USINT', 'DWORD');
    export const USINT_TO_INT = createConvertFunction('USINT', 'INT');
    export const USINT_TO_LINT = createConvertFunction('USINT', 'LINT');
    export const USINT_TO_LREAL = createConvertFunction('USINT', 'LREAL');
    export const USINT_TO_LWORD = createConvertFunction('USINT', 'LWORD');
    export const USINT_TO_REAL = createConvertFunction('USINT', 'REAL');
    export const USINT_TO_SINT = createConvertFunction('USINT', 'SINT');
    export const USINT_TO_UDINT = createConvertFunction('USINT', 'UDINT');
    export const USINT_TO_UINT = createConvertFunction('USINT', 'UINT');
    export const USINT_TO_ULINT = createConvertFunction('USINT', 'ULINT');
    export const USINT_TO_WCHAR = createConvertFunction('USINT', 'WCHAR');
    export const USINT_TO_WORD = createConvertFunction('USINT', 'WORD');
    
    export const WCHAR_TO_BYTE = createConvertFunction('WCHAR', 'BYTE');
    export const WCHAR_TO_CHAR = createConvertFunction('WCHAR', 'CHAR');
    export const WCHAR_TO_DINT = createConvertFunction('WCHAR', 'DINT');
    export const WCHAR_TO_DWORD = createConvertFunction('WCHAR', 'DWORD');
    export const WCHAR_TO_INT = createConvertFunction('WCHAR', 'INT');
    export const WCHAR_TO_LINT = createConvertFunction('WCHAR', 'LINT');
    export const WCHAR_TO_LWORD = createConvertFunction('WCHAR', 'LWORD');
    export const WCHAR_TO_SINT = createConvertFunction('WCHAR', 'SINT');
    export const WCHAR_TO_UDINT = createConvertFunction('WCHAR', 'UDINT');
    export const WCHAR_TO_UINT = createConvertFunction('WCHAR', 'UINT');
    export const WCHAR_TO_ULINT = createConvertFunction('WCHAR', 'ULINT');
    export const WCHAR_TO_USINT = createConvertFunction('WCHAR', 'USINT');
    export const WCHAR_TO_WORD = createConvertFunction('WCHAR', 'WORD');
    
    export const WORD_TO_BOOL = createConvertFunction('WORD', 'BOOL');
    export const WORD_TO_BYTE = createConvertFunction('WORD', 'BYTE');
    export const WORD_TO_CHAR = createConvertFunction('WORD', 'CHAR');
    export const WORD_TO_DINT = createConvertFunction('WORD', 'DINT');
    export const WORD_TO_DWORD = createConvertFunction('WORD', 'DWORD');
    export const WORD_TO_INT = createConvertFunction('WORD', 'INT');
    export const WORD_TO_LINT = createConvertFunction('WORD', 'LINT');
    export const WORD_TO_LWORD = createConvertFunction('WORD', 'LWORD');
    export const WORD_TO_SINT = createConvertFunction('WORD', 'SINT');
    export const WORD_TO_UDINT = createConvertFunction('WORD', 'UDINT');
    export const WORD_TO_UINT = createConvertFunction('WORD', 'UINT');
    export const WORD_TO_ULINT = createConvertFunction('WORD', 'ULINT');
    export const WORD_TO_USINT = createConvertFunction('WORD', 'USINT');
    export const WORD_TO_WCHAR = createConvertFunction('WORD', 'WCHAR');

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
}
