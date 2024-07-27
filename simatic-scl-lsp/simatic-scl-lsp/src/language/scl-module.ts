import { type Module, inject } from 'langium';
import { createDefaultModule, createDefaultSharedModule, type DefaultSharedModuleContext, type LangiumServices, type LangiumSharedServices, type PartialLangiumServices } from 'langium/lsp';
import { SclGeneratedModule, SclGeneratedSharedModule } from './generated/module.js';
import { SclValidator, registerValidationChecks } from './scl-validator.js';
import { SclScopeProvider } from './scl-scope-provider.js';

/**
 * Declaration of custom services - add your own service classes here.
 */
export type SclAddedServices = {
    validation: {
        SclValidator: SclValidator
    }
}

/**
 * Union of Langium default services and your custom services - use this as constructor parameter
 * of custom service classes.
 */
export type SclServices = LangiumServices & SclAddedServices

/**
 * Dependency injection module that overrides Langium default services and contributes the
 * declared custom services. The Langium defaults can be partially specified to override only
 * selected services, while the custom services must be fully specified.
 */
export const SclModule: Module<SclServices, PartialLangiumServices & SclAddedServices> = {
    validation: {
        SclValidator: () => new SclValidator()
    },
    references: {
        ScopeProvider: (services) => new SclScopeProvider(services)
    },
};

/**
 * Create the full set of services required by Langium.
 *
 * First inject the shared services by merging two modules:
 *  - Langium default shared services
 *  - Services generated by langium-cli
 *
 * Then inject the language-specific services by merging three modules:
 *  - Langium default language-specific services
 *  - Services generated by langium-cli
 *  - Services specified in this file
 *
 * @param context Optional module context with the LSP connection
 * @returns An object wrapping the shared services and the language-specific services
 */
export function createSclServices(context: DefaultSharedModuleContext): {
    shared: LangiumSharedServices,
    Scl: SclServices
} {
    const shared = inject(
        createDefaultSharedModule(context),
        SclGeneratedSharedModule
    );
    const Scl = inject(
        createDefaultModule({ shared }),
        SclGeneratedModule,
        SclModule
    );
    shared.ServiceRegistry.register(Scl);
    registerValidationChecks(Scl);
    if (!context.connection) {
        // We don't run inside a language server
        // Therefore, initialize the configuration provider instantly
        shared.workspace.ConfigurationProvider.initialized({});
    }
    return { shared, Scl };
}
