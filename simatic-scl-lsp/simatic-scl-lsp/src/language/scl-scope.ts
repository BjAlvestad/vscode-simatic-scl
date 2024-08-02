import type { ReferenceInfo, Scope } from 'langium';
import { EMPTY_SCOPE, MapScope } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { BlockStart, isMemberCall, isUdtRef, MemberCall, Struct, UdtRef } from './generated/ast.js';
import { inferType } from './type-system/infer.js';
import { isStructType } from './type-system/descriptions.js';

export class SclScopeProvider extends DefaultScopeProvider {
    skipConsoleLog = true;

    /** Global scope */
    protected override getGlobalScope(referenceType: string, context: ReferenceInfo): Scope {
        if (referenceType === BlockStart) {
            return new MapScope(this.indexManager.allElements(BlockStart));
        } else {
            return EMPTY_SCOPE;
        }
    }

    /** Context based scope */
    override getScope(context: ReferenceInfo): Scope {
        this.logContextInfo(context, this.skipConsoleLog)

        if (context.property === 'element') {
            const memberCall = context.container as MemberCall;
            const previous = memberCall.previous;
            this.logTypeInfo(memberCall, this.skipConsoleLog)

             /** RETURNS normal scope if it has no previous (i.e. is top level ref) */
             if (!previous) {
                return super.getScope(context);
             }
            
            //** Makes nested scope work, but not auto-complete for it (but you can write the elements out, and it works, and if you write element not inside struct you get red underlines (as you should)) */
            const previousType = inferType(previous, new Map());
            if (isStructType(previousType)) {
                return this.scopeStructMembers(previousType.literal);
            }

            if (isUdtRef(previousType)) {
                return this.scopeUdtMembers(previousType.literal);
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
        console.log("    'current' functionCustom var refText: " + (memberCall.element?.$refText
            ?? (memberCall.element ? "Has element var" : `element is undefined.`)
        ));
        console.log("    'current' element var refText: " + (memberCall.element?.$refText
            ?? (memberCall.element ? "Has element" : `element is undefined.`)
        ));
        if (previous) {
            console.log("    'previous' type: " + previous.$type);
            console.log("    'previous' element var refText: " + (isMemberCall(previous)
                ? `${(previous as MemberCall).element?.$refText}`
                : "Skipped. 'previous' exists, but is not MemberCall."
            ));
        } else {
            console.log("    'previous' does not exist.");
        }

        console.log("---\n");
    }

    private scopeStructMembers(structItem: Struct) {
        return this.createScopeForNodes(structItem.vars);
    }

    private scopeUdtMembers(udtItem: UdtRef) {
        if (udtItem.udtRef.ref?.$container.udtStruct.vars) {
            return this.createScopeForNodes(udtItem.udtRef.ref?.$container.udtStruct.vars);
        }

        return EMPTY_SCOPE;
    }
}