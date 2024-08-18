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
