import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module DiagnosticsBuiltIns {

    function createGet_IM_Data() {
        return new BuiltInFunction({
            name: 'Get_IM_Data',  // FunctionBlock
            title: 'Reading identification and maintenance data',
            version: '1.3',  // Version
            varInput: [
                new VariableDeclarationLine('LADDR', 'HW_IO', '0', '',),
                new VariableDeclarationLine('IM_TYPE', 'UInt', '0', '',),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', ''),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', ''),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', ''),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', ''),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant', '', ''),
            ],
            varStatic: [
                new VariableDeclarationLine('sdw_GetAttrID', 'DWord', '16#0', ''),
                new VariableDeclarationLine('sdw_GetAttrAID', 'DWord', '16#0', ''),
                new VariableDeclarationLine('sdi_SfcLen', 'DInt', '0', ''),
                new VariableDeclarationLine('sb_useGetMultiAttr', 'Bool', 'false', ''),
                new VariableDeclarationLine('sui_GetMultiAttrACount', 'UInt', '0', ''),
                new VariableDeclarationLine('sa_GetMultiAttrPathLens', 'Array[0..0] of UInt', '', ''),
                new VariableDeclarationLine('sa_GetMultiAttrPaths', 'Array[0..2] of DInt', '', ''),
                new VariableDeclarationLine('sa_GetMultiAttrResultLens', 'Array[0..0] of UInt', '', ''),
                new VariableDeclarationLine('sa_GetMultiAttrResult', 'String[254]', "''", ''),
                new VariableDeclarationLine('sb_SfcValid', 'Bool', 'false', ''),
                new VariableDeclarationLine('sb_SfcERROR', 'Bool', 'false', ''),
                new VariableDeclarationLine('sw_SfcStatus', 'Word', '16#0', ''),
                new VariableDeclarationLine('sa_SfcData', 'Array[0..64] of Byte', '', ''),
                new VariableDeclarationLine('sudi_arraylength', 'UDInt', '0', ''),
                new VariableDeclarationLine('sudi_datatype', 'UDInt', '0', ''),
                new VariableDeclarationLine('sui_imdataLen', 'UInt', '0', ''),
                new VariableDeclarationLine('sui_imdataLen_netto', 'UInt', '54', ''),
                new VariableDeclarationLine('si_index', 'Int', '0', ''),
                new VariableDeclarationLine('sb_SfcLocked', 'Bool', 'false', ''),
                new VariableDeclarationLine('pw_TemporaryWord', 'Word', '16#0', ''),
                new VariableDeclarationLine('pa_DataByte', 'Array[0..53] of Byte', '', ''),
                new VariableDeclarationLine('pa_DataChar', 'Array[0..53] of Char', '', ''),
                new VariableDeclarationLine('pa_TemporaryCharArray', 'Array[0..19] of Char', '', ''),
                new VariableDeclarationLine('p_DataUDT', 'IM0_Data', '', ''),

            ]
        }).toString();
    }

    function createGet_Name() {
        return new BuiltInFunction({
            name: 'Get_Name',  // FunctionBlock
            title: 'Reading the name of a module',
            version: '1.3',  // Version
            varInput: [
                new VariableDeclarationLine('LADDR', 'HW_IOSYSTEM', '0', '',),
                new VariableDeclarationLine('STATION_NR', 'UInt', '0', '',),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', ''),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', ''),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', ''),
                new VariableDeclarationLine('LEN', 'DInt', '0', ''),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', ''),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant'),
            ],
            varStatic: [
                new VariableDeclarationLine('BusyState', 'Word', '16#0'),
            ],
        }).toString();
    }

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.Get_IM_Data.udt': createGet_IM_Data(),
        '/builtinLibrary.Get_Name.udt': createGet_Name(),
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}
