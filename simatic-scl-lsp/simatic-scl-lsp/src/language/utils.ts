import { ReferenceInfo } from "langium";
import { Model } from "./generated/ast.js";

export function GetAllVarDecsFromModel(model: Model) {
    return model.decBlocks.flatMap(v => v.varDecs);
}

export function GetModelContainerFromContext(context: ReferenceInfo): Model | undefined {
    let container = context.container;
    while (container.$container && container.$type != "Model") {
        container = container.$container;
    }

    return container.$type === "Model" ? container as Model : undefined;
}
