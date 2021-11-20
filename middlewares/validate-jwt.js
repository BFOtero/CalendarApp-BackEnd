const { response } = require("express")
const jwt = require('jsonwebtoken')
const { twj } = require('../config')



const validateJWT = ( req, res = response, next ) => {

    // X-TOKEN headers

    const token = req.header('x-token')

    if( !token ){ 
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const payload = jwt.verify( 
            token, 
            twj.seed
        )

        req.uid = payload.uid;
        req.name = payload.name;

    } catch (error) {
        
        return res.status(401).json({ 
            ok: false, 
            msg: 'token no valido'
        })
    }
    next();
}


module.exports={
    validateJWT
}