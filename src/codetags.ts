'use strict';
import * as vscode from 'vscode';
import * as tags from './tags'

// get tag names
var tagNames: Array<string> = [];
for (let tag of Object.keys(tags)){
    tagNames.push(tag)
}

// insert the tags
var insertTag: any = (tag: string) => {
    var editor = vscode.window.activeTextEditor;
    // delete the selected text
    editor.edit( editBuilder => {
        editBuilder.delete(editor.selection);
    }).then( () => {
        // insert the tag text template
        editor.edit( (editBuilder) => {
            editBuilder.insert(editor.selection.start, tags[tag]);
        });
    }).then( () =>{
        // comment the inserted lines
        vscode.commands.executeCommand("editor.action.commentLine") 
    })
};

export function activate(context: vscode.ExtensionContext) {

    context.subscriptions.push(
        vscode.commands.registerCommand('codetags.tags', () => { 
            // provide code tags 
            vscode.window.showQuickPick( tagNames )
            .then( (tag) => {
                // insert tag
                if(tag){
                    insertTag(tag);
                }
            });
        })            
    );    
}

export function deactivate() {
}
