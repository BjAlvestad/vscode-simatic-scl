import { Model } from "./generated/ast.js";

export function GetAllVarDecsFromModel(model: Model) {
    return model.decBlocks.flatMap(v => v.varDecs);
}
