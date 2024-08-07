import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { BinaryExpression, MemberCall, Model, NumberExpression, Region, TimeExpression, isBinaryExpression, isModel } from "../../src/language/generated/ast.js";
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
        expect(model.type).toEqual("DATA_BLOCK");
        expect(model.dbFromUdt?.$refText).toEqual('"FB_MySclFunctionBlock"');
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
        expect(model.type).toEqual("DATA_BLOCK");
        expect(model.dbFromUdt?.$refText).toEqual('"U_MyUdt"');
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
        expect(model.type).toEqual("DATA_BLOCK");
        expect(model.dbFromUdt?.$refText).toEqual('"U_MyUdt"');
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
        expect(model.type).toEqual("DATA_BLOCK");
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
        expect(model.type).toEqual("DATA_BLOCK");
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
        expect(model.type).toEqual("DATA_BLOCK");
        expect(model.dbFromUdt?.$refText).toEqual('"U_MyInputUdt"');
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
        expect(model.type).toEqual("DATA_BLOCK");
        expect(model.dbFromBuiltInFunction).toEqual("IEC_TIMER");
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
