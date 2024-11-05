import mysql2 from 'mysql2';

const connectionObject = {
    host: "localhost",
    user: "root",
    password: "Bufetero21",
    port: 3307,
    database: "QuickRestaurant"
}

export const getQuickRestaurant = (req, res) => {
    let Project = [];
    try {
      const connection = mysql2.createConnection(connectionObject);
      connection.query("SELECT * FROM orden_borrada", (err, results) => {
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


  