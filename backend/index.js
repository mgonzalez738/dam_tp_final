require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./middleware/errorHandler");
const dispositivosRoutes = require('./routes/dispositivosRoutes');

// Crea la aplicacion Express
const app = express();

// Habilita todos los pedidos CORS
app.use(cors());

// Parsea el body de los pedidos como JSONs y completa req.body con las claves
app.use(bodyParser.json());

// Rutas

app.get('/', function (req, res) {
  res.send('Hola desde el servicio backend')
});

app.use("/api/dispositivos", dispositivosRoutes); // Dispositivos

// Maneja errores
app.use(errorHandler); 

// Inicia el servicio
app.listen(process.env.API_PORT, () => {
    console.log("API iniciada (Puerto " + process.env.API_PORT + ").");
})