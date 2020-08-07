const { body, param, query } = require('express-validator');

exports.paramIdIsPositiveInt = param("id")
    .isInt({gt: 0})
    .withMessage("El parametro 'id' debe ser un entero positivo mayor a cero");

exports.bodyNombreExists = body("nombre")
    .notEmpty()
    .withMessage("El campo 'nombre' debe existir y no estar vacio");

exports.bodyUbicacionExists = body("ubicacion")
    .notEmpty()
    .withMessage("El campo 'ubicacion' debe existir y no estar vacio");

exports.bodyElectrovalvulaIdIsPositiveInt = body("electrovalvulaId")
    .isInt({gt: 0})
    .withMessage("El parametro 'electrovalvulaId' debe ser un entero positivo mayor a cero");

