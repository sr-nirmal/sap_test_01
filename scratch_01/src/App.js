import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Conn from "./comp/py_conn"
import Entry from "./comp/react_py_conn"
import File from "./comp/file_trans"
import Fileupload from './comp/fileupload';

import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

import Fun_1 from "./comp/comp_1"
import Fun_2 from "./comp/comp_2"

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Frame 1</Link>
            </li>
            <li>
              <Link to="/frame2">Frame 2</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/frame2">
            <Fun_2 />
          </Route>
          <Route path="/">
            <Fun_1 />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
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

