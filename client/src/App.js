import './App.css'
import io from 'socket.io-client'
import { useEffect, useState } from "react"

const socket = io.connect( "http://localhost:3001" )
function App () {
  const [message, setMessage] = useState( "" )
  const [messageRecieved, setMessageRecieved] = useState( "" )
  const [room, setRoom] = useState( "" )
  const sendMessage = () => {
    socket.emit( "send_message", { message, room } ) // here room will specify which room in we are right now!
  }
  const joinRoom = () => {
    if ( room !== '' ) {
      socket.emit( "join_room", room )
    }
  }
  useEffect( () => {
    socket.on( "recieve_message", ( data ) => {
      setMessageRecieved( data.message )
    } )
  }, [socket] )
  return (
    <div className="App">
      <input type="text" placeholder="room number" onChange={( event ) => { setRoom( event.target.value ) }} />
      <button type="button" onClick={joinRoom}>Join Room</button>
      <br />
      <input type="text" placeholder="message..." onChange={( event ) => { setMessage( event.target.value ) }} />
      <button type="button" onClick={sendMessage}>Send</button>
      <br />
      <h1>{messageRecieved}</h1>
    </div>
  )
}

export default App
