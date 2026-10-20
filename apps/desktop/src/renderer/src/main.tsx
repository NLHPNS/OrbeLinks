import { createRoot } from 'react-dom/client';
import { useState } from 'react';

// note composition
type Note = {
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
    const [note, setNote] = useState({
        title:'',
        content:''
    }); // for updating title
    // create a note list
    const [notes, setNotes] = useState<Note[]>([
        {
            title: "jiangxuefeng",
            content: "Math"
        },
        {
            title: "test",
            content: "676767"
        }
    ]);
    // selecting a note
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    return (
        <div>
            <h1>Hello, {name}!</h1>

            {selectedNote !== null ? (
                <div>
                    <h2>{selectedNote.title}</h2>
                    <p>{selectedNote.content}</p>
                </div>
            ) : (
                <p>Select a note to view its content.</p>
            )}

            {/* <p>Title: {note.title}</p>
            <p>Content: {note.content}</p> */}

            <button onClick={() => setNotes([...notes, {
                title: "<New Note>",
                content: ""
            }])}>Add Note</button>

            <button>Delete Note</button>

            <input 
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
            />
            
            <ul>
                {/* go through the whole list, generate list items one by one*/}
                {notes.map((item, index) => (
                    <li 
                        key={index}
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