const express = require( 'express' )
const app = express()
const http = require( "http" )
const { Server } = require( "socket.io" )
const cors = require( "cors" )
app.use( cors() )
const server = http.createServer( app ) // Create Server with http
const io = new Server( server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
} )

// Listening some events
io.on( "connection", ( socket ) => {
  // from the backend we are listening to this event, data in which value or id sent from client to join specific room sent from the front end
  socket.on( "join_room", ( data ) => {
    socket.join( data )
  } )
  // these 2 lines means that socket is listening send_message (event name) from client side and then socket.broadcast ensure that data will only broadcast to every socket but the senders (e.g sender wants to send data to xyz)
  socket.on( "send_message", ( data ) => {
    // socket.broadcast.emit( "recieve_message", data )
    // when we send data to specific room
    socket.to( data.room ).emit( "recieve_message", data )
  } )
} )

server.listen( 3001, () => {
  console.log( 'server is running - abbas' )
} )