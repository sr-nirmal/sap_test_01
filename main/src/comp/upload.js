import React, { useState, useRef } from 'react';
import './upload.css'
import Subheading from './subheading';
function Upload(props) {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [curName, setCurname] = useState(props.name);
  const [selectedFileList, setSelectedFileList] = useState([]);
  const inputFileRef = useRef(null);

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    setSelectedFiles(prevFiles => prevFiles ? [...prevFiles, ...newFiles] : newFiles);
    const fileList = Array.from(newFiles).map((file) => file.name);
    setSelectedFileList(prevList => [...prevList, ...fileList]);
  };

  const handleCancelFile = (fileName) => {
    const updatedList = selectedFileList.filter((name) => name !== fileName);
    setSelectedFileList(updatedList);
    const updatedFiles = Array.from(selectedFiles).filter((file) => file.name !== fileName);
    setSelectedFiles(updatedFiles);
    if (inputFileRef.current) {
      // Remove the file from the input element's file list by setting its value to an empty string
      for (let i = 0; i < inputFileRef.current.files.length; i++) {
        if (inputFileRef.current.files[i].name === fileName) {
          inputFileRef.current.value = '';
          break;
        }
      }
    }
  };

  const handleCancelAllFiles = () => {
    setSelectedFileList([]);
    setSelectedFiles(null);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  const handleUpload = () => {
    props.changeState(3)
    if (!selectedFiles) {
      alert('Please select one or more files to upload');
      return;
    }

    const formData = new FormData();
    console.log(selectedFileList)
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('file', selectedFiles[i]);
    }

    formData.append('file',selectedFiles)
    formData.append('name', curName);

    fetch('/recieve_file', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.resp==='success'){
          
          props.changeState(2);
        }
        // Handle the server response as needed
      })
      .catch(error => console.error(error));

    // Clear the selected files after upload
    setSelectedFiles(null);
    setSelectedFileList([]);
    if (inputFileRef.current) {
      inputFileRef.current.value = '';
    }
  };

  return (
    <div className='upload-container'>
      <Subheading
        title="Upload and attach file"
        description="Upload files to check the sustainability score"
      />
      <div className="upload1">
        <div><input type="file" id="upload-input" onChange={handleFileChange} className="upload-input" multiple ref={inputFileRef} />
          <p className="upload-dnd">OR DRAG AND DROP HERE</p></div>

      </div>
      {selectedFileList.length > 0 && (
        <div className='selected-file'>
          <div className='scroll'>
            <ul className="file-list">
              {selectedFileList.map((fileName, index) => (
                <li key={index} className='file-list'>
                  {fileName}{' '}
                  <p onClick={() => handleCancelFile(fileName)} className='cancel-single-file'>X</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className='upload-bottom'>
        <button onClick={handleCancelAllFiles} className="cancel-all">Cancel </button>
        <button onClick={handleUpload} className="attach-file">Attach Files</button>
      </div>
    </div>
  );
};
export default Upload;
