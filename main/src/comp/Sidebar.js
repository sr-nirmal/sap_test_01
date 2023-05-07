import { useState } from 'react';
import Upload from './upload';
import Receipt from './Receipt';
import Login from './login';
import Home from './home'
import './sidebar.css';

function Sidebar(props) {
  const [currentState, setCurrentState] = useState(0);

  const handleLogout = () => {
    setCurrentState(-1);
    props.onLogout();
  };

  const renderHeading = () => {
    if (currentState === 0) return 'Home';
    if (currentState === 1) return 'Upload';
    if (currentState === 2) return 'Receipts';
  };
  function changeState(value){
    setCurrentState(value);
  }

  const renderContent = () => {
    if (currentState === 0) return <Home className ='init' name = {props.name}/>;
    if (currentState === 1) return <Upload name={props.name} />;
    if (currentState === 2) return <Receipt name={props.name} />;
    if (currentState === -1) return <Login />;
  };

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
          <div className='menu-bar'>
            <button className='menu-btn' onClick={() => setCurrentState(0)}>
              Home
            </button>
            <button className='menu-btn' onClick={() => setCurrentState(1)}>
              Upload
            </button>
            <button className='menu-btn' onClick={() => setCurrentState(2)}>
              Receipts
            </button>
          </div>
        </div>

        <div className='logout-btn-container'>
          <button id='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className='dashboard-container'>
        <div className='dashboard-heading'>
          <div className='init'>{renderHeading()}</div>
        </div>
        <div className='dashboard-content'>
        <div className='dashboard-box'>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
