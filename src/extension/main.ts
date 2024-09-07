import type { LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { SclLibraryFileSystemProvider } from './scl-library-file-system-provider.js';

let client: LanguageClient;
const processedDocuments = new Set<string>();

export function activate(context: vscode.ExtensionContext): void {
    // const includedFolders: string[] = vscode.workspace.getConfiguration('vscode-simatic-scl').get('includedFolders', []);
    const includedFolders = [
        "SimpleStruct",
        "root"
    ];
    const workspaceFolders = vscode.workspace.workspaceFolders?.map(folder => folder.uri.fsPath) || [];
    const resolvedIncludedFolders = includedFolders.map(folder => {
        return workspaceFolders.map(workspaceFolder => path.join(workspaceFolder, folder));
    }).flat();

    client = startLanguageClient(context, resolvedIncludedFolders);
    SclLibraryFileSystemProvider.register(context);
}

export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext, includedFolders: string[]): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join('out', 'language', 'main.cjs'));
    const debugOptions = { execArgv: ['--nolazy', `--inspect${process.env.DEBUG_BREAK ? '-brk' : ''}=${process.env.DEBUG_SOCKET || '6009'}`] };

    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'scl' }],
        initializationOptions: { includedFolders },
        middleware: {
            didOpen: async (document, next) => {
                const filePath = document.uri.fsPath;
                const isIncluded = includedFolders.some(folder => filePath.startsWith(folder));

                if (isIncluded) {
                    processedDocuments.add(filePath);
                    await next(document);
                }
            },
            didClose: async (document, next) => {
                const filePath = document.uri.fsPath;
                processedDocuments.delete(filePath);
                await next(document);
            },
            didChange: async (change, next) => {
                const filePath = change.document.uri.fsPath;
                if (processedDocuments.has(filePath)) {
                    await next(change);
                }
            }
        }
    };

    const client = new LanguageClient(
        'scl',
        'SCL',
        serverOptions,
        clientOptions
    );

    client.start();
    return client;
}
