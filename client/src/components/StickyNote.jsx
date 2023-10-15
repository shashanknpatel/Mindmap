import React, { useState } from 'react';

const StickyNote = ({ onAddNote }) => {
  const [inputValue, setInputValue] = useState('');

  const addNote = () => {
    setNotes([...notes, <StickyNote onAddNote={addNote} />]);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="relative flex w-screen h-screen bg-neutral-100 overflow-hidden">
      <div className="static grid grid-cols-5 grid-rows-5 w-full h-full">
        {Array.from({ length: 25 }, (_, index) => (
          <div
            key={index}
            className="border border-dashed border-gray-300 h-full"
          ></div>
        ))}
      </div>
      <div className="absolute m-10 w-60 h-60 bg-emerald-300 p-3 rounded-lg shadow-xl transform">
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 font-bold text-4xl mr-4 ml-1"
          onClick={onAddNote}
        >
          +
        </button>
        <div className="flex items-center justify-center h-40">
          <textarea
            type="text"
            id="noteInput"
            name="noteInput"
            onInput={(e) => {
              e.target.style.height = 'auto'; //Reset height to auto
              e.target.style.height = e.target.scrollHeight + 'px'; //Set the height to match the content
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
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 font-bold text-4xl mr-1">
          +
        </button>
      </div>
    </div>
  );
};

export default StickyNote;
