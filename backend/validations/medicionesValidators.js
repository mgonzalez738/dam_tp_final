const { body, param, query } = require('express-validator');

exports.paramMedicionIdIsInt = param("medicionId")
    .isInt({gt: 0})
    .withMessage("El parametro 'medicionId' debe ser un entero positivo mayor a cero");
    
exports.queryDispositivoIdIsInt = query("dispositivoId")
    .optional().isInt({gt: 0})
    .withMessage("El parametro 'dispositivoId' debe ser un entero positivo mayor a cero");

exports.queryLastIsBoolean = query("last")
    .optional().isBoolean()
    .withMessage("El parametro 'last' debe ser 'true' o 'false");
    
exports.bodyFechaIsISO8601 = body("fecha")
    .isISO8601({ strict: true })
    .withMessage("El parametro 'fecha' debe ser formato ISO 8601");
    
exports.bodyValorIdIsFloat = body("valor")
    .isFloat({gt: 0, max: 100})
    .withMessage("El parametro 'valor' debe ser un valor entre 0 y 100");
    
exports.bodyDispositivoIdIsInt = body("dispositivoId")
    .isInt({gt: 0})
    .withMessage("El parametro 'dispositivoId' debe ser un entero positivo mayor a cero");