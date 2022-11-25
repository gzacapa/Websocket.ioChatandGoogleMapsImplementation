const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

var userGlobal = '';
const date = new Date();
let hour = `${date.getHours()}:${date.getMinutes()} `;

const socket = io();

document.addEventListener("DOMContentLoaded", async ()=>{
    const {value: user} = await Swal.fire({
        title: 'Welcome!',
        text: 'Please enter your username:',
        icon: 'info',
        input: 'text',
        inputValue: '',
        inputValidator: (value) => {
            if (!value) {
            return 'You need to write something!'
            }
        }
    })
    userGlobal = user;
    Swal.fire({
        title: `Welcome to the room ${userGlobal}!!`,
        icon: 'success',
        text: 'You are ready to chat now!'
    });
    userGlobal = user;
    
});

socket.on('connect', ()=>{
    console.log('Front end check');

    lblOffline.style.display = 'none';
    lblOnline.style.display  = '';
});

socket.on('disconnect',()=>{
    console.log('El server no me quiere!')

    lblOffline.style.display = '';
    lblOnline.style.display  = 'none';
});

socket.on('enviar-mensaje',(payload)=>{
    console.log(payload);
    var date4Render ={
        backload:[{
            emisor: true,
            date: payload.date,
            time: payload.time,
            message: payload.message,
            user: payload.user
        }]
    }
    var compileHTML = compile(date4Render);
    document.getElementById('chatHistory').innerHTML+= compileHTML
});

btnEnviar.addEventListener('click',()=>{
    const mensaje = txtMensaje.value;

    var template = document.getElementById('message').innerHTML;
    var compile = Handlebars.compile(template);

    var backload = {
        emisor: false,
        date: 'Today',
        time: hour,
        message: mensaje,
        user: userGlobal
    };

    var date4Render ={
        backload:[{
            emisor: false,
            date: 'Today',
            time: hour,
            message: mensaje,
            user: userGlobal
        }]
    }

    txtMensaje.value = "";
    txtMensaje.focus();

    var compileHTML = compile(date4Render);
    document.getElementById('chatHistory').innerHTML+= compileHTML

    socket.emit('enviar-mensaje', backload, (serverReturn) => {
        console.log('The server say: ', serverReturn);
    });
})

txtMensaje.addEventListener('keyup',({keyCode})=>{
    const mensaje = txtMensaje.value;

    var template = document.getElementById('message').innerHTML;
    var compile = Handlebars.compile(template);

    if( keyCode !== 13){return;}
    if( mensaje.lenght === 0){return;}

    var backload = {
        emisor: false,
        date: 'Today',
        time: hour,
        message: mensaje,
        user: userGlobal
    };

    var date4Render ={
        backload:[{
            emisor: false,
            date: 'Today',
            time: hour,
            message: mensaje,
            user: userGlobal
        }]
    }

    txtMensaje.value = "";
    txtMensaje.focus();

    console.log("Antes del render 2")

    compileHTML = compile(date4Render);
    document.getElementById('chatHistory').innerHTML+= compileHTML

    console.log("despues del render 2")

    socket.emit('enviar-mensaje', backload, (serverReturn) => {
        console.log('The server say: ', serverReturn);
    });
})


