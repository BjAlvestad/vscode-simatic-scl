
terminal REGION_TEXT: /REGION[^\r\n]*/;
terminal TITLE_TEXT: /TITLE = [^\r\n]*/;
hidden terminal WS: /\s+/;
terminal DOUBLE_QUOTE_STRING: /"(\\.|[^"\\])*"/;
terminal SINGLE_QUOTE_STRING: /'([^'])*'/;
terminal NUMBER returns string: /([DdLl]?[BbWwLl]#)?((16#[0-9a-fA-F_]+)|(((2|8)#)?[0-9][0-9_]*(\.?([0-9_]*[eE][+-]?)?[0-9_]+)?))/;

//TODO: Consider combining these terminals, to make them more relaxed, and handle correct entry in validator instead
terminal TIME_LITERAL: /[Ll]?[Tt]#[0-9DdHhMmNnSs_]+/;
terminal DATE_LITERAL: /[Dd]#[0-9-]+/;
terminal TIME_OF_DAY_LITERAL: /[Ll]?[Tt][Oo][Dd]#[0-9:\.]+/;
terminal DATE_AND_TIME_LITERAL: /(([Dd][Tt])|DATE_AND_TIME)#[0-9-]*[0-9:\.]*/;

terminal MEMORY_AREA: /\.%[XBWD]\d+/;  //TODO: Consider using positive look-behind for `.%`, and then instead use `.%` as operationCall in MemberCall

terminal ID: /[_a-zA-Z][\w_]*/;

hidden terminal ML_COMMENT: /\(\*[\s\S]*?\*\)/;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
