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

export default App;
