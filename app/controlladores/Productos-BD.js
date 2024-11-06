import mysql2 from 'mysql2';

const connectionObject = {
    host: "localhost",
    user: "root",
    password: "Bufetero21",
    port: 3307,
    database: "QuickRestaurant"
}

// BEBIDAS
export const getBebidas = (req, res) => {
    let Project = [];
    try {
      const connection = mysql2.createConnection(connectionObject);
      connection.query("SELECT id_producto,nombre_producto,categoria_producto,precio_producto,stock,descripcion,img from producto WHERE categoria_producto = 'Bebidas'", (err, results) => {
        if (!err) {
          Project = results;
          res.json(Project);
        } else {
          res.json({ message: "Error al obtener los resultades" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener los resultados" });
    }
  };

  //POSTRES
  export const getPostres = (req, res) => {
    let Project = [];
    try {
      const connection = mysql2.createConnection(connectionObject);
      connection.query("SELECT id_producto,nombre_producto,categoria_producto,precio_producto,stock,descripcion,img from producto WHERE categoria_producto = 'Postres'", (err, results) => {
        if (!err) {
          Project = results;
          res.json(Project);
        } else {
          res.json({ message: "Error al obtener los resultades" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener los resultados" });
    }
  };

  //ENTRADAS
  export const getEntradas = (req, res) => {
    let Project = [];
    try {
      const connection = mysql2.createConnection(connectionObject);
      connection.query("SELECT id_producto,nombre_producto,categoria_producto,precio_producto,stock,descripcion,img from producto WHERE categoria_producto = 'Entradas'", (err, results) => {
        if (!err) {
          Project = results;
          res.json(Project);
        } else {
          res.json({ message: "Error al obtener los resultades" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener los resultados" });
    }
  };


//PLATILLOS
  export const getPlatillos = (req, res) => {
    let Project = [];
    try {
      const connection = mysql2.createConnection(connectionObject);
      connection.query("SELECT id_producto,nombre_producto,categoria_producto,precio_producto,stock,descripcion,img from producto WHERE categoria_producto = 'Platillos'", (err, results) => {
        if (!err) {
          Project = results;
          res.json(Project);
        } else {
          res.json({ message: "Error al obtener los resultades" });
        }
        connection.end();
      });
    } catch (e) {
      console.log(e);
      res.json({ message: "Error al obtener los resultados" });
    }
  };



