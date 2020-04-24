"use strict";
import * as vscode from "vscode";
var userName = require("git-user-name");

class Tag {
  constructor(
    public name: string,
    public description: string,
    public label: string
  ) {
    this.name = name;
    this.label = label === undefined ? name : label;
    this.description = description;
  }
}

var defaultTags: Array<any> = [
  {
    name: "todo",
    label: "✅todo",
    description: "Tasks pending completion",
  },
  {
    name: "fixme",
    label: "⚠️fixme",
    description: "Needing refactor, cleanup",
  },
  {
    name: "bug",
    label: "🐞bug",
    description: "Reported defects",
  },
  {
    name: "idea",
    label: "💡idea",
    description: "Possible implementations",
  },
  {
    name: "wtf",
    label: "‼️wtf",
    description: "Misunderstood details",
  },
  {
    name: "hack",
    label: "🤖hack",
    description: "Temporary fix",
  },
  {
    name: "note",
    label: "📝note",
    description: "Needs discussion or investigation",
  },
];

const config: any = vscode.workspace.getConfiguration("codetags");

const collatedTags = [...defaultTags, ...config.custom];
const tags: Array<Tag> = [];
collatedTags.forEach((tag) => {
  tags.push(new Tag(tag.name, tag.description, tag.label));
});

const getDate = (format = "default"): string => {
  // determine the format
  return new Date(Date.now()).toLocaleString();
};

const getUser = (editor: vscode.TextEditor): string => {
  if (config.user.name !== undefined) {
    return config.user.name;
  }
  const gitUserName = userName();
  if (gitUserName !== undefined) {
    return gitUserName;
  }
  return require("os").userInfo().username;
};

const formatTag = (editor: vscode.TextEditor, tag: Tag): string => {
  let formattedTag = `${tag.name.toUpperCase()}: ${tag.description}`;
  if (config.user === true) {
    formattedTag += ` by ${getUser(editor)}`;
  }
  if (config.date === true) {
    formattedTag += ` at ${getDate(config.dateformat)}`;
  }
  return formattedTag;
};

var insertTag: any = (editor: vscode.TextEditor, tag: Tag) => {
  editor
    .edit((editBuilder) => {
      editBuilder.delete(editor.selection);
      editBuilder.insert(editor.selection.start, formatTag(editor, tag));
    })
    .then(() => {
      vscode.commands.executeCommand("editor.action.commentLine");
    })
    .then(() => {
      const activeLine = editor.selection.active.line;
      const lineText = editor.document.lineAt(activeLine).text;
      const descriptionIndex = lineText.indexOf(tag.description);
      const startPos = new vscode.Position(activeLine, descriptionIndex);
      const endPos = new vscode.Position(
        activeLine,
        descriptionIndex + tag.description.length
      );
      editor.selection = new vscode.Selection(startPos, endPos);
    });
};

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("codetags.tags", () => {
      const editor: vscode.TextEditor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No file open.");
        return;
      }
      vscode.window.showQuickPick(tags).then((tag: Tag) => {
        if (tag) {
          insertTag(editor, tag);
        }
      });
    })
  );
}

export function deactivate() {}
