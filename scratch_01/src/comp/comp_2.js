import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { Link } from 'react-router-dom';

function Fun_2() {
  return (
    <div>
      {/* Your Frame2 contents go here */}
      <Link to="/">Go to Frame 1</Link>
    </div>
  );
}

export default Fun_2;