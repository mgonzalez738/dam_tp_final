const validationHandler = require('../validations/validationHandler');
var pool = require('../database/mysql');

exports.index = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Mediciones";
    if(req.query.dispositivoId == undefined)
        logMessage = logMessage + " (Todas)"
    else
    logMessage = logMessage + " (dispositivoId=" + req.query.dispositivoId + ")";
    if((req.query.last != undefined) & (req.query.last == 'true'))
        logMessage = logMessage + " (Ultima fecha)";

    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }

    console.log(logMessage);

    var sqlQuery = 'Select * from Mediciones';
    if(req.query.dispositivoId != undefined)
        sqlQuery = sqlQuery + ` where dispositivoId=${req.query.dispositivoId}`;
    sqlQuery = sqlQuery + ` order by fecha desc`;
    if((req.query.last != undefined) & (req.query.last == 'true'))
        sqlQuery = sqlQuery + ' Limit 1';
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones | Error devolviendo registros -> " + err.message);
            next(err);
        }
        else if(!result.length) {
            console.log("Database: Mediciones | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });  
        }
        else {
            console.log("Database: Mediciones | " + result.length + " registros devueltos");
            res.send(result);
        }
    });
};

exports.show= async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Devolver Medicion " + `(medicionId=${req.params.medicionId})`;
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Select * from Mediciones where medicionId=${req.params.medicionId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones | Error devolviendo registros -> " + err.message);
            next(err);
        } 
        else if(!result.length) {
            console.log("Database: Mediciones | Ningun registro devuelto");
            next({ statusCode: 404, message: "Ningun registro devuelto" });
        } 
        else {
            console.log("Database: Mediciones | " + result.length + " registros devueltos");
            res.send(result[0]);
        }
    });
};

exports.store = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Guardar Medicion";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var date = new Date(req.body.fecha);
    var formatted_date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var sqlQuery = `Insert into Mediciones (fecha, valor, dispositivoId) 
                    values ('${formatted_date}', ${req.body.valor}, ${req.body.dispositivoId})`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones | Error guardando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Mediciones | Ningun registro guardado");
            next({ statusCode: 404, message: "Ningun registro guardado" });
        }
        else {
            console.log("Database: Mediciones | Registro guardado");
            res.send({ message:'Medicion guardada', medicionId:result.insertId });
        }
    });
};

exports.delete = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Eliminar Medicion (medicionId=" + req.params.medicionId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var sqlQuery = `Delete from Mediciones where medicionId=${req.params.medicionId}`; 
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones | Error eliminando registro -> " + err.message);
            next(err);
        }
        else if(!result.affectedRows)
        {
            console.log("Database: Mediciones | Ningun registro eliminado");
            next({ statusCode: 404, message: "Ningun registro eliminado" });
        }
        else {
            console.log("Database: Mediciones | Registro eliminado");
            res.send({"message":"Medicion eliminada"});
        }
    });
};

exports.update = async (req, res, next) => {

    var logMessage = "Api: " + req.method + "(" + req.originalUrl + ") | Reemplazar Medicion (medicionId=" + req.params.medicionId + ")";
    
    try { validationHandler(req); }
    catch (err) {
        console.log(logMessage + " -> " + err.message);
        next(err);
        return;
    }
    
    console.log(logMessage);

    var date = new Date(req.body.fecha);

    var sqlQuery = `Update Mediciones set fecha='${date.toLocaleString()}', valor=${req.body.valor}, dispositivoId=${req.body.dispositivoId}
                    where medicionId=${req.params.medicionId}`;
    pool.query(sqlQuery, function(err, result, fields) {
        if (err) {
            console.log("Database: Mediciones | Error reemplazando registro -> " + err.message);
            next(err);
        }
        else if(result.affectedRows == 0)
        {
            console.log("Database: Mediciones | Ningun registro reemplazado");
            next({ statusCode: 404, message: "Ningun registro reemplazado" });
        }
        else {
            console.log("Database: Mediciones | Registro reemplazado");
            res.send({ message:'Medicion reemplazada' });
        }
    });
};