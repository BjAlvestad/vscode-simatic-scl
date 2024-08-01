import type { ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, isVariableDeclaration, LocalVariable, MemberCall } from './generated/ast.js';

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

        const variableDeclarationItem = AstUtils.getContainerOfType(context.container, isVariableDeclaration)
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
            
            const test1 = context.container as MemberCall;
            // const test2 = context.container.$container as MemberCall;
            const test3 = context.container.previous as unknown as LocalVariable;
            console.log("    Test name for container as VariableDeclaration - test1: " + test1)
            console.log("    Test name for container as VariableDeclaration - node description: " + test1.element?.$nodeDescription)
            console.log("    Test name for container as VariableDeclaration - refText: " + test1.element?.$refText)
            console.log("    Test name for container as VariableDeclaration - refNode: " + test1.element?.$refNode)
            console.log("    Test3: " + test3.var)
            console.log("    Test3: " + test3.var.$refText)
            console.log("    Test3: " + test3.var.$refNode)
            // console.log("    Test name for container as VariableDeclaration: " + test1.element?.ref)
            
            // if()

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