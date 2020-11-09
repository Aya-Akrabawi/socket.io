'use strict';

// const io = require('socket.io-client');


// let socket = io.connect('http://localhost:3000')

// socket.on('welcome',(data)=>{
    
// console.log('Received: ', data);
// });

const io = require('socket.io-client');


let games = io.connect('http://localhost:3000/games')

games.on('welcome',(msg)=>{
    
console.log('Received: ', msg);
});
// join the user into specific room
games.emit('joinRoom','rocket league')
games.on('newUser', (res)=> console.log(res));
games.on('err', (err)=> console.log(err));
games.on('success',(res)=> console.log(res));