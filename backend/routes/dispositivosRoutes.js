const express = require('express');
const router = express.Router();
const dispositivosController = require('../controllers/dispositivosController');
const {paramDispositivoIdIsInt, bodyNombreExists, bodyUbicacionExists, bodyElectrovalvulaIdIsInt} = require('../validations/dispositivosValidators');

router.get( // Devuelve Dispositivos (Todos)
    '/',            
    [ ], 
    dispositivosController.index
);

router.get( // Devuelve Dispositivo (dispositivoId)
    '/:dispositivoId',
    [ paramDispositivoIdIsInt ], 
    dispositivosController.show
);

router.post( // Agrega Dispositivo
    '/',
    [ bodyNombreExists, bodyUbicacionExists, bodyElectrovalvulaIdIsInt ], 
    dispositivosController.store
);

router.delete( // Elimina Dispositivo
    '/:dispositivoId',
    [ paramDispositivoIdIsInt ], 
    dispositivosController.delete
);

router.put( // Reemplaza Dispositivo
    '/:dispositivoId',
    [ paramDispositivoIdIsInt, bodyNombreExists, bodyUbicacionExists, bodyElectrovalvulaIdIsInt ], 
    dispositivosController.update
);

module.exports = router;