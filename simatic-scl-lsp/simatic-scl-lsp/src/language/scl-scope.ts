import type { ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, isVariableDeclaration, MemberCall, Struct } from './generated/ast.js';
import { inferType } from './type-system/infer.js';
import { isStructType } from './type-system/descriptions.js';
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
        console.log("container type: " + context.container.$type)
        console.log("context property: " + context.property)
        console.log("\n")

        // if (isNamedElement(context.container.)) {
        //     console.log("TRUEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        // }

        if (context.property === 'element') {
            const memberCall = context.container as MemberCall;
            const previous = memberCall.previous;

             /** RETURNS normal scope if it has no previous (i.e. is top level ref) */
             if (!previous) {
                console.log("Has no previous, so returning context")
                return super.getScope(context);
             }
            
            //** Makes nested scope work, but not auto-complete for it (but you can write the elements out, and it works, and if you write element not inside struct you get red underlines (as you should)) */
            const previousType = inferType(previous, new Map());
            console.log("inferred previous type: " + previousType.$type)
            if (isStructType(previousType)) {
                console.log("previousType isStructType");
                return this.scopeStructMembers(previousType.literal);
            }

            const declItem = AstUtils.getContainerOfType(context.container, isVariableDeclaration);
            console.log("declItem START")
            console.log(declItem)
            console.log(declItem?.refName)
            console.log("declItem END")


            this.logTypeInfo(memberCall);

            

            /** RETURNS scope for struct when putting `.` behind a top level struct. */
            if (isMemberCall(memberCall)) {
                console.log("--> memberCall isLocalVariable")
                // const memberCallType = inferType(memberCall, new Map());
                const localVar = memberCall as MemberCall;
                console.log(localVar.$type)  // ==> Local variable
                console.log(localVar.element?.$refText)  // ==> myStruct (when auto completing with dot behind myStruct)
                
                // const varDec = (localVar.element?.ref as VariableDeclaration)
                // console.log(varDec.name)
                // const memberCallIsStruct = varDec.type.struct != undefined;
                // console.log(memberCallIsStruct ? "IS STRUCT" : "Is not struct")
                // if (varDec.type.struct) {
                //     console.log(varDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`) ?? "IS STRUCT")  // Prints internal structure of `myStruct` when putting `.` behind it
                //     const varsInStruct = varDec.type.struct?.vars
                //     return super.createScopeForNodes(varsInStruct)  // This actually returns list of elements in struct. But it gives "Error resolving reference on it afterwards"
                // } else {
                //     console.log("WAS NOT STRUCT SO DO NOT RETURN STRUCT SCOPE")
                // }


                return EMPTY_SCOPE;
            } else {
                console.log("Was not memberCall...")
            }

           

            /** CURRENTLY HAS NO EFFECT - Trying to get it to complete on nested structs.
             * It enters the function, but I cannot find the elements inside the struct to return
             */
            // // const varDec = (memberCall?.$container as VariableDeclaration)
            // if (isMemberCall(previous)) {
            //     console.log("Previous isMemberCall")
            //     const prevCall = previous as MemberCall
            //     const struct = prevCall.element?.ref?.type.struct;
            //     if (struct) {
            //         console.log("!!!! IT IS STRUCT !!!!!")
            //         this.logTypeInfo(memberCall);
            //         console.log("         Vars inside previous   " + (prevCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
            //         console.log("         Vars inside current   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
            //         // console.log("         Vars inside current element   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))

            //         const currentVarDec = memberCall.element as unknown as VariableDeclaration
            //         console.log(`         Is currentVarDec undefined? ${(currentVarDec === undefined)}`)
            //         console.log(`         Has currentVarDec type? ${(currentVarDec.type)}`)
            //         console.log(`         Has currentVarDec struct? ${(currentVarDec.type.struct)}`)
            //         console.log(`         Vars inside element  ${(currentVarDec.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`))}`)

            //         // console.log("         Vars inside current element   " + (memberCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
            //         // console.log("         Vars inside previous element   " + (prevCall.element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)))
                    
            //         if (memberCall.element?.ref?.type.struct) {
            //             console.log("no loop")
            //             console.log(`         MemberCall element ref is struct type? ${memberCall.element?.ref?.type.struct}`)  // Call to memberCall.element?.ref Causes infinite loop
            //         }
            //         return super.createScopeForNodes(struct.vars)
            //     }
            // }
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
        // console.log("\nmemberCall printout\n")
        // console.log(memberCall)
        // console.log("\nmemberCall.$container printout\n")
        // console.log(memberCall.$container)
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
        // if (isMemberCall(previous) && previous.previous) {
        //     console.log("    '2x previous' type: " + previous.previous.$type);
        //     console.log("    '2x previous' element var refText: " + (isMemberCall(previous.previous)
        //         ? `${(previous.previous as MemberCall).element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
        //         : "Skipped. 'previous.previous' exists, but is not MemberCall."
        //     ));
        //     if (isMemberCall(previous.previous) && previous.previous.previous) {
        //         console.log("    '3x previous' type: " + memberCall.$type);
        //         console.log("    '3x previous' element var refText: " + (isMemberCall(previous.previous.previous)
        //             ? `${(previous.previous.previous as MemberCall).element?.ref?.type.struct?.vars.map(g => `\n  ${g.name} : ${g.type.primitive ?? "not primitive"}`)}`
        //             : "Skipped. 'previous.previous.previous' exists, but is not MemberCall."
        //         ));
        //     } else {
        //         console.log("    'previous.previous.previous' does not exist.");
        //     }
        // } else {
        //     console.log("    'previous.previous' does not exist.");
        // }

        console.log("---\n");
    }

    private scopeStructMembers(structItem: Struct) {
        return this.createScopeForNodes(structItem.vars);
    }

    // private scopeClassMembers(classItem: Class): Scope {
    //     const allMembers = getClassChain(classItem).flatMap(e => e.members);
    //     return this.createScopeForNodes(allMembers);
    // }
}