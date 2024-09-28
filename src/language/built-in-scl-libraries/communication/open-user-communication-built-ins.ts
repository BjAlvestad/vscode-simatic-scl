import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module OpenUserCommunicationBuiltIns {

    function createTRCV_C() {
        return new BuiltInFunction(
            'TRCV_C',  // Name
            'FunctionBlock',  // BlockType
            '3.2',  // Version
            '',  // ReturnType
            // 'Establish a connection and receive data',  // Title/description
            [
                new VariableDeclarationLine('EN_R', 'Bool', 'false', 'EN_R=1: receive function enabled'),
                new VariableDeclarationLine('CONT', 'Bool', 'false', 'CONT=1: start connection'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to receive'),
                new VariableDeclarationLine('ADHOC', 'Bool', 'false', 'Request adhoc mode'),
            ],
            [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Data received'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Receive function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#7000', 'Function result/error message'),
                new VariableDeclarationLine('RCVD_LEN', 'UDInt', '0', 'Length of received data'),
            ],
            [
                new VariableDeclarationLine('CONNECT', 'Variant', '', 'Pointer to the connection description'),
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for received data'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of sender'),
                new VariableDeclarationLine('COM_RST', 'Bool', 'false', 'Restart of the instruction'),
            ],
            [
                new VariableDeclarationLine('s_state', 'Int', '0', ''),
                new VariableDeclarationLine('s_locked', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_udp', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_configured', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_tcon_80A3', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_ConID', 'CONN_OUC', '16#0', ''),
                new VariableDeclarationLine('s_TCON', 'TCON', '', ''),
                new VariableDeclarationLine('s_TDIAG', 'T_DIAG', '', ''),
                new VariableDeclarationLine('s_TDIAG_Status', 'TDiag_Status', '', ''),
                new VariableDeclarationLine('s_TRCV', 'TRCV', '', ''),
                new VariableDeclarationLine('s_TURCV', 'TURCV', '', ''),
                new VariableDeclarationLine('s_TDISCON', 'TDISCON', '', ''),
                new VariableDeclarationLine('s_TRESET', 'T_RESET', '', ''),

            ],
        ).toString();
    }

    function createTSEND_C() {
        return new BuiltInFunction(
            'TSEND_C',  // Name
            'FunctionBlock',  // BlockType
            '3.2',  // Version
            '',  // ReturnType
            // 'Establish a connection and send data',  // Title/description
            [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Send function to be executed on rising edge'),
                new VariableDeclarationLine('CONT', 'Bool', 'false', 'CONT=1: start connection'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to send'),
            ],
            [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Send performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Send function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#7000', 'Function result/error message'),
            ],
            [
                new VariableDeclarationLine('CONNECT', 'Variant', '', 'Pointer to the connection description'),
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for data to be sent'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of receiver'),
                new VariableDeclarationLine('COM_RST', 'Bool', 'false', 'Restart of the instruction'),
            ],
            [
                new VariableDeclarationLine('s_state', 'Int', '0', ''),
                new VariableDeclarationLine('s_locked', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_udp', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_configured', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_tcon_80A3', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_REQ', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_ConID', 'CONN_OUC', '16#0', ''),
                new VariableDeclarationLine('s_TCON', 'TCON', '', ''),
                new VariableDeclarationLine('s_TDIAG', 'T_DIAG', '', ''),
                new VariableDeclarationLine('s_TDIAG_Status', 'TDiag_Status', '', ''),
                new VariableDeclarationLine('s_TDISCON', 'TDISCON', '', ''),
                new VariableDeclarationLine('s_TSEND', 'TSEND', '', ''),
                new VariableDeclarationLine('s_TUSEND', 'TUSEND', '', ''),
                new VariableDeclarationLine('s_TRESET', 'T_RESET', '', ''),

            ],
        ).toString();
    }

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.TRCV_C.udt': createTRCV_C(),
        '/builtinLibrary.TSEND_C.udt': createTSEND_C(),
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}
