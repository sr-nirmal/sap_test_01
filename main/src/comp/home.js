import React, { useState, useRef } from 'react';
import PieChart from './chart';
import 'chart.js/auto';

function Home(props){
    const [isFetched, setIsfetched]= useState(0);
    const [rec_array , setArr]= useState([]);
    const [counts, setCounts] = useState({ no: 0, moderate: 0, yes : 0 });

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
                setArr(data.recipt);
                console.log("Rec_array"+data.recipt);
                for (let i = 0; i < rec_array.length; i++) {
                    console.log("element -> "+rec_array[i])
                    if (rec_array[i] < 3) {
                       
                      setCounts({ ...counts, no: counts.no + 1 });
                    } else if (rec_array[i] >= 3 && data[i] <= 7) {
                      setCounts({ ...counts, moderate: counts.moderate + 1 });
                    } else {
                      setCounts({ ...counts, yes: counts.yes + 1 });
                    }
                  }
               
                //console.log(data.recipt)
                // Handle the response from the server
            })

            .catch(error => {
                console.error('Error:', error);
            });
    }
    init();
    // console.log("array -> "+rec_array)
    console.log("counts -> "+counts);
    return(
        <div>
           {props.name}
           <PieChart value1={counts['no']} value2={counts['moderate']} value3={counts['yes']} />
           {/* <PieChart value1={10} value2={2} value3={4} /> */}
           <button onClick = {() => setIsfetched(0)}>Refresh</button>
        </div>
    );
}
export default Home;