//Acceso a las variables de entorno del archivo .env
require('dotenv').config(); 
//Framework para crear el servidor y manejar las rutas
const express = require('express'); 
//Middleware para permitir solicitudes desde otros dominios (CORS)
const cors = require('cors'); 

//Módulo para manejar rutas de archivos
const path = require('path'); 

const port = process.env.PORT || 3000;

//Referencia al servidor
const app = express();

//1. MIDDLEWARES (funcion intermedia)
app.use(cors()); //backend => frontend (dominio diferente) => cors (permiso)
app.use(express.json()); //api
app.use(express.urlencoded({ extended: true })); //formulario

//Archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, 'public')));

//2. RUTAS (endpoints)
app.use('/api/productos', require('./routes/productos'));
app.use('/api/marcas', require('./routes/marcas'));
app.use('/api/reportes', require('./routes/reportes')); //reportes/productos

//3. Todo lo que no sea ruta => frontend (SPA)
//Express v4: app.get('*', (req, res) => { ... });
//Express v5: app.get('/{*path}', (req, res) => { ... });
//req (require - solicitud)
//res (response - respuesta)
app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Manejador de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

//Iniciar el servidor
app.listen(port, () => {
    //URL: Aplicación Web
    console.log(`Servidor escuchando en http://localhost:${port}`);
    //API productos
    console.log(`API productos en http://localhost:${port}/api/productos`);
    //API marcas
    console.log(`API marcas en http://localhost:${port}/api/marcas`);
    //API reportes
    console.log(`API reportes en http://localhost:${port}/api/reportes`);
});

module.exports = app;