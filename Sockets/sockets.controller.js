


const socketController = (client) => {
    console.log('Cliente connectado')

    client.on('disconnect', ()=>{
        console.log('El cliente said Good Bye');
    })

    client.on('enviar-mensaje',(backload, callback)=>{
        console.log(`Message received from user: ${backload.user}`);

        client.broadcast.emit('enviar-mensaje', backload);

        callback("Message Received");

    })
};

module.exports = {socketController}