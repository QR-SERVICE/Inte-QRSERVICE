import mysql2 from 'mysql2';

// Crear un pool de conexiones
const connectionPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "Bufetero21",
    port: 3307,
    database: "QuickRestaurant"
}).promise(); // Agrega .promise() para usar async/await

// Función para obtener las bebidas
export const getBebidas = async (req, res) => {
  try {
    const [bebidas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Bebidas'");
    res.json(bebidas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
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

// Función para obtener las ordenes que estan borradas
export const getOrdenesBorradas = async (req, res) => {
  try {
    const [platillos] = await connectionPool.query("SELECT * FROM orden_borrada WHERE estatus = 0");
    res.json(platillos);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

// Función para agregar un nuevo producto
export const postProductos = async (req, res) => {
  const { nombre, categoria, precio, stock, descripcion, imgFile } = req.body;
  const query = 'CALL new_producto(?, ?, ?, ?, ?, ?)';
  const params = [nombre, categoria, precio, stock, descripcion, imgFile];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Producto agregado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al agregar el producto');
  }
};

// Función para agregar un nuevo pedido
export const postOrder = async (req, res) => {
  const {cantidad,comentario} = req.body;
  const {id_producto,id_orden} = req.params;
  const query = 'CALL agregar_pedido(?, ?, ?)';
  const params = [id_producto,cantidad,id_orden,comentario];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('pedido creado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al agregar el pedido');
  }
};

// Función para eliminar un producto
export const deletePedido = async (req, res) => {
  const { pedidoDelete } = req.params;
  const query = 'DELETE FROM pedido WHERE id_pedido = ?;';
  const params = [pedidoDelete];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('pedido eliminado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al eliminar el pedido');
  }
};

// Función para eliminar un producto
export const deleteProductos = async (req, res) => {
  const { producDelete } = req.params;
  const query = 'DELETE FROM producto WHERE id_producto = ?;';
  const params = [producDelete];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Producto eliminado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al eliminar el producto');
  }
};
