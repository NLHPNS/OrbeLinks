let electron = require("electron");
//#region src/preload/index.ts
electron.contextBridge.exposeInMainWorld("orbeLinks", {
	getAppName: () => "OrbeLinks",
	getMainMessage: () => electron.ipcRenderer.invoke("app:get-message"),
	saveNote: (note) => electron.ipcRenderer.invoke("notes:save", note),
	getAllNotes: () => electron.ipcRenderer.invoke("notes:get-all"),
	deleteNote: (id) => electron.ipcRenderer.invoke("notes:delete", id)
});
//#endregion
