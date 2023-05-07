import React, { useState, useRef } from 'react';
import PieChart from './chart';
import 'chart.js/auto';

function Home(props){
    const [isFetched, setIsfetched]= useState(0);
    const [scoreArr , setArr]= useState([]);
    

    function init(){
        if(isFetched===0){
            fetch1();
        }
    }
    function fetch1(){
        setIsfetched(1)
        fetch('/get_reciepts_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"name": props.name })
        })
            .then(response => response.json())
            .then(data => {
                console.log("exe")
                setArr(data.score);
                console.log("Rec_array"+data.score);
               
                //console.log(data.recipt)
                // Handle the response from the server
            })

            .catch(error => {
                console.error('Error:', error);
            });
    }
    init();
    // console.log("array -> "+rec_array)
    console.log("counts -> "+scoreArr);
    return(
        <div>
           {props.name}
           <PieChart value1={scoreArr[0]} value2={scoreArr[1]} value3={scoreArr[2]} />
           {/* <PieChart value1={10} value2={2} value3={4} /> */}
           <button onClick = {() => setIsfetched(0)}>Refresh</button>
        </div>
    );
}
export default Home;
