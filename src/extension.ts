'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const date: string = "now";
const user: string = "user";

const todoTemplate = 
`// 
// Todo
// 
//  ${user} @ ${date}
//`;

const issueTemplate = 
`// 
// Issue
// 
//  ${user} @ ${date}
//`;

const templates = {
    todo: todoTemplate,
    issue: issueTemplate
};

const insertNote: any = (note) => {
    let text = templates[note];
    var editor = vscode.window.activeTextEditor;
    editor.edit(function (editBuilder) {
        editBuilder.delete(editor.selection);
    }).then(function () {
        editor.edit(function (editBuilder) {
            editBuilder.insert(editor.selection.start, text);
        });
    });
    // return true;
}

// const generateTodo = () => {
//     insertNote(todoTemplate);
// }

// const generateIssue = () => {
//     insertNote(issueTemplate);
// }

export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "vscode-notes" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    // let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    //     // The code you place here will be executed every time your command is executed
    //     // 
    //     // Display a message box to the user
    //     vscode.window.showInformationMessage('Hello World!');
    // });

    var commands = [
        vscode.commands.registerCommand('extension.generateTodo', insertNote('todo')),
        vscode.commands.registerCommand('extension.generateIssue', insertNote('issue'))
    ];
    commands.forEach(function (command) {
        context.subscriptions.push(command);
    });
    // context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}