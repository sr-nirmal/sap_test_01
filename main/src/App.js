import logo from './logo.svg';
import React, { Component } from 'react';
import { useState } from 'react';
import './App.css';
import Top from './comp/top';
import Right from './comp/right';
import Upload from './comp/upload';
import Login_frame from './comp/login';
import Recipt from './comp/recipt';
/*class App extends Component{
  constructor(){
    super();
    this.state={
      current : 1, 
        //   0 for login 
        //  1 for dashboard
    };
    this.to_login = this.to_login.bind(this); 
    this.to_dashboard = this.to_dashboard.bind(this);
  }
  to_login(){
    this.setState(
      {
        current : 0,
      }
    );
  }
  to_dashboard(){
    this.setState(
      {
        current : 1,
      }
    );
  }
  
  render(){
    return(
      <div>
        {this.state.current===0 && (
          <div>
            <Login_frame />
            <button onClick={this.to_dashboard}>Login</button>
          </div>
          ) 
        }

        {this.state.current===1 && (
          <div>
            <button className='logout' onClick={this.to_login}>LOGOUT</button>
            <Top></Top>
            <Right></Right>
          </div>
        )}
        </div>
    );
  }
}
/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App(){
  const [currentState, setcurrentState]=useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
      
      e.preventDefault();
  
      fetch('/login', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data.result);
          if(data.result === "success"){
            setcurrentState(1);
          }
          console.log(currentState);
          // Handle the response from the server
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }

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
      function DashBoard(){
          return (
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
            <div className ='left'>
                <Top ></Top>
            </div>
            <div className='center'>
              {currentState===0 && (
                <div>
                  Init
                </div>
              )}
              {currentState===1 && (
                <div>
                  <Upload />
                </div>
              )}
              {currentState===2 && (
                <div>
                  <Recipt />
                </div>
              )}
            </div>

            <div className='right'>
              <h1>hello name_01</h1>
              {/* {<button onClick={() => this.to_init()} className='upload_btn'> Upload </button>} */}
              

              <button onClick={() => setcurrentState(1)} className='upload_btn'> Upload </button>
              <button onClick={() => setcurrentState(0)} className='back_btn'> Home </button>
              <button onClick={() =>setcurrentState(2)} className='to_bill'> Recipts </button>
              {/* <button onClick ={null} className='rec_btn'> View Bills </button> */}
        
              </div>
          </div>
          
      );

  
}

export default App;

