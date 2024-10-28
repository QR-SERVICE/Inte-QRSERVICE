import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// Obtiene el nombre del archivo actual
const __filename = fileURLToPath(import.meta.url);
// Obtiene el directorio actual
const __dirname = path.dirname(__filename);

const server = express();
const PORT = 3500; //El puerto en el cual se esta ejecutando 

// Configuración de directorios estáticos
server.use(express.static(path.join(__dirname, 'Public')));
server.use(express.static(path.join(__dirname, 'Img')));
server.use(cors());

// Rutas
server.get("/", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Productos_confi.html')))
server.get("/confi", (req, res) => res.sendFile(path.join(__dirname, 'Configuracion', 'Configuraciones.html')))
server.get("/Menu", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu-Orden.HTML')))
server.get("/Me", (req, res) => res.sendFile(path.join(__dirname, 'Menu', 'Menu-copy.HTML')))
server.get("/Comandas", (req, res) => res.sendFile(path.join(__dirname, 'PantallaComandas', 'index.HTML')))
server.get("/Pedidos", (req, res) => res.sendFile(path.join(__dirname, 'Pedidos', 'Historial_pedidos.HTML')))

// Inicia el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
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