import { createGeneralFunction } from "../built-in-utils.js";

export namespace AlarmingBuiltIns {
    
    export const Ack_Alarms = createGeneralFunction(
        'Ack_Alarms',
        ['MODE : UINT'],
        ['ERROR : BOOL', 'STATUS : WORD'],
        undefined,
        'Void'
    )
    
    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.Ack_Alarms.scl': Ack_Alarms,
    }
}
