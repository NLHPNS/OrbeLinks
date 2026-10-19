let electron = require("electron");
//#region src/main/index.ts
function createWindow() {
	new electron.BrowserWindow({
		width: 700,
		height: 500
	}).loadURL("http://localhost:5173");
}
electron.app.whenReady().then(createWindow);
//#endregion
