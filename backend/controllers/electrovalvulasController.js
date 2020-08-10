const validationHandler = require('../validations/validationHandler');
var pool = require('../database/mysql');

exports.index = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Electrovalvulas (Todas)";
    console.log(logMessage);

    var sqlQuery = 'Select * from Electrovalvulas';
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Electrovalvulas | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else {
            console.log("Database: Electrovalvulas | " + result.length + " registros devueltos");
            res.send(result);
        }
    });
};

exports.show = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Electrovalvula (electrovalvulaId=" + req.params.dispositivoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Select * from Electrovalvulas where electrovalvulaId=${req.params.electrovalvulaId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Electrovalvulas | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else if(!result.length) {
            console.log("Database: Electrovalvulas | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });           
        }
        else {
            console.log("Database: Electrovalvulas | 1 registro devuelto");
            res.send(result[0]);
        }
    });
};

exports.store = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Guardar Electrovalvula";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Insert into Electrovalvulas (nombre) values ('${req.body.nombre}')`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Electrovalvulas | Error guardando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Electrovalvulas | Ningun registro guardado");
            next({ statusCode: 404, message: "Ningun registro guardado" });        
        }
        else {
            console.log("Database: Electrovalvulas | Registro guardado");
            res.send({ message:'Electrovalvula guardada', electrovalvulaId:result.insertId });
        }
    });
};

exports.delete = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Electrovalvula (electrovalvulaId=" + req.params.electrovalvulaId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    console.log(logMessage);

    var sqlQuery = `Delete from Electrovalvulas where electrovalvulaId=${req.params.electrovalvulaId}`; 
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Electrovalvulas | Error eliminando registro -> " + err.message);
            next(err);
        }
        else if(!result.affectedRows)
        {
            console.log("Database: Electrovalvulas | Ningun registro eliminado");
            next({ statusCode: 404, message: "Ningun registro eliminado" });
        }
        else {
            console.log("Database: Electrovalvulas | Registro eliminado");
            res.send({"message":"Electrovalvula eliminada"});
        }
    });
};

exports.update = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Actualizar Electrovalvula (electrovalvulaId=" + req.params.electrovalvulaId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        next(err);
        console.log(logMessage + " -> " + err.message);
        return;
    }

    console.log(logMessage);

    var sqlQuery = `Update Electrovalvulas set nombre='${req.body.nombre}' where electrovalvulaId=${req.params.electrovalvulaId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Electrovalvulas | Error actualizando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0) {
            console.log("Database: Electrovalvulas | Ningun registro reemplazado");
            next({ statusCode: 404, message: "Ningun registro reemplazado" });
        }
        else {
            console.log("Database: Electrovalvulas | Registro reemplazado");
            res.send({"message":"Electrovalvula reemplazada"});
        }
    });
};
