const express = require('express');
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

app.get('/api', function (req, res) { // Documentacion
  res.sendFile('/doc/apiDoc.html',  { root: __dirname });
});
app.use("/api/dispositivos", dispositivosRoutes); 
app.use("/api/mediciones", medicionesRoutes);
app.use("/api/electrovalvulas", electrovalvulasRoutes); 
app.use("/api/logRiegos", logRiegosRoutes);

// Maneja errores

app.use(errorHandler); 

// Inicia el servicio

var port = 3000;
app.listen(port, () => {
    console.log("API iniciada (Puerto " + port + ").");
})