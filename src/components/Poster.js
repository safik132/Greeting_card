import React, { useState } from 'react';
import EidImage from '../assets/Eid_green_4.png'; // Ensure the path is correct
import '../index.css';

function Poster() {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');

  const downloadPoster = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1080; // Adjusted to your image's dimensions
    canvas.height = 1080; // Adjusted to your image's dimensions
  
    const image = new Image();
    image.src = EidImage; // Using the imported image
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.font = '25px Montserrat';// Adjusted for visibility on a larger image
      ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.fillStyle = '#000'; // Adjust text color as needed
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'; // Change text color and transparency here
      ctx.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.5)'; 
       // Reset shadow for any further drawing
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
      ctx.fillText(name, 75, canvas.height - 280); // Adjust text position
      ctx.fillText(designation, 75, canvas.height - 240); // Adjust text position
  
      const imageURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageURL;
      link.download = 'eid-mubarak-poster.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Designation"
        value={designation}
        onChange={(e) => setDesignation(e.target.value)}
      />
      <div className="poster">
        {/* Using the imported image directly here */}
        <img src={EidImage} alt="Eid Mubarak" style={{ width: '100%', maxWidth: '540px' }} />
        <div className="text-overlay">
          <p>{name}</p>
          <p>{designation}</p>
        </div>
      </div>
      <button onClick={downloadPoster}>Download</button>
    </div>
  );
}

export default Poster;
