import { createGeneralFunction, createInOutFunction } from "../built-in-utils.js";


export const LEN = createInOutFunction('LEN', 'STRING', undefined, 'INT')
export const CONCAT = createGeneralFunction('CONCAT', ['IN1 : STRING', 'IN2 : STRING'], undefined, undefined, 'STRING');
export const FIND = createGeneralFunction('FIND', ['IN1 : STRING', 'IN2 : STRING'], undefined, undefined, 'INT');
export const REPLACE = createGeneralFunction('REPLACE', ['IN1 : STRING', 'IN2 : STRING', 'L : INT', 'P : INT'], undefined, undefined, 'STRING');
export const ATH = createGeneralFunction('ATH', ['IN : POINTER', 'N : WORD'], ['RET_VAL : WORD', 'OUT : POINTER'], undefined, 'WORD');
