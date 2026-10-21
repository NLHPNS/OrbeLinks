import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    }); 

    mainWindow.loadURL(
        'http://localhost:5173'
    );
}

ipcMain.handle('app:get-message', () => {
    return 'Hello from Main!';
});

ipcMain.handle('notes:save', (_event, note) => {
    console.log("received note: ", note);
    return {success: true};
});

app.whenReady().then(createWindow);