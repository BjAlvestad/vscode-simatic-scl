import type { ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, isSclBlock, isUdtRef, MemberCall, SclBlock, Struct, UdtRef } from './generated/ast.js';
import { inferType } from './type-system/infer.js';
import { isGlobalDbBlockType, isInstanceDbBlockType, isStructType } from './type-system/descriptions.js';
import { GetAllVarDecsFromModel } from './utils.js';

export class SclScopeProvider extends DefaultScopeProvider {
    skipConsoleLog = true;

    /** Context based scope */
    override getScope(context: ReferenceInfo): Scope {
        this.logContextInfo(context, this.skipConsoleLog)
        console.log(context.property)

        if (context.property === 'element') {
            const memberCall = context.container as MemberCall;
            const previous = memberCall.previous;
            this.logTypeInfo(memberCall, this.skipConsoleLog)

             /** RETURNS normal scope if it has no previous (i.e. is top level ref) */
            if (!previous) {

                // This makes auto complete work for formal parameter in function call. But still get red underline for linking error
                if(isMemberCall(memberCall.$container) && memberCall.$container?.explicitOperationCall) {
                    console.log("\nmemberCall.$container:")
                    console.log(memberCall.$container.$type)
                    if (isSclBlock(memberCall.$container.element.ref)) {
                        const functionRef = memberCall.$container.element.ref;
                        console.log("\nRef:")
                        console.log(functionRef.$type)
                        console.log("\n")
                        return this.createScopeForNodes(functionRef.decBlocks.flatMap(c => c.varDecs))
                    }
                }
                
                // This fixes linking for formal parameter. But it is also possible to add it to right hand side of `:=`.
                if(isMemberCall(memberCall.$container?.$container) && memberCall.$container?.$container.explicitOperationCall) {
                    console.log("\nmemberCall.$container?.$container:")
                    console.log(memberCall.$container?.$container.$type)
                    if (isSclBlock(memberCall.$container?.$container.element.ref)) {
                        const functionRef = memberCall.$container?.$container.element.ref;
                        console.log("\nRef:")
                        console.log(functionRef.$type)
                        console.log("\n")
                        return this.createScopeForNodes(functionRef.decBlocks.flatMap(c => c.varDecs))
                    }
                }

                const model = AstUtils.findRootNode(context.container);
                if (isSclBlock(model)) {
                    if (model.$type === "DbBlock" && model.dbFromUdt?.ref) {
                        return super.createScopeForNodes(GetAllVarDecsFromModel(model.dbFromUdt.ref));
                    }
                    const allLocalVars = GetAllVarDecsFromModel(model)
                    const allRelevantBlocks = this.indexManager.allElements(SclBlock).filter(e => e.type === 'DbBlock' || e.type === 'FcBlock').map(e => (e.node as SclBlock));
                    allLocalVars.push(...allRelevantBlocks)
                    return super.createScopeForNodes(allLocalVars);
                }
                return EMPTY_SCOPE;
             }
            
            console.log("Has previous")


            //** Makes nested scope for structs work */
            const previousType = inferType(previous, new Map());
            if (isStructType(previousType)) {
                return this.scopeStructMembers(previousType.literal);
            }

            if (isUdtRef(previousType)) {
                return this.scopeUdtMembers(previousType.literal);
            }

            if (isInstanceDbBlockType(previousType)) {
                if (previousType.literal.dbFromUdt?.ref?.decBlocks) {
                    return this.createScopeForNodes(previousType.literal.dbFromUdt?.ref?.decBlocks.flatMap(c => c.varDecs))
                //TODO: Implement for dbFromBuiltInFunction as well (part outside of scope not yet implemented, where it references built in, hence the commented out code blow wil not work yet)
                // } else if (previousType.literal.dbFromBuiltInFunction?.ref?.decBlocks) {
                //     return this.createScopeForNodes(previousType.literal.dbFromBuiltInFunction?.ref?.decBlocks.flatMap(c => c.varDecs))
                }
            }

            if (isGlobalDbBlockType(previousType)) {
                return this.createScopeForNodes(previousType.literal.decBlocks.flatMap(c => c.varDecs));
            }

            return EMPTY_SCOPE;
        }

        return super.getScope(context);
    }

    private logContextInfo(context: ReferenceInfo, skip: Boolean) {
        if (skip) { return; }

        console.log(`\n\n\n****  INSIDE getScope() for refText ${context.reference.$refText} !!!  ****`)  // Gives variable name
        console.log("container type: " + context.container.$type)
        console.log("context property: " + context.property)
        console.log("\n")
    }

    private logTypeInfo(memberCall: MemberCall, skip: Boolean) {
        if (skip) { return; }

        const previous = memberCall.previous;
        console.log("\n---");
        console.log("    'current' type: " + memberCall.$type); // E.g. `MemberCall`
        console.log("    'current' element refText: " + (memberCall.element?.$refText
            ?? (memberCall.element ? "Has element" : `element is undefined.`)
        ));
        if (previous) {
            console.log("    'previous' type: " + previous.$type);
            console.log("    'previous' element refText: " + (isMemberCall(previous)
                ? `${(previous as MemberCall).element?.$refText}`
                : "Skipped. 'previous' exists, but is not MemberCall."
            ));
        } else {
            console.log("    'previous' does not exist.");
        }

        console.log("---\n");
    }

    private scopeStructMembers(structItem: Struct) {
        return this.createScopeForNodes(structItem.varDecs);
    }

    private scopeUdtMembers(udtItem: UdtRef) {
        const varDecs = udtItem.udtRef.ref?.decBlocks.flatMap(c => c.varDecs);
        if (varDecs) {
            return this.createScopeForNodes(varDecs);
        }

        return EMPTY_SCOPE;
    }
}