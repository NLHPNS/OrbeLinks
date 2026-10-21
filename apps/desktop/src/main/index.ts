import { app, BrowserWindow, ipcMain } from 'electron';
import { join } from 'node:path';
import Database from 'better-sqlite3';


const dbPath = join(app.getPath('userData'), 'orbelinks.db');

const db = new Database(dbPath);

// create SQLite table
db.exec(`
    CREATE TABLE IF NOT EXISTS notes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL DEFAULT ''
    )    
`);

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
    const dataPrepare = db.prepare(`
        INSERT INTO notes (id, title, content)
        VALUES (?, ?, ?)
        ON CONFLICT(id) DO UPDATE SET
            title = excluded.title,
            content = excluded.content;
    `);

    dataPrepare.run(note.id, note.title, note.content);

    return {success: true};
});

app.whenReady().then(createWindow);