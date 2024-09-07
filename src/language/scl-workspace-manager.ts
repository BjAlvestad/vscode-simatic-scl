import {
    AstNode,
    DefaultWorkspaceManager,
    FileSystemNode,
    LangiumDocument,
    LangiumDocumentFactory,
    UriUtils,
} from "langium";
import { WorkspaceFolder } from 'vscode-languageserver-types';
// import * as vscode from 'vscode';
// import * as path from 'node:path';
import { URI } from "vscode-uri";
import * as builtinLibrary from './built-in-scl-libraries/built-in-scl-library-functions.js'
import { LangiumSharedServices } from "langium/lsp";
import { absoluteToRelativePath } from "./utils.js";
import * as fs from 'fs';

export class SclWorkspaceManager extends DefaultWorkspaceManager {

    private documentFactory: LangiumDocumentFactory;
    private filterContent: Set<string>;
    private services: LangiumSharedServices;

    constructor(services: LangiumSharedServices) {
        super(services);
        this.documentFactory = services.workspace.LangiumDocumentFactory;
        this.filterContent = this.readFilterFile('scl-lsp-filter.txt');
        this.services = services;
        this.getIncludeFoldersFromFilter(services);
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
        this.getIncludedFolders().then(config => {
            console.log(`Config from inside include entry: ${config}`)
        });
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
            const toBeIncluded = this.filterContent.has(relativePath);
            console.log('File path:\t' + relativePath + ` (${name})`)
            return fileExtensions.includes(extname) && toBeIncluded;
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

    private getIncludeFoldersFromFilter(services: LangiumSharedServices) {
        // const includedFolders: string[] = vscode.workspace.getConfiguration('vscode-simatic-scl').get('includedFolders', []);
        // let includedFolders = [
        //     "SimpleStruct",
        //     "root"
        
        // ];

        services.workspace.ConfigurationProvider.ready.then(
            () => console.log(`ConfigurationProvider is now ready`)
        )

        services.workspace.ConfigurationProvider.getConfiguration('scl', 'includedFolders')
            .then(config => {
                console.log(`Included folders:\n ${config}\n\n`)
            })
            .catch(error => {
                console.error('Error fetching configuration:', error);
            });

        services.workspace.ConfigurationProvider.getConfiguration('scl', 'vscode-simatic-scl.includedFolders')
            .then(config => {
                console.log(`Included folders:\n ${config}\n\n`)
            })
            .catch(error => {
                console.error('Error fetching configuration:', error);
            });

        services.workspace.ConfigurationProvider.getConfiguration('vscode-simatic-scl', 'includedFolders')
            .then(config => {
                console.log(`Included folders:\n ${config}\n\n`)
            })
            .catch(error => {
                console.error('Error fetching configuration:', error);
            });
                
        // These only returns undefined, based on console.log printout in SCL output of extension development host
        // Not sure why
        // It runs AFTER the getConfig() we added to main.ts, and ready resolves before the others.
        
        // const workspaceFolders = vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath) || [];
        // console.log(`Workspace folders:\n ${workspaceFolders}\n\n`)
        // const resolvedIncludedFolders = includedFolders.map(folder => {
        //     return workspaceFolders.map(workspaceFolder => path.join(workspaceFolder, folder));
        // }).flat();
        // console.log(`Resolved include folders:\n ${resolvedIncludedFolders}\n\n`)

        // return workspaceFolders
    }

    async getIncludedFolders() {
        try {
            const config = await this.services.workspace.ConfigurationProvider.getConfiguration('vscode-simatic-scl', 'includedFolders');
            // const config = await this.services.workspace.ConfigurationProvider.getConfiguration('scl', 'vscode-simatic-scl');
            const includedFolders = config; //config['includedFolders'];
            console.log(`Included folders:\n ${includedFolders}\n\n`);
            return includedFolders;
        } catch (error) {
            console.error('Error fetching configuration:', error);
            return undefined;
        }
      }
    
}
