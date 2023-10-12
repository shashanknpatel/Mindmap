// Whiteboard.js
import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../index.css';

// Node component
const Node = ({ left, top, text }) => {
  const [, ref] = useDrag(() => ({
    type: 'node',
    item: { left, top, text },
  }));

  return (
    <div
      ref={ref}
      className="whiteboard-node"
      style={{ left, top }}
    >
      {text}
    </div>
  );
};

const Whiteboard = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = (x, y) => {
    setNodes([...nodes, { left: x, top: y, text: 'Node' }]);
  };

  return (
    <div className="whiteboard-container">
      <button onClick={() => addNode(50, 50)}>Add Node</button>
      <div className="whiteboard">
        {nodes.map((node, index) => (
          <Node key={index} {...node} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Whiteboard />
    </DndProvider>
  );
};

export default App;
