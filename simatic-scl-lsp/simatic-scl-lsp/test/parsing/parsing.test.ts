import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { Model, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing tests', () => {

    test('parse simple model', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

            VAR_INPUT 
                myCaseSelectorInputVar : DINT;
            END_VAR

            VAR 
                internal1 : DINT;
                internal2 : DINT;
            END_VAR

            VAR_TEMP 
                myVar1 : DINT;   // Comment for my variable 1
                myVar2 : DINT;   // Comment for my variable 2
            END_VAR

            BEGIN
                #myVar1 := 11;
                #myVar2 := 22;
                #internal2 := 22;
            END_FUNCTION
        `);

        // check for absensce of parser errors the classic way:
        //  deacivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                Declarations:
                  ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n  ')}
                Var usages in assignments:
                  ${document.parseResult.value?.assignment?.map(g => g.var.$refText)?.join('\n  ')}
            `
        ).toBe(s`
            Declarations:
              myCaseSelectorInputVar
                internal1
                internal2
                myVar1
                myVar2
            Var usages in assignments:
              myVar1
                myVar2
                internal2
        `);
        //TODO: Find out why the variables below original get en extra intendation in expected. Should probably have been alligned.
    });

    test('parse struct in FB', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

            VAR 
                myInt : DINT;
                myStruct : STRUCT
                    myIntenal1 : DINT;
                    myIntenal2 : BOOL;
                END_STRUCT;
            END_VAR

            BEGIN
                #myVar1 := 11;
                #myVar2 := 22;
                #internal2 := 22;
            END_FUNCTION
        `);

        // check for absensce of parser errors the classic way:
        //  deacivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                Top level declarations:
                  ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n  ')}
                Inside myStruct:
                  ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n  ')}
                Var usages in assignments:
                  ${document.parseResult.value?.assignment?.map(g => g.var.$refText)?.join('\n  ')}
            `
        ).toBe(s`
            Top level declarations::
              myInt
                myStruct
            Inside myStruct:
                myIntenal1
                  myIntenal2
            Var usages in assignments:
              myVar1
                myVar2
                internal2
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
