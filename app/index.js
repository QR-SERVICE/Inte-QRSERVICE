import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws'; // Importar WebSocketServer
const server = express();

//usamos dotenv para guardar parametros de desarollo
dotenv.config();

server.set('PORT',process.env.PORT || 3500)//El puerto en el cual se esta ejecutando 

server.use(express.json());

// Morgan nos ayudara a mantener un registro de las veces que se solicita entrar al sistema
server.use(morgan('dev'));
// Obtiene el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio actual
const __dirname = path.dirname(__filename);
//cors
server.use(cors());

// conexion a la base de datos
import { getMesa } from './controlladores/QuickRestaurant-BD.js'
server.get('/Mesa/:id_mesa', getMesa);

import { getBebidas } from './controlladores/QuickRestaurant-BD.js'
server.get('/BebidasP', getBebidas);

import { getPlatillos } from './controlladores/QuickRestaurant-BD.js'
server.get('/PlatillosP', getPlatillos);

import { getPostres } from './controlladores/QuickRestaurant-BD.js'
server.get('/PostresP', getPostres);

import {getEntradas } from './controlladores/QuickRestaurant-BD.js'
server.get('/EntradasP', getEntradas);

import {getOrdenesBorradas } from './controlladores/QuickRestaurant-BD.js'
server.get('/Historial_ordenes', getOrdenesBorradas);

import {getDetallesOrden } from './controlladores/QuickRestaurant-BD.js'
server.get('/Detalles/:id_orden', getDetallesOrden);

import {getTotal } from './controlladores/QuickRestaurant-BD.js'
server.get('/Total', getTotal);

import {postProductos} from './controlladores/QuickRestaurant-BD.js'
server.post("/AgregarProductos",postProductos);

import {deleteProductos} from './controlladores/QuickRestaurant-BD.js'
server.delete("/EliminarProducto/:producDelete",deleteProductos);

import {postOrder} from './controlladores/QuickRestaurant-BD.js'
server.post("/OrdenP",postOrder);

import {getOrder} from './controlladores/QuickRestaurant-BD.js'
server.get("/Orden",getOrder);

import {postDeleteOrder} from './controlladores/QuickRestaurant-BD.js'
server.post("/TerminarOrden/:id_orden",postDeleteOrder);

import {getOrderName } from './controlladores/QuickRestaurant-BD.js'
server.get('/NombreOrden', getOrderName);

import {deleteOrder} from './controlladores/QuickRestaurant-BD.js'
server.delete("/EliminarOrdenes",deleteOrder);

import {postAdmin} from './controlladores/QuickRestaurant-BD.js'
server.post("/Registrarse",postAdmin);

import {postLogin} from './controlladores/QuickRestaurant-BD.js'
server.post("/Entre",postLogin);

import {getAdministradores } from './controlladores/QuickRestaurant-BD.js'
server.get('/Administradores', getAdministradores);



// Configuración de directorios estáticos
server.use(express.static(path.join(__dirname, 'Public')));
server.use(express.static(path.join(__dirname, 'Img')));


// Rutas
server.get("/", (req, res) => res.sendFile(path.join(__dirname, 'login_', 'login.html')))
server.get("/productos", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Productos_confi.html')))
server.get("/configuracion", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Confi.html')))
server.get("/MenuP", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu-copy.html')))
server.get("/MenuQ", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'menu.copy2.html')))
server.get("/Comandas", (req, res) => res.sendFile(path.join(__dirname, 'PantallaComandas', 'index.html')))
server.get("/Pedidos-completados", (req, res) => res.sendFile(path.join(__dirname, 'Pedidos', 'Historial_Pedidos.html')))
server.get("/grafica", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'grafica_ventas.html')))

server.get("/example", (req, res) => res.sendFile(path.join(__dirname, 'bo', 'index.html')))


server.get("/Mesa1", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'MenuGood.html')))
server.get("/Mesa2", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'mesa2.html')))
server.get("/vistaMenu", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'ViewMenu.html')))
server.get("/menuFAKE", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'menufake.html')))

// ruta para la navbar
server.get("/Navbar", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'navbar.html')));
server.get("/Navbar2", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'navbar2.html')));
// Navbar configuracion
server.get("/Header", (req, res) => res.sendFile(path.join(__dirname, 'estaticos', 'header.html')));
server.get("/Footer", (req, res) => res.sendFile(path.join(__dirname, 'estaticos', 'footer.html')));
server.get("/Nosotros", (req, res) => res.sendFile(path.join(__dirname, 'estaticos', 'AboutUs.html')));

// Inicia el servidor
// Inicia el servidor HTTP y guárdalo en una variable
const httpServer = server.listen(server.get('PORT'), () => {
    console.log(`Servidor corriendo en http://localhost:${server.get('PORT')}`);
});

// Configuración de WebSocket reutilizando el servidor HTTP
const wss = new WebSocketServer({ server: httpServer }); 

wss.on('connection', (ws) => {
    console.log('Un cliente se ha conectado al WebSocket.');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            if (data.action === 'call_waiter' || data.action === 'request_account') {
                console.log(data.message);

                // Enviar notificación a todos los clientes conectados
                wss.clients.forEach((client) => {
                    if (client.readyState === ws.OPEN) {
                        client.send(
                            JSON.stringify({
                                type: data.action,
                                mesa: data.mesa,
                                message: data.message,
                            })
                        );
                    }
                });
            }
        } catch (error) {
            console.error('Error procesando el mensaje:', error);
        }
    });

    ws.on('close', () => {
        console.log('Un cliente se ha desconectado del WebSocket.');
    });
});