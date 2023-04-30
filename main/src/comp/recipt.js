import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import "./recipt.css"

function Recipt(props){
    const [name ,setName] =useState(props.name)
    const [rec_array, setArr]= useState([""])
    const [line_item, setLineitem]= useState([""])
    //const [rec_array, setArr]= useState(['', 'name_01_1', 'name_01_3'])
    //const [line_item, setLineitem]= useState(['Mineral Water', 'Egg Fried Rice', '9 Manchunanle', 'Masala Kulcha', 'Chicken Kadhai', 'Minit Mojito', 'Spicy Mexican', 'Large Thin Crust Chicken', 'Shawarma', 'JUICE AUGG Health', 'Your First Stop'])
    const [currentBill, setCurrentbill]=useState("name_01_1")
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
    const getLineitems = (bill) => {
    //function getLineitems(){  
      
        //e.preventDefault();
        console.log("Bill -> "+bill)
        setCurrentbill(bill)
        console.log("line_items")
        console.log("currentBill" +currentBill)
        
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
        <div className='container' >
            {currentBill !== "null" && (
            <div className ="chld_cnt1">
                {console.log(line_item)}
                {line_item.map(line => (
                    <div className='lineItems' >{line}</div >
                
                ))}
                <button onClick={() => setCurrentbill("null")}>back</button>
            </div>)}
            {currentBill === "null" && (
            <div className ="chld_cnt2">
                <button onClick={get_bills}> Get </button>
                {rec_array.map(bills => (
                    <button onClick = {() => getLineitems(bills)} className='btn'>
                        {bills}
                    </button>
                ))}
            </div>)}
        </div>
    );

}

export default Recipt; 