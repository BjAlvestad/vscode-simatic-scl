import { createConvertFunction, createInOutFunction } from "../built-in-utils.js";

export namespace DataAndTimeBuiltIns {
    
    // Built in T_CONV functions (for converting date and time)
    
    export const BYTE_TO_DATE = createConvertFunction('BYTE', 'DATE');
    export const BYTE_TO_LDT = createConvertFunction('BYTE', 'LDT');
    export const BYTE_TO_LTIME = createConvertFunction('BYTE', 'LTIME');
    export const BYTE_TO_LTOD = createConvertFunction('BYTE', 'LTOD');
    export const BYTE_TO_TIME = createConvertFunction('BYTE', 'TIME');
    export const BYTE_TO_TOD = createConvertFunction('BYTE', 'TOD');
    
    export const DATE_TO_BYTE = createConvertFunction('DATE', 'BYTE');
    export const DATE_TO_DINT = createConvertFunction('DATE', 'DINT');
    export const DATE_TO_DT = createConvertFunction('DATE', 'DT');
    export const DATE_TO_DTL = createConvertFunction('DATE', 'DTL');
    export const DATE_TO_DWORD = createConvertFunction('DATE', 'DWORD');
    export const DATE_TO_INT = createConvertFunction('DATE', 'INT');
    export const DATE_TO_LDT = createConvertFunction('DATE', 'LDT');
    export const DATE_TO_LINT = createConvertFunction('DATE', 'LINT');
    export const DATE_TO_LWORD = createConvertFunction('DATE', 'LWORD');
    export const DATE_TO_SINT = createConvertFunction('DATE', 'SINT');
    export const DATE_TO_UDINT = createConvertFunction('DATE', 'UDINT');
    export const DATE_TO_UINT = createConvertFunction('DATE', 'UINT');
    export const DATE_TO_ULINT = createConvertFunction('DATE', 'ULINT');
    export const DATE_TO_USINT = createConvertFunction('DATE', 'USINT');
    export const DATE_TO_WORD = createConvertFunction('DATE', 'WORD');
    
    export const DINT_TO_DATE = createConvertFunction('DINT', 'DATE');
    export const DINT_TO_LDT = createConvertFunction('DINT', 'LDT');
    export const DINT_TO_LTIME = createConvertFunction('DINT', 'LTIME');
    export const DINT_TO_LTOD = createConvertFunction('DINT', 'LTOD');
    export const DINT_TO_TIME = createConvertFunction('DINT', 'TIME');
    export const DINT_TO_TOD = createConvertFunction('DINT', 'TOD');
    
    export const DT_TO_DATE = createConvertFunction('DT', 'DATE');
    export const DT_TO_DTL = createConvertFunction('DT', 'DTL');
    export const DT_TO_LDT = createConvertFunction('DT', 'LDT');
    export const DT_TO_LTOD = createConvertFunction('DT', 'LTOD');
    export const DT_TO_TOD = createConvertFunction('DT', 'TOD');
    
    export const DTL_TO_DATE = createConvertFunction('DTL', 'DATE');
    export const DTL_TO_DTL = createConvertFunction('DTL', 'DT');
    export const DTL_TO_LDT = createConvertFunction('DTL', 'LDT');
    export const DTL_TO_LTOD = createConvertFunction('DTL', 'LTOD');
    export const DTL_TO_TOD = createConvertFunction('DTL', 'TOD');
    
    export const DWORD_TO_DATE = createConvertFunction('DWORD', 'DATE');
    export const DWORD_TO_LDT = createConvertFunction('DWORD', 'LDT');
    export const DWORD_TO_LTIME = createConvertFunction('DWORD', 'LTIME');
    export const DWORD_TO_LTOD = createConvertFunction('DWORD', 'LTOD');
    export const DWORD_TO_TIME = createConvertFunction('DWORD', 'TIME');
    export const DWORD_TO_TOD = createConvertFunction('DWORD', 'TOD');
    
    export const INT_TO_DATE = createConvertFunction('INT', 'DATE');
    export const INT_TO_LDT = createConvertFunction('INT', 'LDT');
    export const INT_TO_LTIME = createConvertFunction('INT', 'LTIME');
    export const INT_TO_LTOD = createConvertFunction('INT', 'LTOD');
    export const INT_TO_TIME = createConvertFunction('INT', 'TIME');
    export const INT_TO_TOD = createConvertFunction('INT', 'TOD');
    
    export const LDT_TO_BYTE = createConvertFunction('LDT', 'BYTE');
    export const LDT_TO_DATE = createConvertFunction('LDT', 'DATE');
    export const LDT_TO_DINT = createConvertFunction('LDT', 'DINT');
    export const LDT_TO_DT = createConvertFunction('LDT', 'DT');
    export const LDT_TO_DTL = createConvertFunction('LDT', 'DTL');
    export const LDT_TO_DWORD = createConvertFunction('LDT', 'DWORD');
    export const LDT_TO_INT = createConvertFunction('LDT', 'INT');
    export const LDT_TO_LINT = createConvertFunction('LDT', 'LINT');
    export const LDT_TO_LTIME = createConvertFunction('LDT', 'LTIME');
    export const LDT_TO_LTOD = createConvertFunction('LDT', 'LTOD');
    export const LDT_TO_LWORD = createConvertFunction('LDT', 'LWORD');
    export const LDT_TO_SINT = createConvertFunction('LDT', 'SINT');
    export const LDT_TO_TOD = createConvertFunction('LDT', 'TOD');
    export const LDT_TO_UDINT = createConvertFunction('LDT', 'UDINT');
    export const LDT_TO_UINT = createConvertFunction('LDT', 'UINT');
    export const LDT_TO_ULINT = createConvertFunction('LDT', 'ULINT');
    export const LDT_TO_USINT = createConvertFunction('LDT', 'USINT');
    export const LDT_TO_WORD = createConvertFunction('LDT', 'WORD');
    
    export const LINT_TO_DATE = createConvertFunction('LINT', 'DATE');
    export const LINT_TO_LDT = createConvertFunction('LINT', 'LDT');
    export const LINT_TO_LTIME = createConvertFunction('LINT', 'LTIME');
    export const LINT_TO_LTOD = createConvertFunction('LINT', 'LTOD');
    export const LINT_TO_TIME = createConvertFunction('LINT', 'TIME');
    export const LINT_TO_TOD = createConvertFunction('LINT', 'TOD');
    
    export const LTIME_TO_BYTE = createConvertFunction('LTIME', 'BYTE');
    export const LTIME_TO_DINT = createConvertFunction('LTIME', 'DINT');
    export const LTIME_TO_DWORD = createConvertFunction('LTIME', 'DWORD');
    export const LTIME_TO_INT = createConvertFunction('LTIME', 'INT');
    export const LTIME_TO_LDT = createConvertFunction('LTIME', 'LDT');
    export const LTIME_TO_LINT = createConvertFunction('LTIME', 'LINT');
    export const LTIME_TO_LTOD = createConvertFunction('LTIME', 'LTOD');
    export const LTIME_TO_LWORD = createConvertFunction('LTIME', 'LWORD');
    export const LTIME_TO_S5TIME = createConvertFunction('LTIME', 'S5TIME');
    export const LTIME_TO_SINT = createConvertFunction('LTIME', 'SINT');
    export const LTIME_TO_TIME = createConvertFunction('LTIME', 'TIME');
    export const LTIME_TO_UDINT = createConvertFunction('LTIME', 'UDINT');
    export const LTIME_TO_UINT = createConvertFunction('LTIME', 'UINT');
    export const LTIME_TO_ULINT = createConvertFunction('LTIME', 'ULINT');
    export const LTIME_TO_USINT = createConvertFunction('LTIME', 'USINT');
    export const LTIME_TO_WORD = createConvertFunction('LTIME', 'WORD');
    
    export const LTOD_TO_BYTE = createConvertFunction('LTOD', 'BYTE');
    export const LTOD_TO_DINT = createConvertFunction('LTOD', 'DINT');
    export const LTOD_TO_DT = createConvertFunction('LTOD', 'DT');
    export const LTOD_TO_DTL = createConvertFunction('LTOD', 'DTL');
    export const LTOD_TO_DWORD = createConvertFunction('LTOD', 'DWORD');
    export const LTOD_TO_INT = createConvertFunction('LTOD', 'INT');
    export const LTOD_TO_LDT = createConvertFunction('LTOD', 'LDT');
    export const LTOD_TO_LINT = createConvertFunction('LTOD', 'LINT');
    export const LTOD_TO_LTIME = createConvertFunction('LTOD', 'LTIME');
    export const LTOD_TO_LWORD = createConvertFunction('LTOD', 'LWORD');
    export const LTOD_TO_SINT = createConvertFunction('LTOD', 'SINT');
    export const LTOD_TO_TOD = createConvertFunction('LTOD', 'TOD');
    export const LTOD_TO_UDINT = createConvertFunction('LTOD', 'UDINT');
    export const LTOD_TO_UINT = createConvertFunction('LTOD', 'UINT');
    export const LTOD_TO_ULINT = createConvertFunction('LTOD', 'ULINT');
    export const LTOD_TO_USINT = createConvertFunction('LTOD', 'USINT');
    export const LTOD_TO_WORD = createConvertFunction('LTOD', 'WORD');
    
    export const LWORD_TO_DATE = createConvertFunction('LWORD', 'DATE');
    export const LWORD_TO_LDT = createConvertFunction('LWORD', 'LDT');
    export const LWORD_TO_LTIME = createConvertFunction('LWORD', 'LTIME');
    export const LWORD_TO_LTOD = createConvertFunction('LWORD', 'LTOD');
    export const LWORD_TO_TIME = createConvertFunction('LWORD', 'TIME');
    export const LWORD_TO_TOD = createConvertFunction('LWORD', 'TOD');
    
    export const S5TIME_TO_LTIME = createConvertFunction('S5TIME', 'LTIME');
    export const S5TIME_TO_TIME = createConvertFunction('S5TIME', 'TIME');
    export const S5TIME_TO_WORD = createConvertFunction('S5TIME', 'WORD');
    
    export const SINT_TO_DATE = createConvertFunction('SINT', 'DATE');
    export const SINT_TO_LDT = createConvertFunction('SINT', 'LDT');
    export const SINT_TO_LTIME = createConvertFunction('SINT', 'LTIME');
    export const SINT_TO_LTOD = createConvertFunction('SINT', 'LTOD');
    export const SINT_TO_TIME = createConvertFunction('SINT', 'TIME');
    export const SINT_TO_TOD = createConvertFunction('SINT', 'TOD');
    
    export const TIME_TO_BYTE = createConvertFunction('TIME', 'BYTE');
    export const TIME_TO_DINT = createConvertFunction('TIME', 'DINT');
    export const TIME_TO_DWORD = createConvertFunction('TIME', 'DWORD');
    export const TIME_TO_INT = createConvertFunction('TIME', 'INT');
    export const TIME_TO_LINT = createConvertFunction('TIME', 'LINT');
    export const TIME_TO_LTIME = createConvertFunction('TIME', 'LTIME');
    export const TIME_TO_LWORD = createConvertFunction('TIME', 'LWORD');
    export const TIME_TO_S5TIME = createConvertFunction('TIME', 'S5TIME');
    export const TIME_TO_SINT = createConvertFunction('TIME', 'SINT');
    export const TIME_TO_TOD = createConvertFunction('TIME', 'TOD');
    export const TIME_TO_UDINT = createConvertFunction('TIME', 'UDINT');
    export const TIME_TO_UINT = createConvertFunction('TIME', 'UINT');
    export const TIME_TO_ULINT = createConvertFunction('TIME', 'ULINT');
    export const TIME_TO_USINT = createConvertFunction('TIME', 'USINT');
    export const TIME_TO_WORD = createConvertFunction('TIME', 'WORD');
    
    export const TOD_TO_BYTE = createConvertFunction('TOD', 'BYTE');
    export const TOD_TO_DINT = createConvertFunction('TOD', 'DINT');
    export const TOD_TO_DT = createConvertFunction('TOD', 'DT');
    export const TOD_TO_DTL = createConvertFunction('TOD', 'DTL');
    export const TOD_TO_DWORD = createConvertFunction('TOD', 'DWORD');
    export const TOD_TO_INT = createConvertFunction('TOD', 'INT');
    export const TOD_TO_LDT = createConvertFunction('TOD', 'LDT');
    export const TOD_TO_LINT = createConvertFunction('TOD', 'LINT');
    export const TOD_TO_LTOD = createConvertFunction('TOD', 'LTOD');
    export const TOD_TO_LWORD = createConvertFunction('TOD', 'LWORD');
    export const TOD_TO_SINT = createConvertFunction('TOD', 'SINT');
    export const TOD_TO_TIME = createConvertFunction('TOD', 'TIME');
    export const TOD_TO_UDINT = createConvertFunction('TOD', 'UDINT');
    export const TOD_TO_UINT = createConvertFunction('TOD', 'UINT');
    export const TOD_TO_ULINT = createConvertFunction('TOD', 'ULINT');
    export const TOD_TO_USINT = createConvertFunction('TOD', 'USINT');
    export const TOD_TO_WORD = createConvertFunction('TOD', 'WORD');
    
    export const UDINT_TO_DATE = createConvertFunction('UDINT', 'DATE');
    export const UDINT_TO_LDT = createConvertFunction('UDINT', 'LDT');
    export const UDINT_TO_LTIME = createConvertFunction('UDINT', 'LTIME');
    export const UDINT_TO_LTOD = createConvertFunction('UDINT', 'LTOD');
    export const UDINT_TO_TIME = createConvertFunction('UDINT', 'TIME');
    export const UDINT_TO_TOD = createConvertFunction('UDINT', 'TOD');
    
    export const UINT_TO_DATE = createConvertFunction('UINT', 'DATE');
    export const UINT_TO_LDT = createConvertFunction('UINT', 'LDT');
    export const UINT_TO_LTIME = createConvertFunction('UINT', 'LTIME');
    export const UINT_TO_LTOD = createConvertFunction('UINT', 'LTOD');
    export const UINT_TO_TIME = createConvertFunction('UINT', 'TIME');
    export const UINT_TO_TOD = createConvertFunction('UINT', 'TOD');
    
    export const ULINT_TO_DATE = createConvertFunction('ULINT', 'DATE');
    export const ULINT_TO_LDT = createConvertFunction('ULINT', 'LDT');
    export const ULINT_TO_LTIME = createConvertFunction('ULINT', 'LTIME');
    export const ULINT_TO_LTOD = createConvertFunction('ULINT', 'LTOD');
    export const ULINT_TO_TIME = createConvertFunction('ULINT', 'TIME');
    export const ULINT_TO_TOD = createConvertFunction('ULINT', 'TOD');
    
    export const USINT_TO_DATE = createConvertFunction('USINT', 'DATE');
    export const USINT_TO_LDT = createConvertFunction('USINT', 'LDT');
    export const USINT_TO_LTIME = createConvertFunction('USINT', 'LTIME');
    export const USINT_TO_LTOD = createConvertFunction('USINT', 'LTOD');
    export const USINT_TO_TIME = createConvertFunction('USINT', 'TIME');
    export const USINT_TO_TOD = createConvertFunction('USINT', 'TOD');
    
    export const WORD_TO_DATE = createConvertFunction('WORD', 'DATE');
    export const WORD_TO_LDT = createConvertFunction('WORD', 'LDT');
    export const WORD_TO_LTIME = createConvertFunction('WORD', 'LTIME');
    export const WORD_TO_LTOD = createConvertFunction('WORD', 'LTOD');
    export const WORD_TO_TIME = createConvertFunction('WORD', 'TIME');
    export const WORD_TO_TOD = createConvertFunction('WORD', 'TOD');
    
    // Other
    
    export const RD_SYS_T = createInOutFunction('RD_SYS_T', undefined, 'DT', 'INT')
    export const TIME_TCK = createInOutFunction('TIME_TCK', undefined, undefined, 'TIME')

    export const uriMap: { [K: string]: string } = {
        // Built in T_CONV functions (for converting date and time)
        '/builtinLibrary.BYTE_TO_DATE.scl': BYTE_TO_DATE,
        '/builtinLibrary.BYTE_TO_LDT.scl': BYTE_TO_LDT,
        '/builtinLibrary.BYTE_TO_LTIME.scl': BYTE_TO_LTIME,
        '/builtinLibrary.BYTE_TO_LTOD.scl': BYTE_TO_LTOD,
        '/builtinLibrary.BYTE_TO_TIME.scl': BYTE_TO_TIME,
        '/builtinLibrary.BYTE_TO_TOD.scl': BYTE_TO_TOD,
        '/builtinLibrary.DATE_TO_BYTE.scl': DATE_TO_BYTE,
        '/builtinLibrary.DATE_TO_DINT.scl': DATE_TO_DINT,
        '/builtinLibrary.DATE_TO_DT.scl': DATE_TO_DT,
        '/builtinLibrary.DATE_TO_DTL.scl': DATE_TO_DTL,
        '/builtinLibrary.DATE_TO_DWORD.scl': DATE_TO_DWORD,
        '/builtinLibrary.DATE_TO_INT.scl': DATE_TO_INT,
        '/builtinLibrary.DATE_TO_LDT.scl': DATE_TO_LDT,
        '/builtinLibrary.DATE_TO_LINT.scl': DATE_TO_LINT,
        '/builtinLibrary.DATE_TO_LWORD.scl': DATE_TO_LWORD,
        '/builtinLibrary.DATE_TO_SINT.scl': DATE_TO_SINT,
        '/builtinLibrary.DATE_TO_UDINT.scl': DATE_TO_UDINT,
        '/builtinLibrary.DATE_TO_UINT.scl': DATE_TO_UINT,
        '/builtinLibrary.DATE_TO_ULINT.scl': DATE_TO_ULINT,
        '/builtinLibrary.DATE_TO_USINT.scl': DATE_TO_USINT,
        '/builtinLibrary.DATE_TO_WORD.scl': DATE_TO_WORD,
        '/builtinLibrary.DINT_TO_DATE.scl': DINT_TO_DATE,
        '/builtinLibrary.DINT_TO_LDT.scl': DINT_TO_LDT,
        '/builtinLibrary.DINT_TO_LTIME.scl': DINT_TO_LTIME,
        '/builtinLibrary.DINT_TO_LTOD.scl': DINT_TO_LTOD,
        '/builtinLibrary.DINT_TO_TIME.scl': DINT_TO_TIME,
        '/builtinLibrary.DINT_TO_TOD.scl': DINT_TO_TOD,
        '/builtinLibrary.DT_TO_DATE.scl': DT_TO_DATE,
        '/builtinLibrary.DT_TO_DTL.scl': DT_TO_DTL,
        '/builtinLibrary.DT_TO_LDT.scl': DT_TO_LDT,
        '/builtinLibrary.DT_TO_LTOD.scl': DT_TO_LTOD,
        '/builtinLibrary.DT_TO_TOD.scl': DT_TO_TOD,
        '/builtinLibrary.DTL_TO_DATE.scl': DTL_TO_DATE,
        '/builtinLibrary.DTL_TO_DTL.scl': DTL_TO_DTL,
        '/builtinLibrary.DTL_TO_LDT.scl': DTL_TO_LDT,
        '/builtinLibrary.DTL_TO_LTOD.scl': DTL_TO_LTOD,
        '/builtinLibrary.DTL_TO_TOD.scl': DTL_TO_TOD,
        '/builtinLibrary.DWORD_TO_DATE.scl': DWORD_TO_DATE,
        '/builtinLibrary.DWORD_TO_LDT.scl': DWORD_TO_LDT,
        '/builtinLibrary.DWORD_TO_LTIME.scl': DWORD_TO_LTIME,
        '/builtinLibrary.DWORD_TO_LTOD.scl': DWORD_TO_LTOD,
        '/builtinLibrary.DWORD_TO_TIME.scl': DWORD_TO_TIME,
        '/builtinLibrary.DWORD_TO_TOD.scl': DWORD_TO_TOD,
        '/builtinLibrary.INT_TO_DATE.scl': INT_TO_DATE,
        '/builtinLibrary.INT_TO_LDT.scl': INT_TO_LDT,
        '/builtinLibrary.INT_TO_LTIME.scl': INT_TO_LTIME,
        '/builtinLibrary.INT_TO_LTOD.scl': INT_TO_LTOD,
        '/builtinLibrary.INT_TO_TIME.scl': INT_TO_TIME,
        '/builtinLibrary.INT_TO_TOD.scl': INT_TO_TOD,
        '/builtinLibrary.LDT_TO_BYTE.scl': LDT_TO_BYTE,
        '/builtinLibrary.LDT_TO_DATE.scl': LDT_TO_DATE,
        '/builtinLibrary.LDT_TO_DINT.scl': LDT_TO_DINT,
        '/builtinLibrary.LDT_TO_DT.scl': LDT_TO_DT,
        '/builtinLibrary.LDT_TO_DTL.scl': LDT_TO_DTL,
        '/builtinLibrary.LDT_TO_DWORD.scl': LDT_TO_DWORD,
        '/builtinLibrary.LDT_TO_INT.scl': LDT_TO_INT,
        '/builtinLibrary.LDT_TO_LINT.scl': LDT_TO_LINT,
        '/builtinLibrary.LDT_TO_LTIME.scl': LDT_TO_LTIME,
        '/builtinLibrary.LDT_TO_LTOD.scl': LDT_TO_LTOD,
        '/builtinLibrary.LDT_TO_LWORD.scl': LDT_TO_LWORD,
        '/builtinLibrary.LDT_TO_SINT.scl': LDT_TO_SINT,
        '/builtinLibrary.LDT_TO_TOD.scl': LDT_TO_TOD,
        '/builtinLibrary.LDT_TO_UDINT.scl': LDT_TO_UDINT,
        '/builtinLibrary.LDT_TO_UINT.scl': LDT_TO_UINT,
        '/builtinLibrary.LDT_TO_ULINT.scl': LDT_TO_ULINT,
        '/builtinLibrary.LDT_TO_USINT.scl': LDT_TO_USINT,
        '/builtinLibrary.LDT_TO_WORD.scl': LDT_TO_WORD,
        '/builtinLibrary.LINT_TO_DATE.scl': LINT_TO_DATE,
        '/builtinLibrary.LINT_TO_LDT.scl': LINT_TO_LDT,
        '/builtinLibrary.LINT_TO_LTIME.scl': LINT_TO_LTIME,
        '/builtinLibrary.LINT_TO_LTOD.scl': LINT_TO_LTOD,
        '/builtinLibrary.LINT_TO_TIME.scl': LINT_TO_TIME,
        '/builtinLibrary.LINT_TO_TOD.scl': LINT_TO_TOD,
        '/builtinLibrary.LTIME_TO_BYTE.scl': LTIME_TO_BYTE,
        '/builtinLibrary.LTIME_TO_DINT.scl': LTIME_TO_DINT,
        '/builtinLibrary.LTIME_TO_DWORD.scl': LTIME_TO_DWORD,
        '/builtinLibrary.LTIME_TO_INT.scl': LTIME_TO_INT,
        '/builtinLibrary.LTIME_TO_LDT.scl': LTIME_TO_LDT,
        '/builtinLibrary.LTIME_TO_LINT.scl': LTIME_TO_LINT,
        '/builtinLibrary.LTIME_TO_LTOD.scl': LTIME_TO_LTOD,
        '/builtinLibrary.LTIME_TO_LWORD.scl': LTIME_TO_LWORD,
        '/builtinLibrary.LTIME_TO_S5TIME.scl': LTIME_TO_S5TIME,
        '/builtinLibrary.LTIME_TO_SINT.scl': LTIME_TO_SINT,
        '/builtinLibrary.LTIME_TO_TIME.scl': LTIME_TO_TIME,
        '/builtinLibrary.LTIME_TO_UDINT.scl': LTIME_TO_UDINT,
        '/builtinLibrary.LTIME_TO_UINT.scl': LTIME_TO_UINT,
        '/builtinLibrary.LTIME_TO_ULINT.scl': LTIME_TO_ULINT,
        '/builtinLibrary.LTIME_TO_USINT.scl': LTIME_TO_USINT,
        '/builtinLibrary.LTIME_TO_WORD.scl': LTIME_TO_WORD,
        '/builtinLibrary.LTOD_TO_BYTE.scl': LTOD_TO_BYTE,
        '/builtinLibrary.LTOD_TO_DINT.scl': LTOD_TO_DINT,
        '/builtinLibrary.LTOD_TO_DT.scl': LTOD_TO_DT,
        '/builtinLibrary.LTOD_TO_DTL.scl': LTOD_TO_DTL,
        '/builtinLibrary.LTOD_TO_DWORD.scl': LTOD_TO_DWORD,
        '/builtinLibrary.LTOD_TO_INT.scl': LTOD_TO_INT,
        '/builtinLibrary.LTOD_TO_LDT.scl': LTOD_TO_LDT,
        '/builtinLibrary.LTOD_TO_LINT.scl': LTOD_TO_LINT,
        '/builtinLibrary.LTOD_TO_LTIME.scl': LTOD_TO_LTIME,
        '/builtinLibrary.LTOD_TO_LWORD.scl': LTOD_TO_LWORD,
        '/builtinLibrary.LTOD_TO_SINT.scl': LTOD_TO_SINT,
        '/builtinLibrary.LTOD_TO_TOD.scl': LTOD_TO_TOD,
        '/builtinLibrary.LTOD_TO_UDINT.scl': LTOD_TO_UDINT,
        '/builtinLibrary.LTOD_TO_UINT.scl': LTOD_TO_UINT,
        '/builtinLibrary.LTOD_TO_ULINT.scl': LTOD_TO_ULINT,
        '/builtinLibrary.LTOD_TO_USINT.scl': LTOD_TO_USINT,
        '/builtinLibrary.LTOD_TO_WORD.scl': LTOD_TO_WORD,
        '/builtinLibrary.LWORD_TO_DATE.scl': LWORD_TO_DATE,
        '/builtinLibrary.LWORD_TO_LDT.scl': LWORD_TO_LDT,
        '/builtinLibrary.LWORD_TO_LTIME.scl': LWORD_TO_LTIME,
        '/builtinLibrary.LWORD_TO_LTOD.scl': LWORD_TO_LTOD,
        '/builtinLibrary.LWORD_TO_TIME.scl': LWORD_TO_TIME,
        '/builtinLibrary.LWORD_TO_TOD.scl': LWORD_TO_TOD,
        '/builtinLibrary.S5TIME_TO_LTIME.scl': S5TIME_TO_LTIME,
        '/builtinLibrary.S5TIME_TO_TIME.scl': S5TIME_TO_TIME,
        '/builtinLibrary.S5TIME_TO_WORD.scl': S5TIME_TO_WORD,
        '/builtinLibrary.SINT_TO_DATE.scl': SINT_TO_DATE,
        '/builtinLibrary.SINT_TO_LDT.scl': SINT_TO_LDT,
        '/builtinLibrary.SINT_TO_LTIME.scl': SINT_TO_LTIME,
        '/builtinLibrary.SINT_TO_LTOD.scl': SINT_TO_LTOD,
        '/builtinLibrary.SINT_TO_TIME.scl': SINT_TO_TIME,
        '/builtinLibrary.SINT_TO_TOD.scl': SINT_TO_TOD,
        '/builtinLibrary.TIME_TO_BYTE.scl': TIME_TO_BYTE,
        '/builtinLibrary.TIME_TO_DINT.scl': TIME_TO_DINT,
        '/builtinLibrary.TIME_TO_DWORD.scl': TIME_TO_DWORD,
        '/builtinLibrary.TIME_TO_INT.scl': TIME_TO_INT,
        '/builtinLibrary.TIME_TO_LINT.scl': TIME_TO_LINT,
        '/builtinLibrary.TIME_TO_LTIME.scl': TIME_TO_LTIME,
        '/builtinLibrary.TIME_TO_LWORD.scl': TIME_TO_LWORD,
        '/builtinLibrary.TIME_TO_S5TIME.scl': TIME_TO_S5TIME,
        '/builtinLibrary.TIME_TO_SINT.scl': TIME_TO_SINT,
        '/builtinLibrary.TIME_TO_TOD.scl': TIME_TO_TOD,
        '/builtinLibrary.TIME_TO_UDINT.scl': TIME_TO_UDINT,
        '/builtinLibrary.TIME_TO_UINT.scl': TIME_TO_UINT,
        '/builtinLibrary.TIME_TO_ULINT.scl': TIME_TO_ULINT,
        '/builtinLibrary.TIME_TO_USINT.scl': TIME_TO_USINT,
        '/builtinLibrary.TIME_TO_WORD.scl': TIME_TO_WORD,
        '/builtinLibrary.TOD_TO_BYTE.scl': TOD_TO_BYTE,
        '/builtinLibrary.TOD_TO_DINT.scl': TOD_TO_DINT,
        '/builtinLibrary.TOD_TO_DT.scl': TOD_TO_DT,
        '/builtinLibrary.TOD_TO_DTL.scl': TOD_TO_DTL,
        '/builtinLibrary.TOD_TO_DWORD.scl': TOD_TO_DWORD,
        '/builtinLibrary.TOD_TO_INT.scl': TOD_TO_INT,
        '/builtinLibrary.TOD_TO_LDT.scl': TOD_TO_LDT,
        '/builtinLibrary.TOD_TO_LINT.scl': TOD_TO_LINT,
        '/builtinLibrary.TOD_TO_LTOD.scl': TOD_TO_LTOD,
        '/builtinLibrary.TOD_TO_LWORD.scl': TOD_TO_LWORD,
        '/builtinLibrary.TOD_TO_SINT.scl': TOD_TO_SINT,
        '/builtinLibrary.TOD_TO_TIME.scl': TOD_TO_TIME,
        '/builtinLibrary.TOD_TO_UDINT.scl': TOD_TO_UDINT,
        '/builtinLibrary.TOD_TO_UINT.scl': TOD_TO_UINT,
        '/builtinLibrary.TOD_TO_ULINT.scl': TOD_TO_ULINT,
        '/builtinLibrary.TOD_TO_USINT.scl': TOD_TO_USINT,
        '/builtinLibrary.TOD_TO_WORD.scl': TOD_TO_WORD,
        '/builtinLibrary.UDINT_TO_DATE.scl': UDINT_TO_DATE,
        '/builtinLibrary.UDINT_TO_LDT.scl': UDINT_TO_LDT,
        '/builtinLibrary.UDINT_TO_LTIME.scl': UDINT_TO_LTIME,
        '/builtinLibrary.UDINT_TO_LTOD.scl': UDINT_TO_LTOD,
        '/builtinLibrary.UDINT_TO_TIME.scl': UDINT_TO_TIME,
        '/builtinLibrary.UDINT_TO_TOD.scl': UDINT_TO_TOD,
        '/builtinLibrary.UINT_TO_DATE.scl': UINT_TO_DATE,
        '/builtinLibrary.UINT_TO_LDT.scl': UINT_TO_LDT,
        '/builtinLibrary.UINT_TO_LTIME.scl': UINT_TO_LTIME,
        '/builtinLibrary.UINT_TO_LTOD.scl': UINT_TO_LTOD,
        '/builtinLibrary.UINT_TO_TIME.scl': UINT_TO_TIME,
        '/builtinLibrary.UINT_TO_TOD.scl': UINT_TO_TOD,
        '/builtinLibrary.ULINT_TO_DATE.scl': ULINT_TO_DATE,
        '/builtinLibrary.ULINT_TO_LDT.scl': ULINT_TO_LDT,
        '/builtinLibrary.ULINT_TO_LTIME.scl': ULINT_TO_LTIME,
        '/builtinLibrary.ULINT_TO_LTOD.scl': ULINT_TO_LTOD,
        '/builtinLibrary.ULINT_TO_TIME.scl': ULINT_TO_TIME,
        '/builtinLibrary.ULINT_TO_TOD.scl': ULINT_TO_TOD,
        '/builtinLibrary.USINT_TO_DATE.scl': USINT_TO_DATE,
        '/builtinLibrary.USINT_TO_LDT.scl': USINT_TO_LDT,
        '/builtinLibrary.USINT_TO_LTIME.scl': USINT_TO_LTIME,
        '/builtinLibrary.USINT_TO_LTOD.scl': USINT_TO_LTOD,
        '/builtinLibrary.USINT_TO_TIME.scl': USINT_TO_TIME,
        '/builtinLibrary.USINT_TO_TOD.scl': USINT_TO_TOD,
        '/builtinLibrary.WORD_TO_DATE.scl': WORD_TO_DATE,
        '/builtinLibrary.WORD_TO_LDT.scl': WORD_TO_LDT,
        '/builtinLibrary.WORD_TO_LTIME.scl': WORD_TO_LTIME,
        '/builtinLibrary.WORD_TO_LTOD.scl': WORD_TO_LTOD,
        '/builtinLibrary.WORD_TO_TIME.scl': WORD_TO_TIME,
        '/builtinLibrary.WORD_TO_TOD.scl': WORD_TO_TOD,
        // Other
        '/builtinLibrary.RD_SYS_T.scl': RD_SYS_T,
        '/builtinLibrary.TIME_TCK.scl': TIME_TCK,
    }
}
