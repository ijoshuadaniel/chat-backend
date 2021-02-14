const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
require('./users');

const users =[];
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketio(server);





app.get('/',(req,res) => {
    res.send('get working');

})

io.on('connection', (socket) => {

    socket.on('Join',({name,room} , callback)=>{ 
        let socketid = socket.id;
        name = name.trim().toLowerCase();
        room = room.trim().toLowerCase();
        
        user = { socketid , name , room};
        users.push(user);

        socket.emit('message',{user:"admin",text:`${user.name} welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`});
        socket.join(user.room);

    })


    socket.on('sendMessage',(message, callback) => {
        
        const currentuser = users.find((user) => user.socketid === socket.id);
        io.to(currentuser.room).emit('message',{user:currentuser.name,text:message});

        callback();
    })

    socket.on('disconnect',()=>{
        const user = users.findIndex(user => user.id == socket.id);

        if(user != -1){
            users.splice(user,1)[0]
        }
    })
  });



  
server.listen(5000);

