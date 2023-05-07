import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import PieChart from './chart';
import "./recipt.css"
import 'chart.js/auto';
import Subheading from './subheading';

function Receipt(props) {

    const [name, setName] = useState(props.name)
    console.log(name)
    const [rec_array, setArr] = useState([])
    const [line_item, setLineitem] = useState([])
    //const [rec_array, setArr]= useState(['name_01_1', 'name_01_3'])
    //const [line_item, setLineitem]= useState(['Mineral Water', 'Egg Fried Rice', '9 Manchunanle', 'Masala Kulcha', 'Chicken Kadhai', 'Minit Mojito', 'Spicy Mexican', 'Large Thin Crust Chicken', 'Shawarma', 'JUICE AUGG Health', 'Your First Stop'])
    const [currentBill, setCurrentbill] = useState(props.name)
    const [currentState, setCurrentState] = useState(0)
    const [showPopup, setShowPopup] = useState(false);
    const [reasonText, setReasonText] = useState('');
    const [isFetched, setIsfetched] = useState(0);
    function init() {
        if (isFetched === 0) {
            get_bills();

        }
    }
    const [counts, setCounts] = useState({ no: 0, moderate: 0, yes: 0 });
    useEffect(() => {
        console.log(rec_array);
    }, [rec_array]);

    function get_bills() {

        setIsfetched(1);
        fetch('/get_reciepts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": name })
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
        setCurrentState(1)
        //e.preventDefault();
        if (bill === currentBill) {
            console.log("in sync");
        }
        else {


            console.log("Bill -> " + bill)
            setCurrentbill(bill)
            console.log("line_items")
            console.log("currentBill" + currentBill)
            setLineitem([])
            fetch('/get_lineitems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "rec_name": bill })
            })
                .then(response => response.json())
                .then(data => {
                    console.log("hello line_item " + bill);


                    setLineitem(data.line_items);
                    for (let i = 0; i < line_item.length; i++) {
                        if (line_item[i][1] < 3) {
                            setCounts({ ...counts, no: counts.no + 1 });
                        } else if (line_item[i][1] >= 3 && data[i] <= 7) {
                            setCounts({ ...counts, moderate: counts.moderate + 1 });
                        } else {
                            setCounts({ ...counts, yes: counts.yes + 1 });
                        }
                    }
                    console.log(line_item)

                    //console.log(data.recipt)
                    // Handle the response from the server
                })

                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }
    const deleteBill = (bill) => {
        //function getLineitems(){  
        //e.preventDefault(
        fetch('/delete_bill', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "rec_name": bill, "name": props.name })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.response)
                setArr(data.response);
                //setLineitem(data.response[1]);

                //console.log(data.recipt)
                // Handle the response from the server
            })

            .catch(error => {
                console.error('Error:', error);
            });

    }
    console.log(currentBill)

    const togglePopup = (text) => {
        setReasonText(text);
        setShowPopup(!showPopup);
    };
    useEffect(() => {
        init();
    }, []);

    return (
        <div className="receipt-container">
            <Subheading title="Attached receipts" description="Files that have been attached" />
            <div className="grid-header">
                <p className="file-name">File name</p>
                <p className="date-uploaded">Date uploaded</p>
            </div>
            {currentState === 1 && (
                <div className="chld_cnt1">
                    {console.log(line_item)}
                    {line_item.map((line, index) => (
                        <div key={index} className="line-item-container">
                            <p className='line-item'>
                                {line[0]}
                            </p>
                            <p className='sustainability-score'>
                                {line[1]}
                            </p>
                            <p onClick={() => togglePopup(line[2])} className="reason">reason</p>
                        </div>
                    ))}
                    <PieChart value1={counts.no} value2={counts.moderate} value3={counts.yes} />
                    <button onClick={() => setCurrentState(0)}>Back</button>
                </div>
            )}
            {showPopup && (
                <div className="popup">
                    <h4>Reason</h4>
                    <p className="reason-text">{reasonText}</p>
                    <button onClick={togglePopup}>Close Popup</button>
                </div>
            )}
            {currentState === 0 && (
                <div className="chld_cnt2">
                    {rec_array.map((bills, index) => (
                        <div key={index} className="receipt">
                            <p onClick={() => getLineitems(bills[0])} className="btn">
                                {bills[0]} -- {bills[1]}
                            </p>
                            <p onClick={() => deleteBill(bills[0])} className="btn1">
                                Delete
                            </p>
                        </div>
                    ))}
                </div>
            )}
            <button onClick={() => setIsfetched(0)}>Refresh</button>
        </div>

    );

}

export default Receipt; 
