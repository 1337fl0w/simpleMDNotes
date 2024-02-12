// App.tsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import Home from './pages/Home';
import Header from './components/Header';
import Note from './pages/Note';
import NoteView from './pages/NoteView';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const addOrUpdateNote = (newOrUpdatedNote: Note, index?: number) => {
    let updatedNotes: Note[] = [];
    if (index != null) {
      // Update an existing note
      updatedNotes = notes.map((note, i) => i === index ? newOrUpdatedNote : note);
    } else {
      // Add a new note
      updatedNotes = [...notes, newOrUpdatedNote];
    }
    setNotes(updatedNotes);
    // Save the updated notes array to localStorage
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const deleteNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    // Update localStorage after deleting a note
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const NoteViewWrapper = () => {
    let { id } = useParams<{ id: string }>();
    const index = parseInt(id || '0', 10);
    const note = notes[index];
    const navigate = useNavigate();

    const onDelete = (index: number) => {
      deleteNote(index);
      navigate('/');
    };

    const onEdit = (index: number) => {
      navigate(`/note/edit/${index}`);
    };

    return note ? <NoteView note={note} index={index} onDelete={onDelete} onEdit={onEdit} /> : <div>Note not found</div>;
  };

  const NoteEditWrapper = () => {
    let { id } = useParams<{ id: string }>();
    const index = parseInt(id || '0', 10);
    const noteToEdit = notes[index];
    return noteToEdit ? <Note note={noteToEdit} index={index} addOrUpdateNote={addOrUpdateNote} /> : <div>Note not found</div>;
  };

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home notes={notes} onDeleteNote={deleteNote} />} />
          <Route path="/note" element={<Note addOrUpdateNote={addOrUpdateNote} />} />
          <Route path="/note/view/:id" element={<NoteViewWrapper />} />
          <Route path="/note/edit/:id" element={<NoteEditWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
