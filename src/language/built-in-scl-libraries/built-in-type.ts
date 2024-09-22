import { VariableDeclarationLine } from "./variable-declaration-line.js";
import { expandToString as s } from "langium/generate";

export class BuiltInType{
    name: string;
    varDecLines: VariableDeclarationLine[];

    constructor(
        name: string,
        varDecLines?: VariableDeclarationLine[],
    ) {
        this.name = name;
        this.varDecLines = varDecLines ?? [];
    }

    public toString(): string {
        return (
            s`
            TYPE ${this.name}
            VERSION : 0.1
                STRUCT
                    ${this.varDecLines.join('\n')}
                END_STRUCT;
            END_TYPE
            `.trimStart()
        );
    }

}
