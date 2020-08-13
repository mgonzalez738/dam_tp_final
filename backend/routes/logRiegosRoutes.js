const express = require('express');
const router = express.Router();
const logRiegosController = require('../controllers/logRiegosController');
const {paramLogRiegoIdIsInt , queryElectrovalvulaIdIsInt, queryLastIsBoolean, bodyFechaIsISO8601, bodyAperturaIsInt, bodyElectrovalvulaIdIsInt} = require('../validations/logRiegosValidators');

router.get( 
    '/',            
    [ 
        queryElectrovalvulaIdIsInt,
        queryLastIsBoolean
     ], 
    logRiegosController.index
);

router.get( 
    '/:logRiegoId',            
    [ paramLogRiegoIdIsInt ], 
    logRiegosController.show
);

router.post( 
    '/',            
    [ bodyFechaIsISO8601, bodyAperturaIsInt, bodyElectrovalvulaIdIsInt ], 
    logRiegosController.store
);

router.delete( 
    '/:logRiegoId',            
    [ paramLogRiegoIdIsInt ], 
    logRiegosController.delete
);

router.put( 
    '/:logRiegoId',            
    [ paramLogRiegoIdIsInt, bodyFechaIsISO8601, bodyAperturaIsInt, bodyElectrovalvulaIdIsInt ], 
    logRiegosController.update
);

module.exports = router;