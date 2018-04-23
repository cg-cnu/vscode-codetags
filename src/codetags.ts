"use strict";
import * as vscode from "vscode";

const getDate: any = () => new Date(Date.now()).toLocaleString();
const getUser: any = () => require("os").userInfo().username;

// Default tags
var tags: any = {
  todo: "Tasks pending completion",
  fixme: "Needing refactor or cleanup",
  bug: "Reported defects",
  idea: "Possible implementations",
  wtf: "Misunderstood details",
  hack: "Temporary fix",
  note: "Pointers to other sources"
};

// get custom tags
const customTags: Array<any> = vscode.workspace.getConfiguration("codetags").custom;
for (let tag of customTags) {
  tags[tag.name] = tag.body;
}

// create tagnames list
var tagNames: Array<string> = [];
for (let tag of Object.keys(tags)) {
  tagNames.push(tag);
}

// insert the tags
var insertTag: any = (editor: vscode.TextEditor, tag: string) => {
  editor
    .edit(editBuilder => {
      // delete the selected text
      editBuilder.delete(editor.selection);
      // insert the tag text
      editBuilder.insert(
        editor.selection.start,
        `${tag.toUpperCase()}: ${tags[tag]} -@${getUser()} at ${getDate()}`
      );
    })
    .then(() => {
      // comment the inserted lines
      vscode.commands.executeCommand("editor.action.commentLine");
      vscode.commands.executeCommand("editor.action.insertLineAfter");
      vscode.commands.executeCommand("editor.action.commentLine");
    });
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("codetags.tags", () => {
      const editor: vscode.TextEditor = vscode.window.activeTextEditor;
      // if no active text editor
      if (!editor) {
        vscode.window.showErrorMessage("No file open.");
        return;
      }

      vscode.window.showQuickPick(tagNames).then((tag: string) => {
        // insert tag
        if (tag) {
          insertTag(editor, tag);
        }
      });
    })
  );
}

export function deactivate() {}
