import { AstNode } from "langium";
import { Hover } from "vscode-languageclient";
import { isStruct, isNamedElement, isSclBlock, isVariableDeclaration, isAttibutesList, isXmlModel } from "../generated/ast.js";
import { isErrorType, typeToString } from "../type-system/descriptions.js";
import { inferType } from "../type-system/infer.js";
import { AstNodeHoverProvider } from "langium/lsp";

export class SclHoverProvider extends AstNodeHoverProvider {
    protected getAstNodeHoverContent(node: AstNode): Hover | undefined {
        if (isStruct(node)) {
            return {
                contents: {
                    kind: 'markdown',
                    language: 'scl',
                    value: `struct ${node.varDecs}}`
                }
            }
        } else if (isNamedElement(node)) {
            const type = inferType(node, new Map());
            if (isErrorType(type)) {
                return undefined;
            }
            if(isSclBlock(node)) {
            } else if ( node.type.primitive) {
                return {
                    contents: {
                        kind: 'markdown',
                        language: 'scl',
                        value: `var ${node.name}: ${node.type.primitive} (Inferred type is ${typeToString(type)})`
                    }
                }
            } else if (node.type.struct) {
                return {
                    contents: {
                        kind: 'markdown',
                        language: 'scl',
                        value: `var ${node.name}: STRUCT ${node.type.struct.varDecs.map(v => `\n  ${v.name} : ${isVariableDeclaration(v) ? v.type.primitive : 'STRUCT'}`)}\n(Inferred type is ${typeToString(type)})`
                    }
                }
            } else if (node.type.udtRef) {
                // This hover does not trigger for some reason.
                return {
                    contents: {
                        kind: 'markdown',
                        language: 'scl',
                        value: `var ${node.name}: UDT ${node.type.udtRef} (Inferred type is ${typeToString(type)})`
                    }
                }
            }
        }
        return undefined;
    }
}
