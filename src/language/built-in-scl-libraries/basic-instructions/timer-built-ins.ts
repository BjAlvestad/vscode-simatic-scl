import { createGeneralFunction, createGeneralFunctionBlock } from "../built-in-utils.js";

// Timer operations:
export const TP_TIME = createGeneralFunctionBlock('TP_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
export const TON_TIME = createGeneralFunctionBlock('TON_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
export const TOF_TIME = createGeneralFunctionBlock('TOF_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
export const TONR_TIME = createGeneralFunctionBlock('TONR_TIME', ['IN : BOOL', 'R : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
export const RESET_TIMER = createGeneralFunction('RESET_TIMER', undefined, undefined, ['TIMER : TIME'],'Void')  // Actually not TIME type but IEC_TIMER, TON_TIME etc.
