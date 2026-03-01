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

    test('linking of nested structs', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"

            VAR 
                myStruct1 : STRUCT
                    myInnerStruct : STRUCT
                        myDint1 : DINT;
                    END_STRUCT;
                END_STRUCT;
                myStruct2 : STRUCT
                    myInnerStruct : STRUCT
                        myDint2 : DINT;
                    END_STRUCT;
                END_STRUCT;
            END_VAR


            BEGIN
                #myStruct1.myInnerStruct.myDint1 := 11;
                #myStruct2.myInnerStruct.myDint2 := 11;
            END_FUNCTION_BLOCK
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
            myDint1
            myDint2
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
