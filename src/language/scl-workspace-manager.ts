import {
    AstNode,
    DefaultWorkspaceManager,
    FileSystemNode,
    LangiumDocument,
    LangiumDocumentFactory,
    UriUtils,
    WorkspaceFolder,
} from "langium";
// import { WorkspaceFolder } from 'vscode-languageserver';
import { URI } from "vscode-uri";
import * as builtinLibrary from './built-in-scl-libraries/built-in-scl-library-functions.js'
import { LangiumSharedServices } from "langium/lsp";
import { InitializeParams } from "vscode-languageclient";
import fs from 'fs';

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;
    private includeFolders: string[] = [];

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;
    }

    override initialize(params: InitializeParams): void {
        this.includeFolders = this.getFoldersToInclude();
        super.initialize(params);
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
        // console.log(`Inside includeEntry: ${this.includeFolders.length} - [${this.includeFolders.join(', ')}]`);

        const name = UriUtils.basename(entry.uri);
        if (name.startsWith('.')) {
            return false;
        }
        if (entry.isDirectory) {
            if ((this.includeFolders.length > 0)) {
                return (
                    name !== 'node_modules'
                    && name !== 'out'
                    && this.includeFolders.includes(name)
                );
            }
            return name !== 'node_modules' && name !== 'out';
        } else if (entry.isFile) {
            const extname = UriUtils.extname(entry.uri);
            return fileExtensions.includes(extname);
        }
        return false;
    }

    private getFoldersToInclude() {
        const fileContent = this.getFile('config.lsp');
        const includeFolders = fileContent.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        // console.log(`splitting string:\n'${fileContent}'\ninto array of include folders: [${includeFolders}]`)
        return includeFolders;
    }

    private getFile(configFileName: string): string {
        try {
            let fileContent = fs.readFileSync(configFileName, 'utf8');
            // console.log('Config file contents:', fileContent);
            return fileContent;
        } catch (err) {
            console.log(`Could not read config file '${configFileName}' for folders to include`)
            return '';
        }
    }
}
