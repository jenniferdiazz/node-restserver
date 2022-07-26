const express = require('express')
const cors = require('cors');
const { bdConnection } = require('../database/config')
class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
       
       this.conectarDB();
        //Middlewares funcion que siempre va a  ejecutarse, 
        //funciones que añaden funcionalidad al webserver
        //funcion que se ejecuta antes de ejecutar un controlar o de seguir
        //ejecutando peticiones
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        await bdConnection()
    }

    middlewares(){
        //CORS
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use( this.usuariosPath, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log('servidor corriendo en puerto,', this.port )
        })
    }
}

module.exports = Server;