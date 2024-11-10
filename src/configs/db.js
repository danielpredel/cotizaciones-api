const mysql = require('mysql2/promise');

// Configuracion de la conexion
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Establece la conexión
// connection.connect((err) => {
//   if (err) {
//     console.error('Error de conexión: ' + err.stack);
//     return;
//   }
//   console.log('Conectado a MySQL con ID de conexión ' + connection.threadId);
// });

module.exports = pool;
