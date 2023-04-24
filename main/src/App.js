import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Top from './comp/top';
import Right from './comp/right';
import Upload from './comp/upload';
class Dashboard extends Component{
  render(){
    return(
        <div>
          <button className='logout' onClick={to_login}>LOGOUT</button>
          <Top></Top>
          <Right></Right>
        </div>
      );
    }
  
}
class App extends Component{
  constructor(){
    super();
    this.state={
      current : 0, 
      /* 0 for login 
         1 for dashboard */
    }
  }
  to_login(){
    this.setState(
      {
        current : 0
      }
    );
  }
  render(){
    return(
      <div>
        {this.state.current===0 && (
            <h1>Hello login</h1>
          ) 
        }

        {this.state.current===0 && (
          <div>
            <button className='logout' onClick={to_login}>LOGOUT</button>
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

export default App;
