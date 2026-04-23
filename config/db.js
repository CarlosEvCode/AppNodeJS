const mysql = require('mysql2/promise'); //Acceso a la base de datos - MySQL
require('dotenv').config(); //Leer los valores del archivo .env

//pool de conexiones => conjunto de conexiones disponibles para ser reutilizadas
//conexion "regular" (normal) => usuario 1 => abre > procesa > cierra
//pool "optimizado" => se crea todas las conexiones a ofrecer (10) => usuario 1, usuario2, etc. usuario11(cola)
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 50,
    timezone: '-05:00',
});

//Ejecutar la conexion - IIFE (Expresion de funcion invocada inmediatamente)
(async () => {
    try {
        const conn = await pool.getConnection(); //obtener una conexión del pool
        console.log('Conexión a MYSQL exitosa');
        conn.release(); //liberar la conexión para que pueda ser reutilizada
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
})();

module.exports = pool; //exportar el pool para usarlo en otros archivos