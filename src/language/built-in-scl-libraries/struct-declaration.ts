import { DeclarationLine } from "./declaration-line.js";
import { expandToString as s } from "langium/generate";

export class StructDeclaration {
    name: string;
    comment?: string;
    vars: DeclarationLine[];

    constructor(
        name: string,
        comment: string,
        vars: DeclarationLine[],
    ) {
        this.name = name;
        this.comment = comment ?? '';
        this.vars = vars;
    }

    public toString(): string {
        return (s`
            ${this.name} : STRUCT${this.comment && `   // ${this.comment}`}
                ${this.vars.join('\n')}
            END_STRUCT;`
        )
    }
}
