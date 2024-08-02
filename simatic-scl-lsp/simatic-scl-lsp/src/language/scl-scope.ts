import type { ReferenceInfo, Scope } from 'langium';
import { EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, MemberCall, VariableDeclaration } from './generated/ast.js';
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
            if (isMemberCall(memberCall.$container)) {
                console.log("--> memberCall isLocalVariable")
                // const memberCallType = inferType(memberCall, new Map());
                const localVar = memberCall.$container as MemberCall;
                console.log(localVar.$type)  // ==> Local variable
                console.log(localVar.element?.$refText)  // ==> myStruct (when auto completing with dot behind myStruct)
                
                const varDec = (localVar.element?.ref as VariableDeclaration)
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
            } else {
                console.log("Was not memberCall...")
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
                const struct = prevCall.element?.ref?.type.struct;
                if (struct) {
                    console.log("!!!! IT IS STRUCT !!!!!")
                    this.logTypeInfo(memberCall);
                    console.log("         Vars inside previous   " + (prevCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    console.log("         Vars inside current   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    // console.log("         Vars inside current element   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))

                    const currentVarDec = memberCall.element as unknown as VariableDeclaration
                    console.log(`         Is currentVarDec undefined? ${(currentVarDec === undefined)}`)
                    console.log(`         Has currentVarDec type? ${(currentVarDec.type)}`)
                    console.log(`         Has currentVarDec struct? ${(currentVarDec.type.struct)}`)
                    console.log(`         Vars inside element  ${(currentVarDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`))}`)

                    // console.log("         Vars inside current element   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    // console.log("         Vars inside previous element   " + (prevCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    
                    if (memberCall.element?.ref?.type.struct) {
                        console.log("no loop")
                        console.log(`         MemberCall element ref is struct type? ${memberCall.element?.ref?.type.struct}`)  // Call to memberCall.element?.ref Causes infinite loop
                    }
                    return super.createScopeForNodes(struct.vars)
                }
            }
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
        if (isMemberCall(previous) && previous.previous) {
            console.log("    '2x previous' type: " + previous.previous.$type);
            console.log("    '2x previous' element var refText: " + (isMemberCall(previous.previous)
                ? `${(previous.previous as MemberCall).element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
                : "Skipped. 'previous.previous' exists, but is not MemberCall."
            ));
            if (isMemberCall(previous.previous) && previous.previous.previous) {
                console.log("    '3x previous' type: " + memberCall.$type);
                console.log("    '3x previous' element var refText: " + (isMemberCall(previous.previous.previous)
                    ? `${(previous.previous.previous as MemberCall).element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
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