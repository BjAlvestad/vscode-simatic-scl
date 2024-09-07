import {
    AstNode,
    DefaultWorkspaceManager,
    LangiumDocument,
    LangiumDocumentFactory,
} from "langium";
import { WorkspaceFolder } from 'vscode-languageserver';
import { URI } from "vscode-uri";
import * as builtinLibrary from './built-in-scl-libraries/built-in-scl-library-functions.js'
import { LangiumSharedServices } from "langium/lsp";

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;

        const workspaceFolder = `C:\\Users\\BjAlv\\repos\\vscode-simatic-scl\\test\\examples`
        const fileName = 'config.lsp'
        const path = `${workspaceFolder}\\${fileName}`
        const pathUri = URI.file(path)

        this.fileSystemProvider.readFile(pathUri).then(file => {
            console.log(`file content: ${file}`)
        })
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
            return name !== 'node_modules' && name !== 'out';
        } else if (entry.isFile) {
            const extname = UriUtils.extname(entry.uri);
            return fileExtensions.includes(extname);
        }
        return false;
    }
}
