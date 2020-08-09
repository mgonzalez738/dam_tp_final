const { body, param, query } = require('express-validator');

exports.paramElectrovalvulaIdIsInt = param("electrovalvulaId")
    .isInt({gt: 0})
    .withMessage("El parametro 'electrovalvulaId' debe ser un entero positivo mayor a cero");

exports.bodyNombreExists = body("nombre")
    .notEmpty()
    .withMessage("El campo 'nombre' debe existir y no estar vacio");