import { createGeneralFunction } from "../built-in-utils.js";


export const TypeOf = createGeneralFunction('TypeOf', ['OPERAND : VARIANT'], undefined, undefined, 'ANY');
export const TypeOfElements = createGeneralFunction('TypeOfElements', ['OPERAND : VARIANT'], undefined, undefined, 'ANY');
export const IS_ARRAY = createGeneralFunction('IS_ARRAY', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');
// Missing: TypeOfDB

// Not listed under any category in TIA Portal:
export const IS_NULL = createGeneralFunction('IS_NULL', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');
export const NOT_NULL = createGeneralFunction('NOT_NULL', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');
