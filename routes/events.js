const {Router} = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator')
const { 
    getEvents, 
    createEvents, 
    updateEvents, 
    deleteEvents 
} = require('../controllers/events');
const { validateFields } = require('../middlewares/validate-fields');
const { isDate } = require('../helpers/isDate');


const router = Router();

router.use( validateJWT )

router.get(
    '/',  
    getEvents
);

router.post(
    '/', 
    [ // check Middleware
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligaroria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligaroria').custom(isDate),
        validateFields
    ],
    createEvents
);

router.put(
    '/:id',
    [ // check Middleware
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligaroria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligaroria').custom(isDate),
        validateFields
    ],
    updateEvents
);

router.delete(
    '/:id',
    deleteEvents
);

module.exports = router