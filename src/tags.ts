
// TODO: get a better date format   
const date: any = () => new Date(Date.now()).toLocaleString();
const user: any = () => require("os").userInfo().username;

// TODO: default commented empty line below the string
export const todo: any = () => `TODO: created by ${user()} @ ${date()}`;
export const fixme: any = () => `FIXME: noticed by ${user()} @ ${date()}`;
export const bug: any = () => `BUG: noticed by ${user()} @ ${date()}`;
export const idea: any = () => `IDEA: logged by ${user()} @ ${date()}`;
export const wtf: any = () => `WTF: by ${user()} @ ${date()}`;
export const hack: any = () => `HACK: implementation noticed by ${user()} @ ${date()}`;
export const note: any = () => `NOTE: note written by ${user()} @ ${date()}`;
