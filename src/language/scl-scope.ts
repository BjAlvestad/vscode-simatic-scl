import { DocumentCache, MapScope, ReferenceInfo, Scope } from 'langium';
import { AstUtils, EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';
import { isDbBlock, isMemberCall, isSclBlock, isUdtRef, isVariableDeclaration, MemberCall, Model, SclBlock, Struct, UdtRef, XmlModel } from './generated/ast.js';
import { inferType } from './type-system/infer.js';
import { isGlobalDbBlockType, isInstanceDbBlockType, isStructType } from './type-system/descriptions.js';
import { GetAllVarDecsFromModel } from './utils.js';
import { isBuiltInFunctionWithoutParameters } from './built-in-scl-libraries/built-in-scl-library-functions.js'
import { SclServices } from './scl-module.js';

export class SclScopeProvider extends DefaultScopeProvider {
    skipConsoleLog = true;
    services;

    protected readonly scopeCache: DocumentCache<
      string,
      Scope
    >; // DocumentCache becomes invalidated as soon the corresponding document is updated

    constructor(services: SclServices) {
        super(services);
        this.services = services;
        this.scopeCache = new DocumentCache(services.shared);
      }

    protected override getGlobalScope(referenceType: string, _context: ReferenceInfo): Scope {
        switch (_context.container.$type) {
            case 'UdtRef':
            case 'DbBlock':
                return this.globalScopeCache.get(
                    referenceType,
                    () => new MapScope(
                        this.indexManager.allElements(SclBlock).filter(e => e.type === 'UdtBlock' || e.type === 'FbBlock')
                    )
                );
            case 'MemberCall':
            case 'DbMemberCall':
                return this.globalScopeCache.get(
                    referenceType,
                    () => new MapScope(
                        this.indexManager.allElements(SclBlock).filter(e => e.type === 'DbBlock' || e.type === 'FcBlock')
                            .concat(this.getTagsAsAstNodeDescriptions())
                    )
                );
            default:
                return EMPTY_SCOPE;
        }
    }

    private getTagsAsAstNodeDescriptions() {
        return (
            this.services.shared.workspace.LangiumDocuments.all
            .filter(doc => doc.uri.path.endsWith('xml'))
            .flatMap(xmlDoc =>
                (xmlDoc.parseResult.value as XmlModel).plcTagTable.objectList.plcTags
                    .flatMap(tags => this.descriptions.createDescription(tags.attributes, tags.attributes.name))
            )
        )
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
                // This makes auto complete work for formal parameter in function call. But still get red underline for linking error
                let memberCallContainer = memberCall.$container;
                if(isMemberCall(memberCallContainer)
                    && memberCallContainer.explicitOperationCall
                    && !isBuiltInFunctionWithoutParameters(memberCallContainer.element.$refText)
                    && memberCallContainer.element.ref?.name
                ) {
                    const uri = AstUtils.findRootNode(memberCallContainer).$document!.uri.toString();
                    const scope = this.scopeCache.get(memberCallContainer.element.ref?.name, uri, () => this.scopeFormalParameters(memberCallContainer as MemberCall));
                    if (scope !== EMPTY_SCOPE) { return scope}
                }
                // This fixes linking for formal parameter in function call.
                memberCallContainer = memberCall.$container?.$container;
                if(isMemberCall(memberCallContainer)
                    && memberCallContainer.explicitOperationCall
                    && memberCall.$containerProperty === 'left'
                    && memberCallContainer.element.ref?.name
                ) {
                    const uri = AstUtils.findRootNode(memberCallContainer).$document!.uri.toString();
                    const scope = this.scopeCache.get(memberCallContainer.element.ref?.name, uri, () => this.scopeFormalParameters(memberCallContainer as MemberCall));
                    if (scope !== EMPTY_SCOPE) { return scope}
                }

                const model = AstUtils.findRootNode(context.container);
                if (isSclBlock(model)) {
                    if (model.$type === "DbBlock" && model.dbFromUdt?.ref) {
                        const uri = AstUtils.findRootNode(model.dbFromUdt?.ref).$document!.uri.toString();
                        const scope = this.scopeCache.get(model.dbFromUdt.ref.name, uri, () => super.createScopeForNodes(GetAllVarDecsFromModel(model.dbFromUdt?.ref as SclBlock)));
                        return scope;
                    }

                    return this.createScopeForLocalVarsAndGlobalBlocks(model, context);
                }
                return EMPTY_SCOPE;
             }
            
            //** Makes nested scope for structs work */
            const previousType = inferType(previous, new Map());
            if (isStructType(previousType)) {
                const uri = AstUtils.findRootNode(previousType.literal).$document!.uri.toString();
                return this.scopeCache.get(previousType.literal.$container.$container.name, uri, () => this.scopeStructMembers(previousType.literal));
            }

            if (isUdtRef(previousType)) {
                const uri = AstUtils.findRootNode(previousType.literal).$document!.uri.toString();
                return this.scopeCache.get(previousType.literal.$container.$container.name, uri, () => this.scopeUdtMembers(previousType.literal));
            }

            if (isInstanceDbBlockType(previousType)) {
                if (previousType.literal.dbFromUdt?.ref?.decBlocks) {
                    const dbRef = previousType.literal.dbFromUdt?.ref;
                    const uri = AstUtils.findRootNode(dbRef).$document!.uri.toString();
                    return this.scopeCache.get(dbRef.name, uri, () => this.createScopeForNodes(dbRef.decBlocks.flatMap(c => c.varDecs)));

                //TODO: Implement for dbFromBuiltInFunction as well (part outside of scope not yet implemented, where it references built in, hence the commented out code blow wil not work yet)
                // } else if (previousType.literal.dbFromBuiltInFunction?.ref?.decBlocks) {
                //     return this.createScopeForNodes(previousType.literal.dbFromBuiltInFunction?.ref?.decBlocks.flatMap(c => c.varDecs))
                }
            }

            if (isGlobalDbBlockType(previousType)) {
                const uri = AstUtils.findRootNode(previousType.literal).$document!.uri.toString();
                return this.scopeCache.get(previousType.literal.name, uri, () => this.createScopeForNodes(previousType.literal.decBlocks.flatMap(c => c.varDecs)));
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
        const varDecs = udtItem.udtRef.ref?.decBlocks.flatMap(c => c.varDecs);
        if (varDecs) {
            return this.createScopeForNodes(varDecs);
        }

        return EMPTY_SCOPE;
    }

    private scopeFormalParameters(memberCallContainer: MemberCall | undefined) {
        if (!memberCallContainer) {
            return EMPTY_SCOPE;
        }
        if (isVariableDeclaration(memberCallContainer.element.ref)) {
            const decBlocks = memberCallContainer.element.ref.type.udtRef?.udtRef.ref?.decBlocks;
            if (decBlocks) {
                return this.createScopeForNodes(decBlocks.flatMap(c => c.varDecs))
            }
        }
        if (isSclBlock(memberCallContainer.element.ref)) {
            const functionRef = memberCallContainer.element.ref;
            if (isDbBlock(functionRef) && functionRef.dbFromUdt?.ref) {
                return this.createScopeForNodes(functionRef.dbFromUdt.ref.decBlocks.flatMap(c => c.varDecs))
            }
            return this.createScopeForNodes(functionRef.decBlocks.flatMap(c => c.varDecs))
        }

        return EMPTY_SCOPE;
    }

    private createScopeForLocalVarsAndGlobalBlocks(model: Model, context: ReferenceInfo) {
        const uri = AstUtils.findRootNode(model).$document!.uri.toString();
        const allLocalVars = this.scopeCache.get(model.name, uri, () => this.createScopeForNodes(GetAllVarDecsFromModel(model)));

        const referenceType = this.reflection.getReferenceType(context);
        let scopeFromGlobal: Scope = this.getGlobalScope(referenceType, context);

        return this.createScope(allLocalVars.getAllElements(), scopeFromGlobal);
    }
}