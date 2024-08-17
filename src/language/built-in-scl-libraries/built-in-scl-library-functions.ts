// Built in convert functions
export const UDINT_TO_TIME = createConvertFunction('UDINT', 'TIME');
export const REAL_TO_UDINT = createConvertFunction('REAL', 'UDINT');

function createConvertFunction(from: string, to: string): string {
    return `
    FUNCTION ${from}_TO_${to} : ${to}
    VERSION : 0.1

    BEGIN
    END_FUNCTION
    `.trimStart();
}

// scl-workspace-manager.ts and scl-library-file-system-provider.ts use this map to register
// the libraries as documents, and to provide correct document for navigation in VS Code.
// With this we avoid make changes in three different locations when adding new function.
export const uriMap: { [K: string]: string } = {
    '/builtinLibrary.UDINT_TO_TIME.scl': UDINT_TO_TIME,
    '/builtinLibrary.REAL_TO_UDINT.scl': REAL_TO_UDINT,
 };

// List of functions that does not use formal parameters, so that e.g. scope calculation
// will not incorrectly limit scope in the formal parameter position of function call.
const functionsWithoutFormalParameter: Set<string> = new Set<string>([
    'UDINT_TO_TIME',
    'REAL_TO_UDINT'
]);

 export function isBuiltInFunction(functionName: string): boolean {
    return uriMap['/builtinLibrary.' + functionName + '.scl'] !== undefined;
 }

 export function isBuiltInFunctionWithoutParameters(functionName: string): boolean {
    return functionsWithoutFormalParameter.has(functionName);
 }
