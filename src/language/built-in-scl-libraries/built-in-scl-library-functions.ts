export const UDINT_TO_TIME = `
FUNCTION UDINT_TO_TIME : Time
VERSION : 0.1

BEGIN
END_FUNCTION
`.trimStart();

export const REAL_TO_UDINT = `
FUNCTION REAL_TO_UDINT : UDINT
VERSION : 0.1

BEGIN
END_FUNCTION
`.trimStart();

// scl-workspace-manager.ts and scl-library-file-system-provider.ts use this map to register
// the libraries as documents, and to provide correct document for navigation in VS Code.
// With this we avoid make changes in three different locations when adding new function.
export const uriMap: { [K: string]: string } = {
    '/builtinLibrary.UDINT_TO_TIME.scl': UDINT_TO_TIME,
    '/builtinLibrary.REAL_TO_UDINT.scl': REAL_TO_UDINT,
 };
