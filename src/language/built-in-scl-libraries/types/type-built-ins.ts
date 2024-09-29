import { BuiltInType } from "../built-in-type.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module TypeBuiltIns {

    function createAuxFct_CycleTime() {
        return new BuiltInType(
            'AuxFct_CycleTime',
            [
                new VariableDeclarationLine('Value', 'Real', '0.1', 'cycle time in seconds (time interval between two calls)'),
                new VariableDeclarationLine('EnableMeasurement', 'Bool', 'true', 'enable automatic measurement of cycle time'),
            ]
        ).toString();
    }

    function createCREF() {
        return new BuiltInType(
            'CREF',
            [
                new VariableDeclarationLine('BLOCK_TYPE', 'Byte', '16#0', ''),
                new VariableDeclarationLine('CB_NUMBER', 'UInt', '0', ''),
                new VariableDeclarationLine('OFFSET', 'UDInt', '0', ''),
            ]
        ).toString();
    }

    function createDTL() {
        return new BuiltInType(
            'DTL',
            [
                new VariableDeclarationLine('YEAR', 'UInt', '1970', ''),
                new VariableDeclarationLine('MONTH', 'USInt', '1', ''),
                new VariableDeclarationLine('DAY', 'USInt', '1', ''),
                new VariableDeclarationLine('WEEKDAY', 'USInt', '5', ''),
                new VariableDeclarationLine('HOUR', 'USInt', '0', ''),
                new VariableDeclarationLine('MINUTE', 'USInt', '0', ''),
                new VariableDeclarationLine('SECOND', 'USInt', '0', ''),
                new VariableDeclarationLine('NANOSECOND', 'UDInt', '0', ''),
            ]
        ).toString();
    }

    function createErrorStruct() {
        return new BuiltInType(
            'ErrorStruct',
            [
                new VariableDeclarationLine('ERROR_ID', 'Word', '16#0', ''),
                new VariableDeclarationLine('FLAGS', 'Byte', '16#0', ''),
                new VariableDeclarationLine('REACTION', 'Byte', '16#0', ''),
                new VariableDeclarationLine('CODE_ADDRESS', 'CREF', '', ''),
                new VariableDeclarationLine('MODE', 'Byte', '16#0', ''),
                new VariableDeclarationLine('OPERAND_NUMBER', 'UInt', '0', ''),
                new VariableDeclarationLine('POINTER_NUMBER_LOCATION', 'UInt', '0', ''),
                new VariableDeclarationLine('SLOT_NUMBER_SCOPE', 'UInt', '0', ''),
                new VariableDeclarationLine('DATA_ADDRESS', 'NREF', '', ''),
            ]
        ).toString();
    }

    function createIEC_xCOUNTER(name: string, type: string) {
        return new BuiltInType(
            name,
            [
                new VariableDeclarationLine('CU', 'Bool', 'false', ''),
                new VariableDeclarationLine('CD', 'Bool', 'false', ''),
                new VariableDeclarationLine('R', 'Bool', 'false', ''),
                new VariableDeclarationLine('LD', 'Bool', 'false', ''),
                new VariableDeclarationLine('QU', 'Bool', 'false', ''),
                new VariableDeclarationLine('QD', 'Bool', 'false', ''),
                new VariableDeclarationLine('PV', type, '0', ''),
                new VariableDeclarationLine('CV', type, '0', ''),
            ]
        ).toString();
    }

    function createIEC_xTIMER(name: string, type: string, defaultValue: string) {
        return new BuiltInType(
            name,
            [
                new VariableDeclarationLine('PT', type, defaultValue, ''),
                new VariableDeclarationLine('ET', type, defaultValue, ''),
                new VariableDeclarationLine('IN', 'Bool', 'false', ''),
                new VariableDeclarationLine('Q', 'Bool', 'false', ''),
            ]
        ).toString();
    }

    function createIM0_Data() {
        return new BuiltInType(
            'IM0_Data',
            [
                new VariableDeclarationLine('Manufacturer_ID', 'UInt', '0', ''),
                new VariableDeclarationLine('Order_ID', 'String[20]', "''", ''),
                new VariableDeclarationLine('Serial_Number', 'String[16]', "''", ''),
                new VariableDeclarationLine('Hardware_Revision', 'UInt', '0', ''),
                new VariableDeclarationLine('Software_Revision', 'IM0_Version', '', ''),
                new VariableDeclarationLine('Revision_Counter', 'UInt', '0', ''),
                new VariableDeclarationLine('Profile_ID', 'UInt', '0', ''),
                new VariableDeclarationLine('Profile_Specific_Type', 'UInt', '0', ''),
                new VariableDeclarationLine('IM_Version', 'Word', '16#0', ''),
                new VariableDeclarationLine('IM_Supported', 'Word', '16#0', ''),
            ]
        ).toString();
    }

    function createIM0_Version() {
        return new BuiltInType(
            'IM0_Version',
            [
                new VariableDeclarationLine('Type', 'Char', "' '", ''),
                new VariableDeclarationLine('Functional', 'USInt', '0', ''),
                new VariableDeclarationLine('Bugfix', 'USInt', '0', ''),
                new VariableDeclarationLine('Internal', 'USInt', '0', ''),
            ]
        ).toString();
    }

    function createNREF() {
        return new BuiltInType(
            'NREF',
            [
                new VariableDeclarationLine('AREA', 'Byte', '16#0', ''),
                new VariableDeclarationLine('DB_NUMBER', 'UInt', '0', ''),
                new VariableDeclarationLine('OFFSET', 'UDInt', '0', ''),
            ]
        ).toString();
    }

    function createPID_CompactConfig() {
        return new BuiltInType(
            'PID_CompactConfig',
            [
                new VariableDeclarationLine('InputPerOn', 'Bool', 'true', 'activate peripheral input'),
                new VariableDeclarationLine('InvertControl', 'Bool', 'false', 'invert control direction'),
                new VariableDeclarationLine('InputUpperLimit', 'Real', '120.0', 'input (process value) upper limit'),
                new VariableDeclarationLine('InputLowerLimit', 'Real', '0.0', 'input (process value) lower limit'),
                new VariableDeclarationLine('InputUpperWarning', 'Real', '3.402822e+38', 'input (process value) upper level warning'),
                new VariableDeclarationLine('InputLowerWarning', 'Real', '-3.402822e+38', 'input (process value) lower level warning'),
                new VariableDeclarationLine('OutputUpperLimit', 'Real', '100.0', 'output value upper limit'),
                new VariableDeclarationLine('OutputLowerLimit', 'Real', '0.0', 'output value lower limit'),
                new VariableDeclarationLine('SetpointUpperLimit', 'Real', '3.402822e+38', 'setpoint upper limit value'),
                new VariableDeclarationLine('SetpointLowerLimit', 'Real', '-3.402822e+38', 'setpoint lower limit value'),
                new VariableDeclarationLine('MinimumOnTime', 'Real', '0.0', 'PWM minimum on time'),
                new VariableDeclarationLine('MinimumOffTime', 'Real', '0.0', 'PWM minimum off time'),
                new VariableDeclarationLine('InputScaling', 'PID_Scaling', '', 'input scaling'),

            ]
        ).toString();
    }

    function createPID_CompactControl() {
        return new BuiltInType(
            'PID_CompactControl',
            [
                new VariableDeclarationLine('PIDInit', 'Bool', 'false', 'initialization of controller'),
                new VariableDeclarationLine('IntegralSum', 'Real', '0.0', 'signal of integral part'),
            ]
        ).toString();
    }

    function createPID_CompactControlParams() {
        return new BuiltInType(
            'PID_CompactControlParams',
            [
                new VariableDeclarationLine('Gain', 'Real', '1.0', 'proportional gain'),
                new VariableDeclarationLine('Ti', 'Real', '20.0', 'reset time'),
                new VariableDeclarationLine('Td', 'Real', '0.0', 'derivative time'),
                new VariableDeclarationLine('TdFiltRatio', 'Real', '0.2', 'filter coefficient for derivative part'),
                new VariableDeclarationLine('PWeighting', 'Real', '1.0', 'weigthing of proportional part in direct, feedback path'),
                new VariableDeclarationLine('DWeighting', 'Real', '1.0', 'weigthing of derivative part in direct, feedback path'),
                new VariableDeclarationLine('Cycle', 'Real', '1.0', 'PID Controller cycle time'),

            ]
        ).toString();
    }

    function createPID_CompactRetain() {
        return new BuiltInType(
            'PID_CompactRetain',
            [
                new VariableDeclarationLine('CtrlParams', 'PID_CompactControlParams', '', 'actual parameter set'),
            ]
        ).toString();
    }

    function createPID_CompactSelfTune() {
        return new BuiltInType(
            'PID_CompactSelfTune',
            [
                new VariableDeclarationLine('SUT', 'PID_Compact_SUT', '', 'data set for start up tuning'),
                new VariableDeclarationLine('TIR', 'PID_Compact_TIR', '', 'data set for tuning in run'),
            ]
        ).toString();
    }

    function createPID_Compact_SUT() {
        return new BuiltInType(
            'PID_Compact_SUT',
            [
                new VariableDeclarationLine('CalculateParams', 'Bool', 'false', 'recalculate control parameters with parameters of startup tuning'),
                new VariableDeclarationLine('TuneRule', 'Int', '0', 'tuning rule for SUT (0-CHR PID,1-CHR PI)'),
                new VariableDeclarationLine('State', 'Int', '0', 'current phase of start up tuning'),
            ]
        ).toString();
    }

    function createPID_Compact_TIR() {
        return new BuiltInType(
            'PID_Compact_TIR',
            [
                new VariableDeclarationLine('RunIn', 'Bool', 'false', 'activate run in setpoint without controling'),
                new VariableDeclarationLine('CalculateParams', 'Bool', 'false', 'recalculate control parameters with parameters of tuning in run'),
                new VariableDeclarationLine('TuneRule', 'Int', '0', 'tuning rule for TIR (0-2-A PID auto,fast,slow;3-ZN PID;4-ZN PI;5-ZN P)'),
                new VariableDeclarationLine('State', 'Int', '0', 'current phase of tuning in run'),
            ]
        ).toString();
    }

    function createPID_CycleTime() {
        return new BuiltInType(
            'PID_CycleTime',
            [
                new VariableDeclarationLine('StartEstimation', 'Bool', 'true', 'start automatic estimation of call cycle time'),
                new VariableDeclarationLine('EnEstimation', 'Bool', 'true', 'enable estimation of call cycle time'),
                new VariableDeclarationLine('EnMonitoring', 'Bool', 'true', 'enable monitoring of call cycle time'),
                new VariableDeclarationLine('Value', 'Real', '0.1', 'call cycle time'),
            ]
        ).toString();
    }

    function createPID_Scaling() {
        return new BuiltInType(
            'PID_Scaling',
            [
                new VariableDeclarationLine('UpperPointIn', 'Real', '27648.0', 'high value (input range of scaling)'),
                new VariableDeclarationLine('LowerPointIn', 'Real', '0.0', 'low value (input range of scaling)'),
                new VariableDeclarationLine('UpperPointOut', 'Real', '100.0', 'high value (output range of scaling)'),
                new VariableDeclarationLine('LowerPointOut', 'Real', '0.0', 'low value (output range of scaling)'),
            ]
        ).toString();
    }

    // ** SUB TYPES - not available direct in Data type list, but is used in other built-ins **

    function DBHeader() {
        return new BuiltInType(
            'DBHeader',
            [
                new VariableDeclarationLine('general', 'GeneralDBHeader'),
                new VariableDeclarationLine('arrayDB', 'ArrayDBHeader'),
            ]
        ).toString();
    }

    function GeneralDBHeader() {
        return new BuiltInType(
            'GeneralDBHeader',
            [
                new VariableDeclarationLine('TypeCode', 'DWord', '16#0'),
                new VariableDeclarationLine('OriginalNumber', 'DWord', '16#0'),
            ]
        ).toString();
    }

    function ArrayDBHeader() {
        return new BuiltInType(
            'ArrayDBHeader',
            [
                new VariableDeclarationLine('PayLoadOffset', 'UDInt', '40'),
                new VariableDeclarationLine('Version', 'DWord', '16#01000000'),
                new VariableDeclarationLine('LowerBound', 'DInt', '0'),
                new VariableDeclarationLine('UpperBound', 'DInt', '0'),
                new VariableDeclarationLine('Elements', 'UDInt', '0'),
                new VariableDeclarationLine('PaddedSize', 'UDInt', '0'),
                new VariableDeclarationLine('ElementSize', 'UDInt', '0'),
                new VariableDeclarationLine('Reserved', 'UDInt', '0'),
            ]
        ).toString();
    }

    function VAREF() {
        return new BuiltInType(
            'VAREF',
            [
                new VariableDeclarationLine('RID', 'DWord', '16#0'),
                new VariableDeclarationLine('AREA', 'Byte', '16#0'),
                new VariableDeclarationLine('DB_NUMBER', 'UInt', '0'),
                new VariableDeclarationLine('OFFSET', 'UDInt', '0'),
                new VariableDeclarationLine('LENGTH', 'UDInt', '0'),
            ]
        ).toString();
    }

    function TDiag_Status() {
        return new BuiltInType(
            'TDiag_Status',
            [
                new VariableDeclarationLine('InterfaceId', 'HW_ANY', '0', 'HW-identifier of IE-interface submodule'),
                new VariableDeclarationLine('ID', 'CONN_OUC', '16#0', 'connection reference / identifier of monitored connection'),
                new VariableDeclarationLine('ConnectionType', 'Byte', '16#00', 'type of monitored connetion'),
                new VariableDeclarationLine('ActiveEstablished', 'Bool', 'false', 'active/passive connection establishment'),
                new VariableDeclarationLine('State', 'Byte', '16#00', 'state of monitored connection'),
                new VariableDeclarationLine('Kind', 'Byte', '16#00', 'kind of monitored connection'),
                new VariableDeclarationLine('SentBytes', 'UDInt', '16#00', 'bytes sent via monitored connection'),
                new VariableDeclarationLine('ReceivedBytes', 'UDInt', '16#00', 'bytes received on monitored connection'),
            ]
        ).toString();
    }

    // function XOX() {
    //     return new BuiltInType(
    //         'XOX',
    //         [
    //             new VariableDeclarationLine('', '', ''),
    //         ]
    //     ).toString();
    // }

    export const uriMap: { [K: string]: string } = {
        '/builtinLibrary.AuxFct_CycleTime.udt': createAuxFct_CycleTime(),
        '/builtinLibrary.CREF.udt': createCREF(),
        '/builtinLibrary.DTL.udt': createDTL(),
        '/builtinLibrary.ErrorStruct.udt': createErrorStruct(),
        '/builtinLibrary.IEC_COUNTER.udt': createIEC_xCOUNTER('IEC_COUNTER', 'Int'),
        '/builtinLibrary.IEC_DCOUNTER.udt': createIEC_xCOUNTER('IEC_DCOUNTER', 'DInt'),
        '/builtinLibrary.IEC_LCOUNTER.udt': createIEC_xCOUNTER('IEC_LCOUNTER', 'LInt'),
        '/builtinLibrary.IEC_SCOUNTER.udt': createIEC_xCOUNTER('IEC_SCOUNTER', 'SInt'),
        '/builtinLibrary.IEC_UCOUNTER.udt': createIEC_xCOUNTER('IEC_UCOUNTER', 'UInt'),
        '/builtinLibrary.IEC_UDCOUNTER.udt': createIEC_xCOUNTER('IEC_UDCOUNTER', 'UDInt'),
        '/builtinLibrary.IEC_ULCOUNTER.udt': createIEC_xCOUNTER('IEC_ULCOUNTER', 'ULInt'),
        '/builtinLibrary.IEC_USCOUNTER.udt': createIEC_xCOUNTER('IEC_USCOUNTER', 'USInt'),
        '/builtinLibrary.IEC_LTIMER.udt': createIEC_xTIMER('IEC_LTIMER', 'LTime', 'LT#0ns'),
        '/builtinLibrary.IEC_TIMER.udt': createIEC_xTIMER('IEC_TIMER', 'Time', 'T#0ns'),
        '/builtinLibrary.IM0_Data.udt': createIM0_Data(),
        '/builtinLibrary.IM0_Version.udt': createIM0_Version(),
        '/builtinLibrary.NREF.udt': createNREF(),
        '/builtinLibrary.PID_CompactConfig.udt': createPID_CompactConfig(),
        '/builtinLibrary.PID_CompactControl.udt': createPID_CompactControl(),
        '/builtinLibrary.PID_CompactControlParams.udt': createPID_CompactControlParams(),
        '/builtinLibrary.PID_CompactRetain.udt': createPID_CompactRetain(),
        '/builtinLibrary.PID_CompactSelfTune.udt': createPID_CompactSelfTune(),
        '/builtinLibrary.PID_Compact_SUT.udt': createPID_Compact_SUT(),
        '/builtinLibrary.PID_Compact_TIR.udt': createPID_Compact_TIR(),
        '/builtinLibrary.PID_CycleTime.udt': createPID_CycleTime(),
        '/builtinLibrary.PID_Scaling.udt': createPID_Scaling(),
        // ** SUB TYPES - not available direct in Data type list, but is used in other built-ins **
        '/builtinLibrary.DBHeader.udt': DBHeader(),
        '/builtinLibrary.GeneralDBHeader.udt': GeneralDBHeader(),
        '/builtinLibrary.ArrayDBHeader.udt': ArrayDBHeader(),
        '/builtinLibrary.VAREF.udt': VAREF(),
        '/builtinLibrary.TDiag_Status.udt': TDiag_Status(),
        
    }

    /* TODO:

    Functions TO BE ADDED:

    TRCV_C
    TSEND_C

    */

}