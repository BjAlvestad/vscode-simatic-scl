import { afterEach, beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { clearDocuments, parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { BinaryExpression, MemberCall, Model, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

afterEach(async () => {
    document && clearDocuments(services.shared, [ document ]);
});

describe('Linking library functions tests', () => {

    test('linking function call without parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            BEGIN
                UDINT_TO_TIME(100); 
                REAL_TO_UDINT(1000.0); 
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
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
                UDINT_TO_TIME
                REAL_TO_UDINT
            ref.name:
                UDINT_TO_TIME
                REAL_TO_UDINT
        `);
    });

    test('linking function call without optional single parameters', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            BEGIN
                UDINT_TO_TIME(IN := 100); 
                REAL_TO_UDINT(IN := 1000.0); 
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const formalParameter1 = (element1.arguments[0] as BinaryExpression).left as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                    ${element1.element?.$refText}
                    ${formalParameter1.element.$refText}
                ref.name:
                    ${element0.element?.ref?.name}
                    ${element1.element?.ref?.name}
                    ${formalParameter1.element.ref?.name ?? "Could not resolve formal parameter"}
            `
        ).toBe(s`
            refText:
                UDINT_TO_TIME
                REAL_TO_UDINT
                IN
            ref.name:
                UDINT_TO_TIME
                REAL_TO_UDINT
                IN
        `);
    });

    test('linking nested function call without parameters - nested function is first element', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            BEGIN
                UDINT_TO_TIME(REAL_TO_UDINT(1000.0)); 
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const outerElement = sclBlock.elements[0] as MemberCall;
        const nestedElement = outerElement.arguments[0] as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${outerElement.element?.$refText}
                    ${nestedElement.element?.$refText}
                ref.name:
                    ${outerElement.element?.ref?.name}
                    ${nestedElement.element?.ref?.name}
            `
        ).toBe(s`
            refText:
                UDINT_TO_TIME
                REAL_TO_UDINT
            ref.name:
                UDINT_TO_TIME
                REAL_TO_UDINT
        `);
    });

    test('linking nested function call without parameters - nested function is second element', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            BEGIN
                UDINT_TO_TIME(13 + REAL_TO_UDINT(1000.0)); 
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const outerElement = sclBlock.elements[0] as MemberCall;
        const binaryExpression = outerElement.arguments[0] as BinaryExpression;
        const nestedElement = binaryExpression.right as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${outerElement.element?.$refText}
                    ${nestedElement.element?.$refText}
                ref.name:
                    ${outerElement.element?.ref?.name}
                    ${nestedElement.element?.ref?.name}
            `
        ).toBe(s`
            refText:
                UDINT_TO_TIME
                REAL_TO_UDINT
            ref.name:
                UDINT_TO_TIME
                REAL_TO_UDINT
        `);
    });

    test('linking GATHER and SCATTER function call with in and out parameter', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR
                myArray: ARRAY[*] of BOOL;
                myWord : Word;
            END_VAR

            BEGIN
                GATHER(IN := #myArray,
                       OUT => #myWord);
                SCATTER(IN := #myWord,
                        OUT => #myArray);
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const e0formalParameter0 = (element0.arguments[0] as BinaryExpression).left as MemberCall;
        const e0formalParameter1 = (element0.arguments[1] as BinaryExpression).left as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const e1formalParameter0 = (element1.arguments[0] as BinaryExpression).left as MemberCall;
        const e1formalParameter1 = (element1.arguments[1] as BinaryExpression).left as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                    ${e0formalParameter0.element.$refText}
                    ${e0formalParameter1.element.$refText}
                    ${element1.element?.$refText}
                    ${e1formalParameter0.element.$refText}
                    ${e1formalParameter1.element.$refText}
                ref.name:
                    ${element0.element?.ref?.name}
                    ${e0formalParameter0.element.ref?.name ?? "Could not resolve formal parameter"}
                    ${e0formalParameter1.element.ref?.name ?? "Could not resolve formal parameter"}
                    ${element1.element?.ref?.name}
                    ${e1formalParameter0.element.ref?.name ?? "Could not resolve formal parameter"}
                    ${e1formalParameter1.element.ref?.name ?? "Could not resolve formal parameter"}
            `
        ).toBe(s`
            refText:
                GATHER
                IN
                OUT
                SCATTER
                IN
                OUT
            ref.name:
                GATHER
                IN
                OUT
                SCATTER
                IN
                OUT
        `);
    });
    
    test('linking RD_SYS_T with out parameter', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR
                cpuDateTime: DT;
                errorCode : INT;
            END_VAR

            BEGIN
               RD_SYS_T(OUT => #cpuDateTime);  // #errorCode := RD_SYS_T(OUT => #cpuDateTime);
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const e0formalParameter0 = (element0.arguments[0] as BinaryExpression).left as MemberCall;
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                    ${e0formalParameter0.element.$refText}
                ref.name:
                    ${element0.element?.ref?.name}
                    ${e0formalParameter0.element.ref?.name ?? "Could not resolve formal parameter"}
            `
        ).toBe(s`
            refText:
                RD_SYS_T
                OUT
            ref.name:
                RD_SYS_T
                OUT
        `);
    });

    test('linking misc builtin math functions', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR

            END_VAR

            BEGIN
                MIN();
                MAX();
                MIN_REAL();
                MAX_REAL();
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const element2 = sclBlock.elements[2] as MemberCall;
        const element3 = sclBlock.elements[3] as MemberCall;
    
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}();
                    ${element1.element?.$refText}();
                    ${element2.element?.$refText}();
                    ${element3.element?.$refText}();
                ref.name:
                    ${element0.element?.ref?.name}();
                    ${element1.element?.ref?.name}();
                    ${element2.element?.ref?.name}();
                    ${element3.element?.ref?.name}();
            `
        ).toBe(s`
            refText:
                MIN();
                MAX();
                MIN_REAL();
                MAX_REAL();
            ref.name:
                MIN();
                MAX();
                MIN_REAL();
                MAX_REAL();
        `);
    });

    test('linking misc built in functions', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR
                myIecTimer: DINT;  // dummy type IecTimer
                errorCode : INT;
                hasError : BOOL;
                statusWord : WORD;
            END_VAR

            BEGIN
                RESET_TIMER(#myIecTimer);
                RESET_TIMER(TIMER := #myIecTimer);
                Ack_Alarms(MODE := 1,
                           ERROR => #hasError,
                           STATUS => #statusWord);
                LEN('abc');
                CONCAT();
                FIND();
                REPLACE();

                ATH();
                MOVE_BLK_VARIANT();
                VariantGet();
                VariantPut();
                LOWER_BOUND();
                UPPER_BOUND();
                TypeOf();
                TypeOfElements();
                CountOfElements();
                Deserialize();
                Serialize();
                FILL_BLK();
                GATHER_BLK();
                SCATTER_BLK();
                IS_NULL();
                NOT_NULL();
                IS_ARRAY();
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const e1formalParameter0 = (element1.arguments[0] as BinaryExpression).left as MemberCall;
        const element2 = sclBlock.elements[2] as MemberCall;
        const e2formalParameter0 = ((element2.arguments[0] as BinaryExpression).left as MemberCall).element;
        const e2formalParameter1 = ((element2.arguments[1] as BinaryExpression).left as MemberCall).element;
        const e2formalParameter2 = ((element2.arguments[2] as BinaryExpression).left as MemberCall).element;
        const element3 = sclBlock.elements[3] as MemberCall;
        const element4 = sclBlock.elements[4] as MemberCall;
        const element5 = sclBlock.elements[5] as MemberCall;
        const element6 = sclBlock.elements[6] as MemberCall;
        
        const element7 = sclBlock.elements[7] as MemberCall;  // ATH();
        const element8 = sclBlock.elements[8] as MemberCall;
        const element9 = sclBlock.elements[9] as MemberCall;
        const element10 = sclBlock.elements[10] as MemberCall;
        const element11 = sclBlock.elements[11] as MemberCall;
        const element12 = sclBlock.elements[12] as MemberCall;
        const element13 = sclBlock.elements[13] as MemberCall;  // TypeOf();
        const element14 = sclBlock.elements[14] as MemberCall;
        const element15 = sclBlock.elements[15] as MemberCall;  // CountOfElements
        const element16 = sclBlock.elements[16] as MemberCall;
        const element17 = sclBlock.elements[17] as MemberCall;
        const element18 = sclBlock.elements[18] as MemberCall;
        const element19 = sclBlock.elements[19] as MemberCall;
        const element20 = sclBlock.elements[20] as MemberCall;
        const element21 = sclBlock.elements[21] as MemberCall;
        const element22 = sclBlock.elements[22] as MemberCall;
        const element23 = sclBlock.elements[23] as MemberCall;
    
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}
                    ${element1.element?.$refText}(${e1formalParameter0.element.$refText})
                    ${element2.element?.$refText}(${e2formalParameter0.$refText}, ${e2formalParameter1.$refText}, ${e2formalParameter2.$refText})
                    ${element3.element?.$refText}
                    ${element4.element?.$refText}
                    ${element5.element?.$refText}
                    ${element6.element?.$refText}
                    
                    ${element7.element?.$refText}
                    ${element8.element?.$refText}
                    ${element9.element?.$refText}
                    ${element10.element?.$refText}
                    ${element11.element?.$refText}
                    ${element12.element?.$refText}
                    ${element13.element?.$refText}();
                    ${element14.element?.$refText}();
                    ${element15.element?.$refText}();
                    ${element16.element?.$refText}();
                    ${element17.element?.$refText}();
                    ${element18.element?.$refText}();
                    ${element19.element?.$refText}();
                    ${element20.element?.$refText}();
                    ${element21.element?.$refText}();
                    ${element22.element?.$refText}();
                    ${element23.element?.$refText}();

                ref.name:
                    ${element0.element?.ref?.name}
                    ${element1.element?.ref?.name}(${e1formalParameter0.element.ref?.name ?? "Could not resolve formal parameter"})
                    ${element2.element?.ref?.name}(${e2formalParameter0.ref?.name}, ${e2formalParameter1.ref?.name}, ${e2formalParameter2.ref?.name})
                    ${element3.element?.ref?.name}
                    ${element4.element?.ref?.name}
                    ${element5.element?.ref?.name}
                    ${element6.element?.ref?.name}
                    
                    ${element7.element?.ref?.name}
                    ${element8.element?.ref?.name}
                    ${element9.element?.ref?.name}
                    ${element10.element?.ref?.name}
                    ${element11.element?.ref?.name}
                    ${element12.element?.ref?.name}
                    ${element13.element?.ref?.name}();
                    ${element14.element?.ref?.name}();
                    ${element15.element?.ref?.name}();
                    ${element16.element?.ref?.name}();
                    ${element17.element?.ref?.name}();
                    ${element18.element?.ref?.name}();
                    ${element19.element?.ref?.name}();
                    ${element20.element?.ref?.name}();
                    ${element21.element?.ref?.name}();
                    ${element22.element?.ref?.name}();
                    ${element23.element?.ref?.name}();

            `
        ).toBe(s`
            refText:
                RESET_TIMER
                RESET_TIMER(TIMER)
                Ack_Alarms(MODE, ERROR, STATUS)
                LEN
                CONCAT
                FIND
                REPLACE
                
                ATH
                MOVE_BLK_VARIANT
                VariantGet
                VariantPut
                LOWER_BOUND
                UPPER_BOUND
                TypeOf();
                TypeOfElements();
                CountOfElements();
                Deserialize();
                Serialize();
                FILL_BLK();
                GATHER_BLK();
                SCATTER_BLK();
                IS_NULL();
                NOT_NULL();
                IS_ARRAY();

            ref.name:
                RESET_TIMER
                RESET_TIMER(TIMER)
                Ack_Alarms(MODE, ERROR, STATUS)
                LEN
                CONCAT
                FIND
                REPLACE

                ATH
                MOVE_BLK_VARIANT
                VariantGet
                VariantPut
                LOWER_BOUND
                UPPER_BOUND
                TypeOf();
                TypeOfElements();
                CountOfElements();
                Deserialize();
                Serialize();
                FILL_BLK();
                GATHER_BLK();
                SCATTER_BLK();
                IS_NULL();
                NOT_NULL();
                IS_ARRAY();

        `);
    });

    test('linking function blocks for bit logic operations', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR
                myRTrig: R_TRIG;
                myFTrig: F_TRIG;
            END_VAR

            BEGIN
                myRTrig(CLK := True);
                myFTrig(CLK := True);
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const e0formalParameter0 = (element0.arguments[0] as BinaryExpression).left as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const e1formalParameter0 = (element1.arguments[0] as BinaryExpression).left as MemberCall;
    
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}(${e0formalParameter0.element.$refText});
                    ${element1.element?.$refText}(${e1formalParameter0.element.$refText});
                ref.name:
                    ${element0.element?.ref?.name}(${e0formalParameter0.element.ref?.name});
                    ${element1.element?.ref?.name}(${e1formalParameter0.element.ref?.name});
            `
        ).toBe(s`
            refText:
                myRTrig(CLK);
                myFTrig(CLK);
            ref.name:
                myRTrig(CLK);
                myFTrig(CLK);
        `);
    });

    test('linking function blocks for timer operations', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VERSION : 0.1

            VAR
                myTpTimer: TP_TIME;
                myTonTimer: TON_TIME;
                myTofTimer: TOF_TIME;
                myTonrTimer: TONR_TIME;
            END_VAR

            BEGIN
                myTpTimer(IN := True, PT := 12);
                myTonTimer(IN := True, PT := 12);
                myTofTimer(IN := True, PT := 12);
                myTonrTimer(IN := True, PT := 12);
            END_FUNCTION_BLOCK
        `);

        const sclBlock = document.parseResult.value;
        const element0 = sclBlock.elements[0] as MemberCall;
        const e0formalParameter0 = (element0.arguments[0] as BinaryExpression).left as MemberCall;
        const e0formalParameter1 = (element0.arguments[1] as BinaryExpression).left as MemberCall;
        const element1 = sclBlock.elements[1] as MemberCall;
        const e1formalParameter0 = (element1.arguments[0] as BinaryExpression).left as MemberCall;
        const e1formalParameter1 = (element1.arguments[1] as BinaryExpression).left as MemberCall;
        const element2 = sclBlock.elements[2] as MemberCall;
        const e2formalParameter0 = (element2.arguments[0] as BinaryExpression).left as MemberCall;
        const e2formalParameter1 = (element2.arguments[1] as BinaryExpression).left as MemberCall;
        const element3 = sclBlock.elements[3] as MemberCall;
        const e3formalParameter0 = (element3.arguments[0] as BinaryExpression).left as MemberCall;
        const e3formalParameter1 = (element3.arguments[1] as BinaryExpression).left as MemberCall;
    
        expect(
            checkDocumentValid(document) || s`
                refText:
                    ${element0.element?.$refText}(${e0formalParameter0.element.$refText}, ${e0formalParameter1.element.$refText});
                    ${element1.element?.$refText}(${e1formalParameter0.element.$refText}, ${e1formalParameter1.element.$refText});
                    ${element2.element?.$refText}(${e2formalParameter0.element.$refText}, ${e2formalParameter1.element.$refText});
                    ${element3.element?.$refText}(${e3formalParameter0.element.$refText}, ${e3formalParameter1.element.$refText});
                ref.name:
                    ${element0.element?.ref?.name}(${e0formalParameter0.element.ref?.name}, ${e0formalParameter1.element.ref?.name});
                    ${element1.element?.ref?.name}(${e1formalParameter0.element.ref?.name}, ${e1formalParameter1.element.ref?.name});
                    ${element2.element?.ref?.name}(${e2formalParameter0.element.ref?.name}, ${e2formalParameter1.element.ref?.name});
                    ${element3.element?.ref?.name}(${e3formalParameter0.element.ref?.name}, ${e3formalParameter1.element.ref?.name});
            `
        ).toBe(s`
            refText:
                myTpTimer(IN, PT);
                myTonTimer(IN, PT);
                myTofTimer(IN, PT);
                myTonrTimer(IN, PT);
            ref.name:
                myTpTimer(IN, PT);
                myTonTimer(IN, PT);
                myTofTimer(IN, PT);
                myTonrTimer(IN, PT);
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
