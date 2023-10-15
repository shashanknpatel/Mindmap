import React, { useState } from 'react';
import StickyNote from "./StickyNote";

const AddNote = () => {
    const [notes, setNotes] = useState([]);
    
    const addNote = () => {
      setNotes([...notes, <StickyNote onAddNote={addNote} />]);
    };
  
    return (
      <div>
        {notes.map((note, index) => (
          <div key={index}>{note}</div>
        ))}
      </div>
    );
  };
  
  export default AddNote;
  