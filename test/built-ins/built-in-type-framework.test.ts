import { beforeAll, describe, expect, test } from "vitest";
import { BuiltInType } from "../../src/language/built-in-scl-libraries/built-in-type.js";
import { expandToString as s } from "langium/generate";
import { VariableDeclarationLine } from "../../src/language/built-in-scl-libraries/variable-declaration-line.js";

describe('Built in function framework tests', () => {

    test('Test BuiltInFunction toString()', async () => {
        const myFunc = new BuiltInType(
            'U_MyTest',
            [
                new VariableDeclarationLine('IN1', 'Bool'),
                new VariableDeclarationLine('IN2', 'Bool', '', "Some bool comment"),
                new VariableDeclarationLine('IN3', 'DINT', '100', "Some dint comment")
            ],
        )

        expect(myFunc.toString()).toEqual(s`
            TYPE U_MyTest
            VERSION : 0.1
                STRUCT
                    IN1 : Bool;
                    IN2 : Bool;   // Some bool comment
                    IN3 : DINT := 100;   // Some dint comment
                END_STRUCT;
            END_TYPE
        `);
    });
});
