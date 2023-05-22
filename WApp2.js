import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SendMessage = () => {
  const [chatId, setChatId] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      const url = `https://api.green-api.com/waInstance{{idInstance}}/SendMessage/{{apiTokenInstance}}`;
      const requestBody = {
        chatId: chatId,
        message: message
      };
      await axios.post(url, requestBody);
      console.log('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Chat ID"
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

const ReceiveMessage = () => {
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const url = `https://api.green-api.com/waInstance{{idInstance}}/ReceiveNotification/{{apiTokenInstance}}`;
        const response = await axios.get(url);
        const { messageData } = response.data.body;
        const receivedText = messageData.textMessageData.textMessage;
        setReceivedMessage(receivedText);
        console.log('Received message:', receivedText);
      } catch (error) {
        console.error('Error receiving message:', error);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div>
      <h3>Received Message:</h3>
      <p>{receivedMessage}</p>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <SendMessage />
      <ReceiveMessage />
    </div>
  );
};

export default App;
