"use strict";
import * as vscode from "vscode";
import { format } from "path";

const getDate = (format = "default"): string => {
  // determine the format
  return new Date(Date.now()).toLocaleString();
};
const getUser = (): string => require("os").userInfo().username;

// Default tags
var defaultTags: Array<any> = [
  {
    name: "todo",
    description: "Tasks pending completion",
  },
  {
    name: "fixme",
    description: "Needing refactor or cleanup",
  },
];

// todo: "Tasks pending completion",
// fixme: "Needing refactor or cleanup",
// bug: "Reported defects",
// idea: "Possible implementations",
// wtf: "Misunderstood details",
// hack: "Temporary fix",
// note: "Needs discussion or investigation",

const config: any = vscode.workspace.getConfiguration("codetags");
// add custom tags on top of default tags
const tags = [...defaultTags, ...config.custom];
// customTags.forEach((tag) => {
//   tags[tag.name] = tag.body;
// });
// for (let tag of customTags) {
//   tags[tag.name] = tag.body;
// }

// create tagnames list
var tagNames: Array<string> = [];
for (let tag of Object.keys(tags)) {
  tagNames.push(tag);
}

const getTag: any = (tag) => {
  // @ for user and at for time, validate it
  let formattedTag = `${tag.toUpperCase()}: ${tags[tag]}`;
  if (config.user === true) {
    formattedTag += ` -@${getUser()}`;
  }
  if (config.date === true) {
    formattedTag += ` at ${getDate(config.dateformat)}`;
  }
  return formattedTag;
};

// insert the tags
var insertTag: any = (editor: vscode.TextEditor, tag: string) => {
  editor
    .edit((editBuilder) => {
      // delete the selected text
      editBuilder.delete(editor.selection);
      // insert the tag text
      editBuilder.insert(editor.selection.start, getTag(tag));
    })
    .then(() => {
      // comment the inserted lines
      vscode.commands.executeCommand("editor.action.commentLine");
      // vscode.commands.executeCommand("editor.action.insertLineAfter");
      // vscode.commands.executeCommand("editor.action.commentLine");
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
