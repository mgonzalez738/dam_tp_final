const express = require('express');
const router = express.Router();
const medicionesController = require('../controllers/medicionesController');
const {paramMedicionIdIsInt, queryDispositivoIdIsInt, queryLastIsBoolean, bodyFechaIsISO8601, bodyValorIdIsFloat, bodyDispositivoIdIsInt} = require('../validations/medicionesValidators');

router.get( 
    '/',            
    [ 
        queryDispositivoIdIsInt,
        queryLastIsBoolean
     ], 
    medicionesController.index
);

router.get( 
    '/:medicionId',            
    [ paramMedicionIdIsInt ], 
    medicionesController.show
);

router.post( 
    '/',            
    [ bodyFechaIsISO8601, bodyValorIdIsFloat, bodyDispositivoIdIsInt ], 
    medicionesController.store
);

router.delete( 
    '/:medicionId',            
    [ paramMedicionIdIsInt ], 
    medicionesController.delete
);

router.put( 
    '/:medicionId',            
    [ paramMedicionIdIsInt, bodyFechaIsISO8601, bodyValorIdIsFloat, bodyDispositivoIdIsInt ], 
    medicionesController.update
);

module.exports = router;