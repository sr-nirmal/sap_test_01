import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import Fun_1 from "./comp/comp_1"
import Conn from "./comp/py_conn"




class App extends Component{
  render(){  
    return(
      <div className="App">
        <Conn />
      
        
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
          Learn React Now
        </a>
      </header>
    </div>
  );
}*/


export default App;