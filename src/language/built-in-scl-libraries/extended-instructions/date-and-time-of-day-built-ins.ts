import { createConvertFunction, createInOutFunction } from "../built-in-utils.js";

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
