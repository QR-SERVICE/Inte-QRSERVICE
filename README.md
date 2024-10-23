# Inte-QRSERVICE
Este es el repositorio en el cual vamos a trabajar. 

a a a a a a a a a aa a a a a a

Por el momento tenemos un servidor Corriendo en el puerto 3500
En el cual gracias a Express fue mas sencillo la implementacion
En lo cual nos ahorramos el tener que especificar las cabezeras ejemplo: 

const htpp = require('node:http')
const fs = require('node:fs')

const Puerto = process.env.Port ?? 1234

const processRequest = (req, res) =>{
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')  --> Aqui estamos dciiendo a la cabezera que el texto sera un texto plano y usamos charset=utf-8, para caracteres especiales
    Como lo son palabras acentuadas etc. 

    if (req.url == '/'){
        res.statusCode = 200 //Ok
        res.end("Bienvenido ál Mundo")
    } else if (req.url == '/user'){
        res.statusCode = 200
        res.end("Hola soy usuario")
    }else if (req.url == '/img'){
    
        fs.readFile('Mustang.jpg', (err, data) =>{
            if (err){
                res.statusCode = 500
                res.end("Errors apa")
            } else{
                res.setHeader('Content-Type', 'image/jpg; charset=utf-8')
                res.end(data);
            }
        })
    }
}

const server = htpp.createServer(processRequest)

server.listen(Puerto, () =>{
    console.log(`server listening on port http://localhost:${Puerto}`)
})


Lo que con Express el codigo nos queda de difrente manera, ahorrandonos lineas. 
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


Donde ya validamos las rutas, las cuales vamos a usar y con app.use, validamos los diseño y funciones de esa pantalla. 