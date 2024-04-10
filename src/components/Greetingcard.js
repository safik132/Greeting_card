import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import Draggable from 'react-draggable';
import EidImage from '../assets/Eidd_green_png.png';
import '../index.css';

const GreetingCard = () => {
  const [recipientName, setRecipientName] = useState('');
  const [textPosition, setTextPosition] = useState({x: 0, y: 0});
  const captureRef = useRef(null);

  const handlePrint = () => {
    console.log('captureRef.current:', captureRef.current); // Ensure this is the correct element
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        console.log('Canvas capture successful'); // Check if this logs
        const link = document.createElement('a');
        link.download = 'eid-mubarak.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      }).catch(error => {
        console.error('html2canvas error:', error); // Check for any errors
      });
    }
  };
  

  const handleDrag = (e, data) => {
    console.log('Dropped at:', data.x, data.y); // Logging the X and Y coordinates
    setTextPosition({ x: data.x, y: data.y });
  };

  return (
    <div className="card" style={{ backgroundImage: `url(${EidImage})`, width: '1080px', height: '1080px' }}>
      {/* Capture area starts here */}
      <div ref={captureRef}>
        <Draggable onDrag={handleDrag} defaultPosition={{x: 0, y: 0}} position={textPosition}>
          <div className="draggableText">{recipientName}</div>
        </Draggable>
      </div>
      {/* Capture area ends here */}
      <textarea
        placeholder="Enter your name"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
        className="nameInput"
      />
      <button className="button" onClick={handlePrint}>Download</button>
    </div>
  );
};

export default GreetingCard;
