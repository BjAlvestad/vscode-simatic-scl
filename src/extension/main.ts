import type { LanguageClientOptions, ServerOptions } from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { SclLibraryFileSystemProvider } from './scl-library-file-system-provider.js';

let client: LanguageClient;

export function activate(context: vscode.ExtensionContext): void {
    // const includedFolders: string[] = vscode.workspace.getConfiguration('vscode-simatic-scl').get('includedFolders', []);
    const includedFolders = [
        "SimpleStruct",
        "root"
    ];
    client = startLanguageClient(context, includedFolders);
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
                const isIncluded = includedFolders.some(folder => filePath.startsWith(vscode.Uri.file(folder).fsPath));

                if (isIncluded) {
                    await next(document);
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
