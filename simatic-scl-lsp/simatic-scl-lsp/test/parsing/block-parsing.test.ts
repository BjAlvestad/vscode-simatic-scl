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

describe('Block parsing tests', () => {

    test('Parse DB created from FB', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyDbFromFb"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : TheAuthorOfFB
            FAMILY : TheFamilyOfFB
            VERSION : 0.1
            NON_RETAIN
            "FB_MySclFunctionBlock"

            BEGIN

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
        expect((model as DbBlock).dbFromUdt?.$refText).toEqual('"FB_MySclFunctionBlock"');
    });

    test('Parse DB created from UDT', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyDbFrom_U_MyUdt"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            NON_RETAIN
            "U_MyUdt"
            
            BEGIN
            
            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
        expect((model as DbBlock).dbFromUdt?.$refText).toEqual('"U_MyUdt"');
    });

    test('Parse DB created from UDT, with initialization, aka. start values', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyDbFrom_U_MyUdt"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            NON_RETAIN
            "U_MyUdt"
            
            BEGIN
               boStatus01 := true;
               boClosed := True;
               boStatus03 := true;
               boStatus05 := True;

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
        expect((model as DbBlock).dbFromUdt?.$refText).toEqual('"U_MyUdt"');
    });

    test('Parse Global DB with no variables declared', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyGlobalDbEmpty"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            NON_RETAIN

            BEGIN

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
    });

    test('Parse Global DB with two variables declared', async () => {
        document = await parse(`
            DATA_BLOCK "DB_MyGlobalDb"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            NON_RETAIN
            VAR 
                myVar1 : Bool;
                myVar2 : Bool;
            END_VAR


            BEGIN

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
    });

    test('Parse Array DB with two values initialized', async () => {
        document = await parse(`
            DATA_BLOCK "MyArrayDB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            NON_RETAIN
            Array[0..5] of "U_MyInputUdt";
            BEGIN
                THIS[1].uInput := true;
                THIS[3].uInput := True;
            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
        expect((model as DbBlock).dbFromUdt?.$refText).toEqual('"U_MyInputUdt"');
    });

    test('Parse DB of built in type', async () => {
        document = await parse(`
            DATA_BLOCK "Close_Timer"
            {InstructionName := 'IEC_TIMER';
            LibVersion := '1.0';
            S7_Optimized_Access := 'TRUE' }
            AUTHOR : Simatic
            FAMILY : IEC
            NAME : IEC_TMR
            VERSION : 1.0
            NON_RETAIN
            IEC_TIMER

            BEGIN

            END_DATA_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("DATA_BLOCK");
        expect((model as DbBlock).dbFromBuiltInFunction).toEqual("IEC_TIMER");
    });

    test('Parse FB', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFB"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("FUNCTION_BLOCK");
    });

    test('Parse FB retain', async () => {
        document = await parse(`
            FUNCTION_BLOCK "myFBRetain"
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            VAR_INPUT RETAIN
                retain_3 : Bool;
            END_VAR
            VAR_INPUT DB_SPECIFIC
                setInIDB_3 : Bool;
            END_VAR
            VAR_INPUT 
                normalNonRetain_3 : Bool;
            END_VAR

            VAR_OUTPUT RETAIN
                retain_2 : Bool;
            END_VAR
            VAR_OUTPUT DB_SPECIFIC
                setInIDB_2 : Bool;
            END_VAR
            VAR_OUTPUT 
                normalNonRetain_2 : Bool;
            END_VAR

            VAR_IN_OUT RETAIN
                retain_1 : Bool;
            END_VAR
            VAR_IN_OUT DB_SPECIFIC
                setInIDB_1 : Bool;
            END_VAR
            VAR_IN_OUT 
                normalNonRetain_1 : Bool;
            END_VAR

            VAR RETAIN
                "retain" : Bool;
            END_VAR
            VAR DB_SPECIFIC
                setInIDB : Bool;
            END_VAR
            VAR 
                normalNonRetain : Bool;
            END_VAR

            VAR_TEMP 
                tempHasNoRetainSetting : Bool;
            END_VAR

            VAR CONSTANT 
                constHasNoRetainSetting : Bool;
            END_VAR


            BEGIN
            END_FUNCTION_BLOCK
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("FUNCTION_BLOCK");
    });

    test('Parse FC', async () => {
        document = await parse(`
            FUNCTION "myFC" : Void
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1

            BEGIN
            END_FUNCTION
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("FUNCTION");
    });

    test('Parse FC with variables', async () => {
        document = await parse(`
            FUNCTION "myFC" : Void
            { S7_Optimized_Access := 'TRUE' }
            VERSION : 0.1
            VAR_INPUT 
                myIn : Bool;
            END_VAR

            VAR_OUTPUT 
                myOut : Bool;
            END_VAR

            VAR_IN_OUT 
                myInOut : Bool;
            END_VAR

            VAR_TEMP 
                myTemp : Bool;
            END_VAR

            VAR CONSTANT 
                myConst : Bool;
            END_VAR


            BEGIN
            END_FUNCTION
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("FUNCTION");
    });

    test('Parse UDT', async () => {
        document = await parse(`
            TYPE "myEmptyUdt"
            VERSION : 0.1
            STRUCT
            END_STRUCT;

            END_TYPE
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("TYPE");
    });

    test('Parse UDT with variable that has default value', async () => {
        document = await parse(`
            TYPE "myUdtWithVariable"
            VERSION : 0.1
            STRUCT
                myNumber : DInt;
            END_STRUCT;

            END_TYPE
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("TYPE");
    });

    test('Parse UDT with initialization', async () => {
        document = await parse(`
            TYPE "myUdtWithInitialization"
            VERSION : 0.1
            STRUCT
                myInitializedNumber : DInt := 17;
            END_STRUCT;

            END_TYPE
        `);

        const model = document.parseResult.value;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(model.blockType).toEqual("TYPE");
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
