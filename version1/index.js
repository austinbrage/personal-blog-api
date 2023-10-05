const connection = require('./connection.js');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); 
app.use(express.json()); 

//* Tipado de los campos
//* STRINGS:  Usuario, Contraseña, ID_nombre, Contenido, Estilos
//* TINYINTS: Publicacion, Orden

//! Interfaz de CLIENTE 
app.get('/articulos', (req,res) => {
  const [nombre, publicacion] = [req.query.name, req.query.post];
  // const [nombre, publicacion] = ['Nombre0', 1];

  const SQL = `SELECT Publicacion, Orden, Contenido, Estilos, Estado
               FROM   articulos
               WHERE  ID_nombre = '${nombre}' 
               ${publicacion && `AND Publicacion = ${publicacion}`}`;

  connection.query(SQL, (error, result) => {
    error ? res.status(500).json(error.message) : res.status(200).json(result);
  });

});

//! Interfaz de USUARIO [Ingreso]
app.get('/usuarios', (req,res) => {
  const [usuario, contraseña] = [req.query.user, req.query.pwd];
  // const [usuario, contraseña] = ['Usuario0', '1234'];

  const SQL = `SELECT Usuario, Contraseña
               FROM   usuarios
               WHERE  Usuario = '${usuario}'`;

  connection.query(SQL, (error, result) => {
    if(error){
      res.status(500).json(error.message);
    } else if(result.length == 0){
      res.status(200).json('Wrong UserName');
    } else if(result[0].Contraseña == contraseña){
      res.status(200).json(true)
    } else {
      res.status(200).json('Wrong Password')
    }
  });

});

//! Interfaz de USUARIO [Registro]
app.post('/usuarios', (req,res) => {
  const [usuario, contraseña] = req.body;
  // const [usuario, contraseña] = ['Usuario2', '1234'];

  const SelectSQL1 = `SELECT Usuario
               FROM   usuarios
               WHERE  Usuario = '${usuario}'`;

  const SelectSQL2 = `INSERT INTO usuarios (Usuario, Contraseña)
                      VALUES ('${usuario}', '${contraseña}')`;

  connection.query(SelectSQL1, (error, result) => {
    if(error) {
      res.status(500).json(error.message)
    } else {

      if(result.length == 0){

        connection.query(SelectSQL2, (error, result) => {
          error ? res.status(500).json(error.message) : res.status(201).json('User Added Successfully');
        })

      } else {
        res.status(201).json('Existing User')
      }
    }
  });

  // const SQL = `INSERT INTO articulos (ID_nombre, Publicacion, Orden, Contenido, Estilos, Estado)
  //              VALUES ('${nombre}', '${publicacion}', ${orden}, '${contenido}', '${estilos}', ${estado})`;

                           

});


//! Interfaz de USUARIO [Edición]
app.post('/articulos', (req,res) => {
  const [nombre, publicacion, orden, contenido, estilos, estado] = req.body;
  // const [nombre, publicacion, orden, contenido, estilos, estado] = ['Usuario0', 'Mi Artículo 1', 8, 'Insert Text Here', '{"fontFamily":"Arial","fontSize":"24px","fontWeight": "400", "lineHeight":"1.5em", "textAlign": "center","marginTop":"1em","color":"#ffffff"}', 1];

  const SQL = `INSERT INTO articulos (ID_nombre, Publicacion, Orden, Contenido, Estilos, Estado)
               VALUES ('${nombre}', '${publicacion}', ${orden}, '${contenido}', '${estilos}', ${estado})`;

                           
  connection.query(SQL, (error, result) => {
    error ? res.status(500).json(error.message) : res.status(201).json('Sección agregada');
  });

});

//! Interfaz de USUARIO [Edición]
app.put('/articulos', (req,res) => {
  const [nombre, publicacion, orden, contenido, estilos] = req.body;
  // const [nombre, publicacion, orden, contenido, estilos] = ['Usuario0', 'Mi Artículo 1', 1, 'Título (Usuario0 - Publicación1)', '{"fontFamily": "Arial", "fontSize": "24px", "fontWeight": 400, "color": "#ffffff", "textAlign": "center"}'];

  const SQL = `UPDATE articulos
               SET    Contenido = '${contenido}', Estilos = '${estilos}'
               WHERE  ID_nombre = '${nombre}' AND
                      Publicacion = '${publicacion}' AND
                      Orden = ${orden}`;

  connection.query(SQL, (error, result) => {
    error ? res.status(500).json(error.message) : res.status(201).json('Sección actualizada');
  });

});

app.put('/articulos/publicacion', (req,res) => {
  const [nombre, oldPublicacion, newPublicacion] = req.body;
  // const [nombre, oldPublicacion, newPublicacion] = ['Usuario0', 'Mi Artículo 12', 'Mi Artículo 3'];

  const SQL = `UPDATE articulos
               SET    Publicacion = '${newPublicacion}'
               WHERE  ID_nombre = '${nombre}' AND
                      Publicacion = '${oldPublicacion}'`

  connection.query(SQL, (error, result) => {
    error ? res.status(500).json(error.message) : res.status(201).json('Artículo actualizado');
  });

})

app.put('/articulos/estado', (req,res) => {
  const [nombre, publicacion, estado] = req.body;
  // const [nombre, publicacion, estado] = ['Usuario0', 'Mi Artículo 8', 0];

  const SQL = `UPDATE articulos
               SET    Estado = '${estado}'
               WHERE  ID_nombre = '${nombre}' AND
                      Publicacion = '${publicacion}'`

  connection.query(SQL, (error, result) => {
  error ? res.status(500).json(error.message) : res.status(201).json('Artículo actualizado');
  });

})

//! Interfaz de USUARIO [Edición]
app.delete('/articulos', (req,res) => {
  const [nombre, publicacion, contenido, orden, mensaje] = req.body;
  // const [nombre, publicacion, orden, contenido, mensaje] = ['Usuario0','Mi Artículo 1',3,'Párrafo (Usuario0, Publicación1)','Delete section'];


  if(mensaje === 'Delete section') {
    const SQL = `DELETE 
                 FROM   articulos 
                 WHERE  ID_nombre = '${nombre}' AND
                        Publicacion = '${publicacion}' AND
                        Contenido = '${contenido}' AND
                        Orden = ${orden}`;
    
    connection.query(SQL, (error, result) => {
      error ? res.status(500).json(error.message) : res.status(201).json('Sección borrada');
    });
  }

  if(mensaje === 'Delete article') {
    const SQL = `DELETE 
                 FROM   articulos 
                 WHERE  ID_nombre = '${nombre}' AND
                        Publicacion = '${publicacion}'`;
    
    connection.query(SQL, (error, result) => {
      error ? res.status(500).json(error.message) : res.status(201).json('Articulo borrado');
    });
  }
});

app.listen(8000);