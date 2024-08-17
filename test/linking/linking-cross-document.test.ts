import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { clearDocuments, parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { DbProgramElement, MemberCall, Model, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;
let otherDocument: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

afterEach(async () => {
    document && clearDocuments(services.shared, [ document ]);
    otherDocument && clearDocuments(services.shared, [ otherDocument ]);
});

describe('Linking cross document tests', () => {

    test('linking to element in type used for DB of type, from DB initialization', async () => {
        otherDocument = await parse(`
            TYPE "U_Status"
            VERSION : 0.1
            STRUCT
                good : Bool;
                warning : Bool;
                fault : Bool;
                critical : Bool;
            END_STRUCT;

            END_TYPE
        `, {documentUri: "file:///U_Status.scl"});

        document = await parse(`
            DATA_BLOCK "MyDbOfType"
            NON_RETAIN

            "U_Status"

            BEGIN

            critical;

            END_DATA_BLOCK
        `, {documentUri: "file:///MyDbOfType.scl"});

        const element0 = document?.parseResult.value.elements[0] as DbProgramElement;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.element.$refText}
                ref.name:
                    ${element0.element?.element.ref?.name}
            `
        ).toBe(s`
            refText:
                critical
            ref.name:
                critical
        `);
    });

    test('linking to element in local variable of UDT, from FB', async () => {
        otherDocument = await parse(`
            TYPE "U_Status"
            VERSION : 0.1
            STRUCT
                good : Bool;
                warning : Bool;
                fault : Bool;
                critical : Bool;
            END_STRUCT;

            END_TYPE
        `, {documentUri: "file:///U_Status.scl"});

        document = await parse(`
            FUNCTION_BLOCK "FB_MyFB"
            VERSION : 0.1
            
            VAR 
                myStatus : "U_Status";
            END_VAR

            BEGIN

            #myStatus.good;

            END_FUNCTION_BLOCK
        `, {documentUri: "file:///FB_MyFB.scl"});

        const element0 = document?.parseResult.value.elements[0] as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                ref.name:
                    ${element0.element?.ref?.name}
            `
        ).toBe(s`
            refText:
                good
            ref.name:
                good
        `);
    });

    test('linking to element in global DB from FB', async () => {
        otherDocument = await parse(`
            DATA_BLOCK "gb_MyGlobalDb"
            NON_RETAIN

            VAR 
                myOtherVar : DINT;
            END_VAR

            BEGIN

            END_DATA_BLOCK
        `, {documentUri: "file:///gb_MyGlobalDb.scl"});

        document = await parse(`
            FUNCTION_BLOCK "FB_MyFB"
            VERSION : 0.1
            
            VAR 
                myLocalVar : DINT;
            END_VAR

            BEGIN

            myLocalVar;
            "gb_MyGlobalDb".myOtherVar;

            END_FUNCTION_BLOCK
        `, {documentUri: "file:///FB_MyFB.scl"});

        const fbDockDirectParseResults = document?.parseResult.value;
        const element0 = fbDockDirectParseResults.elements[0] as MemberCall;
        const element1 = fbDockDirectParseResults.elements[1] as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                    ${element1.element?.$refText}
                ref.name:
                    ${element0.element?.ref?.name}
                    ${element1.element?.ref?.name}
            `
        ).toBe(s`
            refText:
                myLocalVar
                myOtherVar
            ref.name:
                myLocalVar
                myOtherVar
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
