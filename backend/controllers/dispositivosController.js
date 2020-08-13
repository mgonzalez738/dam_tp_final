const validationHandler = require('../validations/validationHandler');
var pool = require('../database/mysql');

exports.index = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Dispositivos (Todos)";
    console.log(logMessage);

    var sqlQuery = 'Select * from Dispositivos';
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else {
            console.log("Database: Dispositivos | " + result.length + " registros devueltos");
            res.send(result);
        }
    });
};

exports.show = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Dispositivo (dispositivoId=" + req.params.dispositivoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Select * from Dispositivos where dispositivoId=${req.params.dispositivoId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else if(!result.length) {
            console.log("Database: Dispositivos | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });           
        }
        else {
            console.log("Database: Dispositivos | 1 registro devuelto");
            res.send(result[0]);
        }
    });
};

exports.store = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Guardar Dispositivo";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Insert into Dispositivos (nombre, ubicacion, electrovalvulaId) 
                    values ('${req.body.nombre}', '${req.body.ubicacion}', ${req.body.electrovalvulaId})`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error guardando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Dispositivos | Ningun registro guardado");
            next({ statusCode: 404, message: "Ningun registro guardado" });        
        }
        else {
            console.log("Database: Dispositivos | Registro guardado");
            res.send({ message:'Dispositivo guardado', dispositivoId:result.insertId });
        }
    });
};

exports.delete = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Dispositivo (dispositivoId=" + req.params.dispositivoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Delete from Dispositivos where dispositivoId=${req.params.dispositivoId}`; 
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error eliminando registro -> " + err.message);
            next(err);
        }
        else if(!result.affectedRows)
        {
            console.log("Database: Dispositivos | Ningun registro eliminado");
            next({ statusCode: 404, message: "Ningun registro eliminado" });
        }
        else {
            console.log("Database: Dispositivos | Registro eliminado");
            res.send({"message":"Dispositivo eliminado"});
        }
    });
};

exports.update = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Actualizar Dispositivo (dispositivoId=" + req.params.dispositivoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }

    console.log(logMessage);

    var sqlQuery = `Update Dispositivos set nombre='${req.body.nombre}', ubicacion='${req.body.ubicacion}', electrovalvulaId=${req.body.electrovalvulaId}
                    where dispositivoId=${req.params.dispositivoId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error actualizando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0) {
            console.log("Database: Dispositivos | Ningun registro reemplazado");
            next({ statusCode: 404, message: "Ningun registro reemplazado" });
        }
        else {
            console.log("Database: Dispositivos | Registro reemplazado");
            res.send({"message":"Dispositivo reemplazado"});
        }
    });
};
