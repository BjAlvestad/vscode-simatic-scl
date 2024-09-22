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
}
