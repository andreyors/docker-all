'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const vscode = require("vscode");
const util_1 = require("./util");
function activate(context) {
    let terminal;
    function getJestPath() {
        const jestPath = vscode.workspace.getConfiguration().get('jestrunner.jestPath');
        if (jestPath) {
            return jestPath;
        }
        const jestDirectoy = util_1.platformWin32() ? 'node_modules/jest/bin/jest.js' : 'node_modules/.bin/jest';
        return path_1.join(vscode.workspace.workspaceFolders[0].uri.fsPath, jestDirectoy);
    }
    function getConfigPath() {
        const configPath = vscode.workspace.getConfiguration().get('jestrunner.configPath');
        if (!configPath) {
            return '';
        }
        return path_1.join(vscode.workspace.workspaceFolders[0].uri.fsPath, configPath);
    }
    vscode.window.onDidCloseTerminal(() => {
        terminal = null;
    });
    const runJest = vscode.commands.registerCommand('extension.runJest', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const configuration = util_1.slash(getConfigPath());
        const testName = util_1.parseTestName(editor);
        const fileName = util_1.slash(editor.document.fileName);
        const jestPath = util_1.slash(getJestPath());
        let command = `node ${util_1.quote(jestPath)} ${util_1.quote(fileName)}`;
        if (configuration) {
            command += ` -c ${util_1.quote(configuration)}`;
        }
        if (testName !== '') {
            command += ` -t ${util_1.quote(testName)}`;
        }
        yield editor.document.save();
        if (!terminal) {
            terminal = vscode.window.createTerminal('jest');
        }
        terminal.show();
        yield vscode.commands.executeCommand('workbench.action.terminal.clear');
        terminal.sendText(command);
    }));
    const debugJest = vscode.commands.registerCommand('extension.debugJest', () => __awaiter(this, void 0, void 0, function* () {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }
        const configuration = util_1.slash(getConfigPath());
        const testName = util_1.parseTestName(editor);
        const config = {
            args: [],
            console: 'integratedTerminal',
            internalConsoleOptions: 'neverOpen',
            name: 'Debug Jest Tests',
            program: getJestPath(),
            request: 'launch',
            type: 'node'
        };
        config.args.push('-i');
        config.args.push(util_1.slash(editor.document.fileName));
        if (configuration) {
            config.args.push('-c');
            config.args.push(configuration);
        }
        if (testName !== '') {
            config.args.push('-t');
            config.args.push(testName);
        }
        yield editor.document.save();
        vscode.debug.startDebugging(undefined, config);
    }));
    context.subscriptions.push(runJest);
    context.subscriptions.push(debugJest);
}
exports.activate = activate;
function deactivate() {
    // deactivate
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map