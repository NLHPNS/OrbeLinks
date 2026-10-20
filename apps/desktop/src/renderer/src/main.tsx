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

// const confirmedDelete = window.confirm("Delete this note?");

// component for React
function App() {
    const name = "OrbeLinks";
    const [note, setNote] = useState({
        title:'',
        content:''
    }); // for updating title
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

    return (
        <div>
            <h1>Hello, {name}!</h1>

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

            {/* <p>Title: {note.title}</p>
            <p>Content: {note.content}</p> */}

            <button onClick={() => setNotes([...notes, {
                id: crypto.randomUUID(),
                title: "<New Note>",
                content: ""
            }])}>Add Note</button>

            <button>Delete Note</button>

            {/* <input 
                type="text"
                value={note.title}
                onChange={(event) => setNote({
                    ...note,
                    title: event.target.value
                })}
            />
            <textarea
                value={note.content}
                onChange={(event) => setNote({
                    ...note,
                    content: event.target.value
                })}
            /> */}
            
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