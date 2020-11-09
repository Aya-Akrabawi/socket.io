'use strict';
const express = require('express');
const { Socket } = require('socket.io');
const app = express();
const PORT = 3000;
const http = require('http').createServer();
const io = require('socket.io')(http);

/*
io.on('connection',(socket)=>{
    
    socket.emit('welcome','hello and welcome to socket.io server ')
    console.log('New Client is Connected!');
})
*/

const gameRooms = ['rocket league','csgo','bt1'];

// create a new route ('/games) to assign the people to this room 
io.of('/games').on('connection',(socket)=>{
    // console.log('socket',socket);
    console.log('New Client is Connected!');
    socket.emit('welcome', 'hello, you are in the game area')
    // assign them to room
    socket.on('joinRoom', (room)=>{
        // to check if the room is exist or not:
        if (gameRooms.includes(room)){
            socket.join(room);
            // Broadcasting this msg to all sockets connected
            io.of('/games').in(room).emit('newUser',`NewPlayer has joined room ${room}`)
            return socket.emit('success', `youve joind room ${room} successfully`)
        } else {
            return socket.emit(`err','No room named ${room}`)
        }
    })

});


http.listen(PORT, ()=>{
    console.log(`you are listening to port: ${PORT}`);
})