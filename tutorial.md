# Tutorial

I needed a way to list [codetags](https://www.python.org/dev/peps/pep-0350/) in
my project. While
[vscode-codetags](https://marketplace.visualstudio.com/items?itemName=cg-cnu.vscode-codetags)
lets you standardizing the creation of tags you can use the extensions below to
add more value to it. This guide initially written by [Théry
Fouchter](https://github.com/TheryFouchter) helps you setup and list codetags
with Icons and color per codetag.

## Screenshot

![vscode-codetags-todo-tree](https://user-images.githubusercontent.com/22601070/55276218-75e44180-52f1-11e9-9d3d-93b08967a057.jpg)

## Extensions

You can use the below addons and its settings to create a set of custom todos
and display them in the Todo Tree and assign specific color using better
comments. Add the below configurations to settings.json

### Code Tags

You can extend tags in Code Tags by

```json
// Add additional codetags
"codetags.custom": [
  {
    "name": "Caveats",
    "description": "Implementation details/gotchas"
  },
  {
    "name": "See",
    "description": "Pointers to other code, web link, ect."
  },
  {
    "name": "NoBug",
    "description": "Will Not Be Fixed"
  },
  {
    "name": "REQ",
    "description": "Satisfactions of specific, formal requirements"
  },
  {
    "name": "RFE",
    "description": "Requests For Enhancement"
  },
  {
    "name": "!!!",
    "description": "In need of immediate attention"
  },
  {
    "name": "ToDoc",
    "description": "Needs Documentation"
  },
  {
    "name": "Cred",
    "description": "Credits"
  }
]
```

### Todo Tree

[Todo
Tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree)
by [Gruntfuggly](https://marketplace.visualstudio.com/publishers/Gruntfuggly)
lets you display all the TODOs in your project. Its an amazing addon and it can
be extended to track codetags.

```json
// (recommended) only highlight the tag due to the regex bellow
"todo-tree.highlights.defaultHighlight": {
  "type": "tag"
},
// (optional) special regex to filter some special cases not handled by todo tree
"todo-tree.regex.regex": "((//|#|<!--|;|/\\*|\\*|^)\\s*($TAGS)(:+|[ \\t]+|[\\r\\n]))",
// Your codetags
"todo-tree.general.tags": [
  "TODO",
  "FIXME",
  "BUG",
  "IDEA",
  "WTF",
  "HACK",
  "NOTE",
  "CAVEATS",
  "SEE",
  "NOBUG",
  "REQ",
  "RFE",
  "!!!",
  "TODOC",
  "CRED"
],
// The color of your codetags
"todo-tree.highlights.customHighlight": {
  "TODO": {
    "foreground": "#FF8C00",
    "icon": "check"
  },
  "FIXME": {
    "foreground": "#FF8C00",
    "icon": "alert"
  },
  "BUG": {
    "foreground": "#FF2D00",
    "icon": "bug"
  },
  "IDEA": {
    "foreground": "#98C379",
    "icon": "light-bulb"
  },
  "WTF": {
    "foreground": "#FF2D00",
    "icon": "stop"
  },
  "HACK": {
    "foreground": "#3498DB",
    "icon": "hubot"
  },
  "NOTE": {
    "foreground": "#98C379",
    "icon": "note"
  },
  "CAVEATS": {
    "foreground": "#98C379",
    "icon": "issue-opened"
  },
  "SEE": {
    "foreground": "#895FAA",
    "icon": "eye"
  },
  "NOBUG": {
    "foreground": "#3498DB",
    "icon": "issue-closed"
  },
  "REQ": {
    "foreground": "#895FAA",
    "icon": "checklist"
  },
  "RFE": {
    "foreground": "#FF8C00",
    "icon": "request-changes"
  },
  "!!!": {
    "foreground": "#FF2D00",
    "icon": "alert"
  },
  "TODOC": {
    "foreground": "#FF8C00",
    "icon": "pencil"
  },
  "CRED": {
    "foreground": "#895FAA",
    "icon": "person"
  }
}
```

### Better Comments

[Better
Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
by [Aaron Bond](https://marketplace.visualstudio.com/publishers/aaron-bond)
makes your comments beautify. You can configure it to work with codetags.

```json
// The color of the line of your codetags
"better-comments.tags": [
  {
    "tag": "!",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "?",
    "color": "#3498DB",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "//",
    "color": "#474747",
    "strikethrough": true,
    "backgroundColor": "transparent"
  },
  {
    "tag": "todo",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "*",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "FIXME",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "BUG",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "IDEA",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "WTF",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "HACK",
    "color": "#3498DB",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "NOTE",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "CAVEATS",
    "color": "#98C379",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "SEE",
    "color": "#895FAA",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "NOBUG",
    "color": "#3498DB",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "REQ",
    "color": "#895FAA",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "RFE",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "!!!",
    "color": "#FF2D00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "TODOC",
    "color": "#FF8C00",
    "strikethrough": false,
    "backgroundColor": "transparent"
  },
  {
    "tag": "CRED",
    "color": "#895FAA",
    "strikethrough": false,
    "backgroundColor": "transparent"
  }
]
```
