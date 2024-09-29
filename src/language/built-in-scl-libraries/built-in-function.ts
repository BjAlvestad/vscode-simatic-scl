import { VariableDeclarationLine } from "./variable-declaration-line.js";
import { expandToString as s } from "langium/generate";

export interface BuiltInFunctionParams {
    name: string,
    returnType?: string,
    title?: string,
    version?: string,
    varInput?: VariableDeclarationLine[],
    varOutput?: VariableDeclarationLine[],
    varInOut?: VariableDeclarationLine[],
    varStatic?: VariableDeclarationLine[],
}

export class BuiltInFunction{
    name: string;
    returnType: string;
    title: string;
    version: string;
    varInput: VariableDeclarationLine[];
    varOutput: VariableDeclarationLine[];
    varInOut: VariableDeclarationLine[];
    varStatic: VariableDeclarationLine[];

    constructor(
        params: BuiltInFunctionParams,
    ) {
        this.name = params.name;
        this.returnType = params.returnType ?? '';
        this.title = params.title ?? '';
        this.version = params.version ?? '0.1';
        this.varInput = params.varInput ?? [];
        this.varOutput = params.varOutput ?? [];
        this.varInOut = params.varInOut ?? [];
        this.varStatic = params.varStatic ?? [];
    }

    public toString(): string {
        return (
            s`
            ${this.getFunctionStart()}
            ${this.title ? `TITLE = ${this.title}` : ''}
            VERSION : ${this.version ?? '0.1'}
            ${this.getVarDecSection('VAR_INPUT', this.varInput)}
            ${this.getVarDecSection('VAR_OUTPUT', this.varOutput)}
            ${this.getVarDecSection('VAR_IN_OUT', this.varInOut)}
            ${this.getVarDecSection('VAR', this.varStatic)}
            BEGIN

            ${this.getFunctionEnd()}
            `.trimStart()
        );
    }

    private getFunctionStart() {
        if (this.returnType) {
            return `FUNCTION ${this.name} : ${this.returnType}`
        }

        return `FUNCTION_BLOCK ${this.name}`
    }

    private getVarDecSection(
        sectionName: 'VAR_INPUT' | 'VAR_OUTPUT' | 'VAR_IN_OUT' | 'VAR',
        varDecLines: VariableDeclarationLine[]
    ) {
        return (
            varDecLines.length > 0 ? s`
            
            ${sectionName}
                ${varDecLines.join('\n')}
            END_VAR
            ` : ''
        );
    }

    private getFunctionEnd() {
        return this.returnType ? 'END_FUNCTION' : 'END_FUNCTION_BLOCK';
    }
}
