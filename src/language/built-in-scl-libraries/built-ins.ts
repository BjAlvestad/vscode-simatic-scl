import { BitLogicBuiltIns } from "./basic-instructions/bit-logic-built-ins.js";
import { TimerBuiltIns } from "./basic-instructions/timer-built-ins.js";
import { ConversionBuiltIns } from "./basic-instructions/conversion-built-ins.js";
import { DataAndTimeBuiltIns } from "./extended-instructions/date-and-time-of-day-built-ins.js";
import { MathBuiltIns } from "./basic-instructions/math-built-ins.js";
import { AlarmingBuiltIns } from "./extended-instructions/alarming-built-ins.js";
import { MoveBuiltIns } from "./basic-instructions/move-built-ins.js";
import { StringAndCharBuiltIns } from "./extended-instructions/string-and-char.js";
import { ComparatorBuiltIns } from "./basic-instructions/comparator-built-ins.js";
import { CounterBuiltIns } from "./basic-instructions/counter-built-ins.js";
import { WordLogicBuiltIns } from "./basic-instructions/word-logic-built-ins.js";
import { ShiftAndRotateBuiltIns } from "./basic-instructions/shift-and-rotate-built-ins.js";
import { LegacyBuiltIns } from "./basic-instructions/legacy-built-ins.js";

export module BuiltIns {
    
    // *****************************
    // ****  Register builtins  ****
    // *****************************
    
    // scl-workspace-manager.ts and scl-library-file-system-provider.ts use this map to register
    // the libraries as documents, and to provide correct document for navigation in VS Code.
    // With this we avoid make changes in three different locations when adding new function.
    export const uriMap: { [K: string]: string } = {
    
        // ** Basic instructions **
        ...BitLogicBuiltIns.uriMap,
        ...TimerBuiltIns.uriMap,
        ...CounterBuiltIns.uriMap,
        ...ComparatorBuiltIns.uriMap,
        ...MathBuiltIns.uriMap,
        ...MoveBuiltIns.uriMap,
        ...ConversionBuiltIns.uriMap,
        //...ProgramControlBuiltIns.uriMap,
        ...WordLogicBuiltIns.uriMap,
        ...ShiftAndRotateBuiltIns.uriMap,
        ...LegacyBuiltIns.uriMap,
    
        // ** Extended instructions **
        ...DataAndTimeBuiltIns.uriMap,
        ...StringAndCharBuiltIns.uriMap,
        // ...xox
        ...AlarmingBuiltIns.uriMap,
    
        // ** Technology **
    
    
        // ** Communication **
    
    
        // ** Optional packages **
    
        
     };
    
    // List of functions that does not use formal parameters, so that e.g. scope calculation
    // will not incorrectly limit scope in the formal parameter position of function call.
    //TODO: Remove later and instead implement general solution. **Any** function that only has
    // a single formal parameter is allowed to omit it. Also applies to user created functions.
    const functionsWithoutFormalParameter: Set<string> = new Set<string>([

        // ** Basic instructions **
        ...BitLogicBuiltIns.functionsWithoutFormalParameter,
        ...TimerBuiltIns.functionsWithoutFormalParameter,
        ...CounterBuiltIns.functionsWithoutFormalParameter,
        ...ComparatorBuiltIns.functionsWithoutFormalParameter,
        ...MathBuiltIns.functionsWithoutFormalParameter,
        ...MoveBuiltIns.functionsWithoutFormalParameter,
        ...ConversionBuiltIns.functionsWithoutFormalParameter,
        // ...ProgramControlBuiltIns.functionsWithoutFormalParameter,
        ...WordLogicBuiltIns.functionsWithoutFormalParameter,
        ...ShiftAndRotateBuiltIns.functionsWithoutFormalParameter,
        ...LegacyBuiltIns.functionsWithoutFormalParameter,

        // ** Extended instructions **
        ...DataAndTimeBuiltIns.functionsWithoutFormalParameter_T_CONV,
        ...DataAndTimeBuiltIns.functionsWithoutFormalParameter_other,
        ...StringAndCharBuiltIns.functionsWithoutFormalParameter,
        // ...xox.functionsWithoutFormalParameter,
        ...AlarmingBuiltIns.functionsWithoutFormalParameter,

        // ** Technology **
        

        // ** Communication **
        

        // ** Optional packages **
        

    ]);
    
    export function isBuiltInFunction(functionName: string): boolean {
        return uriMap['/builtinLibrary.' + functionName + '.scl'] !== undefined;
     }
    
    export function isBuiltInFunctionWithoutParameters(functionName: string): boolean {
        return functionsWithoutFormalParameter.has(functionName);
    }
    
}
