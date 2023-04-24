import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Top from './comp/top';
import Right from './comp/right';
import Upload from './comp/upload';

class App extends Component{
  constructor(){
    super();
    this.state={
      current : 1, 
      /* 0 for login 
         1 for dashboard */
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
            <h1>Hello login</h1>
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

export default App;
