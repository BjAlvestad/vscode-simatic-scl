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

    test('Parse built-in feature call with multiple parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            MAX(IN1 := #myVar1, IN2 := #myVar2);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse built-in feature call with double-quote formal parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myFb("PORT" := 32);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse built-in feature call with double-quote formal parameters mixed with normal ID', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myFb(xIn1 := 12, "PORT" := 32);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse nested built-in feature calls with multiple parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            MAX(IN1 := LOWER_BOUND(ARR := #myArray1, DIM := 1), IN2 := LOWER_BOUND(ARR := #myArray2, DIM := 1));
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse feature call with multiple parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            "myFbInstance1"(yStatus => #status,
                            xUnit1 := #conveyor1,
                            xUnit2 := #hpu);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse feature call with multiple parameters and expression', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myOnDelay1(IN := (#mySetPoint > 0.0) AND #isRunning,
                        PT := #filterTime);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse built-in feature call with only argument, no formal parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            SQRT_REAL(3);
            SQRT_REAL(#myNumber);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse built-in feature call with only argument expression, no formal parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            SQRT_REAL(#myNumber + 3);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse nested built-in feature call with only argument, no formal parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            SQRT_REAL(#myNumber + SQRT_REAL(#myNumber + 3));
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse array with function call', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myArray[1](myFunctionInput := 123);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse struct with array with function call', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myStruct.myArray[1](myFunctionInput := 123);
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse member access in struct, using redundant `#`', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            #myStruct.#myVarInsideStruct;
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
