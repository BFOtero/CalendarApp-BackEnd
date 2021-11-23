const express = require('express');
require('dotenv').config();

const {server} = require('./config');
const cors = require('cors')
const { port } = server;
const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express();

// Base de datos 
dbConnection();

// CORS
app.use(cors())

// Directorio publico
app.use( express.static('public') );

// Parseo
app.use(express.json());

//Rutas 
app.use('/api/auth', require('./routes/auth'));

app.use('/api/events', require('./routes/events'));

// Escuchar peticiones 
app.listen(port, () => { 
    console.log(`Servidor corriendo en el puerto ${port} `)
});


