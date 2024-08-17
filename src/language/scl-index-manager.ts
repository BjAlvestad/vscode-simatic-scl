import { DefaultIndexManager, LangiumDocument } from "langium";

export class SclIndexManager extends DefaultIndexManager {

    override isAffected(document: LangiumDocument, changedUris: Set<string>): boolean {
        return super.isAffected(document, changedUris);
        
        // Always return false (until program has been optimalized further)
        // Renaming linked objects with rename functionality will still work,
        // but if you just rename one, it will no longer break the link.
        // return false;
    }
}
