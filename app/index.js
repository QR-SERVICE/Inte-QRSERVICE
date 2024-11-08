import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
const server = express();


server.use(express.json());

// Morgan nos ayudara a mantener un registro de las veces que se solicita entrar al sistema
server.use(morgan('dev'));
// Obtiene el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio actual
const __dirname = path.dirname(__filename);

// conexion a la base de datos
import { getBebidas } from './controlladores/Productos-BD.js'
server.get('/BebidasP', getBebidas);

import { getPlatillos } from './controlladores/Productos-BD.js'
server.get('/PlatillosP', getPlatillos);

import { getPostres } from './controlladores/Productos-BD.js'
server.get('/PostresP', getPostres);

import { getEntradas } from './controlladores/Productos-BD.js'
server.get('/EntradasP', getEntradas);


import {postProductos} from './controlladores/Productos-BD.js'
server.post("/AgregarProductos",postProductos);

server.set('PORT',process.env.PORT || 3500)//El puerto en el cual se esta ejecutando 


/////////////////////////////// COMIENZA DESPAPAYE DE CHRISTIAN  ///////////////////

// Configurar CORS y manejar el cuerpo de las solicitudes
server.use(cors());
server.use(express.json());

// Simulamos las comandas como un array temporal (ESTO SE SUSTITUYE POR LA BASE DE DATOS)
let comandas = [
    {
        mesa: 1,
        pedido: [
            { cantidad: 2, platillo: 'Hamburguesa' },
            { cantidad: 1, platillo: 'Coca-Cola' }
        ],
        comentarios: 'Pedido rápido, por favor.'
    },
    {
        mesa: 2,
        pedido: [
            { cantidad: 1, platillo: 'Pizza' }
        ],
        comentarios: 'Sin cebolla.'
    }
];

// Ruta para obtener todas las comandas
server.get('/api/comandas', (req, res) => {
    res.json(comandas);  // Devuelve las comandas como un JSON
});

// Ruta para guardar una nueva comanda
server.post('/api/comandas', (req, res) => {
    const nuevaComanda = req.body;
    comandas.push(nuevaComanda);
    res.status(201).json({ message: 'Comanda guardada con éxito', comanda: nuevaComanda });
});

// Ruta para marcar una comanda como lista y moverla a historial
server.delete('/api/comandas/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < comandas.length) {
        comandas.splice(index, 1);
        res.json({ message: 'Comanda marcada como lista y eliminada' });
    } else {
        res.status(404).json({ error: 'Comanda no encontrada' });
    }
});
//////NOTA DESPUES ACOMODAMOS LAS RUTAS EN LA SECCION DE RUTAS, LAS TENGO AQUI SEPARADAS PARA NO MESCLAR CON LAS DEMAS PARTES DEL CODIGO /////

////////////////////// TERMINA DESPAPAYE DE CHRISTIAN ///////////////////////




// Configuración de directorios estáticos
server.use(express.static(path.join(__dirname, 'Public')));
server.use(express.static(path.join(__dirname, 'Img')));
server.use(cors());



// Rutas para las categorias de productos


// Rutas de administradores
import {getAdministradores} from './controlladores/Administradores.js'
server.get("/Administradores",getAdministradores);

import {postAdministradores} from './controlladores/Administradores.js'
server.post("/Administradores/Nuevos-Administradores",postAdministradores);

// Rutas de mesas
import {getMesas} from './controlladores/mesas.js'
server.get("/mesas",getMesas);

import {postMesa} from './controlladores/mesas.js'
server.post("/mesas/Nueva-mesa",postMesa);

// Rutas de productos
import {getProducto} from './controlladores/Productos.js'
server.get("/Productost",getProducto);

// Rutas de pedidos
import {getPedidos} from './controlladores/pedidos.js'
server.get("/PedidosV",getPedidos);

import {postPedidos} from './controlladores/pedidos.js'
server.post("/Hacer-Pedido",postPedidos);






// Rutas
server.get("/", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Productos_confi.html')))
server.get("/confi", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Configuraciones.html')))
server.get("/Menu", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu-Orden.HTML')))
server.get("/Me", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu-copy.HTML')))
server.get("/Comandas", (req, res) => res.sendFile(path.join(__dirname, 'PantallaComandas', 'index.HTML')))
server.get("/Pedidos", (req, res) => res.sendFile(path.join(__dirname, 'Pedidos', 'Historial_pedidos.HTML')))
server.get("/Login", (req, res) => res.sendFile(path.join(__dirname, 'login', 'login.html')))
server.get("/Admin", (req, res) => res.sendFile(path.join(__dirname, 'login', 'admin.html')))

//Rutas para los productos
server.get("/Entradas", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu_Entradas.HTML')))
server.get("/Platillos_Fuertes", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu_Fuertes.HTML')))
server.get("/Postres", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu_Postres.HTML')))
server.get("/Bebidas", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu_Bebidas.HTML')))

// Inicia el servidor
server.listen(server.get('PORT'), () => {
    console.log(`Servidor corriendo en http://localhost:${server.get('PORT')}`);
});

/* JSON Para el funcionamiento de las imagenes.

const ImgJson =[
    {nombre: "Juan", foto: "https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco-tomate-cocineros/HAMBURGUESA%201200x709.png"}
];

const Pro_img =[
    {}
]

app.get("/", (req, res) => res.json(ImgJson[0]));
app.get("/prueba1", (req, res) => res.json(ImgJson[1]));*/