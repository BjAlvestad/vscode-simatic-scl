import type { Scope } from 'langium';
import { EMPTY_SCOPE } from 'langium';
import { DefaultScopeProvider } from 'langium';

/**
 * Scope provider that restricts scope to a single file
 */
export class SclScopeProvider extends DefaultScopeProvider {
    protected override getGlobalScope(referenceType: string): Scope {
        return EMPTY_SCOPE;
    }
}