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
      getMainMessage: () => string;
      saveNote: (note: Note | null) => Promise<{ success: boolean}>
    };
  }
}