let electron = require("electron");
let node_path = require("node:path");
//#region src/main/index.ts
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
	return { success: true };
});
electron.app.whenReady().then(createWindow);
//#endregion
