const validationHandler = require('../validations/validationHandler');
var pool = require('../database/mysql');

exports.index = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Log Riegos";
    if(req.query.electrovalvulaId == undefined)
        logMessage = logMessage + " (Todos)"
    else
    logMessage = logMessage + " (electrovalvulaId=" + req.query.electrovalvulaId + ")";
    if(req.query.limit != undefined)
    {
        logMessage = logMessage + ` (Limit = ${req.query.limit})`;
        if(req.query.offset != undefined)
        logMessage = logMessage + ` (Offset = ${req.query.offset})`;
    }

    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }

    console.log(logMessage);

    var sqlQuery = 'Select * from Log_Riegos';
    if(req.query.electrovalvulaId != undefined)
        sqlQuery = sqlQuery + ` where electrovalvulaId=${req.query.electrovalvulaId}`;
    sqlQuery = sqlQuery + ` order by fecha desc`;
    if(req.query.limit != undefined)
    {
        sqlQuery = sqlQuery + ` Limit ${req.query.limit}`;
        if(req.query.offset != undefined)
        sqlQuery = sqlQuery + ` Offset ${req.query.offset}`;
    }
    
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Log_Riegos | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else if(!result.length) {
            console.log("Database: Log_Riegos | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });  
        }
        else {
            console.log("Database: Log_Riegos | " + result.length + " registros devueltos");
            res.send(result);
        }
    });
};

exports.show= async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Log Riego " + `(logRiegosId=${req.params.logRiegoId})`;
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Select * from Log_Riegos where logRiegoId=${req.params.logRiegoId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Log_Riegos | Error devolviendo registros -> " + err.message);
            next(err);
        } 
        else if(!result.length) {
            console.log("Database: Log_Riegos | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });
        } 
        else {
            console.log("Database: Log_Riegos | " + result.length + " registros devueltos");
            res.send(result[0]);
        }
    });
};

exports.store = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Guardar Log Riegos";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var date = new Date(req.body.fecha);
    var formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var sqlQuery = `Insert into Log_Riegos (fecha, apertura, electrovalvulaId) 
                    values ('${formatted_date}', ${req.body.apertura}, ${req.body.electrovalvulaId})`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Log_Riegos | Error guardando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Log_Riegos | Ningun registro guardado");
            next({ statusCode: 404, message: "Ningun registro guardado" });
        }
        else {
            console.log("Database: Log_Riegos | Registro guardado");
            res.send({ message:'Log Riego guardado', logRiegoId:result.insertId });
        }
    });
};

exports.delete = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Log Riego (logRiegoId=" + req.params.logRiegoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Delete from Log_Riegos where logRiegoId=${req.params.logRiegoId}`; 
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Log_Riegos | Error eliminando registro -> " + err.message);
            next(err);
        }
        else if(!result.affectedRows)
        {
            console.log("Database: Log_Riegos | Ningun registro eliminado");
            next({ statusCode: 404, message: "Ningun registro eliminado" });
        }
        else {
            console.log("Database: Log_Riegos | Registro eliminado");
            res.send({"message":"Log Riego eliminado"});
        }
    });
};

exports.update = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Reemplazar Log Riego (logRiegoId=" + req.params.logRiegoId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var date = new Date(req.body.fecha); 
    var sqlQuery = `Update Log_Riegos set fecha='${date.toLocaleString()}', apertura=${req.body.apertura}, electrovalvulaId=${req.body.electrovalvulaId}
                    where logRiegoId=${req.params.logRiegoId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Log_Riegos | Error reemplazando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Log_Riegos | Ningun registro reemplazado");
            next({ statusCode: 404, message: "Ningun registro reemplazado" });
        }
        else {
            console.log("Database: Log_Riegos | Registro reemplazado");
            res.send({ message:'Log Riego reemplazado' });
        }
    });
};