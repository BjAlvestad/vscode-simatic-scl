grammar TagXml
import "./terminal"

terminal TAG_COMMENT: /(?<=(<Text>))[^<]+(?=(<\/Text>))/;
terminal XML_NAME: /(?<=(<Name>))[^<]+(?=(<\/Name>))/;
terminal XML_CONSTANT_VALUE: /(?<=(<Value>))[^<]+(?=(<\/Value>))/;
terminal LOGICAL_ADDRESS: /%[IQM][BWD]?\d+(.\d+)?/;

entry XmlModel:
    '<?' 'xml' 'version' '=' version=DOUBLE_QUOTE_STRING 'encoding' '=' encoding=DOUBLE_QUOTE_STRING '?>'
    '<' 'Document' '>'
        '<' 'Engineering' 'version' '=' version=DOUBLE_QUOTE_STRING '/' '>'
        plcTagTable=PlcTagTable
    '<' '/' 'Document' '>'
;

PlcTagTable:
    '<' 'SW.Tags.PlcTagTable' 'ID=' tagId=DOUBLE_QUOTE_STRING '>'
        attributes=AttributesListForTable
        objectList=ObjectListForTable
    '<' '/' 'SW.Tags.PlcTagTable' '>'
;

AttributesListForTable:
    '<' 'AttributeList' '>'
        '<' 'Name' '>' name=XML_NAME '<' '/' 'Name' '>'
    '<' '/' 'AttributeList' '>'
;

ObjectListForTable:
    '<' 'ObjectList' '>'
        plcTags+=(PlcTag | PlcUserConstant)*
    '<' '/' 'ObjectList' '>'
;

PlcTag:
    '<' 'SW.Tags.PlcTag' 'ID=' tagId=DOUBLE_QUOTE_STRING 'CompositionName' '=' compositionName=DOUBLE_QUOTE_STRING '>'
        '<' 'AttributeList' '>'
            '<' 'DataTypeName' '>' type=DataType '<' '/' 'DataTypeName' '>'
            '<' 'ExternalAccessible' '>' isExternalAccessible=('true'|'false') '<' '/' 'ExternalAccessible' '>'
            '<' 'ExternalVisible' '>' isExternalAVisible=('true'|'false') '<' '/' 'ExternalVisible' '>'
            '<' 'ExternalWritable' '>' isExternalWritable=('true'|'false') '<' '/' 'ExternalWritable' '>'
            '<' 'LogicalAddress' '>' address=LOGICAL_ADDRESS '</LogicalAddress' '>'
            '<' 'Name' '>' name=XML_NAME '<' '/' 'Name' '>'
        '<' '/' 'AttributeList' '>'
        objectList=ObjectListForComments
    '<' '/' 'SW.Tags.PlcTag' '>'
;

PlcUserConstant:
    '<' 'SW.Tags.PlcUserConstant' 'ID=' tagId=DOUBLE_QUOTE_STRING 'CompositionName' '=' compositionName=DOUBLE_QUOTE_STRING '>'
        '<' 'AttributeList' '>'
            '<' 'DataTypeName' '>' type=DataType '<' '/' 'DataTypeName' '>'
            '<' 'Name' '>' name=XML_NAME '<' '/' 'Name' '>'
            '<' 'Value' '>' value=(XML_CONSTANT_VALUE | NUMBER | BooleanExpression) '</Value' '>'
        '<' '/' 'AttributeList' '>'
        objectList=ObjectListForComments
    '<' '/' 'SW.Tags.PlcUserConstant' '>'
;

ObjectListForComments:
    '<' 'ObjectList' '>'
        '<' 'MultilingualText' 'ID=' tagId=DOUBLE_QUOTE_STRING  'CompositionName' '=' compositionName=DOUBLE_QUOTE_STRING '>'
            '<' 'ObjectList' '>'
                items+=MultilingualTextItem+
            '<' '/' 'ObjectList' '>'
        '<' '/' 'MultilingualText' '>'
    '<' '/' 'ObjectList' '>'
;

MultilingualTextItem:
    '<' 'MultilingualTextItem' 'ID=' tagId=DOUBLE_QUOTE_STRING  'CompositionName' '=' compositionName=DOUBLE_QUOTE_STRING '>'
        '<' 'AttributeList' '>'
            '<' 'Culture' '>' cultureLang=ID '-' cultureRegion=ID '<' '/' 'Culture' '>'
            '<' 'Text' (('/' '>') | ('>' comment=TAG_COMMENT '<' '/' 'Text' '>'))
        '<' '/' 'AttributeList' '>'
    '<' '/' 'MultilingualTextItem' '>'
;
