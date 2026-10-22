import { contextBridge, ipcRenderer } from "electron";

type Note = {
    id: string,
    title: string,
    content: string
};

contextBridge.exposeInMainWorld('orbeLinks', {
    getAppName: () => 'OrbeLinks',
    getMainMessage: () => ipcRenderer.invoke('app:get-message'),
    saveNote: (note: Note | null) => ipcRenderer.invoke('notes:save', note),
    getAllNotes: () => ipcRenderer.invoke('notes:get-all'),
    deleteNote: (id: string) => ipcRenderer.invoke('notes:delete', id)
});