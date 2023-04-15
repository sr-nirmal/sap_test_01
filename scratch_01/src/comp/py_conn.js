import React, {useState,useEffect,Component } from 'react'

class Conn extends Component{
   

    render(){
       
        const handleSubmit = (e) => {
            e.preventDefault();
            const inputString = "hello";
          
            fetch('/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({inputString})
            })
            .then(response => response.json())
            .then(data => console.log(data))
          }
        return(
            <div>
                
                <button  onClick={handleSubmit}>
                    
                    Python
                
                </button>
            </div>
        );
    }
}

export default Conn;