import { VariableDeclarationLine } from "./variable-declaration-line.js";
import { expandToString as s } from "langium/generate";

export class BuiltInFunction{
    name: string;
    functionType: 'FunctionCall' | 'FunctionBlock';
    returnType: string;
    version: string;
    varInput: VariableDeclarationLine[];
    varOutput: VariableDeclarationLine[];
    varInOut: VariableDeclarationLine[];
    varStatic: VariableDeclarationLine[];

    constructor(
        name: string,
        functionType: 'FunctionCall' | 'FunctionBlock',
        version?: string,
        returnType?: string,
        varInput?: VariableDeclarationLine[],
        varOutput?: VariableDeclarationLine[],
        varInOut?: VariableDeclarationLine[],
        varStatic?: VariableDeclarationLine[],
    ) {
        this.name = name;
        this.functionType = functionType;
        this.version = version ?? '0.1';
        this.returnType = returnType ?? '';
        this.varInput = varInput ?? [];
        this.varOutput = varOutput ?? [];
        this.varInOut = varInOut ?? [];
        this.varStatic = varStatic ?? [];
    }

    public toString(): string {
        return (
            s`
            ${this.getFunctionStart()}
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

    public isInvalidBlockConfig() {
        const invalidFunctionCall = (
            this.functionType === "FunctionCall"
            && this.varStatic.length > 0
        );
        const invalidFunctionBlock = (
            this.functionType === "FunctionBlock"
            && this.returnType
        );

        return invalidFunctionCall || invalidFunctionBlock;
    }

    private getFunctionStart() {
        if (this.functionType === "FunctionCall") {
            return `FUNCTION ${this.name} : ${this.returnType.length > 0 ? this.returnType : 'Void'}`
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
        return this.functionType === "FunctionCall" ? 'END_FUNCTION' : 'END_FUNCTION_BLOCK';
    }
}
