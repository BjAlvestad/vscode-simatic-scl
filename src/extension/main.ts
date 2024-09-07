import type { LanguageClientOptions, ServerOptions} from 'vscode-languageclient/node.js';
import * as vscode from 'vscode';
import * as path from 'node:path';
import { LanguageClient, TransportKind } from 'vscode-languageclient/node.js';
import { SclLibraryFileSystemProvider } from './scl-library-file-system-provider.js';

let client: LanguageClient;

// This function is called when the extension is activated.
export function activate(context: vscode.ExtensionContext): void {
    // Ensure configuration is accessed after activation
    vscode.workspace.onDidChangeConfiguration(() => {
        getConfig();
    });

    // Initial configuration fetch
    getConfig();

    client = startLanguageClient(context);
    SclLibraryFileSystemProvider.register(context);
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
    if (client) {
        return client.stop();
    }
    return undefined;
}

function startLanguageClient(context: vscode.ExtensionContext): LanguageClient {
    const serverModule = context.asAbsolutePath(path.join('out', 'language', 'main.cjs'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging.
    // By setting `process.env.DEBUG_BREAK` to a truthy value, the language server will wait until a debugger is attached.
    const debugOptions = { execArgv: ['--nolazy', `--inspect${process.env.DEBUG_BREAK ? '-brk' : ''}=${process.env.DEBUG_SOCKET || '6009'}`] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    };

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        documentSelector: [{ scheme: 'file', language: 'scl' }]
    };

    // Create the language client and start the client.
    const client = new LanguageClient(
        'scl',
        'SCL',
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();
    return client;
}

async function getConfig() {
    try {
        const config = await vscode.workspace.getConfiguration('vscode-simatic-scl').get('includedFolders');
        // This returns the config, which can be seen if you set a breakpoint.
        // Not sure where this console.log goes to though
        console.log(`Included folders:\n ${config}\n\n`);
    } catch (error) {
        console.error('Error fetching configuration:', error);
    }
}
