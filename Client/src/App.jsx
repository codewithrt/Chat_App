import './App.css';
import io from "socket.io-client"
import { useState } from 'react';
import Chats from './Chats';
const socket = io.connect("http://localhost:3001");

function App() {
  // const [count, setCount] = useState(0)
  const [room , setroom] = useState("");
  const [username, setusername] = useState("");
  const [ShowChat, setShowChat] = useState(false)
const JoinRoom = ()=>{
     if(username !== "" && room !== ""){
        socket.emit("join_room",room);
        setShowChat(true);
     }
}
const DisconnectRoom = () =>{
  socket.emit("leave_room",room);
  setShowChat(false);
  setroom("");
  setusername("");
}
  return (
    <>
      <div className='App'>
        {!ShowChat?
        <div className='joinChatContainer'>
        <h3>Join A Chat</h3>
        <input type='text' placeholder='Join.....' onChange={(e)=>{setusername(e.target.value)}}/>
        <input type='text' placeholder='Room Id' onChange={(e)=>{setroom(e.target.value)}} onKeyPress={(event)=>{event.key === "Enter" && JoinRoom()}}/>
        <button onClick={()=>{JoinRoom()}}> Join A Room </button>
        </div>
        : <><Chats socket={socket} username={username} room={room} setShowChat={setShowChat}/> 
          <div className='joinChatContainer'>
           <button onClick={()=>{DisconnectRoom()}}>Exit Room</button>
           </div>
           </>}
      </div>  
    </>
  )
}

export default App
