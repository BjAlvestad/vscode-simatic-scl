import type { AstNode, AstNodeDescription, LangiumDocument, LangiumServices, Module, PartialLangiumServices, PrecomputedScopes } from 'langium';
// import type { DomainModelServices } from './domain-model-module.js';
// import type { QualifiedNameProvider } from './domain-model-naming.js';
// import type { Domainmodel, PackageDeclaration } from './generated/ast.js';
import { DefaultScopeComputation, interruptAndCheck, MultiMap, streamAllContents } from 'langium';
// import { CancellationToken } from 'vscode-jsonrpc';
import { SclAddedServices, SclServices } from './scl-module';
// import { isType, isPackageDeclaration } from './generated/ast.js';

// Scope computation for our C++-like language
export class SclScopeComputation extends DefaultScopeComputation {

    constructor(services: LangiumServices) {
        super(services);
    }
}

// Services module for overriding the scope computation
// Your language module is usually placed in your `<dsl-name>-module.ts` file
export const SclModule: Module<SclServices, PartialLangiumServices & SclAddedServices> = {
    references: {
        ScopeComputation: (services) => new SclScopeComputation(services)
    }
}
