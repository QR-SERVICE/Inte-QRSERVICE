# Inte-QRSERVICE
Repositoria en el cual vamos a estar trabajando en el proyecto QuickRestaurant.

# EQUIPO

Alonso Molina - Lider de proyecto y DBA. 
Jose Reyes - Desarollador Frontend.
Hans Alvarez - Desarollaror Backend y apoyo Frontend.
Christian Arguello - Desarollador Backend.
Alonso Vasquez - Desarollador Frontend

# Avanze de integradora: Conexion a base de datos

Servicio web desarollado en Node.js 12 con módulos ECMAScript (ESM) y express con una conexion a una base de datos MySQL con para gestionar pedidos, ordenes, productos, administradores y mesas, cuenta con operaciones de creacion, gestion y eliminacion de productos asi como de ordenes, tambien con las operaciones de administradores como login y registro.

Se usa el manejo de directorios estaticos para poder hacer llamado a los archivos de formato CSS, JS y img.png con el fin de no modificar las rutas por las cuales se hace llamar.

server.use(express.static(path.join(__dirname, 'Public')));
server.use(express.static(path.join(__dirname, 'Img')));

# Dependencias del proyecto

Para el proyecto se utilizan varias dependencias requeridas para el trabajo y monitoreo de rutas.

-Se hizo importacion de express para el trabajo de APIs y rutas.

import express from 'express';
const server = express();
server.use(express.json());

-Importacion de path para la lectura de rutas.

import path from 'path';

-Importacion de Cors para el manejo de solicitudes de origen cruzado.

import cors from 'cors';
server.use(cors());

-Importacion de morgan para el monitore de respuestas de rutas.

import morgan from 'morgan';
server.use(morgan('dev'));

-Importacion de fileUrlToPath para la configuracion de una ruta en especifico que funcionara como ruta de origen en general

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Se crearon APIs de tipo GET, POST y DELETE, para las peticiones, ingreso de datos y eliminacion de datos respectivamente,
estos Edpoints se estan consultando mediante solicitudes HTTP.

De la misma manera se hizo una importacion a la dependecia MySQL 2 para hacer el manejo de las conexiones a la base de datos de la siguiente manera

* import mysql2 from 'mysql2';

* // Crear un pool de conexiones
const connectionPool = mysql2.createPool({
    host: "localhost",
    user: "root",
    password: "Bufetero21",
    port: 3307,
    database: "QuickRestaurant"
}).promise(); 

La conexion se manejo con PoolConnection en lugar de connectionObjet por la comodidad que puede establecer un pool de conexiones al manejar la creacion, solicitud y finalizacion de la conexion, por la misma razon se usa la funcion de promesa para poder trabajar con conecciones de manera asyncrona mejorando el tiempo de reaccion.

# GET 

Para el manejo en general de Edpoins GET se hace un solicitud del query con la consulta que deseas realizar esperando una respuesta del servidor.

* // Función para obtener las bebidas
 export const getBebidas = async (req, res) => {
  try {
    const [bebidas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Bebidas'");
    res.json(bebidas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  };
};

* // Función para obtener los postres
export const getPostres = async (req, res) => {
  try {
    const [postres] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Postres'");
    res.json(postres);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

* // Función para obtener las entradas
export const getEntradas = async (req, res) => {
  try {
    const [entradas] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Entradas'");
    res.json(entradas);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

* // Función para obtener los platillos
export const getPlatillos = async (req, res) => {
  try {
    const [platillos] = await connectionPool.query("SELECT * FROM producto WHERE categoria_producto = 'Platillos'");
    res.json(platillos);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};



* export const getDetallesOrden = async (req,res) =>{
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

* export const getMesa = async (req, res) => {
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

* // funcion para obtener las ordenes
export const getOrder = async(req,res) => {
  try {
    const [orden] = await connectionPool.query("SELECT * FROM orden WHERE estatus = 1");
    res.json(orden);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }};

* // Función para obtener las ordenes que estan borradas
export const getOrdenesBorradas = async (req, res) => {
  try {
    const [ordenesEND] = await connectionPool.query("SELECT * FROM orden WHERE estatus = 0");
    res.json(ordenesEND);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

* export const getOrderName = async (req, res) => {
  try {
    const [orden] = await connectionPool.query('SELECT COUNT(id_orden) AS num_orden FROM orden;');
    res.json(orden);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error al obtener los resultados" });
  }
};

# POST 

Para el manejo en general de Edpoins POST se hacen constantes con los requerimientos que se deben ingresar generalmente en los procedimientos almacenados ya creados, los tipos de reuqerimientos pueden ser de tipo params o body,
los params manejan el requerimiento desde la url y los body desde el cuerpo del sitio.

* // Función para agregar un nuevo producto
export const postProductos = async (req, res) => {
  const { nombre, categoria, precio, descripcion, imgFile } = req.body;
  const query = 'CALL new_producto(?, ?, ?, ?, ?)';
  const params = [nombre, categoria, precio, descripcion, imgFile];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Producto agregado exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al agregar el producto');
  }
};

* // Funcion mas importante del sitio web 
export const postOrder = async (req,res) => {
  const {NombreMesa,pedidos, comentario, total} = req.body;

  if (Array.isArray(pedidos)) {
    console.log('Pedidos recibidos:', pedidos);
  } else {
    return res.status(400).send('El parámetro "pedidos" debe ser un arreglo');
  }

  const pedidosJSON = JSON.stringify(pedidos);
  const query = 'call new_orden(?,?,?,?)';
  const params = [NombreMesa, pedidosJSON, comentario, total];
  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Orden creada exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al crear la orden');
  };
};

* // Función para terminar una orden (No se deje engañar por el delete la funcion es cambiar un estatus de tipo true a false)
export const postDeleteOrder = async (req, res) => {
  const { id_orden } = req.params;
  const query = 'call terminar_orden (?);';
  const params = [id_orden];

  try {
    const [results] = await connectionPool.query(query, params);
    res.status(200).send('Orden terminada exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al terminar la orden');
  }
};


# DELETE 

Para el manejo en general de Edpoins DELETE se hacen constantes con los requerimientos que se deben ingresar en la consulta de tipo delete que queramos los requerimientos usualmente se deben usar de tipo parametro y se toman directamente desde un boton.

* // funcion para eliminar las ordenes
export const deleteOrder = async (req, res) => {
  const query = 'DELETE FROM orden;';
  try {
    const [results] = await connectionPool.query(query);
    res.status(200).send('Orden eliminada exitosamente');
  } catch (err) {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).send('Error al eliminar la orden');
  }
};

* // Función para eliminar un producto
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

# Estado actual del proyecto

En el estado actual del proyecto ya se puede hacer manejo total de los productos al poder crear, gestionar y borrar, igualmente de los pedidos y ordenes los cuales ya se pueden manejar en sus respectivas pantallas (comandas e historial) y menu, la funcion de logiarse aun no sea implementado por la gestion de seguridad en la base de datos al ser procedimientos de encriptacion y desencriptacion respectivamente pero se hara la implementacion a mas tardar el dia domingo.