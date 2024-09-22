
export module BuiltInsUtils {

    export function createConvertFunction(from: string, to: string): string {
        return `
        FUNCTION ${from}_TO_${to} : ${to}
        VERSION : 0.1

        VAR_INPUT
            IN: ${from};
        END_VAR

        BEGIN
        END_FUNCTION
        `.trimStart();
    }

    export function createInOutFunction(name: string, inType?: string, outType?: string, returnType?: string): string {
        return `
        FUNCTION ${name} : ${returnType ?? 'Void'}
        VERSION : 0.1
        ${inType ?
        `VAR_INPUT
            IN: ${inType};
        END_VAR
        ` : ''}
        ${outType ?
        `VAR_OUTPUT
            OUT: ${outType};
        END_VAR
        ` : ''}
        BEGIN
        END_FUNCTION
        `.trimStart();
    }

    export function createGeneralFunction(name: string, inputs?: string[], outputs?: string[], inOuts?: string[], returnType?: string): string {
        return `
        FUNCTION ${name} : ${returnType ?? 'Void'}
        VERSION : 0.1
        ${inputs ?
        `VAR_INPUT
            ${inputs.join(';\n        ')};
        END_VAR
        ` : ''}
        ${outputs ?
        `VAR_OUTPUT
            ${outputs.join(';\n        ')};
        END_VAR
        ` : ''}
        ${inOuts ?
        `VAR_IN_OUT
            ${inOuts.join(';\n        ')};
        END_VAR
        ` : ''}
        BEGIN
        END_FUNCTION
        `.trimStart();
    }


    export function createGeneralFunctionBlock(name: string, inputs?: string[], outputs?: string[], inOuts?: string[]): string {
        return `
        FUNCTION_BLOCK ${name}
        VERSION : 0.1
        ${inputs ?
        `VAR_INPUT
            ${inputs.join(';\n        ')};
        END_VAR
        ` : ''}
        ${outputs ?
        `VAR_OUTPUT
            ${outputs.join(';\n        ')};
        END_VAR
        ` : ''}
        ${inOuts ?
        `VAR_IN_OUT
            ${inOuts.join(';\n        ')};
        END_VAR
        ` : ''}
        BEGIN
        END_FUNCTION_BLOCK
        `.trimStart();
    }
    
}
