import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { clearDocuments, parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { MemberCall, Model, isBinaryExpression, isModel } from "../../src/language/generated/ast.js";
import { EOL } from "os";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

afterEach(async () => {
    document && clearDocuments(services.shared, [ document ]);
});

describe('Linking tests', () => {

    test('linking first level variables', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

            VAR_INPUT 
                myCaseSelectorInputVar : DINT;
            END_VAR

            VAR 
                internal1 : DINT;
                internal2 : DINT;
            END_VAR

            VAR_TEMP 
                myVar1 : DINT;   // Comment for my variable 1
                myVar2 : DINT;   // Comment for my variable 2
            END_VAR

            BEGIN
                #myVar1 := 11;
                #myVar2 := 22;
                #internal2 := 22;
            END_FUNCTION
        `);

        const filteredAndMapped = getLeftRefsFromBinaryExpression(document);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the cross references we're interested in by checking
            //  the referenced AST element as well as for a potential error message;
            checkDocumentValid(document)
                || filteredAndMapped.map(g => g.element?.ref?.name || g.element?.error?.message).join(EOL)
        ).toBe(s`
            myVar1
            myVar2
            internal2
        `);
    });

    test('linking of nested structs', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"

            VAR 
                myVar1 : DINT;
                myStruct : STRUCT
                    var1InMyStruct : DINT;
                    var2InMyStruct : DINT;
                    nestedStructInMyStruct : STRUCT
                        var1InNestedStruct : DINT;
                    END_STRUCT;
                END_STRUCT;
                myVar2 : DINT;
            END_VAR


            BEGIN
                #myVar1 := 11;
                #myStruct := 11;
                #myStruct.var1InMyStruct := 11;
                #myStruct.nestedStructInMyStruct.var1InNestedStruct := 11;
                #myVar2 := 22;
            END_FUNCTION
        `);

        const filteredAndMapped = getLeftRefsFromBinaryExpression(document);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the cross references we're interested in by checking
            //  the referenced AST element as well as for a potential error message;
            checkDocumentValid(document)
                || filteredAndMapped.map(g => g.element?.ref?.name || g.element?.error?.message).join(EOL)
        ).toBe(s`
            myVar1
            myStruct
            var1InMyStruct
            var1InNestedStruct
            myVar2
        `);
    });

    test('linking first level variable - in FB with return statement', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

            VAR_INPUT 
                myCaseSelectorInputVar : DINT;
            END_VAR

            VAR 
                internal1 : DINT;
                internal2 : DINT;
            END_VAR

            VAR_TEMP 
                myVar1 : DINT;   // Comment for my variable 1
                myVar2 : DINT;   // Comment for my variable 2
            END_VAR

            BEGIN
                #myVar1 := 11;
                #myVar2 := 22;
                #internal2 := 22;

                return 1234;
            END_FUNCTION
        `);

        const filteredAndMapped = getLeftRefsFromBinaryExpression(document);

        expect(
            // here we first check for validity of the parsed document object by means of the reusable function
            //  'checkDocumentValid()' to sort out (critical) typos first,
            // and then evaluate the cross references we're interested in by checking
            //  the referenced AST element as well as for a potential error message;
            checkDocumentValid(document)
                || filteredAndMapped.map(g => g.element?.ref?.name || g.element?.error?.message).join(EOL)
        ).toBe(s`
            myVar1
            myVar2
            internal2
        `);
    });

});

function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}

function getLeftRefsFromBinaryExpression(document: LangiumDocument<Model>) {
    // Extract only BinaryExpression elements from AST
    const filtered = document.parseResult.value.elements.filter(g => isBinaryExpression(g))
    // Then get only left hand side (where we have the variable getting linked in our tests)
    const filteredAndMapped = filtered.map(g => (g.left as MemberCall))
    return filteredAndMapped;
}
