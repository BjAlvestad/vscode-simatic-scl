import {
    AstNode,
    DefaultWorkspaceManager,
    FileSystemNode,
    LangiumDocument,
    LangiumDocumentFactory,
    UriUtils,
} from "langium";
import { WorkspaceFolder } from 'vscode-languageserver-types';
import { URI } from "vscode-uri";
import * as builtinLibrary from './built-in-scl-libraries/built-in-scl-library-functions.js'
import { LangiumSharedServices } from "langium/lsp";
import { absoluteToRelativePath } from "./utils.js";

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;
        // services.workspace.FileSystemProvider.readFile() //TODO: Read json file - must convert "scl-lsp-filter.json" to 
    }

    protected override async loadAdditionalDocuments(
        folders: WorkspaceFolder[],
        collector: (document: LangiumDocument<AstNode>) => void
    ): Promise<void> {
        await super.loadAdditionalDocuments(folders, collector);
        // Load our library using the `builtin` URI schema
        for (let key in builtinLibrary.uriMap) {
            const fullUri = 'builtin://' + key;
            collector(this.documentFactory.fromString(builtinLibrary.uriMap[key], URI.parse(fullUri)));
        }
    }

    protected override includeEntry(_workspaceFolder: WorkspaceFolder, entry: FileSystemNode, fileExtensions: string[]): boolean {
        const name = UriUtils.basename(entry.uri);
        if (name.startsWith('.')) {
            return false;
        }
        if (entry.isDirectory) {
            const relativePath = absoluteToRelativePath(_workspaceFolder.uri, entry.uri.path);
            console.log('Dir path:\t' + relativePath+ ` (${name})`)

            // return name === 'SimpleStruct';
            return name !== 'node_modules' && name !== 'out';
        } else if (entry.isFile) {
            const extname = UriUtils.extname(entry.uri);
            const relativePath = absoluteToRelativePath(_workspaceFolder.uri, entry.uri.path);
            console.log('File path:\t' + relativePath + ` (${name})`)
            return fileExtensions.includes(extname);
        }
        return false;
    }
}
