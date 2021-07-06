//Servidor de express

const express  = require('express');
const http     = require('http')
const socketio = require('socket.io')
const path     = require('path');
const cors     = require('cors') // npm i cors para instalarlo

const sockets  = require('./sockets');



class Server{

    // propiedades
    constructor(){
        
        this.app =  express();
        this.port = process.env.PORT; // esto lee el puerto del archivo .env

        //Http server
        this.server = http.createServer(this.app)

        //Configuración del socket 
        this.io = socketio(this.server, {/* configuraciones */});

    }

    // metodos

    middlewares(){
        //Desplegar el directorio publico
        this.app.use(express.static( path.resolve(__dirname, '../public') ) );

        //CORS
        this.app.use( cors() );
    }

    configurarSockets(){
        new sockets( this.io);
    }

    execute(){
        // Inicializar middlewares
        this.middlewares();

        //Inicializar sockets
        this.configurarSockets();

        //Inicializar Server
        this.server.listen(this.port,()=>{
        console.log('server corriendo en puerto:', this.port)
    });
    
   }

    

}

module.exports = Server; // exporto la clase Server