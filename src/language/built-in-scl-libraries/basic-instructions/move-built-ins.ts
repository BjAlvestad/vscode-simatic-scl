import { BuiltInFunction } from "../built-in-function.js";
import { BuiltInsUtils } from "../built-ins-utils.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";


export module MoveBuiltIns {
    // **** ROOT FOLDER: Move operations (under Basic Instructions) ****
    export const Deserialize = BuiltInsUtils.createGeneralFunction('Deserialize', ['SRC_ARRAY : ARRAY[*] of BYTE'], undefined, ['DEST_VARIABLE : ANY', 'POS : DINT'], 'INT');
    export const Serialize = BuiltInsUtils.createGeneralFunction('Serialize', ['SRC_VARIABLE : ANY'], undefined, ['DEST_ARRAY : ARRAY[*] of BYTE', 'POS : DINT'], 'INT');
    // Missing: MOVE_BLK
    // Missing: MOVE_BLK_VARIANT
    // Missing: UMOVE_BLK
    // Not function: ?= (attempt assignment of a variant to a reference)
    export const FILL_BLK = BuiltInsUtils.createGeneralFunction('FILL_BLK', ['IN : ANY', 'COUNT : UINT'], ['OUT : ANY'], undefined, 'Void');
    export const MOVE_BLK_VARIANT = BuiltInsUtils.createGeneralFunction('MOVE_BLK_VARIANT',
        ['SRC : VARIANT', 'COUNT : UDINT', 'SRC_INDEX : DINT', 'DEST_INDEX : DINT'],
        ['DEST : VARIANT'], undefined, 'INT'
    );
    // Missing: UFILL_BLK
    export const SCATTER = BuiltInsUtils.createInOutFunction('SCATTER', 'WORD', 'ARRAY[*] of BOOL', 'Void')
    export const SCATTER_BLK = BuiltInsUtils.createGeneralFunction('SCATTER_BLK', ['IN : ANY', 'COUNT_IN : UINT'], ['OUT : ANY'], undefined, 'Void');
    export const GATHER = BuiltInsUtils.createInOutFunction('GATHER', 'ARRAY[*] of BOOL', 'WORD', 'Void')
    export const GATHER_BLK = BuiltInsUtils.createGeneralFunction('GATHER_BLK', ['IN : ANY', 'COUNT_OUT : UINT'], ['OUT : ANY'], undefined, 'Void');
    // Missing: SWAP
    
    // ** SUB FOLDER: Array DB **
    // Missing: ReadFromArrayDB
    // Missing: WriteToArrayDB
    function createReadFromArrayDBL() {

        return new BuiltInFunction(
            'ReadFromArrayDBL',
            'FunctionBlock',
            '1.2',
            '',
            // 'Read from ARRAY data block in load memory',
            [
                new VariableDeclarationLine('req', 'Bool', 'false', ''),
                new VariableDeclarationLine('db', 'DB_ANY', '0', ''),
                new VariableDeclarationLine('index', 'DInt', '0', ''),
            ],
            [
                new VariableDeclarationLine('busy', 'Bool', 'false', ''),
                new VariableDeclarationLine('done', 'Bool', 'false', ''),
                new VariableDeclarationLine('error', 'Int', '0', ''),
            ],
            [
                new VariableDeclarationLine('value', 'Variant'),
            ],
            [
                new VariableDeclarationLine('header', 'DBHeader', ''),
                new VariableDeclarationLine('state', 'USInt', '0'),
                new VariableDeclarationLine('internal_req', 'Bool', 'false'),
                new VariableDeclarationLine('perfect', 'Bool', 'false'),
                new VariableDeclarationLine('index_copy', 'DInt', '0'),
                new VariableDeclarationLine('dbref', 'VAREF', ''),
                new VariableDeclarationLine('dstref', 'VAREF', ''),

            ]
        ).toString();
    }
    // Missing: WriteToArrayDBL
    
    // ** SUB FOLDER: Read / Write memory **
    // Missing: PEEK
    // Missing: PEEK_BOOL
    // Missing: POKE
    // Missing: POKE_BOOL
    // Missing: POKE_BLK
    // Missing: READ_LITTLE
    // Missing: WRITE_LITTLE
    // Missing: READ_BIG
    // Missing: WRITE_BIG
    
    // ** SUB FOLDER: Variant **
    export const VariantGet = BuiltInsUtils.createGeneralFunction('VariantGet', ['SRC : VARIANT'], ['DST : ANY'], undefined, 'Void');
    export const VariantPut = BuiltInsUtils.createGeneralFunction('VariantPut', ['SRC : ANY'], ['DST : VARIANT'], undefined, 'Void');
    export const CountOfElements = BuiltInsUtils.createGeneralFunction('CountOfElements', ['OPERAND : VARIANT'], undefined, undefined, 'UDINT');
    
    // ** SUB FOLDER: Array[*] **
    export const LOWER_BOUND = BuiltInsUtils.createGeneralFunction('LOWER_BOUND', ['ARR : ARRAY[*] of ANY', 'DIM : UDINT'], undefined, undefined, 'DINT');
    export const UPPER_BOUND = BuiltInsUtils.createGeneralFunction('UPPER_BOUND', ['ARR : ARRAY[*] of ANY', 'DIM : UDINT'], undefined, undefined, 'DINT');
    
    // ** SUB FOLDER: Legacy **
    // Missing: BLKMOV
    // Missing: UBLKMOV
    // Missing: FILL

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.Deserialize.scl': Deserialize,
        '/builtinLibrary.Serialize.scl': Serialize,

        '/builtinLibrary.FILL_BLK.scl': FILL_BLK,
        '/builtinLibrary.MOVE_BLK_VARIANT.scl': MOVE_BLK_VARIANT,

        '/builtinLibrary.SCATTER.scl': SCATTER,
        '/builtinLibrary.SCATTER_BLK.scl': SCATTER_BLK,
        '/builtinLibrary.GATHER.scl': GATHER,
        '/builtinLibrary.GATHER_BLK.scl': GATHER_BLK,
        
        '/builtinLibrary.ReadFromArrayDB.scl': createReadFromArrayDBL(),
        
        '/builtinLibrary.VariantGet.scl': VariantGet,
        '/builtinLibrary.VariantPut.scl': VariantPut,
        '/builtinLibrary.CountOfElements.scl': CountOfElements,
        '/builtinLibrary.LOWER_BOUND.scl': LOWER_BOUND,
        '/builtinLibrary.UPPER_BOUND.scl': UPPER_BOUND,
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        'CountOfElements',
    ]);
}
