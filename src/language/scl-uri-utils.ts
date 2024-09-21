
import { URI, UriUtils } from 'langium';

export namespace SclUriUtils {

    export function extname(uri: URI): string {
        const ext = uri.path.endsWith('.tags.xml') ? '.tags.xml' : UriUtils.extname(uri);
        return ext;
    }

}
