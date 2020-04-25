"use strict";
import * as vscode from "vscode";
import { userName as gitUserName } from "git-user-name";
import { format as dateFormat } from "date-fns";

class Tag {
  constructor(
    public name: string,
    public description: string,
    public label: string
  ) {
    this.name = name;
    this.description = description;
    this.label = label === undefined ? name : label;
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

const getTags = (): Array<Tag> => {
  let collatedTags: Array<any> = [];
  if (config.default === undefined || config.default === true) {
    collatedTags.push(...defaultTags);
  }
  if (config.custom !== undefined) {
    collatedTags.push(...config.custom);
  }
  let tags: Array<Tag> = [];
  collatedTags.forEach((tag) => {
    tags.push(new Tag(tag.name, tag.description, tag.label));
  });
  return tags;
};

const getDate = (format = "yyyy-MM-dd"): string => {
  return dateFormat(new Date(Date.now()), format);
};

const getUser = (editor: vscode.TextEditor): string => {
  if (config.user.name !== undefined) {
    return config.user.name;
  }
  const userName = gitUserName();
  if (userName !== undefined) {
    return userName;
  }
  return require("os").userInfo().username;
};

const formatTag = (editor: vscode.TextEditor, tag: Tag): string => {
  let formattedTag = `${tag.name.toUpperCase()}: ${tag.description}`;
  if (config.user.enable === undefined || config.user.enable === true) {
    formattedTag += ` by ${getUser(editor)}`;
  }
  if (config.date.enable === undefined || config.date.enable === true) {
    formattedTag += ` at ${getDate(config.date.format)}`;
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
      let tags: Array<Tag> = getTags();
      vscode.window.showQuickPick(tags).then((tag: Tag) => {
        if (tag) {
          insertTag(editor, tag);
        }
      });
    })
  );
}

export function deactivate() {}
