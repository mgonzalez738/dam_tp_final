const express = require('express');
const router = express.Router();
const electrovalvulasController = require('../controllers/electrovalvulasController');
const {paramElectrovalvulaIdIsInt, bodyNombreExists} = require('../validations/electrovalvulasValidators');

router.get( // Devuelve Dispositivos (Todos)
    '/',            
    [ ], 
    electrovalvulasController.index
);

router.get( // Devuelve Dispositivo (dispositivoId)
    '/:electrovalvulaId',
    [ paramElectrovalvulaIdIsInt ], 
    electrovalvulasController.show
);

router.post( // Agrega Dispositivo
    '/',
    [ bodyNombreExists ], 
    electrovalvulasController.store
);

router.delete( // Elimina Dispositivo
    '/:electrovalvulaId',
    [ paramElectrovalvulaIdIsInt ], 
    electrovalvulasController.delete
);

router.put( // Reemplaza Dispositivo
    '/:electrovalvulaId',
    [ paramElectrovalvulaIdIsInt, bodyNombreExists ], 
    electrovalvulasController.update
);

module.exports = router;