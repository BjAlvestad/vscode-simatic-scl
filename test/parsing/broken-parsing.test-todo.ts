import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { MemberCall, Model, Region, isBinaryExpression, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing tests for broken functionality not being worked on yet', () => {
  
    // When a region text starts with "Forward" or "Mode" it does not get lexed properly for some reason
    // But it works in the playground https://langium.org/playground?grammar=OYJwhgthYgBAEgUwDbIPYHU0mQEwFD6IB2ALiAJ6wCyauKAXPrC7ABQAOiIAzmsTwDUAXgAK3PsVgAfWKESJSAS2LAhwgOIgFy1TNjbgS-sIBKiI-wCUAKgDchcb35NWsAORdnxd7GKREYQBJABEHfC0dFWBXVnckVDRfL0lhAG0nSQZQgF0PAEJ3cNJuCBUwZFhTAFENIIB5ADkAfQAVaoANVoZYAHo2AH4AHmE2Grqm2CsrNIA9AB0QAfniHJtehwALJVx6KRKQMv9KjABlHt75oQ38A6OK2FCLtOawAFoALwBBN4AtHLS8wA7s01jd8NtdiRYHdypVqAAZZoAYXq1Go1Ua3T680uNkBPHmpzWyxsuJukL2MNKcNgpyRqPRmOxl1ZcxWizB4XMlmIsRYbHc4wajV8ADcKgBXQLCpptTqtKzMViyQzGYjVYi4AbCdyYkLNWWi-B2IA&content=A4UwTgzg9gdgBAKSgCxgKFJWiCGMRpoASIANqVIijAITFkW751oBKAogOICSA8gHJwAYlDAB3HGAAmcAEYUAxgGsQMgLYgIEHAHNNcBVDVq8Uwu34ARAPoceAtEA
    // Just adding another letter in front of the problematic words will cause it to parse properly
    // Issue seem to be when it is starting with "Mod" or "For", which are keywords we have.
    // Temporaraly solved by capturing `REGION` as part of terminal instead of using as a keyword.
    test("parse problematic regions", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_Region"
            VAR 
                otherVar1 : DINT;
            END_VAR
            BEGIN
                REGION Forward blocked messages command (problem due to Forward in beginning)
                
                END_REGION

                REGION Mode handling functions (Problem due to Mode in beginning)

                END_REGION
            END_FUNCTION_BLOCK
        `);

        const elements = document.parseResult.value?.elements;
        console.log(elements)
      expect(
        checkDocumentValid(document) ||
          s`
            Region text: ${(elements[0] as Region).value}
            Region text: ${(elements[2] as Region).value}
          `
      ).toBe(s`
        Region text: Forward blocked messages command (problem due to Forward in beginning)
        Region text: Mode handling functions (Problem due to Mode in beginning)
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
