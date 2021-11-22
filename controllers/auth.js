const { response } = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');


const registerUser = async(req, res = response ) => {
    const { email, password } = req.body;

    try {

        let user = await User.findOne({email})

        if ( user ){ 
            res.status(400).json({ 
                ok: false,
                msg: "El correo ya esta registrado"
            })
        }

        user = new User( req.body );

        // Encriptacion de contraseña
        const salt = bcrypt.genSaltSync();
        
        user.password = bcrypt.hashSync( password, salt);
    
        await user.save();

        // Generar token 
        const token = await generateJWT( user.id, user.name)
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token, 
            msg: "Usuario creado"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok:false, 
            msg:"Porfavor contactar con el administrador"
        })
    }
};

const loginUser = async(req, res = response ) => {
    try {

        const { email, password } = req.body;

        let user = await User.findOne({email})

        if ( !user ){ 
            res.status(400).json({ 
                ok: false,
                msg: "El usuario no esta registrado"
            })
        }

        const validPassword = bcrypt.compareSync( password, user.password)

        if ( !validPassword ){ 
            res.status(400).json({ 
                ok: false,
                msg: "Password in correcto"
            })
        }

        // Generar token 
        const token = await generateJWT( user.id, user.name)

        res.json({ 
            ok:true, 
            uid: user.id,
            name: user.name, 
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            ok:false, 
            msg:"Porfavor contactar con el administrador"
        })
    }
    
}

const renewToken = async(req, res = response ) => {

    const { uid, name } = req;


    const token = await generateJWT( uid, name )


    res.json({
        ok: true,
        msg: 'renew',
        token
    })
}

module.exports = { 
    registerUser,
    loginUser,
    renewToken
}