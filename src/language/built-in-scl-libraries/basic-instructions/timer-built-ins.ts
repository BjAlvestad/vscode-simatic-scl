import { createGeneralFunction, createGeneralFunctionBlock } from "../built-in-utils.js";

export namespace TimerBuiltIns {   
    // Timer operations:
    export const TP_TIME = createGeneralFunctionBlock('TP_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
    export const TON_TIME = createGeneralFunctionBlock('TON_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
    export const TOF_TIME = createGeneralFunctionBlock('TOF_TIME', ['IN : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
    export const TONR_TIME = createGeneralFunctionBlock('TONR_TIME', ['IN : BOOL', 'R : BOOL', 'PT : TIME'], ['Q : BOOL', 'ET : TIME'], undefined,);
    export const RESET_TIMER = createGeneralFunction('RESET_TIMER', undefined, undefined, ['TIMER : TIME'],'Void')  // Actually not TIME type but IEC_TIMER, TON_TIME etc.
    
    export const uriMap: { [K: string]: string } = {
        // Bit logic operations:
        '/builtinLibrary.TP_TIME.scl': TP_TIME,
        '/builtinLibrary.TON_TIME.scl': TON_TIME,
        '/builtinLibrary.TOF_TIME.scl': TOF_TIME,
        '/builtinLibrary.TONR_TIME.scl': TONR_TIME,
        '/builtinLibrary.RESET_TIMER.scl': RESET_TIMER,
    }
}
