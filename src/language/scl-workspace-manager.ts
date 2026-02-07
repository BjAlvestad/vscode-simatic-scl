import {
    AstNode,
    DefaultWorkspaceManager,
    FileSystemNode,
    LangiumDocument,
    LangiumDocumentFactory,
    UriUtils,
} from "langium";
import { WorkspaceFolder } from 'vscode-languageserver';
import { URI } from "vscode-uri";
import { BuiltIns } from "./built-in-scl-libraries/built-ins.js";
import { LangiumSharedServices } from "langium/lsp";
import { InitializeParams } from "vscode-languageclient";
import fs from 'fs';
import path from 'path';

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;
    private includeFolders: string[] = [];

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;
    }

    override initialize(params: InitializeParams): void {
        this.includeFolders = this.getFoldersToInclude('includeFoldersFilter.scl-lsp');
        super.initialize(params);
    }

    protected override async loadAdditionalDocuments(
        folders: WorkspaceFolder[],
        collector: (document: LangiumDocument<AstNode>) => void
    ): Promise<void> {
        await super.loadAdditionalDocuments(folders, collector);
        // Load our library using the `builtin` URI schema
        for (let key in BuiltIns.uriMap) {
            const fullUri = 'builtin://' + key;
            collector(this.documentFactory.fromString(BuiltIns.uriMap[key], URI.parse(fullUri)));
        }
    }

    public override shouldIncludeEntry(entry: FileSystemNode): boolean {
        // console.log(`Inside includeEntry: ${this.includeFolders.length} - [${this.includeFolders.join(', ')}]`);

        const name = UriUtils.basename(entry.uri);
        if (name.startsWith('.')) {
            return false;
        }
        if (entry.isDirectory) {
            // console.log(`for ${name}, we have workspace folder ${_workspaceFolder.uri} and entry ${entry.uri.fsPath}`)
            if ((this.includeFolders.length > 0)) {
                const shouldInclude = (
                    name !== 'node_modules'
                    && name !== 'out'
                    && (this.includeFolders.includes(entry.uri.fsPath) || this.isSubfolderToInclude(entry.uri.fsPath)) 
                );
                // console.info(`comparing ${entry.uri.fsPath} against filter. Include? ${shouldInclude}`)
                if (shouldInclude) {
                    console.info(`Loading ${entry.uri.fsPath} into workspace since it matches filter...`)
                }
                return shouldInclude;
            }
            return name !== 'node_modules' && name !== 'out';
        } else if (entry.isFile) {
            return this.serviceRegistry.hasServices(entry.uri);
        }
        return false;
    }

    private getFoldersToInclude(configFileName: string) {
        const absolutePath = path.resolve()
        const fileContent = this.getFileFromFilesystem(configFileName);
        const includeFoldersRelative = fileContent.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        // console.log(`splitting string:\n'${fileContent}'\ninto array of include folders: [${includeFoldersRelative}]`)
        const includeFoldersAbsolute = includeFoldersRelative.map(p => path.join(absolutePath, p))
        // console.log(`Combining :\n'${absolutePath}'\ninto array of include folders: [${includeFoldersAbsolute}]`)
        return includeFoldersAbsolute;
    }

    private getFileFromFilesystem(configFileName: string): string {
        try {
            let fileContent = fs.readFileSync(configFileName, 'utf8');
            // console.log('Config file contents:', fileContent);
            return fileContent;
        } catch (err) {
            console.log(`Could not read config file '${configFileName}' for folders to include`)
            return '';
        }
    }

    private isSubfolderToInclude(fsPath: string): boolean {
        for (let path of this.includeFolders) {
            if (fsPath.startsWith(path) || path.startsWith(fsPath)) {
                return true;
            }
        }
        return false;
    }
}
