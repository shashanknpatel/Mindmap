import React, { useState, useEffect } from 'react';

const StickyNote = ({ id, top, left, onAddNote, onTextChange, text, handleDrag , scale }) => {
  const [inputValue, setInputValue] = useState(text);
  const [isDragging, setIsDragging] = useState(false);

  // Add a style object for the sticky note div with the transform property based on the scale prop
  const stickyNoteStyle = {
    transform: `scale(${scale})`,
    transformOrigin: 'top left'
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

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleDrag]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onTextChange(id, e.target.value);
  };

  return (
    <div
      className="absolute w-60 h-60 bg-emerald-300 p-3 rounded-lg shadow-xl transform"
      style={{ top, left , ...stickyNoteStyle }}
      onMouseDown={handleMouseDown}
    >{id}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-4xl mr-4 ml-1"
        onClick={() => onAddNote(id, top + 50, left + 50)}
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
        onClick={() => onAddNote(id, top + 50, left + 50)}
      >
        +
      </button>
    </div>
  );
};

export default StickyNote;
