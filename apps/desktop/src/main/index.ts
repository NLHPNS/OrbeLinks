import { app, BrowserWindow } from 'electron';
import { join } from 'node:path';

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 700,
        height: 500
        // webPreferences: {
        //     preload: join(__dirname, '../preload/index.js'),
        //     contextIsolation: true,
        //     nodeIntegration: false
        // }
    });

    mainWindow.loadURL(
        'http://localhost:5173'
    );
}

app.whenReady().then(createWindow);