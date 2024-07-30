import type { ReferenceInfo, Scope } from 'langium';
// import { EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall } from './generated/ast.js';

/**
 * Scope provider that restricts scope to a single file
 */
export class SclScopeProvider extends DefaultScopeProvider {
    // protected override getGlobalScope(referenceType: string): Scope {
    //     return EMPTY_SCOPE;
    // }

    override getScope(context: ReferenceInfo): Scope {
        console.log("****  INSIDE getScope() !!!  ****")
        if (context.property === 'element' && isMemberCall(context.container)) {
            console.log("  ** inside IF  **")
            // const memberCall = context.container;
            // const previous = memberCall.previous;
            // console.log("    memberCurrent: " + memberCall)
            // console.log("    memberCurrent type: " + memberCall.$type)
            // console.log("    previous: " + previous)
            // console.log("    previous type: " + previous?.$type)
            // console.log(previous)
            // if (!previous) {
            //     console.log("      inside !previous")
            //     return super.getScope(context)
            // }
        }

        // When the target of our member call isn't a class
        // This means it is either a primitive type or a type resolution error
        // Simply return an empty scope
        // return EMPTY_SCOPE;
        return super.getScope(context);
    }

    // private scopeClassMembers(classItem: Class): Scope {
    //     const allMembers = getClassChain(classItem).flatMap(e => e.members);
    //     return this.createScopeForNodes(allMembers);
    // }
}