import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Top from './comp/top';
import Right from './comp/right';
import Upload from './comp/upload';

class App extends Component{
  render(){
    return(
      <div>
        <button className='logout'>Logout</button>
        <Top></Top>
        <Right></Right>
        
        
        
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

export default App;
