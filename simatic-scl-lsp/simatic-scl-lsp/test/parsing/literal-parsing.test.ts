import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { Model, StringExpression, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Literal parsing tests', () => {

    test('Parse string literal', async () => {
        document = await parse(`
            FUNCTION_BLOCK "DB_MyDbFromFb"
            BEGIN

            'My basic string';

            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("StringExpression");
        expect((model.elements[0] as StringExpression).type).toEqual(undefined);
        expect((model.elements[0] as StringExpression).value).toEqual("'My basic string'");
    });

    test('Parse empty string literal', async () => {
        document = await parse(`
            FUNCTION_BLOCK "DB_MyDbFromFb"
            BEGIN

            '';

            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("StringExpression");
        expect((model.elements[0] as StringExpression).type).toEqual(undefined);
        expect((model.elements[0] as StringExpression).value).toEqual("''");
    });


    test('Parse string literal with prefix', async () => {
        document = await parse(`
            FUNCTION_BLOCK "DB_MyDbFromFb"
            BEGIN

            STRING#'My String with prefix';
            WSTRING#'My WString with prefix';

            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("StringExpression");
        expect((model.elements[0] as StringExpression).type).toEqual("STRING");
        expect((model.elements[0] as StringExpression).value).toEqual("'My String with prefix'");
        expect(model.elements[1].$type).toEqual("StringExpression");
        expect((model.elements[1] as StringExpression).type).toEqual("WSTRING");
        expect((model.elements[1] as StringExpression).value).toEqual("'My WString with prefix'");
    });

    test('Parse empty string literal with prefix', async () => {
        document = await parse(`
            FUNCTION_BLOCK "DB_MyDbFromFb"
            BEGIN

            STRING#'';
            WSTRING#'';

            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("StringExpression");
        expect((model.elements[0] as StringExpression).type).toEqual("STRING");
        expect((model.elements[0] as StringExpression).value).toEqual("''");
        expect(model.elements[1].$type).toEqual("StringExpression");
        expect((model.elements[1] as StringExpression).type).toEqual("WSTRING");
        expect((model.elements[1] as StringExpression).value).toEqual("''");
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
