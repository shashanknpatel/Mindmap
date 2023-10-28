import React, { useState, useEffect } from 'react';

const StickyNote = ({ id, top, left, onAddNote, onTextChange, text, handleDrag , scale }) => {
  const [inputValue, setInputValue] = useState(text);
  const [isDragging, setIsDragging] = useState(false);

  // Add a style object for the sticky note div with the transform property based on the scale prop
  const stickyNoteStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    touchAction: 'none' // prevent default touch behavior
  };

  // Add a style object for the button element with cursor and feedback properties
  const buttonStyle = {
    cursor: 'pointer', // indicate that it is clickable
    backgroundColor: '#fff', // change color when touched
    opacity: 0.8 // change opacity when touched
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleDrag(id, e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handleMouseMove); // use pointermove instead of mousemove
    window.addEventListener('pointerup', handleMouseUp); // use pointerup instead of mouseup

    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      window.removeEventListener('pointerup', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onTextChange(id, e.target.value);
  };

  // Add a function to handle touch start event on the button
  const handleTouchStart = (e) => {
    e.preventDefault(); // prevent default touch behavior
    e.target.style.backgroundColor = '#ccc'; // change color when touched
    e.target.style.opacity = 1; // change opacity when touched
  };

  // Add a function to handle touch end event on the button
  const handleTouchEnd = (e) => {
    e.preventDefault(); // prevent default touch behavior
    e.target.style.backgroundColor = '#fff'; // restore color when released
    e.target.style.opacity = 0.8; // restore opacity when released
    onAddNote(id, top + 50, left + 50); // call the onAddNote function
  };

  return (
    <div
      className="absolute w-60 h-60 bg-emerald-300 p-3 rounded-lg shadow-xl transform"
      style={{ top, left , ...stickyNoteStyle }}
      onPointerDown={handleMouseDown} // use onPointerDown instead of onMouseDown
    >{id}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-4xl mr-4 ml-1"
        style={{ ...buttonStyle }} // apply the button style
        onClick={() => onAddNote(id, top + 50, left + 50)} // keep the onClick prop for mouse events
        onTouchStart={handleTouchStart} // add onTouchStart prop for touch events
        onTouchEnd={handleTouchEnd} // add onTouchEnd prop for touch events
      >
        +
      </button>
      <div className="flex items-center justify-center h-40">
        <textarea
          type="text"
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          style={{
            overflow: 'hidden',
            minHeight: '1rem',
          }}
          className="p-2 outline-none resize-none text-gray-700 bg-teal-400 rounded-lg border-none border-2 w-40 h-40 mt-14"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 font-bold text-4xl mr-1"
        style={{ ...buttonStyle }} // apply the button style
        onClick={() => onAddNote(id, top + 50, left + 50)} // keep the onClick prop for mouse events
        onTouchStart={handleTouchStart} // add onTouchStart prop for touch events
        onTouchEnd={handleTouchEnd} // add onTouchEnd prop for touch events
      >
        +
      </button>
    </div>
  );
};

export default StickyNote;
