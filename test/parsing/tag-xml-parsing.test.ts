import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { XmlModel, isXmlModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<XmlModel>>;
let document: LangiumDocument<XmlModel> | undefined;

const singleTagExampleWithoutCommentPart = `
<?xml version="1.0" encoding="utf-8"?>
<Document>
  <Engineering version="V17" />
  <SW.Tags.PlcTagTable ID="0">
    <AttributeList>
      <Name>AlveTestTable</Name>
    </AttributeList>
    <ObjectList>
      <SW.Tags.PlcTag ID="1" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%I0.7</LogicalAddress>
          <Name>MyMinimal</Name>
        </AttributeList>
      </SW.Tags.PlcTag>
    </ObjectList>
  </SW.Tags.PlcTagTable>
</Document>
`

const singleTagExample = `
<?xml version="1.0" encoding="utf-8"?>
<Document>
  <Engineering version="V17" />
  <SW.Tags.PlcTagTable ID="0">
    <AttributeList>
      <Name>AlveTestTable</Name>
    </AttributeList>
    <ObjectList>
      <SW.Tags.PlcTag ID="1" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%I0.7</LogicalAddress>
          <Name>MyMinimal</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="2" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="3" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
    </ObjectList>
  </SW.Tags.PlcTagTable>
</Document>
`

const tagWithSpecialCharactersInName = `
<?xml version="1.0" encoding="utf-8"?>
<Document>
  <Engineering version="V17" />
  <SW.Tags.PlcTagTable ID="0">
    <AttributeList>
      <Name>AlveTestTable</Name>
    </AttributeList>
    <ObjectList>
      <SW.Tags.PlcTag ID="1" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%I0.7</LogicalAddress>
          <Name>MyWeird%Tag</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="2" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="3" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
    </ObjectList>
  </SW.Tags.PlcTagTable>
</Document>
`

const tagExampleEmptyComments = `
<?xml version="1.0" encoding="utf-8"?>
<Document>
  <Engineering version="V17" />
  <SW.Tags.PlcTagTable ID="0">
    <AttributeList>
      <Name>AlveTestTable</Name>
    </AttributeList>
    <ObjectList>
      <SW.Tags.PlcTag ID="1" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%I0.7</LogicalAddress>
          <Name>MyMinimal</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="2" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="3" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="4" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>false</ExternalAccessible>
          <ExternalVisible>false</ExternalVisible>
          <ExternalWritable>false</ExternalWritable>
          <LogicalAddress>%I1.0</LogicalAddress>
          <Name>MyRemoveAttributes</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="5" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="6" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="7" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%M1.1</LogicalAddress>
          <Name>MyMemory</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="8" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="9" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="A" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%Q1.2</LogicalAddress>
          <Name>MyOutput</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="B" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="C" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text />
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
    </ObjectList>
  </SW.Tags.PlcTagTable>
</Document>
`

const tagExampleWithComments = `
<?xml version="1.0" encoding="utf-8"?>
<Document>
  <Engineering version="V17" />
  <SW.Tags.PlcTagTable ID="0">
    <AttributeList>
      <Name>AlveTestTable_WithComments</Name>
    </AttributeList>
    <ObjectList>
      <SW.Tags.PlcTag ID="1" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%I10.7</LogicalAddress>
          <Name>MyMinimal</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="2" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="3" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text>Coment on MyMinimal</Text>
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="4" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>false</ExternalAccessible>
          <ExternalVisible>false</ExternalVisible>
          <ExternalWritable>false</ExternalWritable>
          <LogicalAddress>%I11.0</LogicalAddress>
          <Name>MyRemoveAttributes</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="5" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="6" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text>Comment on MyRemoveAttributes</Text>
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="7" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%M11.1</LogicalAddress>
          <Name>MyMemory</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="8" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="9" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text>Comment with weirt symbol &lt; &gt; !?</Text>
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
      <SW.Tags.PlcTag ID="A" CompositionName="Tags">
        <AttributeList>
          <DataTypeName>Bool</DataTypeName>
          <ExternalAccessible>true</ExternalAccessible>
          <ExternalVisible>true</ExternalVisible>
          <ExternalWritable>true</ExternalWritable>
          <LogicalAddress>%Q11.2</LogicalAddress>
          <Name>MyOutput</Name>
        </AttributeList>
        <ObjectList>
          <MultilingualText ID="B" CompositionName="Comment">
            <ObjectList>
              <MultilingualTextItem ID="C" CompositionName="Items">
                <AttributeList>
                  <Culture>en-US</Culture>
                  <Text>Coment with partial weird !1 symbol</Text>
                </AttributeList>
              </MultilingualTextItem>
            </ObjectList>
          </MultilingualText>
        </ObjectList>
      </SW.Tags.PlcTag>
    </ObjectList>
  </SW.Tags.PlcTagTable>
</Document>
`

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<XmlModel>(services.TagXml);

    // activate the following if your linking test requires elements from a built-in library, for example
    // await services.shared.workspace.WorkspaceManager.initializeWorkspace([]);
});

describe('Parsing XML Tag list tests', () => {

    test('Parse single tag with empty comments', async () => {
        document = await parse(singleTagExample);

        expect(checkDocumentValid(document)).toBeFalsy();

        // expect(
        //     checkDocumentValid(document) || s`
        //         Numbers:
        //           ${document.parseResult.value?.elements?.map(p => (p as NumberExpression).value)?.join('\n')}
        //     `
        // ).toBe(s`
        //     Numbers:
        //       11
        //       22
        //       16#22adf
        //       3.3
        //       3.3e+7
        //       3.3e-8
        //       3.3e8
        //       33e8
        //       33e+8
        //       33e-8
        //       40_123E10
        //       3.0E+10
        // `);
    });
  
    test("Parse tag with special characters in name", async () => {
      document = await parse(tagWithSpecialCharactersInName);

      expect(checkDocumentValid(document)).toBeFalsy();

      expect(
        checkDocumentValid(document) ||
          s`
                Tag names:
                  ${document.parseResult.value?.plcTagTable.objectList.plcTags[0].attributes.name}
            `
      ).toBe(s`
          Tag names:
            MyWeird%Tag
        `);
    });

    test('Parse multiple tags with empty comments', async () => {
        document = await parse(tagExampleEmptyComments);

        expect(checkDocumentValid(document)).toBeFalsy();
    });

    test('Parse multiple tags with comments', async () => {
        document = await parse(tagExampleWithComments);

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

