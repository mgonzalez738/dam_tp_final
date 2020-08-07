const express = require('express');
const router = express.Router();
const dispositivosController = require('../controllers/dispositivosController');
const {paramDispIdIsPositiveInt, bodyNombreExists, bodyUbicacionExists, bodyElectrovalvulaIdIsPositiveInt} = require('../validations/dispositivosValidators');

router.get( // Dispositivos (todos)
    '/',            
    [ ], 
    dispositivosController.indexDispositivos
);

router.get( // Mediciones Dispositivos (todos)
    '/mediciones',
    [ ], 
    dispositivosController.indexMedicionesDispositivo
);

router.get(
    '/mediciones/:medId',
    [
        //paramMedIdIsPositiveInt
    ], 
    dispositivosController.showMedicionesDispositivo
);

router.get(
    '/:dispId',
    [
        paramDispIdIsPositiveInt
    ], 
    dispositivosController.showDispositivo
);

router.get(
    '/:dispId/mediciones',
    [
        paramDispIdIsPositiveInt
    ], 
    dispositivosController.indexMedicionesDispositivo
);

router.get(
    '/:dispId/mediciones/:medId',
    [
        paramDispIdIsPositiveInt
        //paramMedIdIsPositiveInt
    ], 
    dispositivosController.showMedicionesDispositivo
);

router.post(
    '/',
    [
        bodyNombreExists,
        bodyUbicacionExists,
        bodyElectrovalvulaIdIsPositiveInt
    ], 
    dispositivosController.storeDispositivo
);

router.delete(
    '/:dispId',
    [
        paramDispIdIsPositiveInt
    ], 
    dispositivosController.destroyDispositivo
);

router.put(
    '/:dispId',
    [
        paramDispIdIsPositiveInt,
        bodyNombreExists,
        bodyUbicacionExists,
        bodyElectrovalvulaIdIsPositiveInt
    ], 
    dispositivosController.updateDispositivo
);

module.exports = router;