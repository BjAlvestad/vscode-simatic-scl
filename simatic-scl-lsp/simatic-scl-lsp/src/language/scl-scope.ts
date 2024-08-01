import type { ReferenceInfo, Scope } from 'langium';
import { EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isLocalVariable, isMemberCall, LocalVariable, MemberCall, VariableDeclaration } from './generated/ast.js';
// import { inferType } from './type-system/infer.js';

/**
 * Scope provider that restricts scope to a single file
 */
export class SclScopeProvider extends DefaultScopeProvider {
    DEBUG_WITH_AST_PRINT = false;

    protected override getGlobalScope(referenceType: string): Scope {
        return EMPTY_SCOPE;
    }

    override getScope(context: ReferenceInfo): Scope {
        console.log(`\n\n\n****  INSIDE getScope() for refText ${context.reference.$refText} !!!  ****`)  // Gives variable name

        if (context.property === 'element' && isMemberCall(context.container)) {
            const memberCall = context.container;
            const previous = memberCall.previous;
            
            this.logTypeInfo(memberCall);

            /** RETURNS scope for struct when putting `.` behind a top level struct. */
            if (isLocalVariable(memberCall.$container)) {
                console.log("--> memberCall isLocalVariable")
                // const memberCallType = inferType(memberCall, new Map());
                const localVar = memberCall.$container as LocalVariable;
                console.log(localVar.$type)  // ==> Local variable
                console.log(localVar.var.$refText)  // ==> myStruct (when auto completing with dot behind myStruct)
                
                const varDec = (localVar.var.ref as VariableDeclaration)
                console.log(varDec.name)
                const memberCallIsStruct = varDec.type.struct != undefined;
                console.log(memberCallIsStruct ? "IS STRUCT" : "Is not struct")
                if (varDec.type.struct) {
                    console.log(varDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`) ?? "IS STRUCT")  // Prints internal structure of `myStruct` when putting `.` behind it
                    const varsInStruct = varDec.type.struct?.vars
                    return super.createScopeForNodes(varsInStruct)  // This actually returns list of elements in struct. But it gives "Error resolving reference on it afterwards"
                } else {
                    console.log("WAS NOT STRUCT SO DO NOT RETURN STRUCT SCOPE")
                }

                // console.log(localVar.type.struct ? "Is struct" : localVar.type.primitive ?? "unknown type")
                // console.log(memberCallType)
                // return super.createScopeForNodes(Array.from(varDec.type.struct?.vars.flatMap(g => g.)))
            } else {

            }

            /** RETURNS normal scope if it has no previous (i.e. is top level ref) */
            if (!previous) {
                console.log("Has no previous, so returning context")
                return super.getScope(context);
            }

            /** CURRENTLY HAS NO EFFECT - Trying to get it to complete on nested structs.
             * It enters the function, but I cannot find the elements inside the struct to return
             */
            // const varDec = (memberCall?.$container as VariableDeclaration)
            if (isMemberCall(previous)) {
                console.log("Previous isMemberCall")
                const prevCall = previous as MemberCall
                const struct = prevCall.functionCustom?.var.ref?.type.struct;
                if (struct) {
                    console.log("!!!! IT IS STRUCT !!!!!")
                    this.logTypeInfo(memberCall);
                    console.log("         Vars inside previous   " + (prevCall.functionCustom?.var.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    console.log("         Vars inside current   " + (memberCall.functionCustom?.var.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    // console.log("         Vars inside current element   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    console.log("         Vars inside previous element   " + (prevCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    return super.createScopeForNodes(struct.vars)
                }
            }

            // if (previous) {
            //     console.log("--> HAS PREVIOUS!!!")
            //     if (this.DEBUG_WITH_AST_PRINT) { console.log(previous) } // Will print AST for it
            //     console.log(previous.$type)
            //     console.log(previous.$container.$type)
            //     const previousType = inferType(previous, new Map())
            //     console.log("  Previous type  " + previousType.$type)
            //     if (isVariableDeclaration(previous)) {
            //         console.log("    isVariableDeclaration")
            //     }
            //     if (isVariableDeclaration(previous.$container)) {
            //         console.log("    isVariableDeclaration")
            //     }
            //     if (isLocalVariable(previous)) {
            //         console.log("    isLocalVariable")
            //     }
            //     if (isLocalVariable(previous.$container)) {
            //         console.log("    isLocalVariable")
            //     }
            //     if (isMemberCall(previous)) {
            //         console.log("    isMemberCall")
            //         // const prevLocalVar = previous.$container as LocalVariable;
            //         const memCall = previous as MemberCall;
            //         console.log("         Previous has previous?  " + memCall.previous)
            //         console.log("         Container type?  " + memCall.$container.$type)
            //         console.log("         Element  " + memCall.element)
            //         console.log("\n--- START " + memCall.functionCustom?.var.$refText)
            //         console.log("         functionCustom?   " + (memCall.functionCustom ? "HAS functionCustom" : "Does not have functionCustom"))
            //         console.log("         functionCustom?.var.$refText   " + memCall.functionCustom?.var.$refText)
            //         console.log("         Vars inside previous   " + (memCall.functionCustom?.var.ref?.type.struct ? "HAS STRUCT" : "Does not have struct"))
            //         console.log("         Vars inside previous   " + (memCall.functionCustom?.var.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
            //         console.log("\n--- END " + memCall.functionCustom?.var.$refText)
            //         const prevVarDec = (previous.$container as VariableDeclaration)
            //         console.log("        type  " + prevVarDec.type)
            //         if (memCall.functionCustom?.var.ref?.type.struct?.vars) {
            //             console.log("RETURNING VARS FOR previous !!!")
            //             return super.createScopeForNodes(memCall.functionCustom?.var.ref?.type.struct?.vars)  // With this we no longer get errors after entering the variable - AND we get the hover type for it shown!
            //         }
            //         else {
            //             console.log("PREV WAS NOT STRUCT SO DO NOT RETURN STRUCT SCOPE")
            //         }
            //     }
            //     if (isMemberCall(previous.$container)) {
            //         console.log("    isMemberCall container")
            //     }
            //     if (isLocalVariable(previous.$container)) {
            //         const prevLocalVar = previous.$container as LocalVariable;
            //         console.log(prevLocalVar.$type)  // ==> Local variable
            //         console.log(prevLocalVar.var.$refText)  // ==> myStruct (when auto completing with dot behing myStruct)

            //         const prevVarDec = (prevLocalVar.var.ref as VariableDeclaration)
            //         console.log(prevVarDec.name)
            //         console.log(prevVarDec.type.struct ? "IS STRUCT" : "Is not struct")
            //         if (prevVarDec.type.struct) {
            //             console.log(prevVarDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`) ?? "IS STRUCT")  // Prints internal structure of `myStruct` when putting `.` behind it
            //             const varsInStruct = prevVarDec.type.struct?.vars
            //             return super.createScopeForNodes(varsInStruct)  // This actually returns list of elements in struct. But it gives "Error resolving reference on it afterwards"
            //         }
            //     }
            //     console.log("END OF PREVIOUS...")
            // }

            // console.log("    previous: " + previous)  // Gives and object
            // console.log("    previous type: " + previous?.$type)  // E.g. `MemberCall`
            
            // const previousType = inferType(previous, new Map());
            // console.log("Previous type: " + previousType)
            // if (isVariableDeclaration(previousType)) {
            //     console.log("INSIDE isVariableDeclaration RETURNING scopeStructMembers")
            //     return this.scopeStructMembers(previousType)
            // }
            // if (isNamedElement(previousType)) {
            //     console.log("INSIDE isNamedElement RETURNING scopeStructMembers")
            //     return this.scopeStructMembers(previousType)
            // }
            // if (isMemberCall(previousType)) {
            //     console.log("INSIDE isNamedElement RETURNING scopeStructMembers")
            //     return this.scopeStructMembers(previousType)
            // }

            // const test1 = context.container as MemberCall;
            // // const test2 = context.container.$container as MemberCall;
            // const test3 = context.container.previous as unknown as LocalVariable;
            // console.log("    Test name for container as VariableDeclaration - test1: " + test1)
            // console.log("    Test name for container as VariableDeclaration - node description: " + test1.element?.$nodeDescription)
            // console.log("    Test name for container as VariableDeclaration - refText: " + test1.element?.$refText)
            // console.log("    Test name for container as VariableDeclaration - refNode: " + test1.element?.$refNode)
            // console.log("    Test3: " + test3.var)
            // console.log("    Test3: " + test3.var.$refText)
            // console.log("    Test3: " + test3.var.$refNode)
            // // console.log("    Test name for container as VariableDeclaration: " + test1.element?.ref)
            
            // // if()

            // // console.log(previous)
            // // if (!previous) {
            // //     console.log("      inside !previous")
            // //     return super.getScope(context)
            // // }
        } else {
            console.log("Skipping 'if' with context.property " + context.property)
        }

        console.log(`****  Exiting getScope() for refText ${context.reference.$refText} !!!  ****\n\n\n`)  // Gives variable name


        // When the target of our member call isn't a class
        // This means it is either a primitive type or a type resolution error
        // Simply return an empty scope
        // return EMPTY_SCOPE;
        return super.getScope(context);
    }


    private logTypeInfo(memberCall: MemberCall) {
        const previous = memberCall.previous;
        console.log("\n---");
        console.log("    'current' type: " + memberCall.$type); // E.g. `MemberCall`
        console.log("    'current' functionCustom var refText: " + (memberCall.functionCustom?.var.$refText
            ?? (memberCall.functionCustom ? "Has functionCustom var" : `functionCustom is undefined.`)
        ));
        console.log("    'current' element var refText: " + (memberCall.element?.$refText
            ?? (memberCall.functionCustom ? "Has element" : `element is undefined.`)
        ));
        if (previous) {
            console.log("    'previous' type: " + previous.$type);
            console.log("    'previous' functionCustom var refText: " + (isMemberCall(previous)
                ? `${(previous as MemberCall).functionCustom?.var.$refText}`
                : "Skipped. 'previous' exists, but is not MemberCall."
            ));
        } else {
            console.log("    'previous' does not exist.");
        }
        if (isMemberCall(previous) && previous.previous) {
            console.log("    '2x previous' type: " + previous.previous.$type);
            console.log("    '2x previous' functionCustom var refText: " + (isLocalVariable(previous.previous)
                ? `${(previous.previous as LocalVariable).var.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
                : "Skipped. 'previous.previous' exists, but is not MemberCall."
            ));
            if (isMemberCall(previous.previous) && previous.previous.previous) {
                console.log("    '3x previous' type: " + memberCall.$type);
                console.log("    '3x previous' functionCustom var refText: " + (isLocalVariable(previous.previous.previous)
                    ? `${(previous.previous.previous as LocalVariable).var.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
                    : "Skipped. 'previous.previous.previous' exists, but is not MemberCall."
                ));
            } else {
                console.log("    'previous.previous.previous' does not exist.");
            }
        } else {
            console.log("    'previous.previous' does not exist.");
        }

        console.log("---\n");
    }
    // private scopeStructMembers(variableDecl: VariableDeclaration) {
    //     if (variableDecl.type.struct) {
    //         const allMembers = variableDecl.type.struct.vars;
    //         return this.createScopeForNodes(allMembers);
    //     }

    //     return EMPTY_SCOPE;
    // }

    // private scopeClassMembers(classItem: Class): Scope {
    //     const allMembers = getClassChain(classItem).flatMap(e => e.members);
    //     return this.createScopeForNodes(allMembers);
    // }
}