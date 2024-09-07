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
    // private configUri?: URI;

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;

        // const workspaceFolder = `C:\\Users\\BjAlv\\repos\\vscode-simatic-scl\\test\\examples`
        // const fileName = 'config.lsp'
        // const path = `${workspaceFolder}\\${fileName}`
        // const pathUri = URI.file(path)

        // this.fileSystemProvider.readFile(pathUri).then(file => {
        //     console.log(`file content: ${file}`)
        // })

            // context.connection?.workspace.getWorkspaceFolders().then(f => {
    //     console.log(`workspace: ${f}`)
    // })
    }

    // override async initializeWorkspace(folders: WorkspaceFolder[], cancelToken = CancellationToken.None): Promise<void> {
    //     await super.initializeWorkspace(folders, cancelToken);
    //     // console.log(`folders from inside initializeWorkspace: ${folders[0].name} ${folders[0].uri}`)
    // }

    override initialize(params: InitializeParams): void {
        console.log(params.workspaceFolders)
        const configFileName = 'config.lsp'
        if (params.workspaceFolders && params.workspaceFolders[0]) {
            const workspaceRootPath = params.workspaceFolders[0].uri;
            console.log(`workspaceRootPath: ${workspaceRootPath}`);
            const configFilePath = `${workspaceRootPath}/${configFileName}`;
            console.log(`config path: ${configFilePath}`);
            const path = URI.file(params.workspaceFolders[0].uri)
            console.log(`path: ${path.path}\n  fsPath: ${path.fsPath}`)
            this.getFoldersToInclude()
        }

        super.initialize(params);
    }

    // override async initializeWorkspace(folders: WorkspaceFolder[], cancelToken?: CancellationToken): Promise<void> {
    //     super.initializeWorkspace(folders, cancelToken);
    // }

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

    protected override async traverseFolder(workspaceFolder: WorkspaceFolder, folderPath: URI, fileExtensions: string[], collector: (document: LangiumDocument) => void): Promise<void> {
        super.traverseFolder(workspaceFolder, folderPath, fileExtensions, collector);
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

    private getFoldersToInclude() {
        const fileContent = this.getFile('config.lsp');
        const includeFolders = fileContent.split('\r?\n');
        console.log(`splitting '${fileContent}' into array of include folders:\n${includeFolders}`)
        return includeFolders;
    }

    private getFile(configFileName: string) : string {
        let fileContent = fs.readFileSync(configFileName, 'utf8');
        // console.log('Config file contents:', fileContent);
        return fileContent;
    }
}
