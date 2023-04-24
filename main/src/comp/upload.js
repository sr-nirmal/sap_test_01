import React, { useState,Component } from 'react';
import './upload.css';



const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [cur_state] = useState(0);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    fetch('http://localhost:5000/recieve_file', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Handle the server response as needed
    })
    .catch(error => console.error(error));
  };

  return (
    <div className="frame">
                
        <h3 className='title'>UPLOAD FILE</h3>
        <button onClick={handleUpload}  className="add1">done</button>
        <div className="upload1">
            <h4 className='dnd'>DRAG AND DROP HERE</h4>
            <h1 className="or">OR</h1>
            <input type="file" id ="+ add here!"onChange={handleFileChange} className="add" />
            {/* <button  onClick={handleUpload} className="add">+ add here!</button> */}
        </div>
                
                
      </div>
  );
};

export default Upload;