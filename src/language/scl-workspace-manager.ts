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
import * as fs from 'fs';

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;
    private filterContent: Set<string>;

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;
        this.filterContent = this.readFilterFile('scl-lsp-filter.txt');
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
            const toBeIncluded = this.filterContent.has(relativePath);
            // console.log('Dir path:\t' + relativePath+ ` (${name}) - ${toBeIncluded ? 'Included' : 'Excluded'}`)
            return toBeIncluded && name !== 'node_modules' && name !== 'out';
        } else if (entry.isFile) {
            const extname = UriUtils.extname(entry.uri);
            const relativePath = absoluteToRelativePath(_workspaceFolder.uri, entry.uri.path);
            console.log('File path:\t' + relativePath + ` (${name})`)
            return fileExtensions.includes(extname);
        }
        return false;
    }

    private readFilterFile(fileName: string): Set<string> {
        try {
            const fileContent: string = fs.readFileSync(`C:\\Users\\BjAlv\\repos\\vscode-simatic-scl\\test\\examples\\${fileName}`, 'utf8');  //TODO: Find out how we can get workspace path
            return new Set(
                fileContent.split('\r?\n')
                    .map(s => s.trim())
                    .filter(s => s.length > 0 && !s.startsWith('#'))
            );   
        } catch (error) {
            return new Set();
        }
        // console.log(this.filterContent);
    }
}
