import logo from './logo.svg';
import React, { Component } from 'react';
import { useState } from 'react';
import './App.css';
import Top from './comp/top';
import Right from './comp/right';
import Upload from './comp/upload';
import Login_frame from './comp/login';
import Recipt from './comp/recipt';


function App(){
  const [currentState, setcurrentState]=useState(0);
  const [inputName , setInputname]= useState("");
  const [name, setName] = useState('');

  // const handleLogin = (e) => {
      
  //     e.preventDefault();
  
  //     fetch('/login', {
  //         method: 'POST',
  //         headers: {
  //         'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify({ username, password })
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //         console.log(data.result);
  //         if(data.result === "success"){
  //           setcurrentState(1);
  //         }
  //         console.log(currentState);
  //         // Handle the response from the server
  //     })
  //     .catch(error => {
  //         console.error('Error:', error);
  //     });
  // }

  // function LoginFrame(){
  //     return (
  //         <div>
  //           <h1>Login Page</h1>
  //           <form onSubmit={handleLogin}>
  //             <label>
  //               Username:
  //               <input
  //                 type="text"
  //                 value={username}
  //                 onChange={(e) => setUsername(e.target.value)}
  //               />
  //             </label>
  //             <br />
  //             <label>
  //               Password:
  //               <input
  //                 type="password"
  //                 value={password}
  //                 onChange={(e) => setPassword(e.target.value)}
  //               />
  //             </label>
  //             <br />
  //             <button type="submit">Login</button>
  //           </form>
  //         </div>
  //       );
  //     }
      function DashBoard(props){
          return (
<<<<<<< HEAD
              // <div>
              //     <div className = 'left'>
              //       <Top />
              //     </div>
                  
              //     <div className = 'right'>
              //       <button className='logout' onClick={setcurrentState(0)}>LOGOUT</button>
              //       <Right ></Right>
              //     </div>
                  
              // </div>
              <div>
                <Top className ='left'></Top>
              </div>
          );
      }
      return (
          // <div className='main'>
          //   <Top className ="left"/> 
          //   <Right className="right"/>
          //   {/* <div className="left" >
          //     <Top />
          //   </div>
            
            
          //   <div className="top" >
          //     <Right />
          //   </div> */}
            
          //  </div>
          // <div className='main'>
          //   <div className = 'left'>
          //     <Top ></Top>
          //   </div>
            
          //   <div className = 'right'>
          //     <button className='logout' onClick={setcurrentState(0)}>LOGOUT</button>
          //     <Right ></Right>
          //   </div>
                  
          // </div>
          <div className='main'>
            
            <div className='center'>
              {currentState===0 && (
                <div>
                  Init
                </div>
              )}
             
              {currentState===2 && (
                <div>
                  <Recipt />
                </div>
              )}
            </div>
=======
            <div className='main'>
              {/* <div className ='left'>
                  <Top >name</Top>
              </div> */}
              
>>>>>>> ff6362981bc5a5035628163db93a6f57aa2e5bd7

            <div className='right'>
              <h1>hello name_01</h1>
    

              <button onClick={() => setcurrentState(1)} className='upload_btn'> Upload </button>
              <button onClick={() => setcurrentState(0)} className='back_btn'> Home </button>
              <button onClick={() =>setcurrentState(2)} className='to_bill'> Recipts </button>
<<<<<<< HEAD

=======
              <button onClick={() =>setName("")} className='to_bill'> Logout </button>
              {/* <button onClick ={null} className='rec_btn'> View Bills </button> */}
        
>>>>>>> ff6362981bc5a5035628163db93a6f57aa2e5bd7
              </div>
              <div className='center'>
                {currentState===0 && (
                  <div>
                    Init
                  </div>
                )}
                {currentState===1 && (
                  <div>
                    <Upload>props.name</Upload>
                  </div>
                )}
                {currentState===2 && (
                  <div>
                    <Recipt>props.name</Recipt>
                  </div>
                )}
            </div>
          </div>
          );
      }
      function handleChange(event) {
        setInputname(event.target.value);
      }
    
      function handleSubmit(event) {
        event.preventDefault();
        console.log(`Hello, ${name}!`);
        setName(inputName);
        // Here, you can perform any logic with the entered name
      }
      function GenerateIcon(username) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const size = 64;
      
        canvas.width = size;
        canvas.height = size;
      
        context.fillStyle = '#0077cc';
        context.fillRect(0, 0, size, size);
      
        context.font = '24px sans-serif';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'white';
      
        let firstTwoChars = '';
        if (typeof username === 'string' && username.length > 0) {
          firstTwoChars = username.substring(0, 2).toUpperCase();
        }
      
        context.fillText(firstTwoChars, size / 2, size / 2);
      
        return canvas.toDataURL();
      }
      return (
          <div>
            {name === '' && (
              <form onSubmit ={handleSubmit}  >
              <label>
                Name:
                <input type="text" value={inputName} onChange={handleChange} />
              </label>
              <button type ='submit'>Submit</button>
              </form>
            )}
            {name !== '' && (
              <DashBoard>{name}</DashBoard>

            )}
          </div>
          // <div>
          //   <GenerateIcon>Name</GenerateIcon>
          // </div>
          
      );

  
}

export default App;

