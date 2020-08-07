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
            return;
        }
        console.log("Database: Dispositivos | " + result.length + " registros devueltos");
        res.send(result);
    });
};

exports.show = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Dispositivo (id=" + req.params.id + ")";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Select * from Dispositivos where dispositivoId=${req.params.id}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error devolviendo registros -> " + err.message);
            next(err);
            return;
        }
        if(!result.length)
        {
            var msg = "Ningun registro devuelto";
            next({
                statusCode: 404,
                message: msg
            });
            console.log("Database: Dispositivos | Ningun registro devuelto");
            return;
        }
        console.log("Database: Dispositivos | 1 registro devuelto");
        res.send(result);
    });
};

exports.store = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Guardar Dispositivo";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Insert into Dispositivos (nombre, ubicacion, electrovalvulaId) 
                    values ('${req.body.nombre}', '${req.body.ubicacion}', ${req.body.electrovalvulaId})`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error guardando registro -> " + err.message);
            next(err);
            return;
        }
        if(result.affectedRows == 0)
        {
            var msg = "Ningun registro guardado";
            next({
                statusCode: 404,
                message: msg
            });
            console.log("Database: Dispositivos | Ningun registro guardado");
            return;
        }
        req.body["dispositivoId"] = result.insertId;
        console.log("Database: Dispositivos | Registro guardado");
        res.send(req.body);
    });
};

exports.destroy = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Dispositivo";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Delete from Dispositivos where dispositivoId=${req.params.id}`; 
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error eliminando registro -> " + err.message);
            next(err);
            return;
        }
        if(!result.affectedRows)
        {
            var msg = "Ningun registro eliminado";
            next({
                statusCode: 404,
                message: msg
            });
            console.log("Database: Dispositivos | Ningun registro eliminado");
            return;
        }
        console.log(result);
        console.log("Database: Dispositivos | Registro eliminado");
        res.send({"message":"Dispositivo eliminado"});
    });
};

exports.update = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Actualizar Dispositivo";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Update Dispositivos set nombre='${req.body.nombre}', ubicacion='${req.body.ubicacion}', electrovalvulaId=${req.body.electrovalvulaId}
                    where dispositivoId=${req.params.id}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Dispositivos | Error actualizando registro -> " + err.message);
            next(err);
            return;
        }
        if(result.affectedRows == 0)
        {
            var msg = "Ningun registro actualizado";
            next({
                statusCode: 404,
                message: msg
            });
            console.log("Database: Dispositivos | Ningun registro actualizado");
            return;
        }
        console.log("Database: Dispositivos | Registro actualizado");
        res.send({"message":"Dispositivo actualizado"});
    });
};
