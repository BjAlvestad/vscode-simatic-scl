import { BuiltInsUtils } from "../built-ins-utils.js";

export namespace DataAndTimeBuiltIns {
    
    // Built in T_CONV functions (for converting date and time)
    
    export const BYTE_TO_DATE = BuiltInsUtils.createConvertFunction('BYTE', 'DATE');
    export const BYTE_TO_LDT = BuiltInsUtils.createConvertFunction('BYTE', 'LDT');
    export const BYTE_TO_LTIME = BuiltInsUtils.createConvertFunction('BYTE', 'LTIME');
    export const BYTE_TO_LTOD = BuiltInsUtils.createConvertFunction('BYTE', 'LTOD');
    export const BYTE_TO_TIME = BuiltInsUtils.createConvertFunction('BYTE', 'TIME');
    export const BYTE_TO_TOD = BuiltInsUtils.createConvertFunction('BYTE', 'TOD');
    
    export const DATE_TO_BYTE = BuiltInsUtils.createConvertFunction('DATE', 'BYTE');
    export const DATE_TO_DINT = BuiltInsUtils.createConvertFunction('DATE', 'DINT');
    export const DATE_TO_DT = BuiltInsUtils.createConvertFunction('DATE', 'DT');
    export const DATE_TO_DTL = BuiltInsUtils.createConvertFunction('DATE', 'DTL');
    export const DATE_TO_DWORD = BuiltInsUtils.createConvertFunction('DATE', 'DWORD');
    export const DATE_TO_INT = BuiltInsUtils.createConvertFunction('DATE', 'INT');
    export const DATE_TO_LDT = BuiltInsUtils.createConvertFunction('DATE', 'LDT');
    export const DATE_TO_LINT = BuiltInsUtils.createConvertFunction('DATE', 'LINT');
    export const DATE_TO_LWORD = BuiltInsUtils.createConvertFunction('DATE', 'LWORD');
    export const DATE_TO_SINT = BuiltInsUtils.createConvertFunction('DATE', 'SINT');
    export const DATE_TO_UDINT = BuiltInsUtils.createConvertFunction('DATE', 'UDINT');
    export const DATE_TO_UINT = BuiltInsUtils.createConvertFunction('DATE', 'UINT');
    export const DATE_TO_ULINT = BuiltInsUtils.createConvertFunction('DATE', 'ULINT');
    export const DATE_TO_USINT = BuiltInsUtils.createConvertFunction('DATE', 'USINT');
    export const DATE_TO_WORD = BuiltInsUtils.createConvertFunction('DATE', 'WORD');
    
    export const DINT_TO_DATE = BuiltInsUtils.createConvertFunction('DINT', 'DATE');
    export const DINT_TO_LDT = BuiltInsUtils.createConvertFunction('DINT', 'LDT');
    export const DINT_TO_LTIME = BuiltInsUtils.createConvertFunction('DINT', 'LTIME');
    export const DINT_TO_LTOD = BuiltInsUtils.createConvertFunction('DINT', 'LTOD');
    export const DINT_TO_TIME = BuiltInsUtils.createConvertFunction('DINT', 'TIME');
    export const DINT_TO_TOD = BuiltInsUtils.createConvertFunction('DINT', 'TOD');
    
    export const DT_TO_DATE = BuiltInsUtils.createConvertFunction('DT', 'DATE');
    export const DT_TO_DTL = BuiltInsUtils.createConvertFunction('DT', 'DTL');
    export const DT_TO_LDT = BuiltInsUtils.createConvertFunction('DT', 'LDT');
    export const DT_TO_LTOD = BuiltInsUtils.createConvertFunction('DT', 'LTOD');
    export const DT_TO_TOD = BuiltInsUtils.createConvertFunction('DT', 'TOD');
    
    export const DTL_TO_DATE = BuiltInsUtils.createConvertFunction('DTL', 'DATE');
    export const DTL_TO_DTL = BuiltInsUtils.createConvertFunction('DTL', 'DT');
    export const DTL_TO_LDT = BuiltInsUtils.createConvertFunction('DTL', 'LDT');
    export const DTL_TO_LTOD = BuiltInsUtils.createConvertFunction('DTL', 'LTOD');
    export const DTL_TO_TOD = BuiltInsUtils.createConvertFunction('DTL', 'TOD');
    
    export const DWORD_TO_DATE = BuiltInsUtils.createConvertFunction('DWORD', 'DATE');
    export const DWORD_TO_LDT = BuiltInsUtils.createConvertFunction('DWORD', 'LDT');
    export const DWORD_TO_LTIME = BuiltInsUtils.createConvertFunction('DWORD', 'LTIME');
    export const DWORD_TO_LTOD = BuiltInsUtils.createConvertFunction('DWORD', 'LTOD');
    export const DWORD_TO_TIME = BuiltInsUtils.createConvertFunction('DWORD', 'TIME');
    export const DWORD_TO_TOD = BuiltInsUtils.createConvertFunction('DWORD', 'TOD');
    
    export const INT_TO_DATE = BuiltInsUtils.createConvertFunction('INT', 'DATE');
    export const INT_TO_LDT = BuiltInsUtils.createConvertFunction('INT', 'LDT');
    export const INT_TO_LTIME = BuiltInsUtils.createConvertFunction('INT', 'LTIME');
    export const INT_TO_LTOD = BuiltInsUtils.createConvertFunction('INT', 'LTOD');
    export const INT_TO_TIME = BuiltInsUtils.createConvertFunction('INT', 'TIME');
    export const INT_TO_TOD = BuiltInsUtils.createConvertFunction('INT', 'TOD');
    
    export const LDT_TO_BYTE = BuiltInsUtils.createConvertFunction('LDT', 'BYTE');
    export const LDT_TO_DATE = BuiltInsUtils.createConvertFunction('LDT', 'DATE');
    export const LDT_TO_DINT = BuiltInsUtils.createConvertFunction('LDT', 'DINT');
    export const LDT_TO_DT = BuiltInsUtils.createConvertFunction('LDT', 'DT');
    export const LDT_TO_DTL = BuiltInsUtils.createConvertFunction('LDT', 'DTL');
    export const LDT_TO_DWORD = BuiltInsUtils.createConvertFunction('LDT', 'DWORD');
    export const LDT_TO_INT = BuiltInsUtils.createConvertFunction('LDT', 'INT');
    export const LDT_TO_LINT = BuiltInsUtils.createConvertFunction('LDT', 'LINT');
    export const LDT_TO_LTIME = BuiltInsUtils.createConvertFunction('LDT', 'LTIME');
    export const LDT_TO_LTOD = BuiltInsUtils.createConvertFunction('LDT', 'LTOD');
    export const LDT_TO_LWORD = BuiltInsUtils.createConvertFunction('LDT', 'LWORD');
    export const LDT_TO_SINT = BuiltInsUtils.createConvertFunction('LDT', 'SINT');
    export const LDT_TO_TOD = BuiltInsUtils.createConvertFunction('LDT', 'TOD');
    export const LDT_TO_UDINT = BuiltInsUtils.createConvertFunction('LDT', 'UDINT');
    export const LDT_TO_UINT = BuiltInsUtils.createConvertFunction('LDT', 'UINT');
    export const LDT_TO_ULINT = BuiltInsUtils.createConvertFunction('LDT', 'ULINT');
    export const LDT_TO_USINT = BuiltInsUtils.createConvertFunction('LDT', 'USINT');
    export const LDT_TO_WORD = BuiltInsUtils.createConvertFunction('LDT', 'WORD');
    
    export const LINT_TO_DATE = BuiltInsUtils.createConvertFunction('LINT', 'DATE');
    export const LINT_TO_LDT = BuiltInsUtils.createConvertFunction('LINT', 'LDT');
    export const LINT_TO_LTIME = BuiltInsUtils.createConvertFunction('LINT', 'LTIME');
    export const LINT_TO_LTOD = BuiltInsUtils.createConvertFunction('LINT', 'LTOD');
    export const LINT_TO_TIME = BuiltInsUtils.createConvertFunction('LINT', 'TIME');
    export const LINT_TO_TOD = BuiltInsUtils.createConvertFunction('LINT', 'TOD');
    
    export const LTIME_TO_BYTE = BuiltInsUtils.createConvertFunction('LTIME', 'BYTE');
    export const LTIME_TO_DINT = BuiltInsUtils.createConvertFunction('LTIME', 'DINT');
    export const LTIME_TO_DWORD = BuiltInsUtils.createConvertFunction('LTIME', 'DWORD');
    export const LTIME_TO_INT = BuiltInsUtils.createConvertFunction('LTIME', 'INT');
    export const LTIME_TO_LDT = BuiltInsUtils.createConvertFunction('LTIME', 'LDT');
    export const LTIME_TO_LINT = BuiltInsUtils.createConvertFunction('LTIME', 'LINT');
    export const LTIME_TO_LTOD = BuiltInsUtils.createConvertFunction('LTIME', 'LTOD');
    export const LTIME_TO_LWORD = BuiltInsUtils.createConvertFunction('LTIME', 'LWORD');
    export const LTIME_TO_S5TIME = BuiltInsUtils.createConvertFunction('LTIME', 'S5TIME');
    export const LTIME_TO_SINT = BuiltInsUtils.createConvertFunction('LTIME', 'SINT');
    export const LTIME_TO_TIME = BuiltInsUtils.createConvertFunction('LTIME', 'TIME');
    export const LTIME_TO_UDINT = BuiltInsUtils.createConvertFunction('LTIME', 'UDINT');
    export const LTIME_TO_UINT = BuiltInsUtils.createConvertFunction('LTIME', 'UINT');
    export const LTIME_TO_ULINT = BuiltInsUtils.createConvertFunction('LTIME', 'ULINT');
    export const LTIME_TO_USINT = BuiltInsUtils.createConvertFunction('LTIME', 'USINT');
    export const LTIME_TO_WORD = BuiltInsUtils.createConvertFunction('LTIME', 'WORD');
    
    export const LTOD_TO_BYTE = BuiltInsUtils.createConvertFunction('LTOD', 'BYTE');
    export const LTOD_TO_DINT = BuiltInsUtils.createConvertFunction('LTOD', 'DINT');
    export const LTOD_TO_DT = BuiltInsUtils.createConvertFunction('LTOD', 'DT');
    export const LTOD_TO_DTL = BuiltInsUtils.createConvertFunction('LTOD', 'DTL');
    export const LTOD_TO_DWORD = BuiltInsUtils.createConvertFunction('LTOD', 'DWORD');
    export const LTOD_TO_INT = BuiltInsUtils.createConvertFunction('LTOD', 'INT');
    export const LTOD_TO_LDT = BuiltInsUtils.createConvertFunction('LTOD', 'LDT');
    export const LTOD_TO_LINT = BuiltInsUtils.createConvertFunction('LTOD', 'LINT');
    export const LTOD_TO_LTIME = BuiltInsUtils.createConvertFunction('LTOD', 'LTIME');
    export const LTOD_TO_LWORD = BuiltInsUtils.createConvertFunction('LTOD', 'LWORD');
    export const LTOD_TO_SINT = BuiltInsUtils.createConvertFunction('LTOD', 'SINT');
    export const LTOD_TO_TOD = BuiltInsUtils.createConvertFunction('LTOD', 'TOD');
    export const LTOD_TO_UDINT = BuiltInsUtils.createConvertFunction('LTOD', 'UDINT');
    export const LTOD_TO_UINT = BuiltInsUtils.createConvertFunction('LTOD', 'UINT');
    export const LTOD_TO_ULINT = BuiltInsUtils.createConvertFunction('LTOD', 'ULINT');
    export const LTOD_TO_USINT = BuiltInsUtils.createConvertFunction('LTOD', 'USINT');
    export const LTOD_TO_WORD = BuiltInsUtils.createConvertFunction('LTOD', 'WORD');
    
    export const LWORD_TO_DATE = BuiltInsUtils.createConvertFunction('LWORD', 'DATE');
    export const LWORD_TO_LDT = BuiltInsUtils.createConvertFunction('LWORD', 'LDT');
    export const LWORD_TO_LTIME = BuiltInsUtils.createConvertFunction('LWORD', 'LTIME');
    export const LWORD_TO_LTOD = BuiltInsUtils.createConvertFunction('LWORD', 'LTOD');
    export const LWORD_TO_TIME = BuiltInsUtils.createConvertFunction('LWORD', 'TIME');
    export const LWORD_TO_TOD = BuiltInsUtils.createConvertFunction('LWORD', 'TOD');
    
    export const S5TIME_TO_LTIME = BuiltInsUtils.createConvertFunction('S5TIME', 'LTIME');
    export const S5TIME_TO_TIME = BuiltInsUtils.createConvertFunction('S5TIME', 'TIME');
    export const S5TIME_TO_WORD = BuiltInsUtils.createConvertFunction('S5TIME', 'WORD');
    
    export const SINT_TO_DATE = BuiltInsUtils.createConvertFunction('SINT', 'DATE');
    export const SINT_TO_LDT = BuiltInsUtils.createConvertFunction('SINT', 'LDT');
    export const SINT_TO_LTIME = BuiltInsUtils.createConvertFunction('SINT', 'LTIME');
    export const SINT_TO_LTOD = BuiltInsUtils.createConvertFunction('SINT', 'LTOD');
    export const SINT_TO_TIME = BuiltInsUtils.createConvertFunction('SINT', 'TIME');
    export const SINT_TO_TOD = BuiltInsUtils.createConvertFunction('SINT', 'TOD');
    
    export const TIME_TO_BYTE = BuiltInsUtils.createConvertFunction('TIME', 'BYTE');
    export const TIME_TO_DINT = BuiltInsUtils.createConvertFunction('TIME', 'DINT');
    export const TIME_TO_DWORD = BuiltInsUtils.createConvertFunction('TIME', 'DWORD');
    export const TIME_TO_INT = BuiltInsUtils.createConvertFunction('TIME', 'INT');
    export const TIME_TO_LINT = BuiltInsUtils.createConvertFunction('TIME', 'LINT');
    export const TIME_TO_LTIME = BuiltInsUtils.createConvertFunction('TIME', 'LTIME');
    export const TIME_TO_LWORD = BuiltInsUtils.createConvertFunction('TIME', 'LWORD');
    export const TIME_TO_S5TIME = BuiltInsUtils.createConvertFunction('TIME', 'S5TIME');
    export const TIME_TO_SINT = BuiltInsUtils.createConvertFunction('TIME', 'SINT');
    export const TIME_TO_TOD = BuiltInsUtils.createConvertFunction('TIME', 'TOD');
    export const TIME_TO_UDINT = BuiltInsUtils.createConvertFunction('TIME', 'UDINT');
    export const TIME_TO_UINT = BuiltInsUtils.createConvertFunction('TIME', 'UINT');
    export const TIME_TO_ULINT = BuiltInsUtils.createConvertFunction('TIME', 'ULINT');
    export const TIME_TO_USINT = BuiltInsUtils.createConvertFunction('TIME', 'USINT');
    export const TIME_TO_WORD = BuiltInsUtils.createConvertFunction('TIME', 'WORD');
    
    export const TOD_TO_BYTE = BuiltInsUtils.createConvertFunction('TOD', 'BYTE');
    export const TOD_TO_DINT = BuiltInsUtils.createConvertFunction('TOD', 'DINT');
    export const TOD_TO_DT = BuiltInsUtils.createConvertFunction('TOD', 'DT');
    export const TOD_TO_DTL = BuiltInsUtils.createConvertFunction('TOD', 'DTL');
    export const TOD_TO_DWORD = BuiltInsUtils.createConvertFunction('TOD', 'DWORD');
    export const TOD_TO_INT = BuiltInsUtils.createConvertFunction('TOD', 'INT');
    export const TOD_TO_LDT = BuiltInsUtils.createConvertFunction('TOD', 'LDT');
    export const TOD_TO_LINT = BuiltInsUtils.createConvertFunction('TOD', 'LINT');
    export const TOD_TO_LTOD = BuiltInsUtils.createConvertFunction('TOD', 'LTOD');
    export const TOD_TO_LWORD = BuiltInsUtils.createConvertFunction('TOD', 'LWORD');
    export const TOD_TO_SINT = BuiltInsUtils.createConvertFunction('TOD', 'SINT');
    export const TOD_TO_TIME = BuiltInsUtils.createConvertFunction('TOD', 'TIME');
    export const TOD_TO_UDINT = BuiltInsUtils.createConvertFunction('TOD', 'UDINT');
    export const TOD_TO_UINT = BuiltInsUtils.createConvertFunction('TOD', 'UINT');
    export const TOD_TO_ULINT = BuiltInsUtils.createConvertFunction('TOD', 'ULINT');
    export const TOD_TO_USINT = BuiltInsUtils.createConvertFunction('TOD', 'USINT');
    export const TOD_TO_WORD = BuiltInsUtils.createConvertFunction('TOD', 'WORD');
    
    export const UDINT_TO_DATE = BuiltInsUtils.createConvertFunction('UDINT', 'DATE');
    export const UDINT_TO_LDT = BuiltInsUtils.createConvertFunction('UDINT', 'LDT');
    export const UDINT_TO_LTIME = BuiltInsUtils.createConvertFunction('UDINT', 'LTIME');
    export const UDINT_TO_LTOD = BuiltInsUtils.createConvertFunction('UDINT', 'LTOD');
    export const UDINT_TO_TIME = BuiltInsUtils.createConvertFunction('UDINT', 'TIME');
    export const UDINT_TO_TOD = BuiltInsUtils.createConvertFunction('UDINT', 'TOD');
    
    export const UINT_TO_DATE = BuiltInsUtils.createConvertFunction('UINT', 'DATE');
    export const UINT_TO_LDT = BuiltInsUtils.createConvertFunction('UINT', 'LDT');
    export const UINT_TO_LTIME = BuiltInsUtils.createConvertFunction('UINT', 'LTIME');
    export const UINT_TO_LTOD = BuiltInsUtils.createConvertFunction('UINT', 'LTOD');
    export const UINT_TO_TIME = BuiltInsUtils.createConvertFunction('UINT', 'TIME');
    export const UINT_TO_TOD = BuiltInsUtils.createConvertFunction('UINT', 'TOD');
    
    export const ULINT_TO_DATE = BuiltInsUtils.createConvertFunction('ULINT', 'DATE');
    export const ULINT_TO_LDT = BuiltInsUtils.createConvertFunction('ULINT', 'LDT');
    export const ULINT_TO_LTIME = BuiltInsUtils.createConvertFunction('ULINT', 'LTIME');
    export const ULINT_TO_LTOD = BuiltInsUtils.createConvertFunction('ULINT', 'LTOD');
    export const ULINT_TO_TIME = BuiltInsUtils.createConvertFunction('ULINT', 'TIME');
    export const ULINT_TO_TOD = BuiltInsUtils.createConvertFunction('ULINT', 'TOD');
    
    export const USINT_TO_DATE = BuiltInsUtils.createConvertFunction('USINT', 'DATE');
    export const USINT_TO_LDT = BuiltInsUtils.createConvertFunction('USINT', 'LDT');
    export const USINT_TO_LTIME = BuiltInsUtils.createConvertFunction('USINT', 'LTIME');
    export const USINT_TO_LTOD = BuiltInsUtils.createConvertFunction('USINT', 'LTOD');
    export const USINT_TO_TIME = BuiltInsUtils.createConvertFunction('USINT', 'TIME');
    export const USINT_TO_TOD = BuiltInsUtils.createConvertFunction('USINT', 'TOD');
    
    export const WORD_TO_DATE = BuiltInsUtils.createConvertFunction('WORD', 'DATE');
    export const WORD_TO_LDT = BuiltInsUtils.createConvertFunction('WORD', 'LDT');
    export const WORD_TO_LTIME = BuiltInsUtils.createConvertFunction('WORD', 'LTIME');
    export const WORD_TO_LTOD = BuiltInsUtils.createConvertFunction('WORD', 'LTOD');
    export const WORD_TO_TIME = BuiltInsUtils.createConvertFunction('WORD', 'TIME');
    export const WORD_TO_TOD = BuiltInsUtils.createConvertFunction('WORD', 'TOD');
    
    // Other
    
    export const RD_SYS_T = BuiltInsUtils.createInOutFunction('RD_SYS_T', undefined, 'DT', 'INT')
    export const TIME_TCK = BuiltInsUtils.createInOutFunction('TIME_TCK', undefined, undefined, 'TIME')

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

    /* List of T_CONV functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter_T_CONV: Set<string> = new Set<string>([
        // Built in T_CONV functions (for converting date and time)
        'BYTE_TO_DATE',
        'BYTE_TO_LDT',
        'BYTE_TO_LTIME',
        'BYTE_TO_LTOD',
        'BYTE_TO_TIME',
        'BYTE_TO_TOD',
        'DATE_TO_BYTE',
        'DATE_TO_DINT',
        'DATE_TO_DT',
        'DATE_TO_DTL',
        'DATE_TO_DWORD',
        'DATE_TO_INT',
        'DATE_TO_LDT',
        'DATE_TO_LINT',
        'DATE_TO_LWORD',
        'DATE_TO_SINT',
        'DATE_TO_UDINT',
        'DATE_TO_UINT',
        'DATE_TO_ULINT',
        'DATE_TO_USINT',
        'DATE_TO_WORD',
        'DINT_TO_DATE',
        'DINT_TO_LDT',
        'DINT_TO_LTIME',
        'DINT_TO_LTOD',
        'DINT_TO_TIME',
        'DINT_TO_TOD',
        'DT_TO_DATE',
        'DT_TO_DTL',
        'DT_TO_LDT',
        'DT_TO_LTOD',
        'DT_TO_TOD',
        'DTL_TO_DATE',
        'DTL_TO_DTL',
        'DTL_TO_LDT',
        'DTL_TO_LTOD',
        'DTL_TO_TOD',
        'DWORD_TO_DATE',
        'DWORD_TO_LDT',
        'DWORD_TO_LTIME',
        'DWORD_TO_LTOD',
        'DWORD_TO_TIME',
        'DWORD_TO_TOD',
        'INT_TO_DATE',
        'INT_TO_LDT',
        'INT_TO_LTIME',
        'INT_TO_LTOD',
        'INT_TO_TIME',
        'INT_TO_TOD',
        'LDT_TO_BYTE',
        'LDT_TO_DATE',
        'LDT_TO_DINT',
        'LDT_TO_DT',
        'LDT_TO_DTL',
        'LDT_TO_DWORD',
        'LDT_TO_INT',
        'LDT_TO_LINT',
        'LDT_TO_LTIME',
        'LDT_TO_LTOD',
        'LDT_TO_LWORD',
        'LDT_TO_SINT',
        'LDT_TO_TOD',
        'LDT_TO_UDINT',
        'LDT_TO_UINT',
        'LDT_TO_ULINT',
        'LDT_TO_USINT',
        'LDT_TO_WORD',
        'LINT_TO_DATE',
        'LINT_TO_LDT',
        'LINT_TO_LTIME',
        'LINT_TO_LTOD',
        'LINT_TO_TIME',
        'LINT_TO_TOD',
        'LTIME_TO_BYTE',
        'LTIME_TO_DINT',
        'LTIME_TO_DWORD',
        'LTIME_TO_INT',
        'LTIME_TO_LDT',
        'LTIME_TO_LINT',
        'LTIME_TO_LTOD',
        'LTIME_TO_LWORD',
        'LTIME_TO_S5TIME',
        'LTIME_TO_SINT',
        'LTIME_TO_TIME',
        'LTIME_TO_UDINT',
        'LTIME_TO_UINT',
        'LTIME_TO_ULINT',
        'LTIME_TO_USINT',
        'LTIME_TO_WORD',
        'LTOD_TO_BYTE',
        'LTOD_TO_DINT',
        'LTOD_TO_DT',
        'LTOD_TO_DTL',
        'LTOD_TO_DWORD',
        'LTOD_TO_INT',
        'LTOD_TO_LDT',
        'LTOD_TO_LINT',
        'LTOD_TO_LTIME',
        'LTOD_TO_LWORD',
        'LTOD_TO_SINT',
        'LTOD_TO_TOD',
        'LTOD_TO_UDINT',
        'LTOD_TO_UINT',
        'LTOD_TO_ULINT',
        'LTOD_TO_USINT',
        'LTOD_TO_WORD',
        'LWORD_TO_DATE',
        'LWORD_TO_LDT',
        'LWORD_TO_LTIME',
        'LWORD_TO_LTOD',
        'LWORD_TO_TIME',
        'LWORD_TO_TOD',
        'S5TIME_TO_LTIME',
        'S5TIME_TO_TIME',
        'S5TIME_TO_WORD',
        'SINT_TO_DATE',
        'SINT_TO_LDT',
        'SINT_TO_LTIME',
        'SINT_TO_LTOD',
        'SINT_TO_TIME',
        'SINT_TO_TOD',
        'TIME_TO_BYTE',
        'TIME_TO_DINT',
        'TIME_TO_DWORD',
        'TIME_TO_INT',
        'TIME_TO_LINT',
        'TIME_TO_LTIME',
        'TIME_TO_LWORD',
        'TIME_TO_S5TIME',
        'TIME_TO_SINT',
        'TIME_TO_TOD',
        'TIME_TO_UDINT',
        'TIME_TO_UINT',
        'TIME_TO_ULINT',
        'TIME_TO_USINT',
        'TIME_TO_WORD',
        'TOD_TO_BYTE',
        'TOD_TO_DINT',
        'TOD_TO_DT',
        'TOD_TO_DTL',
        'TOD_TO_DWORD',
        'TOD_TO_INT',
        'TOD_TO_LDT',
        'TOD_TO_LINT',
        'TOD_TO_LTOD',
        'TOD_TO_LWORD',
        'TOD_TO_SINT',
        'TOD_TO_TIME',
        'TOD_TO_UDINT',
        'TOD_TO_UINT',
        'TOD_TO_ULINT',
        'TOD_TO_USINT',
        'TOD_TO_WORD',
        'UDINT_TO_DATE',
        'UDINT_TO_LDT',
        'UDINT_TO_LTIME',
        'UDINT_TO_LTOD',
        'UDINT_TO_TIME',
        'UDINT_TO_TOD',
        'UINT_TO_DATE',
        'UINT_TO_LDT',
        'UINT_TO_LTIME',
        'UINT_TO_LTOD',
        'UINT_TO_TIME',
        'UINT_TO_TOD',
        'ULINT_TO_DATE',
        'ULINT_TO_LDT',
        'ULINT_TO_LTIME',
        'ULINT_TO_LTOD',
        'ULINT_TO_TIME',
        'ULINT_TO_TOD',
        'USINT_TO_DATE',
        'USINT_TO_LDT',
        'USINT_TO_LTIME',
        'USINT_TO_LTOD',
        'USINT_TO_TIME',
        'USINT_TO_TOD',
        'WORD_TO_DATE',
        'WORD_TO_LDT',
        'WORD_TO_LTIME',
        'WORD_TO_LTOD',
        'WORD_TO_TIME',
        'WORD_TO_TOD',
    ]);

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter_other: Set<string> = new Set<string>([
        'RD_SYS_T',
        'TIME_TCK',
    ]);
}
