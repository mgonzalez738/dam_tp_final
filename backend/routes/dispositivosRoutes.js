const express = require('express');
const router = express.Router();
const dispositivosController = require('../controllers/dispositivosController');
const {paramIdIsPositiveInt, bodyNombreExists, bodyUbicacionExists, bodyElectrovalvulaIdIsPositiveInt} = require('../validations/dispositivosValidators');

router.get(
    '/',
    [ ], 
    dispositivosController.index
);

router.get(
    '/:id',
    [
        paramIdIsPositiveInt
    ], 
    dispositivosController.show
);

router.post(
    '/',
    [
        bodyNombreExists,
        bodyUbicacionExists,
        bodyElectrovalvulaIdIsPositiveInt
    ], 
    dispositivosController.store
);

router.delete(
    '/:id',
    [
        paramIdIsPositiveInt
    ], 
    dispositivosController.destroy
);

router.put(
    '/:id',
    [
        paramIdIsPositiveInt,
        bodyNombreExists,
        bodyUbicacionExists,
        bodyElectrovalvulaIdIsPositiveInt
    ], 
    dispositivosController.update
);

module.exports = router;