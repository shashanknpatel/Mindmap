import React, { useState } from 'react';
import StickyNote from './StickyNote';

const Whiteboard = () => {
  const [notes, setNotes] = useState([]);
  const [lines, setLines] = useState([]);
  const [noteIdCounter, setNoteIdCounter] = useState(0);

  const addNote = (top, left) => {
    const newNoteId = `note-${noteIdCounter}`;
    setNotes([...notes, { id: newNoteId, top, left, text: '' }]);
    setNoteIdCounter(noteIdCounter + 1);

    // Connect the new note to the original one with a line
    if (notes.length > 0) {
      setLines([
        ...lines,
        { id: `line-${newNoteId}`, from: newNoteId, to: notes[0].id },
      ]);
    }
  };

  const updateNoteText = (id, text) => {
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, text };
      }
      return note;
    });
    setNotes(updatedNotes);
  };

  return (
    <div className="relative flex w-screen h-screen overflow-hidden bg-slate-100">
      <div className="static grid grid-cols-5 grid-rows-5 w-full h-full">
        {Array.from({ length: 25 }, (_, index) => (
          <div
            key={index}
            className="border border-dashed border-gray-300 h-full"
          ></div>
        ))}
      </div>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          id={note.id}
          top={note.top}
          left={note.left}
          onAddNote={(id, top, left) => addNote(top, left)}
          onTextChange={(id, text) => updateNoteText(id, text)}
          text={note.text}
        />
      ))}
      {/* Default StickyNote */}
      <StickyNote
        id="default"
        top={100} // Set the initial position
        left={100}
        onAddNote={addNote}
        onTextChange={updateNoteText}
        text=""
      />
    </div>
  );
};

export default Whiteboard;
