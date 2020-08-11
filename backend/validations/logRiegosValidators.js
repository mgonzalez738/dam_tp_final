const { body, param, query } = require('express-validator');

exports.paramLogRiegoIdIsInt = param("logRiegoId")
    .isInt({gt: 0})
    .withMessage("El parametro 'logRiegoId' debe ser un entero positivo mayor a cero");
    
exports.queryElectrovalvulaIdIsInt = query("electrovalvulaId")
    .optional().isInt({gt: 0})
    .withMessage("El parametro 'electrovalvulaId' debe ser un entero positivo mayor a cero");

exports.queryLastIsBoolean = query("last")
    .optional().isBoolean()
    .withMessage("El parametro 'last' debe ser 'true' o 'false");
    
exports.bodyFechaIsISO8601 = body("fecha")
    .isISO8601({ strict: true })
    .withMessage("El parametro 'fecha' debe ser formato ISO 8601");
    
exports.bodyAperturaIsInt = body("apertura")
    .isFloat({gte: 0, max: 1})
    .withMessage("El parametro 'apertura' debe ser 0 o 1");
    
exports.bodyElectrovalvulaIdIsInt = body("electrovalvulaId")
    .isInt({gt: 0})
    .withMessage("El parametro 'electrovalvulaId' debe ser un entero positivo mayor a cero");