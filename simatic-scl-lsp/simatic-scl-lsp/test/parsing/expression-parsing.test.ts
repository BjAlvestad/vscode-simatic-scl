import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { BinaryExpression, DbBlock, MemberCall, Model, NumberExpression, Region, TimeExpression, isBinaryExpression, isModel } from "../../src/language/generated/ast.js";
import { GetAllVarDecsFromModel } from "../../src/language/utils.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Expression parsing tests', () => {

    test('Parse expression with unary variable', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myVar1 < - #myVar2;
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse expression with unary number', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myVar1 < - 123;
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
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
