`
import { BuiltInFunction } from "../built-in-function.js";
import { VariableDeclarationLine } from "../variable-declaration-line.js";
import { BuiltInsUtils } from "../built-ins-utils.js";

export module BuiltIns {

    function create() {
        return new BuiltInFunction(
            '',  // Title
            '',  // BlockType
            '',  // Version
            '',  // ReturnType
            //'',  // Title/description
            [
                new VariableDeclarationLine('', '',),
            ],
            [
                new VariableDeclarationLine('', '',),
            ],
            [
                new VariableDeclarationLine('', '',),
            ],
            [
                new VariableDeclarationLine('', '',),
            ],
        ).toString();
    }

    export const uriMap: { [K: string]: string } = {

    }

    /* List of other functions that have max 1 formal parameter */
    export const functionsWithoutFormalParameter: Set<string> = new Set<string>([
        
    ]);
}

`