# SCL extension with LSP for VS Code

This is an extension that provides an LSP for the SCL language.
It is still in early development, and ***not ready for use***, but cross reference support for local variables, UDTs and FBs is already implemented.

Since this extension is providing a language server, which has not been optimized yet, you should expect a performance impact.  
If you are only interested in the syntax highlighting, which would give no performance impact, then use the extension [Gunders89.vscode-scl](https://marketplace.visualstudio.com/items?itemName=Gunders89.vscode-scl) instead. His extension also provides snippets, which this extension currently does not (although this extension will give scoped auto-complete, at a performance cost, which his does not).

The following major things have not been implemented yet:

- Several built in functions not yet added (but framework for built-ins and many functions were added in 0.0.4).
  - Add struct or function types for
    - GEOADDR
    - TCON_Configured
    - RampFunction (seems like it is actually a functionBlock not just struct)
    - Program_Alarm ()
    - Get_Name
    - etc... See "Data type" in TIA Portal for full list of things that should be handled, in addition to "Instructions"

- Assigning value to local function name (which is an allowed alternative to returning a value in SCL)
- Basic cashing and optional work scope filtering was introduced in v0.0.5, but no effort has been put into performance optimization yet (so performance will be very poor on larger projects).
- Syntax highlighting (currently only keywords are highlighted).

It is also limited to using 4GB RAM in VS Code, so it is not able to open extremely large projects, unless you choose to filter what is included.

Any document with a linking error will get all its references recalculated on an update to **any** file. And will therefore have a major effect on performance, since it essentially gains no benefit from the caching.
Due to not supporting all built-in functions yet, and not parsing tags yet, multiple linking errors are expected.

## Changelog

### v0.0.7

**Built-ins:**

- Refactor built-ins out to separate file.
- Add interface for several built-ins of TIA Portal. This way it knows which parameters can be expected from a built-in function or datatype, and perform linking / autosuggest for these.

There are still several built in functions that has not been added. But you could add these yourself locally by simply creating an .SCL file which contains the declaration section mirroring that you would expect of the actual block.

**Grammar:**

- Remove return type from DB and UDT since only FCs can have return types defined.
- Allow double quote string and ID in FC block return type.
- Allow VERSION keyword as variable name.
- Add `'TYPE'` terminal to `KeywordsAllowedElsewhere`
- Narrow down prefix for `NumberExpressionWithUnit`. Use `DataType` prefix instead of `TypeName`.
  - We are only interested in the number types, and `TypeName` included all `DataTypes` plus `StringTypeName` and `'Void'`.
- Add non-struct DataTypes for DateAndTime
- Add non-struct DataTypes using integer, hex, or no value

**Linker / Scope / Auto-complete:**

Temporarily removed auto complete support for parameters. The autocomplete worked by limiting scope inside there, but it also breaks scope for arrays.
Removed that support for now, since linking works properly once they have written the parameters, and is more important to remove linking errors at this stage.

### v0.0.6

- Add parsing of tag declarations (in xml file), and linking to them.
- Add parsing of nested multi-line comments.
- Update TextMade grammar for SCL instead of using the auto-generated one with only keywords.
  - Used the TextMate grammar in [Gunders89 Siemens SCL extension found in his vscode-scl repo](https://github.com/Gunders89/vscode-scl) as starting point. Changes from that starting point is listed in the points below.
  - Fixed TextMate grammar so that it also highlights nested comments correctly.
  - Add highlighting for any character enclosed in double quotes, not just word chars, since TIA allows special characters in the name.
  - Removed grammar for built in functions, since we are using a LSP, and will want to treat them same as normal functions outside of the TM Grammar.
- Updated 6 npm packages, removing 1 moderate severity vulnerability.

### v0.0.5

- Fix global scoping
- Add caching for global and local scoping
- Add possibility to filter files that gets loaded into the workspace initially.

**Note on how filter works**:

As of now, this gets defined via a file named `includeFoldersFilter.scl-lsp` and which is placed in root of workspace you open. If this is missing all files gets loaded.
Note that this only limits what is loaded initially. So if you open any other files, then they will also get loaded into the Language Server. It is possible to utilize the built in `file.exclude` to exclude these folders from VS Code explorer and quick open.
Future plans for this is to instead rely on json files that define which folders to be included, and based on those limit both what is initially loaded to Langauge Server, and which folders are visible in VS Code.

### v0.0.4

- Add data types `NULL`, `DB_ANY`, `BCD16`, `BCD32`, `VARIANT`, `ANY`, `POINTER`, `HW_*`.
- Add/fix scoping for DBs.
- Add/fix scoping/linking of formal parameters.
- Add framework for builtin functions, and add several built in FCs and FBs:
  - Add several built in functions that can be called from expressions:
    - All *CONVERT* and *T_CONV* functions, like `INT_TO_WORD` etc. Added 433 conversion functions in total.
    - Misc others with only a single *IN* or *OUT* parameter, like `GATHER`, `SCATTER`, `RD_SYS_T`, `TIME_TCK`, `LEN`.
    - Misc with various in/out parameters, like `RESET_TIMER`, `Ack_Alarms`, `CONCAT`, `FIND`, `REPLACE`, `ATH`, `MOVE_BLK_VARIANT`, `VariantGet`, `VariantPut`, `LOWER_BOUND`, `UPPER_BOUND`, `TypeOf`, `TypeOfElements`, `CountOfElements`, `Deserialize`, `Serialize`, `FILL_BLK`, `GATHER_BLK`, `SCATTER_BLK`, `IS_NULL`, `NOT_NULL`, `IS_ARRAY`.
    - Math functions `MIN`, `MAX`, `MIN_REAL`, `MAX_REAL`.
  - Add scoping/linking for built-in functions/instructions, and add built in functions for:
    - Bit logic operations: `R_TRIG` and `F_TRIG`.
    - Timer operations: `TP_TIME`, `TON_TIME`,`TOF_TIME`,`TONR_TIME`.
- Misc other fixes.
- (Major rewrite/refactor of Grammar for SCL.)

### v0.0.3

Fix grammar ambiguity for CaseLabel, FeatureCall and initializations.

Fix several parser errors (i.e. errors saying *Expect...*), like:
- `DataType#` prefix for types.
- DataTypes in expression (to e.g. compare against `typeOf()`).
- DB of built inn type, and array DB.
- `ms` unit in time literal.
- `Retain` keyword as allowed ID.
- `#` prefix for double quote string variables.
- `REGION` without any description text behind
- Case label to also allow using in `..` range expression.
- Add missing `:` behind `ELSE` in case block.
- Allow `return` statement at any position.

And several other minor fixes.

Parsing of nested multiline blocks is not yet handled.
Otherwise handled all parser errors (i.e. errors starting with "Expect") from partial test project.

### v0.0.2

- Fix UDT and array intialisations.
- Add support for
  - DBs declared form UDT.
  - Variables with special characters (double quote string variables)
  - Standalone `;` element.

### v0.0.1

First version with cross reference support for local variables, UDTs and structs.
