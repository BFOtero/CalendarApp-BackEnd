/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { 
    registerUser,
    loginUser,
    renewToken
} = require('../controllers/auth');
const { validateFields  } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt')


router.post(
    '/register', 
    [   //middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6}),
        check('email', 'El email es obligatorio').isEmail(),
        validateFields
    ],
    registerUser 
)

router.post(
    '/',
    [
        check('email', 'El email introducido no es correcto').isEmail(),
        check('password', 'El password debe de tener mas de 6 caracteres').isLength({ min: 6}),
        validateFields
    ],
    loginUser )

router.get(
    '/renew',
    validateJWT,
    renewToken 
)




module.exports = router;