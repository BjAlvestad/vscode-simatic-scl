import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { DbProgramElement, Model, NumberExpression, SclProgramElement, StringExpression, UnaryExpression, isModel } from "../../src/language/generated/ast.js";

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

    test('Parse number literal in DB', async () => {
        document = await parse(`
            DATA_BLOCK "myBlock"
            BEGIN

            a := 123;
            b := 123.23;
            c := -55;
            d := -55.23;

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("DbProgramElement");
        expect((model.elements[0] as DbProgramElement).value).toEqual("123");
        expect((model.elements[1] as DbProgramElement).value).toEqual("123.23");
        expect((model.elements[2] as DbProgramElement).value).toEqual("-55");
        expect((model.elements[3] as DbProgramElement).value).toEqual("-55.23");
    });

    test('Parse number literal in FB', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myBlock"
            BEGIN

            123;
            123.23;
            -55;
            -55.23;

            END_FUNCTION_BLOCK
        `);
        const model = document.parseResult.value;
        const elements = model.elements as SclProgramElement[];
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.elements[0].$type).toEqual("NumberExpression");
        expect((elements[0] as NumberExpression).value).toEqual("123");
        expect((elements[1] as NumberExpression).value).toEqual("123.23");
        expect(((elements[2] as UnaryExpression).value as NumberExpression).value).toEqual("55");
        expect(((elements[3] as UnaryExpression).value as NumberExpression).value).toEqual("55.23");
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
