import { expandToString as s } from "langium/generate";

export namespace TagXmlTestData {
    export const singleTagExample = s`
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
    `;

    export const singleTagReadingWord = s`
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
                <DataTypeName>Int</DataTypeName>
                <ExternalAccessible>true</ExternalAccessible>
                <ExternalVisible>true</ExternalVisible>
                <ExternalWritable>true</ExternalWritable>
                <LogicalAddress>%IW16</LogicalAddress>
                <Name>myIntegerTag</Name>
                </AttributeList>
                <ObjectList>
                <MultilingualText ID="B6" CompositionName="Comment">
                    <ObjectList>
                    <MultilingualTextItem ID="B7" CompositionName="Items">
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
    `;

    export const tagWithSpecialCharactersInName = s`
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
    `;

    export const singleConstant = s`
        <?xml version="1.0" encoding="utf-8"?>
        <Document>
        <Engineering version="V17" />
        <SW.Tags.PlcTagTable ID="0">
            <AttributeList>
            <Name>AlveTestTable</Name>
            </AttributeList>
            <ObjectList>
            <SW.Tags.PlcUserConstant ID="A" CompositionName="UserConstants">
                <AttributeList>
                <DataTypeName>Bool</DataTypeName>
                <Name>MyConst</Name>
                <Value>False</Value>
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
            </SW.Tags.PlcUserConstant>
            </ObjectList>
        </SW.Tags.PlcTagTable>
        </Document>
    `;

    export const tagWithComment = s`
        <?xml version="1.0" encoding="utf-8"?>
        <Document>
        <Engineering version="V17" />
        <SW.Tags.PlcTagTable ID="0">
            <AttributeList>
            <Name>TestTable_WithComments</Name>
            </AttributeList>
            <ObjectList>
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
    `;

    export const tagWithCommentStartingWithEqualKeyword = s`
        <?xml version="1.0" encoding="utf-8"?>
        <Document>
        <Engineering version="V17" />
        <SW.Tags.PlcTagTable ID="0">
            <AttributeList>
            <Name>TestTable_WithComments</Name>
            </AttributeList>
            <ObjectList>
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
                        <Text>=Coment with partial weird !1 symbol</Text>
                        </AttributeList>
                    </MultilingualTextItem>
                    </ObjectList>
                </MultilingualText>
                </ObjectList>
            </SW.Tags.PlcTag>
            </ObjectList>
        </SW.Tags.PlcTagTable>
        </Document>
    `;

    export const tagExampleEmptyComments = s`
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
    `;

    export const tagExampleWithComments = s`
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
    `;
}
