
import { AstNode } from "langium";
import {
    BooleanExpression,
    Struct,
    NumberExpression,
    StringExpression,
    UdtRef
} from "../generated/ast.js"

export type TypeDescription =
    | NilTypeDescription
    | VoidTypeDescription
    | BooleanTypeDescription
    | StringTypeDescription
    | NumberTypeDescription
    | FunctionTypeDescription
    | UdtRefTypeDescription
    | StructTypeDescription
    | ErrorType;

export interface NilTypeDescription {
    readonly $type: "nil"
}

export function createNilType(): NilTypeDescription {
    return {
        $type: "nil"
    };
}

export function isNilType(item: TypeDescription): item is NilTypeDescription {
    return item.$type === "nil";
}

export interface VoidTypeDescription {
    readonly $type: "void"
}

export function createVoidType(): VoidTypeDescription {
    return {
        $type: "void"
    }
}

export function isVoidType(item: TypeDescription): item is VoidTypeDescription {
    return item.$type === "void";
}

export interface BooleanTypeDescription {
    readonly $type: "boolean"
    readonly literal?: BooleanExpression
}

export function createBooleanType(literal?: BooleanExpression): BooleanTypeDescription {
    return {
        $type: "boolean",
        literal
    };
}

export function isBooleanType(item: TypeDescription): item is BooleanTypeDescription {
    return item.$type === "boolean";
}

export interface StringTypeDescription {
    readonly $type: "string"
    readonly literal?: StringExpression
}

export function createStringType(literal?: StringExpression): StringTypeDescription {
    return {
        $type: "string",
        literal
    };
}

export function isStringType(item: TypeDescription): item is StringTypeDescription {
    return item.$type === "string";
}

export interface NumberTypeDescription {
    readonly $type: "number",
    readonly literal?: NumberExpression
}

export function createNumberType(literal?: NumberExpression): NumberTypeDescription {
    return {
        $type: "number",
        literal
    };
}

export function isNumberType(item: TypeDescription): item is NumberTypeDescription {
    return item.$type === "number";
}

export interface FunctionTypeDescription {
    readonly $type: "function"
    readonly returnType: TypeDescription
    readonly parameters: FunctionParameter[]
}

export interface FunctionParameter {
    name: string
    type: TypeDescription
}

export function createFunctionType(returnType: TypeDescription, parameters: FunctionParameter[]): FunctionTypeDescription {
    return {
        $type: "function",
        parameters,
        returnType
    };
}

export function isFunctionType(item: TypeDescription): item is FunctionTypeDescription {
    return item.$type === "function";
}

export interface UdtRefTypeDescription {
    readonly $type: "UdtRef"
    readonly literal: UdtRef
}

export function createUdtRefType(literal: UdtRef): UdtRefTypeDescription {
    return {
        $type: "UdtRef",
        literal
    };
}

export function isUdtRefType(item: TypeDescription): item is UdtRefTypeDescription {
    return item.$type === "UdtRef";
}

export interface StructTypeDescription {
    readonly $type: "Struct"
    readonly literal: Struct
}

export function createStructType(literal: Struct): StructTypeDescription {
    return {
        $type: "Struct",
        literal
    };
}

export function isStructType(item: TypeDescription): item is StructTypeDescription {
    return item.$type === "Struct";
}

export interface ErrorType {
    readonly $type: "error"
    readonly source?: AstNode
    readonly message: string
}

export function createErrorType(message: string, source?: AstNode): ErrorType {
    return {
        $type: "error",
        message,
        source
    };
}

export function isErrorType(item: TypeDescription): item is ErrorType {
    return item.$type === "error";
}

export function typeToString(item: TypeDescription): string {
    if (isStructType(item)) {
        return "an struct"// item.literal.name;
    } else if (isFunctionType(item)) {
        const params = item.parameters.map(e => `${e.name}: ${typeToString(e.type)}`).join(', ');
        return `(${params}) => ${typeToString(item.returnType)}`;
    } else {
        return item.$type;
    }
}
