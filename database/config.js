const mongoose = require('mongoose');
const { db } = require('../config')
const { url } = db;

const dbConnection = async() => {
    try{ 
        await mongoose.connect( url , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB online')
    }catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la base de datos')
    }
}

module.exports = {
    dbConnection 
}