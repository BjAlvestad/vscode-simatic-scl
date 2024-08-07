# SCL extension with LSP for VS Code

This is an extension that provides an LSP for the SCL language.
It is still in early development, and ***not ready for use***, but cross reference support for local variables, UDTs and FBs is already partially implemented.

The following major things have not been implemented yet:

- Cross reference to DBs, parameters or built in functions.
- Cashing (so performance will be very poor on larger projects).
- Syntax highlighting (currently only keywords are highlighted).

It is also limited to using 4GB RAM in VS Code, so it is not able to open extremely large projects.

## Changelog

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
