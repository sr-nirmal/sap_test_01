import React, { useState } from 'react';

const Login_frame = () => {
  // State to store the input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLoginState]= useState(0);

  // Function to handle form submission
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
      if(data.result == "success"){
        setLoginState(1)
      }
      // Handle the response from the server
    })
    .catch(error => {
      console.error('Error:', error);
    });
    // Perform validation or authentication logic here
    // if (username === 'admin' && password === 'admin') {
    //   alert('Login successful!');
    // } 
    // else {
    //   alert('Invalid username or password.');
    // }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login_frame;