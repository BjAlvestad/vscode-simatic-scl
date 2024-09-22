import { BuiltInsUtils } from "../built-ins-utils.js";

export namespace ComparatorBuiltIns {
    export const TypeOf = BuiltInsUtils.createGeneralFunction('TypeOf', ['OPERAND : VARIANT'], undefined, undefined, 'ANY');
    export const TypeOfElements = BuiltInsUtils.createGeneralFunction('TypeOfElements', ['OPERAND : VARIANT'], undefined, undefined, 'ANY');
    export const IS_ARRAY = BuiltInsUtils.createGeneralFunction('IS_ARRAY', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');
    // Missing: TypeOfDB
    
    // Not listed under any category in TIA Portal:
    export const IS_NULL = BuiltInsUtils.createGeneralFunction('IS_NULL', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');
    export const NOT_NULL = BuiltInsUtils.createGeneralFunction('NOT_NULL', ['OPERAND : VARIANT'], undefined, undefined, 'BOOL');

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.TypeOf.scl': TypeOf,
        '/builtinLibrary.TypeOfElements.scl': TypeOfElements,
        '/builtinLibrary.IS_ARRAY.scl': IS_ARRAY,

        '/builtinLibrary.IS_NULL.scl': IS_NULL,
        '/builtinLibrary.NOT_NULL.scl': NOT_NULL,
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        'TypeOf',
        'TypeOfElements',
        'IS_ARRAY',
        
        'IS_NULL',
        'NOT_NULL',
    ]);
}
