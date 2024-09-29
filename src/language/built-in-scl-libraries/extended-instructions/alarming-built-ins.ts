import { BuiltInFunction } from "../built-in-function.js";
import { BuiltInsUtils } from "../built-ins-utils.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module AlarmingBuiltIns {
    
    function create_Program_Alarm() {
        return new BuiltInFunction({
            name: 'Program_Alarm', // Note: Program_Alarm is not a normal FB. You cannot see the members in the "Data type" section of FB you call it from
            title: 'Generate program alarm with associated values',
            version: '1.0',
            varInput: [
                new VariableDeclarationLine('SIG', 'BOOL'),
                new VariableDeclarationLine('TIMESTAMP', 'LDT'),
                new VariableDeclarationLine('SD_1', 'Variant'),
                new VariableDeclarationLine('SD_2', 'Variant'),
                new VariableDeclarationLine('SD_3', 'Variant'),
                new VariableDeclarationLine('SD_4', 'Variant'),
                new VariableDeclarationLine('SD_5', 'Variant'),
                new VariableDeclarationLine('SD_6', 'Variant'),
                new VariableDeclarationLine('SD_7', 'Variant'),
                new VariableDeclarationLine('SD_8', 'Variant'),
                new VariableDeclarationLine('SD_9', 'Variant'),
                new VariableDeclarationLine('SD_10', 'Variant'),
            ],
            varOutput: [
                new VariableDeclarationLine('Error', 'BOOL'),
                new VariableDeclarationLine('Status', 'WORD'),
            ],
            varInOut: [],
            varStatic: [
                new VariableDeclarationLine('Alarm_ID', 'EVENT_ANY', '', 'Note that type is actually `Event_ID`. But this extension does not support that type as of now.'),
                new VariableDeclarationLine('HANDLE', 'DWord'),
                new VariableDeclarationLine('SIG_Edge_History', 'Bool'),
            ]
        }).toString();
    }

    //MISSING: Get_AlarmState
    //MISSING: Get_UsrMsg
    //MISSING: Get_Alarm

    export const Ack_Alarms = BuiltInsUtils.createGeneralFunction(
        'Ack_Alarms',
        ['MODE : UINT'],
        ['ERROR : BOOL', 'STATUS : WORD'],
        undefined,
        'Void'
    )

    //MISSING: Get_AlarmResources
    
    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.Program_Alarm.scl': create_Program_Alarm(),

        '/builtinLibrary.Ack_Alarms.scl': Ack_Alarms,
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([

    ]);
}
