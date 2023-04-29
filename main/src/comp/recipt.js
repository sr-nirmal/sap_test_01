import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import "./recipt.css"

function Recipt(props){
    const [name ,setName] =useState(props.name)
    const [rec_array, setArr]= useState([""])
    const [line_item, setLineitem]= useState([""])
    const [currentBill, setCurrentbill]=useState("null")
    const [currentState, setCurrentState] = useState(0)
    useEffect(() => {
        console.log(rec_array);
      }, [rec_array]);
    const get_bills = (e) => {
        
      
        e.preventDefault();
    
        fetch('/get_reciepts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name" :name })
        })
        .then(response => response.json())
        .then(data => {
            console.log("hello");
            
            setArr(data.recipt);
            console.log(rec_array);
            //console.log(data.recipt)
            // Handle the response from the server
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
    }
    const getLineitems = (e,bill) => {
    //function getLineitems(){  
      
        e.preventDefault();
        
        console.log("line_items")
        console.log("currentBill" +currentBill)
        setCurrentState(bill)
        fetch('/get_lineitems', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"rec_name" :bill })
        })
        .then(response => response.json())
        .then(data => {
            console.log("hello line_item "+bill);
            
           
            setLineitem(data.line_items);
            console.log(line_item)
            
            //console.log(data.recipt)
            // Handle the response from the server
        })
        
        .catch(error => {
            console.error('Error:', error);
        });
    }
    console.log(currentBill)
    return(
        <div className='container'>
            {currentBill !== "null" && (<div>
                {line_item.map(line => (
                    <h1>line</h1>
                
                ))}
                <button onClick={setCurrentbill("null")}>back</button>
            </div>)}
            {currentBill==="null" && (<div className='container'>
                <button onClick={get_bills}> Get </button>
                {rec_array.map(bills => (
                    <button onClick = {getLineitems(bills)}>
                        {bills}
                    </button>
                ))}
            </div>)}
        </div>
    );

}

export default Recipt; 