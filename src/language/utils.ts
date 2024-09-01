import { Model } from "./generated/ast.js";

export function GetAllVarDecsFromModel(model: Model) {
    return model.decBlocks.flatMap(v => v.varDecs);
}

/**
 * Get relative path from end of rootPath specified as argumetn
 * @param rootPath full or part of path (skipping on left side) up to point to be removed from full path
 * @param fullPath the full path to convert path relative to root
 * @param skipLeft number of characters to ignore in rootPath when matching towards fullPath. Default 12 to skip e.g. `file:///c%3A/`
 */
export function absoluteToRelativePath(rootPath: string, fullPath: string, skipLeft = 12): string {
    rootPath = rootPath.substring(skipLeft);
    const relativePathStart = fullPath.indexOf(rootPath + "/") + rootPath.length + 1;
    return fullPath.substring(relativePathStart)
}