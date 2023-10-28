import React, { useState, useEffect } from 'react';
import '../App.css'

function DraggableDiv({ initialX, initialY, onDrag }) {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        onDrag(e.clientX, e.clientY); // Pass the new position to the parent component
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
  }, [isDragging, onDrag]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  return (
    <div
      className="draggable"
      style={{ left: `${initialX}px`, top: `${initialY}px` }}
      onMouseDown={handleMouseDown}
    >
      Drag me
    </div>
  );
}

export default DraggableDiv;
