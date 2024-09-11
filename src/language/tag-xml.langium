grammar TagXml


hidden terminal WS: /\s+/;

terminal ID: /[_a-zA-Z][\w_]*/;
terminal LOGICAL_ADDRESS: /%[IQM]\d+(.\d+)?/;
terminal DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
// terminal TIME_LITERAL: /[Ll]?[Tt]#[0-9DdHhMmNnSs_]+/;

// terminal NUMBER returns string: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9][0-9_]*(\.?([0-9_]*[eE][+-]?)?[0-9_]+)?))/;

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
        '<' 'Name' '>' name=ID '<' '/' 'Name' '>'
    '<' '/' 'AttributeList' '>'
;

ObjectListForTable:
    '<' 'ObjectList' '>'
        plcTags+=PlcTag*
    '<' '/' 'ObjectList' '>'
;

PlcTag:
    '<' 'SW.Tags.PlcTag' 'ID=' tagId=DOUBLE_QUOTE_STRING 'CompositionName' '=' compositionName=DOUBLE_QUOTE_STRING '>'
        attributes=AttibutesList
        objectList=ObjectListForComments
    '<' '/' 'SW.Tags.PlcTag' '>'
;

AttibutesList:
    '<' 'AttributeList' '>'
        '<' 'DataTypeName' '>' type=ID '<' '/' 'DataTypeName' '>'
        '<' 'ExternalAccessible' '>' isExternalAccessible=('true'|'false') '<' '/' 'ExternalAccessible' '>'
        '<' 'ExternalVisible' '>' isExternalAVisible=('true'|'false') '<' '/' 'ExternalVisible' '>'
        '<' 'ExternalWritable' '>' isExternalWritable=('true'|'false') '<' '/' 'ExternalWritable' '>'
        '<' 'LogicalAddress' '>' address=LOGICAL_ADDRESS '</LogicalAddress' '>'
        '<' 'Name' '>' name=ID '<' '/' 'Name' '>'
    '<' '/' 'AttributeList' '>'
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
            '<' 'Text' '/' '>'
        '<' '/' 'AttributeList' '>'
    '<' '/' 'MultilingualTextItem' '>'
;

// ObjectList:
//     '<' 'ObjectList' '>'
//         ('<' '/'? attributeName=(ID|XmlKeywordsAllowedElsewhere) (id+=(ID|'ID='|XmlKeywordsAllowedElsewhere) '='? metaData+=DOUBLE_QUOTE_STRING)* '/'? '>')*
//     '<' '/' 'ObjectList' '>'
// ;

// XmlKeywordsAllowedElsewhere returns string:
//     'CompositionName'
//     | 'ObjectList'
//     | 'AttributeList'
// ;


// fragment NameOpenTag returns string: '<' 'Name' '>';
// fragment NameCloseTag returns string: '<' '/' 'Name' '>';