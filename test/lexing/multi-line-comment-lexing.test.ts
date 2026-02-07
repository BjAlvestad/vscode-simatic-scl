import { beforeAll, describe, expect, test } from "vitest";
import { EmptyFileSystem, type LangiumDocument } from "langium";
import { expandToString as s } from "langium/generate";
import { parseHelper } from "langium/test";
import { createSclServices } from "../../src/language/scl-module.js";
import { MemberCall, Model, isBinaryExpression, isModel } from "../../src/language/generated/ast.js";

let services: ReturnType<typeof createSclServices>;
let parse:    ReturnType<typeof parseHelper<Model>>;
let document: LangiumDocument<Model> | undefined;

beforeAll(async () => {
    services = createSclServices(EmptyFileSystem);
    parse = parseHelper<Model>(services.Scl);
});

describe('Lexing tests for multi-line comments', () => {

    test("lex multi-line comment without any content", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (**)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });

    test("lex nested multi-line comment without any content", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*(**)*)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });

    test("lex multi-line comment on single line", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (* My comment *)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });

    test("lex multi-line comment", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*
                My comment
            *)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });

    test("lex nested multi-line comment", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*
                My comment
                (* with nested multiline comment *)
            *)
            END_FUNCTION_BLOCK
        `);

      expect(checkLexerErrors(document)).toBeFalsy();
    });
    test("lex multi-line comment on single line, no space before first or last letter", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*My comment*)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });
    test("lex multi-line comment on single line, no space before first letter", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*My comment *)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });
    test("lex multi-line comment on single line, no space before last letter", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (* My comment*)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });
    test("lex nested multi-line comment on single line, no space before first or last letter", async () => {
      document = await parse(`
            FUNCTION_BLOCK "FB_WithMultilineComment"
            BEGIN
            (*(*My comment*)*)
            END_FUNCTION_BLOCK
        `);

        expect(checkLexerErrors(document)).toBeFalsy();
    });
});


function checkLexerErrors(document: LangiumDocument): string | undefined {
    return document.parseResult.lexerErrors.length && s`
        Lexer errors:
          ${document.parseResult.lexerErrors.map(e => e.message).join('\n  ')}
    `
        || document.parseResult.value === undefined && `ParseResult is 'undefined'.`
        || !isModel(document.parseResult.value) && `Root AST object is a ${document.parseResult.value.$type}, expected a '${Model}'.`
        || undefined;
}
