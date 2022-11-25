const express = require('express');
const cors = require('cors');
const { socketController } = require('./Sockets/sockets.controller');
const { mongoose } = require('mongoose');
const { connected } = require('process');

const app = express();

const server = require('http').createServer(app);
const io =  require('socket.io')(server);

app.use(express.static('public'));
app.use(cors);

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Pass to next layer of middleware
    next();
});

io.on('connection', socketController);

mongoose.connect('mongodb://localhost:27017/?authMechanism=DEFAULT',()=>{
    console.log("Database is now connected...")
});

server.listen( 3000, ()=>{
console.log('Server alive on port 3000')
});