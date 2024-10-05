import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module DistributedIoBuiltIns {

    function RDREC() {
        return new BuiltInFunction({
            name: 'RDREC',
            title: 'Read data record',
            version:  '1.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'REQ = 1: Transfer data record'),
                new VariableDeclarationLine('ID', 'HW_IO', '16#0', 'HW-Id of the DP slave/PROFINET IO component'),
                new VariableDeclarationLine('INDEX', 'DInt', '0', 'Data record number'),
                new VariableDeclarationLine('MLEN', 'UInt', '0', 'Maximum length in bytes of the data'),
            ],
            varOutput: [
                new VariableDeclarationLine('VALID', 'Bool', 'false', 'Function performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error flag'),
                new VariableDeclarationLine('STATUS', 'DWord', '16#0', 'Function result/error message'),
                new VariableDeclarationLine('LEN', 'UInt', '0', 'Length of the fetched data record'),
            ],
            varInOut: [
                new VariableDeclarationLine('RECORD', 'Variant', '', 'Target area for the fetched data record'),
            ],
        }).toString();
    }

    function WRREC() {
        return new BuiltInFunction({
            name: 'WRREC',
            title: 'Write data record',
            version:  '1.1',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'REQ = 1: Transfer data record'),
                new VariableDeclarationLine('ID', 'HW_IO', '0', 'HW-Id of the DP slave/PROFINET IO component'),
                new VariableDeclarationLine('INDEX', 'DInt', '0', 'Data record number'),
                new VariableDeclarationLine('LEN', 'UInt', '0', 'Maximum length in bytes of the data'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Function performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error flag'),
                new VariableDeclarationLine('STATUS', 'DWord', '16#0', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('RECORD', 'Variant', '', 'Data record'),
            ],
        }).toString();
    }

    `
    function XOX() {
        return new BuiltInFunction({
            name: 'XOX',
            returnType: 'Void',
            title: '',
            version:  '',
            varInput: [
                new VariableDeclarationLine('', '',),
            ],
            varOutput: [
                new VariableDeclarationLine('', '',),
            ],
            varInOut: [
                new VariableDeclarationLine('', '',),
            ],
            varStatic: [
                new VariableDeclarationLine('', '',),
            ],
        }).toString();
    }
    `

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.RDREC.udt': RDREC(),
        '/builtinLibrary.WRREC.udt': WRREC(),
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}
