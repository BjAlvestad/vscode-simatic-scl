import { BuiltInsUtils } from "../built-ins-utils.js";

export module AlarmingBuiltIns {
    
    export const Ack_Alarms = BuiltInsUtils.createGeneralFunction(
        'Ack_Alarms',
        ['MODE : UINT'],
        ['ERROR : BOOL', 'STATUS : WORD'],
        undefined,
        'Void'
    )
    
    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.Ack_Alarms.scl': Ack_Alarms,
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([

    ]);
}
