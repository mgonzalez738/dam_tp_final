const validationHandler = require('../validations/validationHandler');
var pool = require('../database/mysql');

exports.indexDispositivos = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Dispositivo (Todos)";
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

exports.indexMedicionesDispositivo = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Mediciones Dispositivo ";
    if(req.params.dispId == undefined)
        logMessage = logMessage + "(Todos)"
    else
    logMessage = logMessage + "(dispositivoId=" + req.params.dispId + ")";
    console.log(logMessage);

    var sqlQuery = `Select * from Mediciones `;
    if(req.params.dispId != undefined)
        sqlQuery = sqlQuery + `where dispositivoId=${req.params.dispId} `;
    sqlQuery = sqlQuery + `order by fecha desc`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones Dispositivo | Error devolviendo registros -> " + err.message);
            next(err);
            return;
        }
        console.log("Database: Mediciones Dispositivo | " + result.length + " registros devueltos");
        res.send(result);
    });
};

exports.showDispositivo = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Dispositivo (dispositivoId=" + req.params.dispId + ")";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Select * from Dispositivos where dispositivoId=${req.params.dispId}`;
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

exports.showMedicionesDispositivo = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Mediciones Dispositivo ";
    if(req.params.dispId == undefined)
        logMessage = logMessage + "(Todos)"
    else
    logMessage = logMessage + "(dispositivoId=" + req.params.dispId + ") ";
    if(req.params.medId == undefined)
        logMessage = logMessage + "(Todas)"
    else
    logMessage = logMessage + "(medicionId=" + req.params.medId + ")";
    console.log(logMessage);

    var sqlQuery = `Select * from Mediciones where medicionId=${req.params.medId}`;
    if(req.params.dispId != undefined)
        sqlQuery = sqlQuery + ` and dispositivoId=${req.params.dispId} `;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones Dispositivo | Error devolviendo registros -> " + err.message);
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
        console.log("Database: Mediciones Dispositivo | " + result.length + " registros devueltos");
        res.send(result);
    });
};

exports.storeDispositivo = async (req, res, next) => {

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
        console.log("Database: Dispositivos | Registro guardado");
        res.send({message:`Dispositivo guardado (dispositivoId=${result.insertId})`});
    });
};

exports.destroyDispositivo = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Dispositivo (dispositivoId=" + req.params.dispId + ")";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Delete from Dispositivos where dispositivoId=${req.params.dispId}`; 
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
        console.log("Database: Dispositivos | Registro eliminado");
        res.send({"message":"Dispositivo eliminado"});
    });
};

exports.updateDispositivo = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Actualizar Dispositivo (dispositivoId=" + req.params.dispId + ")";
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Update Dispositivos set nombre='${req.body.nombre}', ubicacion='${req.body.ubicacion}', electrovalvulaId=${req.body.electrovalvulaId}
                    where dispositivoId=${req.params.dispId}`;
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
