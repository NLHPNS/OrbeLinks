import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';

// note composition
type Note = {
    id: string,
    title: string,
    content: string
};

const rootElement = document.getElementById('root');

if (rootElement == null) {
    throw new Error("Root element not found");
}


const r = createRoot(rootElement);

// component for React
function App() {
    const name = "OrbeLinks";

    // create a empty note list
    const [notes, setNotes] = useState<Note[]>([]);

    // load notes from SQLite
    useEffect(() => {
        async function loadNotes() {
            const savedNotes = await window.orbeLinks.getAllNotes();
            setNotes(savedNotes);
        }

        loadNotes();
    }, []);

    
    // selecting a note
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const [mainMessage, setMainMessage] = useState('');
    const [saveMessage, setSaveMessage] = useState('');


    return (
        <div>
            <p>{window.orbeLinks.getAppName()}</p>
            {/* <p>Renderer is working</p> */}
            <h1>Hello, {name}!</h1>

            <button
                onClick={async () => {
                    const message = await window.orbeLinks.getMainMessage();
                    setMainMessage(message);
                }}
            >Ask main</button>
            <p>Main message: {mainMessage}</p>

            <button
                onClick={async () => {
                    // only save the changed note
                    const allNotes = await window.orbeLinks.getAllNotes();

                    for (const note of notes) {
                        const savedNote = allNotes.find(
                            (item) => item.id === note.id
                        );

                        // !saveNote -> not null
                        if (
                            !savedNote ||
                            savedNote.title !== note.title ||
                            savedNote.content !== note.content
                        ) {
                            await window.orbeLinks.saveNote(note);
                        }
                        
                    }

                    setSaveMessage('All notes saved successfully!');
                }}
            >Save</button>
            <p>{saveMessage}</p>

            {/* display selected note */}
            {selectedNote !== null ? (
                <div>
                    <input
                        value={selectedNote.title}
                        onChange={(event) => {
                            const updatedNote = {
                                ...selectedNote,
                                title: event.target.value
                            }
                            setSelectedNote(updatedNote)
                            //  update note to notes
                            setNotes(notes.map((item) =>
                                item.id === updatedNote.id ? updatedNote : item
                            ))
                        }}
                    />
                    <textarea
                        value={selectedNote.content}
                        onChange={(event) => {
                            const updateNote = {
                                ...selectedNote,
                                content: event.target.value
                            }
                            setSelectedNote(updateNote)
                            setNotes(notes.map((item) =>
                                item.id === updateNote.id ? updateNote : item
                            ))
                        }}
                    />

                    <p>{selectedNote.id}</p>
                </div>
            ) : (
                <p>Select a note to view its content.</p>
            )}

            {/* add a note */}
            <button onClick={async () => {
                const newNote: Note = {
                    id: crypto.randomUUID(),
                    title: '<New Note>',
                    content: ''
                };

                // save to SQlite
                // await window.orbeLinks.saveNote(newNote);

                // update React state
                setNotes([...notes, newNote]);
            }}
            >Add Note</button>

            <button onClick={async () => {
                if (selectedNote == null) return;

                const confirmDelete = window.confirm("Delete this note?");
                if (!confirmDelete) return; 
                
                const result = await window.orbeLinks.deleteNote(selectedNote.id);

                if (result.success) {
                    setNotes(notes.filter(
                        (item) => item.id !== selectedNote.id
                    ));
                }
                setSelectedNote(null);


            }}>Delete Note</button>

            {/* note list */}
            <ul>
                {/* go through the whole list, generate list items one by one*/}
                {notes.map((item, index) => (
                    <li
                        key={item.id}
                        onClick={() => setSelectedNote(item)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>

        </div>


    );
}

r.render(<App />);