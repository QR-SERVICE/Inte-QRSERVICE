import dotenv from 'dotenv';
dotenv.config();
import mysql2 from 'mysql2';

// Crear un pool de conexiones
const connectionPool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
}).promise();

//GET

// Función para obtener las bebidas
export const getBebidas = async (req, res) => {
  try {
    const [bebidas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Bebidas'");
    res.json(bebidas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  };
};

// Función para obtener los postres
export const getPostres = async (req, res) => {
  try {
    const [postres] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Postres'");
    res.json(postres);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener las entradas
export const getEntradas = async (req, res) => {
  try {
    const [entradas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Entradas'");
    res.json(entradas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener los platillos
export const getPlatillos = async (req, res) => {
  try {
    const [platillos] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Platillos'");
    res.json(platillos);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};



export const getDetallesOrden = async (req,res) =>{
  const { id_orden } = req.params;
  try{
    const query = "select * from vista_detalle_orden where id_orden = ?;";
    const [pedidosEND] = await connectionPool.query(query,[id_orden]);
    res.json(pedidosEND);
  }catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
}

//Funcion para obtener la informacion de la mesa
export const getMesa = async (req, res) => {
  const {id_mesa} = req.params;
  const query = 'SELECT nombre_mesa FROM mesa WHERE id_mesa = ?;';
  const params = [id_mesa];
  try {
    const [mesa] =  await connectionPool.query(query, params);
    res.status(200).send(mesa[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// funcion para obtener las ordenes
export const getOrder = async(req,res) => {
  try {
    const [orden] = await connectionPool.query("SELECT * FROM orden WHERE estatus = 1");
    res.json(orden);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  };
};

// Función para obtener las ordenes que estan borradas
export const getOrdenesBorradas = async (req, res) => {
  try {
    const [ordenesEND] = await connectionPool.query("SELECT * FROM orden WHERE estatus = 0");
    res.json(ordenesEND);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: 'Error al terminar la orden', details: err.message });
  }
};

// Funcion para obtener el nombre de la mesa
export const getOrderName = async (req, res) => {
  try {
    const [orden] = await connectionPool.query('SELECT COUNT(id_orden) AS num_orden FROM orden;');
    res.json(orden);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para obtener el total de las ordenes del dia
export const getTotal = async (req, res) => {
  try {
    const [total] = await connectionPool.query("SELECT sum(total) as total from orden where estatus = 0");
    res.json(total);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  };
};

// Función para obtener las bebidas
export const getAdministradores = async (req, res) => {
  try {
    const [Administrador] = await connectionPool.query("SELECT * FROM administrador;");
    res.json(Administrador);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  };
};

//POST
 
// Función para agregar un nuevo producto
export const postProductos = async (req, res) => {
  const { nombre, categoria, precio, descripcion, imgFile } = req.body;
  const query = 'CALL new_producto(?, ?, ?, ?, ?)';
  const params = [nombre, categoria, precio, descripcion, imgFile];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).json({ message: 'Producto agregado exitosamente' });
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ message: "Error al cargar el producto" });
  }
};

//Funcion para crear la orden

export const postOrder = async (req, res) => {
  const { NombreMesa, pedidos, comentario, total } = req.body;

  if (Array.isArray(pedidos)) {
    console.log('Pedidos recibidos:', pedidos);
  } else {
    return res.status(400).json({ error: 'El parámetro "pedidos" debe ser un arreglo' });
  }

  const pedidosJSON = JSON.stringify(pedidos);
  const query = 'call new_orden(?,?,?,?)';
  const params = [NombreMesa, pedidosJSON, comentario, total];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).json({ message: 'Orden creada exitosamente' }); 
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error al crear la orden' }); 
  }
};

// Función para terminar una orden
export const postDeleteOrder = async (req, res) => {
  const { id_orden } = req.params;
  const query = 'call terminar_orden (?);';
  const params = [id_orden];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).json({ message: "Orden terminada exitosamente" });
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ message: "Error al terminar la orden" });
  }
};


export const postAdmin = async (req,res) =>{
  const {nombre_admin,contraseña_admin,correo_admin} = req.body;
  const query = 'call new_admin(?,?,?);';
  const params = [nombre_admin,contraseña_admin,correo_admin];
  try{
    const [results] = await connectionPool.query(query,params);
    console.log(results)
    res.status(200).json({message:'Se registro al usuario'});
  }catch (err){
    console.error('Error al ejecutar la consulta:',err);
    res.status(500).json({message:'Error al ejecutar el registro del usuario'});

  }
};


export const postLogin = async (req, res) => {
  const { contraseña_admin, correo_admin } = req.body;
  const query = 'CALL validar_admin(?, ?, @validacion);';
  try {
    await connectionPool.query(query, [contraseña_admin, correo_admin]);
    const [rows] = await connectionPool.query('SELECT @validacion AS validacion;');
    const validacion = rows[0].validacion;

    if (validacion === 1) {
      
      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};


//DELETE

// Función para eliminar un producto
export const deleteProductos = async (req, res) => {
  const { producDelete } = req.params;
  const query = 'DELETE FROM producto WHERE id_producto = ?;';
  const params = [producDelete];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
};



// funcion para eliminar las ordenes
export const deleteOrder = async (req, res) => {
  const query = 'DELETE FROM orden where estatus = 0;';
  try {
    const [results] = await connectionPool.query(query);
    res.status(200).json({message:'Orden eliminada correctamente'});
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({message:'Error al eliminar la orden'});
  }
};
