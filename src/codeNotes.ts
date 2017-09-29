'use strict';

import * as vscode from 'vscode';

// move templates to a seperate file
// have a mechanism to export all of them and make it available as a noote by default;
// in case i have to add a new one I just need to add it there
// import * as templates from './templates';

const date: string = new Date(Date.now()).toLocaleString();
const user: string = require("os").userInfo().username;

const todoTemplate = `Todo: ${user} @ ${date} \n`;
const issueTemplate = `Issue: ${user} @ ${date} \n`;

const templates = {
    todo: todoTemplate,
    issue: issueTemplate
};

const insertNote: any = (note) => {
    let text = templates[note];
    var editor = vscode.window.activeTextEditor;
    const startPosition = editor.selection.active;
    console.log(startPosition)
    editor.edit(function (editBuilder) {
        editBuilder.delete(editor.selection);
    }).then(function () {
        editor.edit(function (editBuilder) {
            editBuilder.insert(editor.selection.start, text);
        });
    }).then( () => { 

        // select the code snippet 
        // current cursor position
        // const curPosition = editor.selection.active;
        // const curPosition = startPosition.with(startPosition.line+5, 0)
        // console.log(curPosition);
        // curPosition.line;
        // const curPosition = { line: startPosition.line+5, character:0 }
        // reduce it by 5;
        // var startPosition = curPosition.with(curPosition.line-5, 0);
        // console.log(startPosition);
        // const selection = new vscode.Selection(startPosition, curPosition)
        // editor.selection = selection;

        // clear the selection 
        const endPosition = startPosition.with(startPosition.line+1, 0)
        const selection = new vscode.Selection(startPosition, endPosition)
        editor.selection = selection;

        // comment selected lines
        vscode.commands.executeCommand("editor.action.commentLine") 

        // const activePosition = editor.selection.active;
        // const curPosition = activePosition.with(activePosition.line, activePosition.character+1)
        // const curPosition2 = activePosition.with(activePosition.line, activePosition.character+2)
        // const newSelection = new vscode.Selection(curPosition, curPosition2);
        // editor.selection = newSelection;

        // put the cursor one line above 
        // editor.edit(function (editBuilder) {
        //     editBuilder.delete(editor.selection);
        // })
    });
}

export function activate(context: vscode.ExtensionContext) {

    var commands = [
        vscode.commands.registerCommand('codetags.generateTodo', insertNote('todo')),
        vscode.commands.registerCommand('codetags.generateIssue', insertNote('issue'))
    ];
    commands.forEach( (command) => context.subscriptions.push(command) );
}

export function deactivate() {
}