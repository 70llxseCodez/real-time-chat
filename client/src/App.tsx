import React, { useState } from 'react';
import './App.css';
import * as io from "socket.io-client";
import Form from './components/form/Form';
import MessagesCom  from './components/messages/MessegasCom'
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const socket = io.connect("http://localhost:8000")
  const [userName,setUserName] = useState('')
  const [room,setRoom] = useState('')
  const navigate = useNavigate()

  const joinRoom = () => {
    if(userName && room){
      socket.emit("join_room",room);

    }
  }


  return (
    <div className="App">
      <div className="container">
        {/* <Routes> */}
<Form userName={userName} room={room} setRoom={setRoom} setUserName={setUserName} joinRoom={joinRoom}/>
 <MessagesCom socket={socket} userName={userName} room={room}/>
        {/* </Routes> */}
      </div>
    </div>
  );
}

export default App;
