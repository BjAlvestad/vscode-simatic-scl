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

describe('Print to log for debug tests', () => {

    test('parse simple model', async () => {
        document = await parse(`
            FUNCTION_BLOCK "FB_MyFunctionBlock"
            { S7_Optimized_Access := 'TRUE' }
            AUTHOR : Someone
            FAMILY : SomeFamily
            VERSION : 0.1

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

        const model = document.parseResult.value;
        // console.log("***************")
        // console.log("****  ALL  ****")
        // console.log("***************")
        // console.log(model)
      
        console.log("****************")
        console.log("****  VARS  ****")
        console.log("****************")
        console.log(model.vars)
        
        console.log("***********************")
        console.log("****  EXPRESSIONS  ****")
        console.log("***********************")
        console.log(model.elements)
        //console.log(model.vars.map(dec => dec.children ? `Children in ${dec.name}:\n ${dec.children.map(child => child.name)}` : `No children in ${dec.name}...`))
        // console.log(model.vars[0].dataType)
        // console.log(model.vars[1].dataType)
      
        // expect(
        //     checkDocumentValid(document) || s`
        //         Declarations:
        //           ${document.parseResult.value?.vars?.map(p => p.name)?.join('\n  ')}
        //         Var usages in assignments:
        //           ${document.parseResult.value?.expressions?.map(g => g.var.$refText)?.join('\n  ')}
        //     `
        // ).toBe(s`
        //     Declarations:
        //       myCaseSelectorInputVar
        //         internal1
        //         internal2
        //         myVar1
        //         myVar2
        //     Var usages in assignments:
        //       myVar1
        //         myVar2
        //         internal2
        // `);
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
