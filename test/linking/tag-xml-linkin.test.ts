import { afterEach, beforeAll, beforeEach, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { clearDocuments, parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { MemberCall, Model, XmlModel, isModel, isXmlModel } from "../../src/language/generated/ast.js";
import { TagXmlTestData } from "../test-data/tag-xml-test-data.js";

let services: ReturnType<typeof createSclServices>;
let parseXml: ReturnType<typeof parseHelper<XmlModel>>;
let parseScl: ReturnType<typeof parseHelper<Model>>;
let xmlDocument: LangiumDocument<XmlModel> | undefined;
let sclDocument: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parseXml = parseHelper<XmlModel>(services.TagXml);
    parseScl = parseHelper<Model>(services.Scl);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

let errorLog: typeof console.error;
beforeEach(() => {
    clearDocuments(services.shared);
    errorLog = console.error;
    console.error = () => {};
});
afterEach(() => {
    console.error = errorLog;
});

describe('XML tag Linking tests', () => {

    test('linking to simple tag', async () => {
        xmlDocument = await parseXml(TagXmlTestData.singleTagExample)
        sclDocument = await parseScl(`
            FUNCTION_BLOCK "MyFB"
            BEGIN
            "MyMinimal";
            END_FUNCTION_BLOCK
        `);

        const element = sclDocument.parseResult.value.elements[0] as MemberCall;
        expect(
            checkSclDocumentValid(sclDocument)
            || checkXmlDocumentValid(xmlDocument)
            || element.element?.ref?.name
        ).toBe(s`
            MyMinimal
        `);
    });

    test('linking to simple constant', async () => {
        xmlDocument = await parseXml(TagXmlTestData.singleConstant)
        sclDocument = await parseScl(`
            FUNCTION_BLOCK "MyFB"
            BEGIN
            "MyConst";
            END_FUNCTION_BLOCK
        `);

        const element = sclDocument.parseResult.value.elements[0] as MemberCall;
        expect(
            checkSclDocumentValid(sclDocument)
            || checkXmlDocumentValid(xmlDocument)
            || element.element?.ref?.name
        ).toBe(s`
            MyConst
        `);
    });

    test('linking to tag with special characters in name', async () => {
        xmlDocument = await parseXml(TagXmlTestData.tagWithSpecialCharactersInName)
        sclDocument = await parseScl(`
            FUNCTION_BLOCK "MyFB"
            BEGIN
            "MyWeird%Tag";
            END_FUNCTION_BLOCK
        `);

        const element = sclDocument.parseResult.value.elements[0] as MemberCall;
        expect(
            checkSclDocumentValid(sclDocument)
            || checkXmlDocumentValid(xmlDocument)
            || element.element?.ref?.name
        ).toBe(s`
            MyWeird%Tag
        `);
    });

});

function checkXmlDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isXmlModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${XmlModel}'.`
        || undefined;
}

function checkSclDocumentValid(document: LangiumDocument): string | undefined {
    return document.parseResult.parserErrors.length && s`
        Parser errors:
          ${document.parseResult.parserErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}
