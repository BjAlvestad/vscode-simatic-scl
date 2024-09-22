import { BuiltInsUtils } from "../built-ins-utils.js";

export module MathBuiltIns {
    // Math functions
    export const MIN = BuiltInsUtils.createGeneralFunction('MIN', ['IN1 : INT', 'IN2 : INT', 'IN3 : INT', 'IN4 : INT', 'INn : INT'], undefined, undefined, 'INT');
    export const MAX = BuiltInsUtils.createGeneralFunction('MAX', ['IN1 : INT', 'IN2 : INT', 'IN3 : INT', 'IN4 : INT', 'INn : INT'], undefined, undefined, 'INT');
    export const MIN_REAL = BuiltInsUtils.createGeneralFunction('MIN_REAL', ['IN1 : REAL', 'IN2 : REAL', 'IN3 : REAL', 'IN4 : REAL', 'INn : REAL'], undefined, undefined, 'REAL');
    export const MAX_REAL = BuiltInsUtils.createGeneralFunction('MAX_REAL', ['IN1 : REAL', 'IN2 : REAL', 'IN3 : REAL', 'IN4 : REAL', 'INn : REAL'], undefined, undefined, 'REAL');

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.MIN.scl': MIN,
        '/builtinLibrary.MAX.scl': MAX,
        '/builtinLibrary.MIN_REAL.scl': MIN_REAL,
        '/builtinLibrary.MAX_REAL.scl': MAX_REAL,
    }
}
