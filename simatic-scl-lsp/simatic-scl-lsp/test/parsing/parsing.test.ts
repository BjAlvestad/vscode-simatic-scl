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

describe('Parsing tests', () => {

    test('parse numbers', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"

            BEGIN
                11;
                22;
                16#22adf;
                3.3;
                3.3e+7;
                3.3e-8;
                3.3e8;
                33e8;
                33e+8;
                33e-8;
                40_123E10;
                3.0E+10;
            END_FUNCTION
        `);

        expect(
            checkDocumentValid(document) || s`
                Numbers:
                  ${document.parseResult.value?.elements?.map(p => (p as NumberExpression).value)?.join('\n')}
            `
        ).toBe(s`
            Numbers:
              11
              22
              16#22adf
              3.3
              3.3e+7
              3.3e-8
              3.3e8
              33e8
              33e+8
              33e-8
              40_123E10
              3.0E+10
        `);
    });

    test('parse time literals', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"

            BEGIN
                T#123ms;
            END_FUNCTION
        `);

        expect(
            checkDocumentValid(document) || s`
                Numbers:
                  ${document.parseResult.value?.elements?.map(p => (p as TimeExpression).value)?.join('\n')}
            `
        ).toBe(s`
            Numbers:
              T#123ms
        `);
    });
  
    test('parse array literals', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VAR
                myArrayOfWord :  Array[0..0] of DWord := [2#0000_0000_0000_0000_0001_0100_0011_1111];
                myArrayOfBools :  Array[1..2] of BOOL := [TRUE, False];
                myArrayOfBools2 :  Array[1..3] of INT := [2(True)];
                myArrayOfBools3 :  Array[1..30] of INT := [2(True), 13(TRUE)];
            END_VAR

            BEGIN

            END_FUNCTION
        `);

        const vars = document.parseResult.value.decBlocks[0].varDecs;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(vars[0].value?.$type).toEqual("ArrayInitialization")
        expect(vars[1].value?.$type).toEqual("ArrayInitialization")
        expect(vars[2].value?.$type).toEqual("ArrayInitialization")
        expect(vars[3].value?.$type).toEqual("ArrayInitialization")
    });
  
    test('parse UDT literal', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VAR
                myUdt : "MyUDT" := (32, 13, 43);
                myUdtWithFieldSkip : "MyUDT" := (32, (), TRUE, (), 43);
            END_VAR

            BEGIN

            END_FUNCTION
        `);

        const vars = document.parseResult.value.decBlocks[0].varDecs;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(vars[0].value?.$type).toEqual("UdtInitialization")
        expect(vars[1].value?.$type).toEqual("UdtInitialization")
    });
  
    test('parse array of UDT literals', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            VAR
                myArrayOfUdt : ARRAY [1..3] OF "MyUDT" := ([()], [()], [16#0051]);
            END_VAR

            BEGIN

            END_FUNCTION
        `);

        const vars = document.parseResult.value.decBlocks[0].varDecs;
        expect(checkDocumentValid(document)).toBeFalsy();
        expect(vars[0].value?.$type).toEqual("UdtInitialization")
    });

  test('Parse addition', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"

            BEGIN
                11-43;
                32 - 443.32e3;
                32+54;
            END_FUNCTION
        `);

        // console.log(document.parseResult.value)
        const expression1 = document.parseResult.value?.elements[0] as BinaryExpression;
        const expression2 = document.parseResult.value?.elements[1] as BinaryExpression;
        const expression3 = document.parseResult.value?.elements[2] as BinaryExpression;
        expect(
            checkDocumentValid(document) || s`
                Numbers:
                  ${(expression1.left as NumberExpression).value} ${expression1.operator} ${(expression1.right as NumberExpression).value}
                  ${(expression2.left as NumberExpression).value} ${expression2.operator} ${(expression2.right as NumberExpression).value}
                  ${(expression3.left as NumberExpression).value} ${expression3.operator} ${(expression3.right as NumberExpression).value}
            `
        ).toBe(s`
            Numbers:
              11 - 43
              32 - 443.32e3
              32 + 54
        `);
    });
  
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

        const memberCallsFromBinaryExpressions = getLeftRefsFromBinaryExpression(document);
        const varDecs = GetAllVarDecsFromModel(document.parseResult.value);
        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                Declarations:
                  ${varDecs.map(p => p.name)?.join('\n')}
                Var usages in assignments:
                  ${memberCallsFromBinaryExpressions.map(g => g.element?.$refText)?.join('\n')}
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
        const memberCallsFromBinaryExpressions = getLeftRefsFromBinaryExpression(document);

        const varDecs = GetAllVarDecsFromModel(model);
        expect(varDecs).toHaveLength(2)
        // // expect((model.vars[0].structure as TypeReference).).toEqual("dsa")
        expect(varDecs[1].type.struct?.$type).toEqual("Struct")
        expect(varDecs[1].type.struct?.varDecs.length).equal(3)

        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                ** Top level vars: **
                  ${varDecs.map(p => p.name)?.join('\n')}
                ** Inside myStruct: **
                  ${varDecs[1].type.struct?.varDecs.map(p => p.name)?.join('\n')}
                ** Var usages in assignments: **
                  ${memberCallsFromBinaryExpressions.map(g => g.element?.$refText)?.join('\n')}
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
              myInternal1
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
                #myStruct.myInnerStruct.myInnerInternal1 := 22;
            END_FUNCTION
        `);

        // check for absensce of parser errors the classic way:
        //  deacivated, find a much more human readable way below!
        // expect(document.parseResult.parserErrors).toHaveLength(0);
        
        const model = document.parseResult.value;
        const varDecs = GetAllVarDecsFromModel(model);
        // console.log(varDecs)
        //console.log(varDecs.map(dec => dec.children ? `Children in ${dec.name}:\n ${dec.children.map(child => child.name)}` : `No children in ${dec.name}...`))
        // console.log(varDecs[0].dataType)
        // console.log(varDecs[1].dataType)


        expect(varDecs).toHaveLength(2)
        // expect((varDecs[0].structure as TypeReference).).toEqual("dsa")
        expect(varDecs[0].type.primitive).toEqual("DINT")
        expect(varDecs[1].type.struct?.$type).toEqual("Struct")
        expect(varDecs[1].type.struct?.varDecs.length).equal(4)

        const memberCallsFromBinaryExpressions = getLeftRefsFromBinaryExpression(document);
        expect(
            // here we use a (tagged) template expression to create a human readable representation
            //  of the AST part we are interested in and that is to be compared to our expectation;
            // prior to the tagged template expression we check for validity of the parsed document object
            //  by means of the reusable function 'checkDocumentValid()' to sort out (critical) typos first;
            checkDocumentValid(document) || s`
                ** Top level vars: **
                  ${varDecs.map(p => p.name)?.join('\n')}
                ** Inside myStruct: **
                  ${varDecs[1].type.struct?.varDecs.map(p => p.name)?.join('\n')}
                ** Var usages in assignments: **
                  ${memberCallsFromBinaryExpressions.map(g => g.element?.$refText)?.join('\n')}
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
              myInternal1
              myInnerInternal1
        `);
    });
  
    test("parse region", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_Region"
            VAR 
                otherVar1 : DINT;
            END_VAR
            BEGIN
                11;
                REGION The problematic description of a region since they are not strings
                    22;
                END_REGION
                33;
            END_FUNCTION_BLOCK
        `);

      const elements = document.parseResult.value?.elements;
      expect(
        checkDocumentValid(document) ||
          s`
            ${(elements[0] as NumberExpression).value}
            Region text: ${(elements[1] as Region).value}
            ${(elements[2] as NumberExpression).value}
            ${(elements[4] as NumberExpression).value}
          `
      ).toBe(s`
        11
        Region text: REGION The problematic description of a region since they are not strings
        22
        33
      `);
    });

    test("parse stringless title", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_Region"
            TITLE = Some problematic title not placed in string
            VAR 
                otherVar1 : DINT;
            END_VAR
            BEGIN
                11;
            END_FUNCTION_BLOCK
        `);

      expect(
        checkDocumentValid(document) ||
          s`
          Title:
            ${document.parseResult.value?.title?.value}
          `
      ).toBe(s`
        Title:
          TITLE = Some problematic title not placed in string
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

function getLeftRefsFromBinaryExpression(document: LangiumDocument<Model>) {
  // Extract only BinaryExpression elements from AST
  const filtered = document.parseResult.value.elements.filter(g => isBinaryExpression(g))
  // Then get only left hand side (where we have the variable getting linked in our tests)
  const filteredAndMapped = filtered.map(g => (g.left as MemberCall))
  return filteredAndMapped;
}
