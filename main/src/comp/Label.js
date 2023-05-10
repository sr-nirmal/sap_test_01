import React from "react";
// import './Label.css'
import './recipt.css'
function Label({file_name,score ,date}) {
    return (
        <div className="grid-header">
            <p className="file-name">{file_name}</p>
            <p className='lscore'>{score}</p>
            <p className="date-uploaded">{date}</p>

        </div>
    );
}
export default Label;