
const date: string = new Date(Date.now()).toLocaleString();
const user: string = require("os").userInfo().username;

// TODO: default empty line below the string
export const todo: string = `TODO: created by ${user} @ ${date}`;
export const fixme: string = `FIXME: noticed by ${user} @ ${date}`;
export const bug: string = `BUG: noticed by ${user} @ ${date}`;
export const idea: string = `IDEA: logged by ${user} @ ${date}`;
export const wtf: string = `WTF: by ${user} @ ${date}`;
export const hack: string = `HACK: implementation noticed by ${user} @ ${date}`;
export const note: string = `NOTE: note written by ${user} @ ${date}`;
