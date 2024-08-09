import { AstNode, DocumentCache, ReferenceInfo, Scope } from 'langium';
import { EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isMemberCall, isUdtRef, MemberCall, Struct, UdtRef, VariableDeclaration } from './generated/ast.js';
import { inferType } from './type-system/infer.js';
import { isStructType } from './type-system/descriptions.js';
import { GetAllVarDecsFromModel, GetModelContainerFromContext } from './utils.js';
import { SclServices } from './scl-module.js';

export class SclScopeProvider extends DefaultScopeProvider {
    skipConsoleLog = true;

    protected readonly availableElementsPerDocumentCache: DocumentCache<
      string,
      VariableDeclaration[]
    >; // DocumentCache becomes invalidated as soon the corresponding document is updated

    constructor(services: SclServices) {
      super(services);
      this.availableElementsPerDocumentCache = new DocumentCache(services.shared);
    }

    /** Context based scope */
    override getScope(context: ReferenceInfo): Scope {
        this.logContextInfo(context, this.skipConsoleLog)

        if (context.property === 'element') {
            const memberCall = context.container as MemberCall;
            const previous = memberCall.previous;
            const topLevelContainer = this.getTopLevelContainer(memberCall)
            const uri = topLevelContainer.$document?.uri;
            this.logTypeInfo(memberCall, this.skipConsoleLog)

             /** RETURNS normal scope if it has no previous (i.e. is top level ref) */
            if (!previous) {
                const model = GetModelContainerFromContext(context);
                console.log("INSIDE !previous")
                console.log(`uri: ${uri}, model name: ${model?.blockStart.name}`)
                if (uri && model) {
                    console.log("INSIDE uri && model")
                    if (this.availableElementsPerDocumentCache.has(uri, model.blockStart.name)) {
                        console.log("INSIDE get from cash")
                        const cashedVarDecs = this.availableElementsPerDocumentCache.get(uri, model.blockStart.name);
                        return cashedVarDecs ? super.createScopeForNodes(cashedVarDecs) : EMPTY_SCOPE;
                    }
                    console.log("Write to cash and get vars in normal way")
                    const allLocalVars = GetAllVarDecsFromModel(model)
                    this.availableElementsPerDocumentCache.set(uri, model.blockStart.name, allLocalVars)
                    return super.createScopeForNodes(allLocalVars);
                }
                return EMPTY_SCOPE;
             }
            
            //** Makes nested scope for structs work */
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
        const varDecs = udtItem.udtRef.ref?.$container.decBlocks.flatMap(c => c.varDecs);
        if (varDecs) {
            return this.createScopeForNodes(varDecs);
        }

        return EMPTY_SCOPE;
    }

    private getTopLevelContainer(node: AstNode) {
        let container = node.$container as AstNode;
        while(container?.$container)
        {
            container = container.$container;
        }

        return container;
    }
}