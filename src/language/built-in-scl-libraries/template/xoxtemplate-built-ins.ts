`
import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";
import { BuiltInsUtils } from "../built-ins-utils.js";

export module BuiltIns {

    function XOX() {
        return new BuiltInFunction({
            name: 'XOX',
            returnType: 'Void',
            title: '',
            version:  '',
            varInput: [
                new VariableDeclarationLine('', '',),
            ],
            varOutput: [
                new VariableDeclarationLine('', '',),
            ],
            varInOut: [
                new VariableDeclarationLine('', '',),
            ],
            varStatic: [
                new VariableDeclarationLine('', '',),
            ],
        }).toString();
    }

    export const uriMap: { [K: string]: string } = {

    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}

`