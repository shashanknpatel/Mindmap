import React, { useState } from 'react';
import StickyNote from './StickyNote';

const Whiteboard = () => {
  const [notes, setNotes] = useState([]);
  const [lines, setLines] = useState([]);
  const [noteIdCounter, setNoteIdCounter] = useState(0);
  const [scale, setScale] = useState(1); // Add a state variable for scale
  const [defaultNote, setDefaultNote] = useState({ id: "default", top: 100, left: 100, text: "" });

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

  const handleDrag = (id, newX, newY) => {
    // Find the note with the matching id
    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return { ...note, top: newY, left: newX };
      }
      return note;
    });
  
    // Update the state with the new note positions
    setNotes(updatedNotes);

    // Check if the id is "default"
  if (id === "default") {
    // Update the top and left values of the default note
    setDefaultNote({ ...defaultNote, top: newY, left: newX });
  }
  };

  // Add a function to zoom in by multiplying the scale by 1.1
  const zoomIn = () => {
    setScale(scale * 1.1);
  };

  // Add a function to zoom out by dividing the scale by 1.1
  const zoomOut = () => {
    setScale(scale / 1.1);
  };

  // Add a style object for the whiteboard div with the transform property
  const whiteboardStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left'
  };

  return (
    <div className="relative flex w-screen h-screen overflow-hidden bg-slate-100">
      {/* Add buttons to call the zoom functions */}
      <button onClick={zoomIn}>Zoom In</button>
      <button onClick={zoomOut}>Zoom Out</button>
      {/* Apply the whiteboard style to the whiteboard div */}
      <div className="static grid grid-cols-5 grid-rows-5 w-full h-full" style={whiteboardStyle}>
        {Array.from({ length: 25 }, (_, index) => (
          <div
            key={index}
            className="border border-dashed border-gray-300 h-full"
          ></div>
        ))}
      </div>
      {notes.map((note) => (
        // Pass the scale as a prop to the sticky note component
        <StickyNote
          key={note.id}
          id={note.id}
          top={note.top}
          left={note.left}
          onAddNote={(id, top, left) => addNote(top, left)}
          onTextChange={(id, text) => updateNoteText(id, text)}
          text={note.text}
          handleDrag={handleDrag}
          scale={scale} // Pass the scale as a prop
        />
      ))}
      {/* Default StickyNote */}
      <StickyNote
        key={defaultNote.id}
        id={defaultNote.id}
        top={defaultNote.top}
        left={defaultNote.left}
        onAddNote={addNote}
        onTextChange={updateNoteText}
        text={defaultNote.text}
        handleDrag={handleDrag}
        scale={scale} // Pass the scale as a prop
      />
    </div>
  );
};

export default Whiteboard;
