import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = 'YOUR_GREEN_API_KEY';
const BASE_URL = 'https://green-api.com/api';

const WhatsAppInterface = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Fetch received messages when component mounts
    fetchReceivedMessages();
  }, []);

  const fetchReceivedMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/receiving`, {
        params: {
          apiKey: API_KEY,
        },
      });
      setReceivedMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch received messages:', error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/sending`, {
        apiKey: API_KEY,
        phone: phoneNumber,
        message,
      });
      console.log('Message sent successfully:', response.data);
      // Clear input fields after sending the message
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div>
      <h1>WhatsApp Interface</h1>

      <div>
        <h2>Send Message</h2>
        <label htmlFor="phone-input">Phone Number:</label>
        <input
          id="phone-input"
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <br />
        <label htmlFor="message-input">Message:</label>
        <input
          id="message-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h2>Received Messages</h2>
        {receivedMessages.length === 0 ? (
          <p>No messages received yet.</p>
        ) : (
          <ul>
            {receivedMessages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WhatsAppInterface;
