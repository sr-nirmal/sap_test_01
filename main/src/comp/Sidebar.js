import { useState } from 'react';


import Upload from './Upload';
import Receipt from './Receipt';
import Login from './Login';
import './sidebar.css';

function Sidebar(props) {
  const [currentState, setcurrentState] = useState(0);

  function handleLogout() {
    setcurrentState(-1);
    props.onLogout();
  }

  return (
    <div className='main'>
      <div className='sidebar'>
        <div className='sidebar-title-container'>
          <h1 className='sidebar-title'>Receipt-Scan</h1>
        </div>
        <div className='sidebar-user-container'>
          <h2 className='sidebar-user'>Hello {props.name}</h2>
        </div>

        <div className='sidebar-buttons-container'>
          <button className='menu-btn' onClick={() => setcurrentState(0)}>
            Home
          </button>
          <button className='menu-btn' onClick={() => setcurrentState(1)}>
            Upload
          </button>

          <button className='menu-btn' onClick={() => setcurrentState(2)}>
            Receipts
          </button>
        </div>

        <div className='logout-btn-container'>
          <button id='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>

      <div className='dashboard-container'>
          <div>{currentState === 0 && <div className='init'>Init</div>}</div>
          <div>{currentState === 1 && <Upload />}</div>
          <div>{currentState === 2 && <Receipt />}</div>
          <div>{currentState === -1 && <Login />}</div>
      </div>
    </div>


  );
}

export default Sidebar;
