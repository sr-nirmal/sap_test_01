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
    <div className='upload_main'>
                
        
      <div>
        <div class="upload1">
          <h3 class="title">UPLOAD FILE</h3>
          <button onClick={handleUpload} class="add1">done</button>
          <h4 class="dnd">DRAG AND DROP HERE</h4>
          <h1 class="or">OR</h1>
          <input type="file" id="+ add here!" onChange={handleFileChange} class="add" />
        </div>
      </div>
      
                
      </div>
  );
};

export default Upload;