import { BuiltInsUtils } from "../built-ins-utils.js";

export namespace StringAndCharBuiltIns {
    export const LEN = BuiltInsUtils.createInOutFunction('LEN', 'STRING', undefined, 'INT')
    export const CONCAT = BuiltInsUtils.createGeneralFunction('CONCAT', ['IN1 : STRING', 'IN2 : STRING'], undefined, undefined, 'STRING');
    export const FIND = BuiltInsUtils.createGeneralFunction('FIND', ['IN1 : STRING', 'IN2 : STRING'], undefined, undefined, 'INT');
    export const REPLACE = BuiltInsUtils.createGeneralFunction('REPLACE', ['IN1 : STRING', 'IN2 : STRING', 'L : INT', 'P : INT'], undefined, undefined, 'STRING');
    export const ATH = BuiltInsUtils.createGeneralFunction('ATH', ['IN : POINTER', 'N : WORD'], ['RET_VAL : WORD', 'OUT : POINTER'], undefined, 'WORD');

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.LEN.scl': LEN,
        '/builtinLibrary.CONCAT.scl': CONCAT,
        '/builtinLibrary.FIND.scl': FIND,
        '/builtinLibrary.REPLACE.scl': REPLACE,
        '/builtinLibrary.ATH.scl': ATH,
    }
}
