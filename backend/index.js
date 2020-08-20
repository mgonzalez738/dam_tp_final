const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const dispositivosRoutes = require('./routes/dispositivosRoutes');
const medicionesRoutes = require('./routes/medicionesRoutes');
const electrovalvulasRoutes = require('./routes/electrovalvuasRoutes');
const logRiegosRoutes = require('./routes/logRiegosRoutes');

// Crea la aplicacion Express
const app = express();

// Habilita todos los pedidos CORS

app.use(cors());

// Parsea el body de los pedidos como JSONs y completa req.body con las claves

app.use(bodyParser.json());

// Rutas

app.use("/api/dispositivos", dispositivosRoutes); 
app.use("/api/mediciones", medicionesRoutes);
app.use("/api/electrovalvulas", electrovalvulasRoutes); 
app.use("/api/logRiegos", logRiegosRoutes);

app.get('/api', function (req, res) { // Documentacion
  res.sendFile('/doc/apiDoc.html',  { root: __dirname });
});

// Sirve la aplicacion angular (Funciona el router)
// https://stackoverflow.com/questions/49640365/mean-nodejs-server-for-angular-app-how-do-i-serve-angular-routes

var staticRoot = path.join(__dirname, "../frontend/www/");

app.use(function(req, res, next) {
  //if the request is not html then move along
  var accept = req.accepts('html');
  if (accept !== 'html') {
      return next();
  }
  // if the request has a '.' assume that it's for a file, move along
  var ext = path.extname(req.path);
  if (ext !== '') {
      return next();
  }
  fs.createReadStream(staticRoot + 'index.html').pipe(res);
});

app.use(express.static(staticRoot));

// Maneja errores

app.use(errorHandler); 

// Inicia el servicio

var port = 3000;
app.listen(port, () => {
    console.log("API iniciada (Puerto " + port + ").");
})