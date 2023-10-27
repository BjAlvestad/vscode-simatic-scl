import { DefaultScopeProvider, EMPTY_SCOPE, getContainerOfType, LangiumServices, ReferenceInfo, Scope } from "langium";
import { BlockStart, isBlockStart, MemberCall } from "./generated/ast";
import { isBlockStartType } from "./type-system/descriptions";
import { getBlockStartChain, inferType } from "./type-system/infer";

export class SclScopeProvider extends DefaultScopeProvider {

    constructor(services: LangiumServices) {
        super(services);
    }

    override getScope(context: ReferenceInfo): Scope {
        // target element of member calls
        if (context.property === 'element') {
            // for now, `this` and `super` simply target the container class type
            if (context.reference.$refText === 'this' || context.reference.$refText === 'super') {
                const blockItem = getContainerOfType(context.container, isBlockStart);
                if (blockItem) {
                    return this.scopeBlockStartMembers(blockItem);
                } else {
                    return EMPTY_SCOPE;
                }
            }
            const memberCall = context.container as MemberCall;
            const previous = memberCall.previous;
            if (!previous) {
                return super.getScope(context);
            }
            const previousType = inferType(previous, new Map());
            if (isBlockStartType(previousType)) {
                return this.scopeBlockStartMembers(previousType.literal);
            }
            return EMPTY_SCOPE;
        }
        return super.getScope(context);
    }

    private scopeBlockStartMembers(blockItem: BlockStart): Scope {
        const allMembers = getBlockStartChain(blockItem).flatMap(e => e.members);
        return this.createScopeForNodes(allMembers);
    }
}