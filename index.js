const express = require('express');
require('dotenv').config();

const {server , db} = require('./config');
const { port } = server;
const { url } = db;
const { dbConnection } = require('./database/config')



// Crear el servidor de express
const app = express();

// Base de datos 
dbConnection(url);

// Directorio publico
app.use( express.static('public') );

// Parseo
app.use(express.json());

//Rutas 
app.use('/api/auth', require('./routes/auth') );
// TODO: CRUD: Eventos

// Escuchar peticiones 
app.listen(port, () => { 
    console.log(`Servidor corriendo en el puerto ${port} `)
});


