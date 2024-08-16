import { AstNode } from "langium";
import { isMemberCall, Model } from "./generated/ast.js";

export function GetAllVarDecsFromModel(model: Model) {
    return model.decBlocks.flatMap(v => v.varDecs);
}

export function findExplicitOperationCallOrRootNode(node: AstNode): AstNode {
    while (node.$container) {
        if (isMemberCall(node) && node.explicitOperationCall){
            return node
        }
        node = node.$container;
    }
    return node;
}