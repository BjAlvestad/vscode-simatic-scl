import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module OpenUserCommunicationBuiltIns {

    function createTRCV_C() {
        return new BuiltInFunction({
            name: 'TRCV_C',  // FunctionBlock
            title: 'Establish a connection and receive data',
            version: '3.2',
            varInput: [
                new VariableDeclarationLine('EN_R', 'Bool', 'false', 'EN_R=1: receive function enabled'),
                new VariableDeclarationLine('CONT', 'Bool', 'false', 'CONT=1: start connection'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to receive'),
                new VariableDeclarationLine('ADHOC', 'Bool', 'false', 'Request adhoc mode'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Data received'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Receive function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#7000', 'Function result/error message'),
                new VariableDeclarationLine('RCVD_LEN', 'UDInt', '0', 'Length of received data'),
            ],
            varInOut: [
                new VariableDeclarationLine('CONNECT', 'Variant', '', 'Pointer to the connection description'),
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for received data'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of sender'),
                new VariableDeclarationLine('COM_RST', 'Bool', 'false', 'Restart of the instruction'),
            ],
            varStatic: [
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
        }).toString();
    }

    function createTSEND_C() {
        return new BuiltInFunction({
            name: 'TSEND_C',  // FunctionBlock
            title: 'Establish a connection and send data',
            version: '3.2',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Send function to be executed on rising edge'),
                new VariableDeclarationLine('CONT', 'Bool', 'false', 'CONT=1: start connection'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to send'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Send performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Send function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#7000', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('CONNECT', 'Variant', '', 'Pointer to the connection description'),
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for data to be sent'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of receiver'),
                new VariableDeclarationLine('COM_RST', 'Bool', 'false', 'Restart of the instruction'),
            ],
            varStatic: [
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
        }).toString();
    }

    //MISSING: TMAIL_C

    function CommConfig() {
        return new BuiltInFunction({
            name: 'CommConfig',
            title: 'Read and modify communication parameters',
            version:  '1.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'REQ=1: Start Read or Write Operation'),
                new VariableDeclarationLine('HW_ID', 'HW_IO', '0', ''),
                new VariableDeclarationLine('MODE', 'UInt', '0', 'Mode=0: Read Operation; Mode=1: Write Operation'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Done=1: Read/Write completed without errors'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Busy=1: Read/Write is being executed'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error=1: An error occurred (See "Status")'),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', 'Cause of the error'),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant'),
            ],
            varStatic: [
                new VariableDeclarationLine('s_BlockState', 'UInt', '0', ''),
                new VariableDeclarationLine('s_LastStatusError', 'UInt', '0', ''),
                new VariableDeclarationLine('s_WriteMode', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_Submodule', 'HW_SUBMODULE', '0', ''),
                new VariableDeclarationLine('s_RecIndex', 'DInt', '0', ''),
                new VariableDeclarationLine('s_RecLength', 'UInt', '0', ''),
                new VariableDeclarationLine('s_Record', 'Array[0..499] of Byte', '', ''),
                new VariableDeclarationLine('s_TriggeredStatusProvided', 'Bool', 'false', ''),
                new VariableDeclarationLine('s_Last_RDREC_Error_Code', 'DWord', '16#0', ''),
                new VariableDeclarationLine('s_Last_TCONFIG_Error_Code', 'DWord', '16#0', ''),
                new VariableDeclarationLine('s_Last_WRREC_Error_Code', 'DWord', '16#0', ''),
                new VariableDeclarationLine('s_GEOAddr', 'GEOADDR', '', ''),
                new VariableDeclarationLine('s_RDREC', 'RDREC', '', ''),
                new VariableDeclarationLine('s_WRREC', 'WRREC', '', ''),
                new VariableDeclarationLine('s_T_CONFIG', 'T_CONFIG', '', ''),
                new VariableDeclarationLine('s_ConfigDataNTP', 'Struct', '', ''),
                new VariableDeclarationLine('s_ConfigDataIP', 'Struct', '', ''),
                new VariableDeclarationLine('s_previousREQ', 'Bool', 'false', ''),
            ],
        }).toString();
    }

    // ** SUB FOLDER - Others **

    function TCONSettings() {
        return new BuiltInFunction({
            name: 'TCONSettings',
            title: 'Prepare and change communication connection',
            version:  '1.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Starts the job requested by the user on a rising edge.'),
                new VariableDeclarationLine('MODE', 'USInt', '0', 'Specify the type of operation the block performs'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'FALSE: Job is not yet started or is still in progress; TRUE: Job completed without error'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'FALSE: Job not yet started or already completed; TRUE: Job has not completed yet'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'FALSE: Job not yet started or still in progress; TRUE: Job completed with an error. See STATUS for more information'),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', 'Status of the instruction.'),
            ],
            varInOut: [
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Reference to the Connection ID'),
                new VariableDeclarationLine('OPTION', 'Variant', '', 'Reference to the option description'),
            ],
        }).toString();
    }

    function TCON() {
        return new BuiltInFunction({
            name: 'TCON',
            title: 'Establish communication connection',
            version: '4.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'New data received'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('CONNECT', 'Variant', '', 'Connection description'),
            ],
        }).toString();
    }

    function TDISCON() {
        return new BuiltInFunction({
            name: 'TDISCON',
            title: 'Terminate the communication connection',
            version:  '2.1',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'False', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', 'W#16#0', 'Connection identifier'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'False', 'Function performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'False', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'False', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
            ],
        }).toString();
    }

    function TSEND() {
        return new BuiltInFunction({
            name: 'TSEND',
            title: 'Send data via communication connection',
            version:  '4.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to send'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Send performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant', '', 'Pointer on data area to send'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Pointer on address of receiver'),
            ],
        }).toString();
    }

    function TRCV() {
        return new BuiltInFunction({
            name: 'TRCV',
            title: 'Receive data via communication connection',
            version:  '4.0',
            varInput: [
                new VariableDeclarationLine('EN_R', 'Bool', 'false', 'EN_R=1: function enabled'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to receive'),
                new VariableDeclarationLine('ADHOC', 'Bool', 'false', 'Request adhoc mode'),
            ],
            varOutput: [
                new VariableDeclarationLine('NDR', 'Bool', 'false', 'New data received'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
                new VariableDeclarationLine('RCVD_LEN', 'UDInt', '0', 'Length of received data'),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for received data'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of sender'),
            ],
        }).toString();
    }

    function TUSEND() {
        return new BuiltInFunction({
            name: 'TUSEND',
            title: 'Send data via Ethernet (UDP)',
            version:  '4.0',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to send'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Send performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant', '', 'Pointer on data area to send'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Pointer on address of receiver'),
            ],
        }).toString();
    }

    function TURCV() {
        return new BuiltInFunction({
            name: 'TURCV',
            title: 'Receive data via Ethernet (UDP)',
            version:  '4.0',
            varInput: [
                new VariableDeclarationLine('EN_R', 'Bool', 'false', 'EN_R=1: function enabled'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
                new VariableDeclarationLine('LEN', 'UDInt', '0', 'Data length to receive'),
                new VariableDeclarationLine('ADHOC', 'Bool', 'false', 'Request adhoc mode'),
            ],
            varOutput: [
                new VariableDeclarationLine('NDR', 'Bool', 'false', 'New data received'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', 'W#16#7000', 'Function result/error message'),
                new VariableDeclarationLine('RCVD_LEN', 'UDInt', '0', 'Length of received data'),
            ],
            varInOut: [
                new VariableDeclarationLine('DATA', 'Variant', '', 'Buffer for received data'),
                new VariableDeclarationLine('ADDR', 'Variant', '', 'Address of sender'),
            ],
        }).toString();
    }

    function T_RESET() {
        return new BuiltInFunction({
            name: 'T_RESET',
            title: 'Resetting the connection',
            version:  '1.2',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Function performed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', 'Function result/error message'),
            ],
        }).toString();
    }

    function T_DIAG() {
        return new BuiltInFunction({
            name: 'T_DIAG',
            title: 'Checking the connection',
            version:  '1.2',
            varInput: [
                new VariableDeclarationLine('REQ', 'Bool', 'false', 'Function to be executed on rising edge'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'Connection identifier'),
            ],
            varOutput: [
                new VariableDeclarationLine('DONE', 'Bool', 'false', 'Function completed'),
                new VariableDeclarationLine('BUSY', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('ERROR', 'Bool', 'false', 'Error detected'),
                new VariableDeclarationLine('STATUS', 'Word', '16#0', 'Function result/error message'),
            ],
            varInOut: [
                new VariableDeclarationLine('RESULT', 'Variant', '', 'Diagnostics information'),
            ],
        }).toString();
    }

    function T_CONFIG() {
        return new BuiltInFunction({
            name: 'T_CONFIG',
            title: 'Configure interface',
            version:  '1.0',
            varInput: [
                new VariableDeclarationLine('Req', 'Bool', 'false', 'Perform function on rising edge'),
                new VariableDeclarationLine('Interface', 'HW_INTERFACE', '0', 'ID of an interface'),
                new VariableDeclarationLine('Conf_Data', 'Variant', '', 'Reference to configuration data structure'),
            ],
            varOutput: [
                new VariableDeclarationLine('Done', 'Bool', 'false', 'Function performed'),
                new VariableDeclarationLine('Busy', 'Bool', 'false', 'Function busy'),
                new VariableDeclarationLine('Error', 'Bool', 'false', 'Error flag'),
                new VariableDeclarationLine('Status', 'DWord', '0', 'Function result/error message'),
                new VariableDeclarationLine('Err_Loc', 'DWord', '0', 'Error location (field ID and subfield ID of error causing parameter)'),
            ],
        }).toString();
    }

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.TRCV_C.udt': createTRCV_C(),
        '/builtinLibrary.TSEND_C.udt': createTSEND_C(),        
        // '/builtinLibrary.TMAIL_C.udt': TMAIL_C(),
        '/builtinLibrary.CommConfig.udt': CommConfig(),
        // ** SUB FOLDER - Others **
        '/builtinLibrary.TCONSettings.udt': TCONSettings(),
        '/builtinLibrary.TCON.udt': TCON(),
        '/builtinLibrary.TDISCON.udt': TDISCON(),
        '/builtinLibrary.TSEND.udt': TSEND(),
        '/builtinLibrary.TRCV.udt': TRCV(),
        '/builtinLibrary.TUSEND.udt': TUSEND(),
        '/builtinLibrary.TURCV.udt': TURCV(),
        '/builtinLibrary.T_RESET.udt': T_RESET(),
        '/builtinLibrary.T_DIAG.udt': T_DIAG(),
        '/builtinLibrary.T_CONFIG.udt': T_CONFIG(),
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}
