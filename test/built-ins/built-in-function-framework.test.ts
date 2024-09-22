import { beforeAll, describe, expect, test } from "vitest";
import { BuiltInFunction } from "../../src/language/built-in-scl-libraries/built-in-function.js";
import { expandToString as s } from "langium/generate";
import { VariableDeclarationLine } from "../../src/language/built-in-scl-libraries/variable-declaration-line.js";

describe('Built in function framework tests', () => {

    test('Test BuiltInFunction toString()', async () => {
        const myFunc = new BuiltInFunction(
            'FC_MyTest',
            "FunctionCall",
            '1.0',
            '',
            [
                new VariableDeclarationLine('IN1', 'Bool'),
                new VariableDeclarationLine('IN2', 'Bool', '', "Some bool comment"),
                new VariableDeclarationLine('IN3', 'DINT', '100', "Some dint comment")
            ],
            [
                new VariableDeclarationLine('OUT1', 'Bool'),
            ],
        )

        expect(myFunc.toString()).toEqual(s`
            FUNCTION FC_MyTest : Void
            VERSION : 1.0

            VAR_INPUT
                IN1 : Bool;
                IN2 : Bool;   // Some bool comment
                IN3 : DINT := 100;   // Some dint comment
            END_VAR

            VAR_OUTPUT
                OUT1 : Bool;
            END_VAR


            BEGIN

            END_FUNCTION
        `);
    });
});
