const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'blog_site',
});

connection.connect((error) => {
  if (error) {
    console.log('ERROR al Conectar');
  } else {
    console.log('Conexión EXITOSA');
  }
});

module.exports = connection;