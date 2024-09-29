import { BuiltInFunction } from "../built-in-function.js";
// import { BuiltInsUtils } from "../built-ins-utils.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";

export module PidControlBuiltIns {

    // ** SUB FOLDER: Compact PID

    function createPID_Compact() {
        return new BuiltInFunction({
            name: 'PID_Compact',  // FunctionBlock
            title: 'Universal PID controller with integrated tuning',
            version: '2.4',
            varInput: [
                new VariableDeclarationLine('Setpoint', 'Real', '0.0', 'controller setpoint input'),
                new VariableDeclarationLine('Input', 'Real', '0.0', 'current value from process in REAL format'),
                new VariableDeclarationLine('Input_PER', 'Int', '0', 'current value from peripheral input'),
                new VariableDeclarationLine('Disturbance', 'Real', '0.0', 'disturbance intrusion'),
                new VariableDeclarationLine('ManualEnable', 'Bool', 'false', 'activate manual value to overwrite output value'),
                new VariableDeclarationLine('ManualValue', 'Real', '0.0', 'manual value'),
                new VariableDeclarationLine('ErrorAck', 'Bool', 'false', 'reset error message'),
                new VariableDeclarationLine('Reset', 'Bool', 'false', 'reset the controller'),
                new VariableDeclarationLine('ModeActivate', 'Bool', 'false', 'enable mode'),
            ],
            varOutput: [
                new VariableDeclarationLine('ScaledInput', 'Real', '0.0', 'current value after scaling'),
                new VariableDeclarationLine('Output', 'Real', '0.0', 'output value in REAL format'),
                new VariableDeclarationLine('Output_PER', 'Int', '0', 'analog output value'),
                new VariableDeclarationLine('Output_PWM', 'Bool', 'false', 'pulse width modulated output value'),
                new VariableDeclarationLine('SetpointLimit_H', 'Bool', 'false', 'setpoint reached upper limit'),
                new VariableDeclarationLine('SetpointLimit_L', 'Bool', 'false', 'setpoint reached lower limit'),
                new VariableDeclarationLine('InputWarning_H', 'Bool', 'false', 'current value reached upper warning level'),
                new VariableDeclarationLine('InputWarning_L', 'Bool', 'false', 'current value reached lower warning level'),
                new VariableDeclarationLine('State', 'Int', '0', 'current mode of operation (0-Inactive, 1-SUT, 2-TIR, 3-Automatic, 4-Manual, 5-Substitute output)'),
                new VariableDeclarationLine('Error', 'Bool', 'false', 'error flag'),
                new VariableDeclarationLine('ErrorBits', 'DWord', '16#0', 'error message'),

            ],
            varInOut: [
                new VariableDeclarationLine('Mode', 'Int', '4', 'mode selection'),
            ],
            varStatic: [
                new VariableDeclarationLine('InternalDiagnostic', 'DWord', '0', 'internal diagnostic and version handling'),
                new VariableDeclarationLine('InternalVersion', 'DWord', 'DW#16#02040001', 'version of controller'),
                new VariableDeclarationLine('InternalRTVersion', 'DWord', '0', 'version of runtime'),
                new VariableDeclarationLine('IntegralResetMode', 'Int', '4', '0 smooth, 1 clear, 2 keep, 3 overwrite initial output, 4 like setpoint change'),
                new VariableDeclarationLine('OverwriteInitialOutputValue', 'Real', '0.0', 'initialization of output value for override control'),
                new VariableDeclarationLine('RunModeByStartup', 'Bool', 'true', 'activate Mode after CPU restart'),
                new VariableDeclarationLine('LoadBackUp', 'Bool', 'false', 'restore last parameter set'),
                new VariableDeclarationLine('SetSubstituteOutput', 'Bool', 'true', 'assignment of output value in State = 5 (FALSE - last valid value, TRUE - SubstituteOutput)'),
                new VariableDeclarationLine('PhysicalUnit', 'Int', '0', 'unit of measurement of the process value and setpoint'),
                new VariableDeclarationLine('PhysicalQuantity', 'Int', '0', 'physical quantity of the process value and setpoint'),
                new VariableDeclarationLine('ActivateRecoverMode', 'Bool', 'true', 'FALSE - go to inactive by error, TRUE - activate error treatment'),
                new VariableDeclarationLine('Warning', 'DWord', '16#0', 'warning message'),
                new VariableDeclarationLine('WarningInternal', 'DWord', '16#0', 'warning message'),
                new VariableDeclarationLine('Progress', 'Real', '0.0', 'progress of current phase in percent'),
                new VariableDeclarationLine('CurrentSetpoint', 'Real', '0.0', 'current active setpoint value'),
                new VariableDeclarationLine('CancelTuningLevel', 'Real', '10.0', 'cancel level for setpoint change during tuning'),
                new VariableDeclarationLine('SubstituteOutput', 'Real', '0.0', 'substitute output value in case of error'),
                new VariableDeclarationLine('Config', 'PID_CompactConfig', '', 'configuration data set'),
                new VariableDeclarationLine('CycleTime', 'PID_CycleTime', '', 'data set for cycle time estimation'),
                new VariableDeclarationLine('CtrlParamsBackUp', 'PID_CompactControlParams', '', 'saved parameter set'),
                new VariableDeclarationLine('PIDSelfTune', 'PID_CompactSelfTune', '', 'data set for self tuning'),
                new VariableDeclarationLine('PIDCtrl', 'PID_CompactControl', '', 'data for controlling part'),
                new VariableDeclarationLine('Retain', 'PID_CompactRetain', '', 'retain data'),
            ],
        }).toString();
    }

    // ** SUB FOLDER: Auxillary functions

    function createRampFunction() {
        return new BuiltInFunction({
            name: 'RampFunction',  // FunctionBlock
            title: '',
            version: '1.0',
            varInput: [
                new VariableDeclarationLine('Input', 'Real', '0.0', 'input value'),
                new VariableDeclarationLine('SubstituteOutput', 'Real', '0.0', 'output value when Reset = TRUE or in case of error with ErrorMode = 1'),
                new VariableDeclarationLine('ErrorAck', 'Bool', 'false', 'reset error message'),
                new VariableDeclarationLine('Reset', 'Bool', 'false', 'reset instruction and Output = SubstituteOutput'),
            ],
            varOutput: [
                new VariableDeclarationLine('Output', 'Real', '0.0', 'output value'),
                new VariableDeclarationLine('PositiveRisingSlewRate_Active', 'Bool', 'false', 'output value is currently limited by PositiveRisingSlewRate'),
                new VariableDeclarationLine('PositiveFallingSlewRate_Active', 'Bool', 'false', 'output value is currently limited by PositiveFallingSlewRate'),
                new VariableDeclarationLine('NegativeRisingSlewRate_Active', 'Bool', 'false', 'output value is currently limited by NegativeRisingSlewRate'),
                new VariableDeclarationLine('NegativeFallingSlewRate_Active', 'Bool', 'false', 'output value is currently limited by NegativeFallingSlewRate'),
                new VariableDeclarationLine('UpperLimit_Active', 'Bool', 'false', 'output value is currently limited by UpperLimit'),
                new VariableDeclarationLine('LowerLimit_Active', 'Bool', 'false', 'output value is currently limited by LowerLimit'),
                new VariableDeclarationLine('ErrorBits', 'DWord', '16#0', 'error message'),
                new VariableDeclarationLine('Error', 'Bool', 'false', 'error flag'),
            ],
            varInOut: [],
            varStatic: [
                new VariableDeclarationLine('PositiveRisingSlewRate', 'Real', '10.0', 'limit value for the rising slew rate per second in positive range'),
                new VariableDeclarationLine('PositiveFallingSlewRate', 'Real', '10.0', 'limit value for the falling slew rate per second in positive range'),
                new VariableDeclarationLine('NegativeRisingSlewRate', 'Real', '10.0', 'limit value for the rising slew rate per second in negative range'),
                new VariableDeclarationLine('NegativeFallingSlewRate', 'Real', '10.0', 'limit value for the falling slew rate per second in negative range'),
                new VariableDeclarationLine('UpperLimit', 'Real', '100.0', 'upper limit of the output value'),
                new VariableDeclarationLine('LowerLimit', 'Real', '0.0', 'lower limit of the output value'),
                new VariableDeclarationLine('ErrorMode', 'Int', '2', 'selection of substitute output value in case of error (0 = Input, 1 = SubstituteOutput, 2 = last valid output value, 3 = 0.0, 4 = LowerLimit, 5 = UpperLimit)'),
                new VariableDeclarationLine('StartMode', 'Int', '2', 'selection of first output value (0 = Input, 1 = SubstituteOutput, 2 = last output value, 3 = 0.0, 4 = LowerLimit, 5 = UpperLimit)'),
                new VariableDeclarationLine('CycleTime', 'AuxFct_CycleTime', '', 'cycle time data'),
            ]
        }).toString();
    }

    export const uriMap: { [K: string]: string } = {
        // ** SUB FOLDER: Auxillary functions
        '/builtinLibrary.RampFunction.scl': createRampFunction(),
        '/builtinLibrary.PID_Compact.scl': createPID_Compact(),
    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([

    ]);
}
