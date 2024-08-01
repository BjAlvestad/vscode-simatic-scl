import type { ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isLocalVariable, isMemberCall, isNamedElement, isVariableDeclaration, LocalVariable, MemberCall, VariableDeclaration } from './generated/ast.js';
import { inferType } from './type-system/infer.js';

/**
 * Scope provider that restricts scope to a single file
 */
export class SclScopeProvider extends DefaultScopeProvider {
    // protected override getGlobalScope(referenceType: string): Scope {
    //     return EMPTY_SCOPE;
    // }

    override getScope(context: ReferenceInfo): Scope {
        console.log("\n\n\n")
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
            if (!previous) {
                console.log("        not previous, so return context")
                if (isLocalVariable(memberCall.$container)) {
                    console.log("            but first log more info on memberCall itself")
                    // const memberCallType = inferType(memberCall, new Map());
                    const localVar = memberCall.$container as LocalVariable;
                    // const varDec = memberCall.$container as VariableDeclaration;
                    console.log(localVar.$type)  // ==> Local variable
                    console.log(localVar.var.$refText)  // ==> myStruct (when auto completing with dot behing myStruct)
                    
                    const varDec = (localVar.var.ref as VariableDeclaration)
                    console.log(varDec.name)
                    console.log(varDec.type.struct ? "IS STRUCT" : "Is not struct")
                    console.log(varDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`) ?? "IS STRUCT")  // Prints internal structure of `myStruct` when putting `.` behind it


                    // console.log(localVar.type.struct ? "Is struct" : localVar.type.primitive ?? "unknown type")
                    // console.log(memberCallType)
                    // return super.createScopeForNodes(Array.from(varDec.type.struct?.vars.flatMap(g => g.)))
                }
                return super.getScope(context);
            }
            console.log("    previous: " + previous)  // Gives and object
            console.log("    previous type: " + previous?.$type)  // E.g. `MemberCall`
            
            const previousType = inferType(previous, new Map());
            console.log("Previous type: " + previousType)
            if (isVariableDeclaration(previousType)) {
                console.log("INSIDE isVariableDeclaration RETURNING scopeStructMembers")
                return this.scopeStructMembers(previousType)
            }
            if (isNamedElement(previousType)) {
                console.log("INSIDE isNamedElement RETURNING scopeStructMembers")
                return this.scopeStructMembers(previousType)
            }
            if (isMemberCall(previousType)) {
                console.log("INSIDE isNamedElement RETURNING scopeStructMembers")
                return this.scopeStructMembers(previousType)
            }

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

    private scopeStructMembers(variableDecl: VariableDeclaration) {
        if (variableDecl.type.struct) {
            const allMembers = variableDecl.type.struct.vars;
            return this.createScopeForNodes(allMembers);
        }

        return EMPTY_SCOPE;
    }

    // private scopeClassMembers(classItem: Class): Scope {
    //     const allMembers = getClassChain(classItem).flatMap(e => e.members);
    //     return this.createScopeForNodes(allMembers);
    // }
}