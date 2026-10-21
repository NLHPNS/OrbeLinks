import { createRoot } from 'react-dom/client';
import { useState } from 'react';

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

    // create a note list
    const [notes, setNotes] = useState<Note[]>([
        {
            id: "thisisarandomId",
            title: "test01",
            content: "this is the content of test01"
        },
        {
            id: "veryrandomID",
            title: "sigmaboy",
            content: "676767"
        }
    ]);
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
                    // check null
                    if (!selectedNote) {
                        setSaveMessage('Please select a note first');
                        return;
                    }

                    const result = await window.orbeLinks.saveNote(selectedNote);

                    if (result.success) {
                        setSaveMessage('Note saved successfully!');
                    } else {
                        setSaveMessage('Fail to save note');
                    }
                }}
            >test save</button>
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

            <button onClick={() => setNotes([...notes, {
                id: crypto.randomUUID(),
                title: "<New Note>",
                content: ""
            }])}>Add Note</button>

            <button onClick={() => {
                if (selectedNote == null) return;
                const confirmDelete = window.confirm("Delete this note?");
                if (confirmDelete) {
                    setNotes(notes.filter((item) =>
                        item.id !== selectedNote.id
                    ))
                    setSelectedNote(null);
                }
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