const { response } = require('express')
const Event = require('../models/Events')

const getEvents = async( req, res = response ) => { 

    const eventFind = await Event.find()
                                 .populate('user', 'name');

    try{ 

        eventFind.user = req.uid

        res.status(200).json({ 
            ok: true, 
            msg: ' getEvents ',
            event: eventFind
        })

    }catch ( err ){ 
        console.log(err)
        res.status(400).json({ 
            ok:false,
            msg: "no se puede obtener el evento"
        })
    }
}

const createEvents = async( req, res ) => { 

    const event = new Event(req.body)

    try{ 

        event.user = req.uid

        const eventSave = await event.save()

        res.status(200).json({ 
            ok: true, 
            msg: 'createEvents',
            events: eventSave
        })

    }catch ( err ){ 
        console.log(err)
        res.status(500).json({ 
            ok:false,
            msg: "no se puede crear el evento"
        })
    }
}

const updateEvents = async( req, res = response ) => { 

    const eventId = req.params.id;
    const uid = req.uid;

    try { 
        const event = await Event.findById(eventId);

        if( !event ){ 
            return res.status(404).json({ 
                ok: false, 
                msg: 'No se encuentra evento con ese id'
            })
        }

        if ( event.user.toString() !== uid){
            return res.status(401).json({ 
                ok: false, 
                msg: 'no tiene privilegio de editar este evento'
            })
        }

        const newEvent = { 
            ...req.body, 
            user: uid
        }

        const eventUpdate = await Event.findByIdAndUpdate( eventId, newEvent, { new: true})


        res.json({ 
            ok: true, 
            event: eventUpdate
        })

    }catch ( err ){ 
        console.log(err)
        res.status(400).json({ 
            ok:false,
            msg: "no se puede actualizar el evento"
        })
    }
}

const deleteEvents = async( req, res = response ) => { 

    const eventId = req.params.id;
    const uid = req.uid;

    try { 

        const event = await Event.findById(eventId);

        if( !event ){ 
            return res.status(404).json({ 
                ok: false, 
                msg: 'No se encuentra evento con ese id'
            })
        }

        if ( event.user.toString() !== uid){
            return res.status(401).json({ 
                ok: false, 
                msg: 'no tiene privilegio de editar este evento'
            })
        }

        await Event.findByIdAndDelete( eventId )


        res.json({ 
            ok: true, 
            msg: `Evento con el id: ${eventId} eliminado`
        })

    }catch ( err ){ 
        console.log(err)
        res.status(400).json({ 
            ok:false,
            msg: "no se puede actualizar el evento"
        })
    }

}

module.exports = { 
    getEvents, 
    createEvents,
    updateEvents, 
    deleteEvents
}