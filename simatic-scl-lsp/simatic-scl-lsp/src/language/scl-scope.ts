import type { ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, isNamedElement } from './generated/ast.js';

/**
 * Scope provider that restricts scope to a single file
 */
export class SclScopeProvider extends DefaultScopeProvider {
    protected override getGlobalScope(referenceType: string): Scope {
        return EMPTY_SCOPE;
    }

    override getScope(context: ReferenceInfo): Scope {
        console.log("")
        console.log("****  INSIDE getScope() !!!  ****")
        console.log("    refText: " + context.reference.$refText)  // Gives variable name
        console.log("    refNode: " + context.reference.$refNode)  // An object
        console.log("    nodeDescription: " + context.reference.$nodeDescription)  // undefined

        // const localRefs = AstUtils.findLocalReferences(context.container)
        // console.log("local refs: " + localRefs)

        const variableDeclarationItem = AstUtils.getContainerOfType(context.container, isNamedElement)
        console.log("    VariableDeclaration: " + variableDeclarationItem)
        console.log("    VariableDeclaration name: " + variableDeclarationItem?.name)

        if (context.property === 'element' && isMemberCall(context.container)) {
            console.log("  ** inside IF  **")
            const memberCall = context.container;
            const previous = memberCall.previous;
            console.log("    memberCurrent: " + memberCall)  // An object
            console.log("    memberCurrent type: " + memberCall.$type)  // E.g. `MemberCall`
            console.log("    previous: " + previous)  // Gives and object
            console.log("    previous type: " + previous?.$type)  // E.g. `MemberCall`
            
            
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