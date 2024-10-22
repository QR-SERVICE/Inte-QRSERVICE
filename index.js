const express = require('express')
const app = express()
const path = require('path')

const Port = process.env.Port ?? 3500

/*Aqui van a estar las rutas*/

app.get('/Menu/Menu-Orden.HTML', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Menu', 'Menu-Orden.HTML'))
})

app.get('/Configuracion/Productos_confi.HTML', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Configuracion', 'Productos_confi.html'))
})

/*Aqui vamos a tener los diseños de cada rutas, css, JSON, JS, etc*/
app.use('/Configuracion', express.static(path.join(__dirname, 'Configuracion')));
app.use('/Menu', express.static(path.join(__dirname, 'Menu')));

/*Se valida el puerto del server*/
app.listen(Port, () =>{
    console.log(`server listening on port http://localhost:${Port}`)
})