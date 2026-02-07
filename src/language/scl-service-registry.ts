import { DefaultServiceRegistry, LangiumCoreServices, URI } from 'langium';
import { SclUriUtils } from './scl-uri-utils.js';

export class SclServiceRegistry extends DefaultServiceRegistry {

    public override getServices(uri: URI): LangiumCoreServices {
        if (this.languageIdMap.size === 0) {
            throw new Error('The service registry is empty. Use `register` to register the services of a language.');
        }
        const languageId = this.textDocuments?.get(uri.toString())?.languageId;
        if (languageId !== undefined) {
            const services = this.languageIdMap.get(languageId);
            if (services) {
                return services;
            }
        }
        const ext = SclUriUtils.extname(uri);
        const services = this.fileExtensionMap.get(ext);
        if (!services) {
            if (languageId) {
                throw new Error(`The service registry contains no services for the extension '${ext}' for language '${languageId}'.`);
            } else {
                throw new Error(`The service registry contains no services for the extension '${ext}'.`);
            }
        }
        return services;
    }

}
