// React component
import React, { useState } from 'react';

const Entry = () => {
  const [message, setMessage] = useState('');

  const handleSendString = async () => {
    try {
      const response = await fetch('/api/send_string', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message }) // String to send to Flask server
      });
      if (response.ok) {
        const result = await response.json();
        console.log('Server response:', result);
      } else {
        console.error('Failed to send string to server:', response.status);
      }
    } catch (error) {
      console.error('Failed to send string to server:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendString}>Send String</button>
    </div>
  );
};

export default Entry;