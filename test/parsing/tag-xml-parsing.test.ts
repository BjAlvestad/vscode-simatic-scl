import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { XmlModel, isXmlModel } from "../../src/language/generated/ast.js";
import { TagXmlTestData } from "../test-data/tag-xml-test-data.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<XmlModel>>;
let document: LangiumDocument<XmlModel> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<XmlModel>(services.TagXml);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing XML Tag list tests', () => {

    test('Parse single tag with empty comments', async () => {
        document = await parse(TagXmlTestData.singleTagExample);

        expect(checkDocumentValid(document)).toBeFalsy();
    });
  
    test("Parse tag with special characters in name", async () => {
      document = await parse(TagXmlTestData.tagWithSpecialCharactersInName);

      expect(checkDocumentValid(document)).toBeFalsy();

      expect(
        checkDocumentValid(document) ||
          s`
                Tag names:
                  ${document.parseResult.value?.plcTagTable.objectList.plcTags[0].name}
            `
      ).toBe(s`
          Tag names:
            MyWeird%Tag
        `);
    });
  
    test("Parse constant", async () => {
      document = await parse(TagXmlTestData.singleConstant);

      expect(
        checkDocumentValid(document) ||
          s`
                Tag names:
                  ${document.parseResult.value?.plcTagTable.objectList.plcTags[0].name}
            `
      ).toBe(s`
          Tag names:
            MyConst
        `);
    });

  test("Parse integer tag reading word", async () => {
      document = await parse(TagXmlTestData.singleTagReadingWord);
      expect(checkDocumentValid(document)).toBeFalsy();
    });

  test("Parse tag with comment", async () => {
      document = await parse(TagXmlTestData.tagWithComment);
      expect(checkDocumentValid(document)).toBeFalsy();
    });

    test("Parse tag starting with '=' keyword", async () => {
      document = await parse(TagXmlTestData.tagWithCommentStartingWithEqualKeyword);
      expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse multiple tags with empty comments', async () => {
        document = await parse(TagXmlTestData.tagExampleEmptyComments);

        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse multiple tags with comments', async () => {
        document = await parse(TagXmlTestData.tagExampleWithComments);

        expect(checkDocumentValid(document)).toBeFalsy();
    });
});

function checkDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isXmlModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${XmlModel}'.`
        || undefined;
}

