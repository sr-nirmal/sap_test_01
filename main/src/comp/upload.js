import React, { Component } from 'react';
import './upload.css';

class Upload extends Component{
    render(){
        return(
            <div className="frame">
                
                    <h3 className='title'>UPLOAD FILE</h3>
                    <button onClick={null} className="add1">done</button>
                    <div className="upload1">
                        <h4 className='dnd'>DRAG AND DROP HERE</h4>
                        <h1 className="or">OR</h1>
                        <button onClick={null} className="add">+ add here!</button>
                    </div>
                
                
            </div>

        )
            


        
    }
}
export default Upload;