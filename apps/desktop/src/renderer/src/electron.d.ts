export {};

type Note = {
    id: string,
    title: string,
    content: string
};

declare global {
  interface Window {
    orbeLinks: {
      getAppName: () => string;
      getMainMessage: () => Promise<string>;
      saveNote: (note: Note | null) => Promise<{ success: boolean}>;
      getAllNotes: () => Promise<Note[]>;
      deleteNote: (id: string) => Promise<{success: boolean}>
    };
  }
}