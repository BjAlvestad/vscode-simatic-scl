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
                    myInternal1 : DINT;
                    myInternal2 : BOOL;
                    myInternal3 : DINT;
                END_STRUCT;
            END_VAR

            BEGIN
                #myInt := 11;
                #myStruct.myInternal1 := 22;
            END_FUNCTION
        `);

        // check for absence of parser errors the classic way:
        //  deactivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);
        
        const model = document.parseResult.value;
        expect(model.vars).toHaveLength(2)
        // expect((model.vars[0].structure as TypeReference).).toEqual("dsa")
        expect(model.vars[1].dataType).toEqual("STRUCT")
        expect(model.vars[1].children.length).equal(3)

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                ** Top level vars: **
                  ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n')}
                ** Inside myStruct: **
                  ${document.parseResult.value?.vars[1].children.map(p => p.name)?.join('\n')}
                ** Var usages in assignments: **
                  ${document.parseResult.value?.assignment?.map(g => g.var.$refText)?.join('\n')}
            `
        ).toBe(s`
            ** Top level vars: **
              myInt
              myStruct
            ** Inside myStruct: **
              myInternal1
              myInternal2
              myInternal3
            ** Var usages in assignments: **
              myInt
              myStruct.myInternal1
        `);
    });

    test('parse nested struct in FB', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

            VAR 
                myInt : DINT;
                myStruct : STRUCT
                    myInternal1 : DINT;
                    myInternal2 : BOOL;
                    myInnerStruct : STRUCT
                        myInnerInternal1 : DINT;
                        myInnerInternal2 : BOOL;
                        myInnerInternal3 : DINT;
                    END_STRUCT;
                    myInternal3 : DINT;
                END_STRUCT;
            END_VAR

            BEGIN
                #myInt := 11;
                #myStruct.myInternal1 := 22;
            END_FUNCTION
        `);

        // check for absensce of parser errors the classic way:
        //  deacivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);
        
        const model = document.parseResult.value;
        // console.log(model.vars)
        //console.log(model.vars.map(dec => dec.children ? `Children in ${dec.name}:\n ${dec.children.map(child => child.name)}` : `No children in ${dec.name}...`))
        // console.log(model.vars[0].dataType)
        // console.log(model.vars[1].dataType)


        expect(model.vars).toHaveLength(2)
        // expect((model.vars[0].structure as TypeReference).).toEqual("dsa")
        expect(model.vars[0].dataType).toEqual("DINT")
        expect(model.vars[1].dataType).toEqual("STRUCT")
        expect(model.vars[1].children.length).equal(4)

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                ** Top level vars: **
                  ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n')}
                ** Inside myStruct: **
                  ${document.parseResult.value?.vars[1].children.map(p => p.name)?.join('\n')}
                ** Var usages in assignments: **
                  ${document.parseResult.value?.assignment?.map(g => g.var.$refText)?.join('\n')}
            `
        ).toBe(s`
            ** Top level vars: **
              myInt
              myStruct
            ** Inside myStruct: **
              myInternal1
              myInternal2
              myInnerStruct
              myInternal3
            ** Var usages in assignments: **
              myInt
              myStruct.myInternal1
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
