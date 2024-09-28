import { AstNode } from "langium";
import { BinaryExpression, isBinaryExpression, isBooleanExpression, isStruct, isMemberCall, isNumberExpression, isStringExpression, isUnaryExpression, isVariableDeclaration, MemberCall, TypeReference, isTypeReference, isSclBlock, isDbBlock, isDbMemberCall, DbMemberCall } from "../generated/ast.js";
import { createBooleanType, createStructType, createErrorType, createNumberType, createStringType, isFunctionType, isStringType, TypeDescription, createUdtRefType, createSclBlockType, createInstanceDbBlockType, createGlobalDbBlockType } from "./descriptions.js";

export function inferType(node: AstNode | undefined, cache: Map<AstNode, TypeDescription>): TypeDescription {
    let type: TypeDescription | undefined;
    if (!node) {
        return createErrorType('Could not infer type for undefined', node);
    }
    const existing = cache.get(node);
    if (existing) {
        return existing;
    }
    // Prevent recursive inference errors
    cache.set(node, createErrorType('Recursive definition', node));
    if (isStringExpression(node)) {
        type = createStringType(node);
    } else if (isNumberExpression(node)) {
        type = createNumberType(node);
    } else if (isBooleanExpression(node)) {
        type = createBooleanType(node);
    // } else if (isNilExpression(node)) {
    //     type = createNilType();
    // } else if (isFunctionDeclaration(node) || isMethodMember(node)) {
    //     const returnType = inferType(node.returnType, cache);
    //     const parameters = node.parameters.map(e => ({
    //         name: e.name,
    //         type: inferType(e.type, cache)
    //     }));
    //     type = createFunctionType(returnType, parameters);
    } else if (isSclBlock(node)) {
        if (isDbBlock(node)) {
            if(node.dbFromUdt || node.dbFromBuiltInFunction) {
                type = createInstanceDbBlockType(node);
            } else {
                type = createGlobalDbBlockType(node);
            }
        } else {
            type = createSclBlockType(node);
        }
    } else if (isTypeReference(node)) {
        type = inferTypeRef(node, cache);
    } else if (isDbMemberCall(node)) {
        type = inferDbMemberCall(node, cache);
    } else if (isMemberCall(node)) {
        type = inferMemberCall(node, cache);
        if (node.functionCall) {
            if (isFunctionType(type)) {
                type = type.returnType;
            }
        }
    } else if (isVariableDeclaration(node)) {
        if (node.type) {
            type = inferType(node.type, cache);
        } else if (node.value) {
            type = inferType(node.value, cache);
        } else {
            type = createErrorType('No type hint for this element', node);
        }
    // } else if (isParameter(node)) {
    //     type = inferType(node.type, cache);
    // } else if (isFieldMember(node)) {
    //     type = inferType(node.type, cache);
    } else if (isStruct(node)) {
        type = createStructType(node);
    } else if (isBinaryExpression(node)) {
        type = inferBinaryExpression(node, cache);
    } else if (isUnaryExpression(node)) {
        if (node.operator === 'NOT') {
            type = createBooleanType();
        } else {
            type = createNumberType();
        }
    // } else if (isPrintStatement(node)) {
    //     type = createVoidType();
    // } else if (isReturnStatement(node)) {
    //     if (!node.value) {
    //         type = createVoidType();
    //     } else {
    //         type = inferType(node.value, cache);
    //     }
    }
    if (!type) {
        type = createErrorType('Could not infer type for ' + node.$type, node);
    }

    cache.set(node, type);
    return type;
}

function inferTypeRef(node: TypeReference, cache: Map<AstNode, TypeDescription>): TypeDescription {
    if (node.primitive) {
        if (node.primitive === 'DINT') {
            return createNumberType();
        } else if (node.primitive === 'BOOL') {
            return createBooleanType();
        }
    } else if (node.string) {
        if (node.string?.type === "STRING" || node.string?.type ==="WSTRING") {
            return createStringType();
        }
    } else if (node.struct) {
        if (node.struct) {
            return createStructType(node.struct);
        }
    } else if (node.udtRef) {
        if (node.udtRef) {
            return createUdtRefType(node.udtRef);
        }
    // } else if (node.returnType) {
    //     const returnType = inferType(node.returnType, cache);
    //     const parameters = node.parameters.map((e, i) => ({
    //         name: e.name ?? `$${i}`,
    //         type: inferType(e.type, cache)
    //     }));
    //     return createFunctionType(returnType, parameters);
    }
    return createErrorType('Could not infer type for this reference', node);
}

function inferDbMemberCall(node: DbMemberCall, cache: Map<AstNode, TypeDescription>): TypeDescription {
    const element = node.element?.ref;
    if (element) {
        return inferType(element, cache);
    }
    return createErrorType('Could not infer type for element ' + node.element?.$refText, node);
}

function inferMemberCall(node: MemberCall, cache: Map<AstNode, TypeDescription>): TypeDescription {
    const element = node.element?.ref;
    if (element) {
        return inferType(element, cache);
    } else if (node.functionCall && node.previous) {
        const previousType = inferType(node.previous, cache);
        if (isFunctionType(previousType)) {
            return previousType.returnType;
        }
        return createErrorType('Cannot call operation on non-function type', node);
    }
    return createErrorType('Could not infer type for element ' + node.element?.$refText, node);
}

function inferBinaryExpression(expr: BinaryExpression, cache: Map<AstNode, TypeDescription>): TypeDescription {
    if (['-', '*', '/', '**', 'MOD'].includes(expr.operator)) {
        return createNumberType();
    } else if (['AND', '&', 'OR', 'XOR', '<', '<=', '>', '>=', '=', '<>'].includes(expr.operator)) {
        return createBooleanType();
    }
    const left = inferType(expr.left, cache);
    const right = inferType(expr.right, cache);
    if (expr.operator === '+') {
        if (isStringType(left) || isStringType(right)) {
            return createStringType();
        } else {
            return createNumberType();
        }
    } else if (expr.operator === ':=') {
        return right;
    }
    return createErrorType('Could not infer type from binary expression', expr);
}
