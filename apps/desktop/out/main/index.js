//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let electron = require("electron");
let node_path = require("node:path");
let better_sqlite3 = require("better-sqlite3");
better_sqlite3 = __toESM(better_sqlite3);
//#region src/main/index.ts
var dbPath = (0, node_path.join)(electron.app.getPath("userData"), "orbelinks.db");
var db = new better_sqlite3.default(dbPath);
db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT ''
    )    
`);
function createWindow() {
	new electron.BrowserWindow({
		width: 700,
		height: 500,
		webPreferences: {
			preload: (0, node_path.join)(__dirname, "../preload/index.js"),
			contextIsolation: true,
			nodeIntegration: false
		}
	}).loadURL("http://localhost:5173");
}
electron.ipcMain.handle("app:get-message", () => {
	return "Hello from Main!";
});
electron.ipcMain.handle("notes:save", (_event, note) => {
	console.log("received note: ", note);
	db.prepare(`
        INSERT INTO notes (id, title, content)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            content = excluded.content;
    `).run(note.id, note.title, note.content);
	return { success: true };
});
electron.app.whenReady().then(createWindow);
//#endregion
