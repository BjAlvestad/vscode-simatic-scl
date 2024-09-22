import { BuiltInsUtils } from "../built-ins-utils.js";

export module BitLogicBuiltIns {
    // Bit logic operations:
    export const R_TRIG = BuiltInsUtils.createGeneralFunctionBlock('R_TRIG', ['CLK : BOOL'], ['Q : BOOL'], undefined,);
    export const F_TRIG = BuiltInsUtils.createGeneralFunctionBlock('F_TRIG', ['CLK : BOOL'], ['Q : BOOL'], undefined,);

    export const uriMap: { [K: string]: string } = {
        // Bit logic operations:
        '/builtinLibrary.R_TRIG.scl': R_TRIG,
        '/builtinLibrary.F_TRIG.scl': F_TRIG,
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([

    ]);
}
