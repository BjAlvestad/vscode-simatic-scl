import { BuiltInsUtils } from "../built-ins-utils.js";

export namespace BitLogicBuiltIns {
    // Bit logic operations:
    export const R_TRIG = BuiltInsUtils.createGeneralFunctionBlock('R_TRIG', ['CLK : BOOL'], ['Q : BOOL'], undefined,);
    export const F_TRIG = BuiltInsUtils.createGeneralFunctionBlock('F_TRIG', ['CLK : BOOL'], ['Q : BOOL'], undefined,);

    export const uriMap: { [K: string]: string } = {
        // Bit logic operations:
        '/builtinLibrary.R_TRIG.scl': R_TRIG,
        '/builtinLibrary.F_TRIG.scl': F_TRIG,
    }
}
