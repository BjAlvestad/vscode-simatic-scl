import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { DbProgramElement, Model, NumberExpression, SclProgramElement, StringExpression, UnaryExpression, isDbProgramElement, isModel, isSclProgramElement, isStringExpression } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('DB parsing tests', () => {

    test('Parse string literal with prefix', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyDbFromFb"
            VAR
                var1 : String;
                var2 : WString;
            END_VAR
            BEGIN

            var1 := STRING#'My String with prefix';
            var2 := WSTRING#'My WString with prefix';

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();

        const value0 = getLiteralFromElement(model.elements[0]);
        const value1 = getLiteralFromElement(model.elements[1]);
        expect(isStringExpression(value0)).toBeTruthy();
        expect((value0 as StringExpression).type).toEqual("STRING");
        expect((value0 as StringExpression).value).toEqual("'My String with prefix'");
        expect(isStringExpression(value1)).toBeTruthy();
        expect((value1 as StringExpression).type).toEqual("WSTRING");
        expect((value1 as StringExpression).value).toEqual("'My WString with prefix'");
    });

});

function getLiteralFromElement(element: DbProgramElement | SclProgramElement) {
    const value = (element as DbProgramElement)?.value
    if (value !== undefined) {
        return value;
    }

    throw `Expected DbProgramElement value from ${element}`
}

function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}
