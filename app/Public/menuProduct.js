 // Realiza la solicitud a la API para obtener los productos
 fetch('/BebidasP')
 .then(response => response.json())
 .then(data => {
     const menuContainer = document.getElementById("menu-containerDrinks");

     data.forEach(bebidas => {
         const productoDiv = document.createElement('div');
         productoDiv.classList.add('producto');

         const productoImg = document.createElement('img');
         productoImg.src = `../bebidas.img/${bebidas.img}`;
         productoImg.alt = bebidas.nombre_producto;

         const nombreP = document.createElement('div');
         nombreP.classList.add('nombreP');
         nombreP.textContent = bebidas.nombre_producto;

         const descripcionP = document.createElement('p');
         descripcionP.classList.add('descripcion');
         descripcionP.textContent = bebidas.descripcion;

         const precioP = document.createElement('div');
         precioP.classList.add('precio');
         precioP.textContent = `$${bebidas.precio_producto}`;

         const botones = document.createElement('div');
         botones.classList.add('botones');

         const button_del = document.createElement('button');
         button_del.classList.add('button_del');
         button_del.textContent = "-";
         
         const button_sum = document.createElement('button');
         button_sum.classList.add('button_add');
         button_sum.textContent = "+";

         const input_cant = document.createElement('input');
         input_cant.type = 'number';
         input_cant.classList.add('input_cant');
         input_cant.value = 0;

         button_sum.addEventListener('click', () => {
             input_cant.value = parseInt(input_cant.value) + 1;
             agregarAlCarrito(bebidas);
         });

         button_del.addEventListener('click', () => {
             if(input_cant.value > 0){
                 input_cant.value = parseInt(input_cant.value) - 1;
                 eliminarCantCarrito(bebidas);
             }  
         });

         productoDiv.appendChild(productoImg);
         productoDiv.appendChild(nombreP);
         nombreP.appendChild(descripcionP);
         productoDiv.appendChild(precioP);
         botones.appendChild(button_del);
         botones.appendChild(input_cant);
         botones.appendChild(button_sum);
         productoDiv.appendChild(botones);
         menuContainer.appendChild(productoDiv);
     });
 })
 .catch(error => {
     console.error('Error al cargar los productos:', error);
 });

 fetch('/EntradasP')
            .then(response => response.json())
            .then(data => {
                const menuContainer = document.getElementById("menu-containerTickets");

                data.forEach(entradas => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto');

                    const productoImg = document.createElement('img');
                    productoImg.src = `../entradas.img/${entradas.img}`;
                    productoImg.alt = entradas.nombre_producto;

                    const nombreP = document.createElement('div');
                    nombreP.classList.add('nombreP');
                    nombreP.textContent = entradas.nombre_producto;

                    const descripcionP = document.createElement('p');
                    descripcionP.classList.add('descripcion');
                    descripcionP.textContent = entradas.descripcion;

                    const precioP = document.createElement('div');
                    precioP.classList.add('precio');
                    precioP.textContent = `$${entradas.precio_producto}`;

                    const botones = document.createElement('div');
                    botones.classList.add('botones');

                    const button_del = document.createElement('button');
                    button_del.classList.add('button_del');
                    button_del.textContent = "-";

                    const button_sum = document.createElement('button');
                    button_sum.classList.add('button_add');
                    button_sum.textContent = "+";

                    const input_cant = document.createElement('input');
                    input_cant.type = 'number';
                    input_cant.classList.add('input_cant');
                    input_cant.value = 0;

                    // Evento para agregar producto al carrito
                    button_sum.addEventListener('click', () => {
                        input_cant.value = parseInt(input_cant.value || 0) + 1;
                        agregarAlCarrito(entradas);
                    });

                    // Evento para eliminar producto del carrito
                    button_del.addEventListener('click', () => {
                    if(input_cant.value > 0){
                        input_cant.value = parseInt(input_cant.value) - 1;
                        eliminarCantCarrito(entradas);
                    }  
                    });

                    productoDiv.appendChild(productoImg);
                    productoDiv.appendChild(nombreP);
                    nombreP.appendChild(descripcionP);
                    productoDiv.appendChild(precioP);
                    botones.appendChild(button_del);
                    botones.appendChild(input_cant);
                    botones.appendChild(button_sum);
                    productoDiv.appendChild(botones);
                    menuContainer.appendChild(productoDiv);
                });
            })
            .catch(error => {
                console.error('Error al cargar los productos:', error);
            });

// Realiza la solicitud a la API para obtener los productos
fetch('/PlatillosP')
.then(response => response.json())
.then(data => {
    const menuContainer = document.getElementById("menu-containerPlatillos");

    data.forEach(platillo => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');

        const productoImg = document.createElement('img');
        productoImg.src = `../platillos.img/${platillo.img}`;
        productoImg.alt = platillo.nombre_producto;

        const nombreP = document.createElement('div');
        nombreP.classList.add('nombreP');
        nombreP.textContent = platillo.nombre_producto;

        const descripcionP = document.createElement('p');
        descripcionP.classList.add('descripcion');
        descripcionP.textContent = platillo.descripcion;

        const precioP = document.createElement('div');
        precioP.classList.add('precio');
        precioP.textContent = `$${platillo.precio_producto}`;

        const botones = document.createElement('div');
        botones.classList.add('botones');

        const button_del = document.createElement('button');
        button_del.classList.add('button_del');
        button_del.textContent = "-";

        const button_sum = document.createElement('button');
        button_sum.classList.add('button_add');
        button_sum.textContent = "+";

        const input_cant = document.createElement('input');
        input_cant.type = 'number';
        input_cant.classList.add('input_cant');
        input_cant.value = 0;

        button_sum.addEventListener('click', () => {
            input_cant.value = parseInt(input_cant.value) + 1;
            agregarAlCarrito(platillo);
        });

        button_del.addEventListener('click', () => {
            if(input_cant.value > 0){
                input_cant.value = parseInt(input_cant.value) - 1;
                eliminarCantCarrito(platillo);
            }  
        });

        productoDiv.appendChild(productoImg);
        productoDiv.appendChild(nombreP);
        nombreP.appendChild(descripcionP);
        productoDiv.appendChild(precioP);
        botones.appendChild(button_del);
        botones.appendChild(input_cant);
        botones.appendChild(button_sum);
        productoDiv.appendChild(botones);
        menuContainer.appendChild(productoDiv);
    });
})
.catch(error => {
    console.error('Error al cargar los productos:', error);
});

fetch('/PostresP')
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById("menu-containerPostres");

            data.forEach(postres => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('producto');

                const productoImg = document.createElement('img');
                productoImg.src = `../postres.img/${postres.img}`;
                productoImg.alt = postres.nombre_producto;

                const nombreP = document.createElement('div');
                nombreP.classList.add('nombreP');
                nombreP.textContent = postres.nombre_producto;

                const descripcionP = document.createElement('p');
                descripcionP.classList.add('descripcion');
                descripcionP.textContent = postres.descripcion;

                const precioP = document.createElement('div');
                precioP.classList.add('precio');
                precioP.textContent = `$${postres.precio_producto}`;

                const botones = document.createElement('div');
                botones.classList.add('botones');

                const button_del = document.createElement('button');
                button_del.classList.add('button_del');
                button_del.textContent = "-";

                const button_sum = document.createElement('button');
                button_sum.classList.add('button_add');
                button_sum.textContent = "+";

                const input_cant = document.createElement('input');
                input_cant.type = 'number';
                input_cant.classList.add('input_cant');
                input_cant.value = 0;

                button_sum.addEventListener('click', () => {
                    input_cant.value = parseInt(input_cant.value) + 1;
                    agregarAlCarrito(postres);
                });

                button_del.addEventListener('click', () => {
                    if(input_cant.value > 0){
                        input_cant.value = parseInt(input_cant.value) - 1;
                        eliminarCantCarrito(postres);
                    }  
                });

                productoDiv.appendChild(productoImg);
                productoDiv.appendChild(nombreP);
                nombreP.appendChild(descripcionP);
                productoDiv.appendChild(precioP);
                botones.appendChild(button_del);
                botones.appendChild(input_cant);
                botones.appendChild(button_sum);
                productoDiv.appendChild(botones);
                menuContainer.appendChild(productoDiv);
            });
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });


 fetch('/Navbar')
     .then(response => response.text())
     .then(data => {
         // Insertar el HTML en el contenedor
         document.getElementById('navbar-container').innerHTML = data;

         // Crear un script para ejecutar el contenido JS de JMenu.js
         const script = document.createElement('script');
         script.src = '/JMenu.js';  // Ruta del script
         script.onload = () => {
             console.log('El script se cargó y ejecutó correctamente');
         };
         document.body.appendChild(script);
     })
     .catch(error => console.error('Error al cargar el navbar:', error));

 /*    
const carrito = [];

function agregarAlCarrito(producto) {
const productoExistente = carrito.find(item => item.nombre_producto === producto.nombre_producto);

if (productoExistente) {
 productoExistente.cantidad++;
} else {
 carrito.push({ ...producto, cantidad: 1 });
}

mostrarCarrito();
}

function eliminarCantCarrito(producto) {
const productoExistente = carrito.find(item => item.nombre_producto === producto.nombre_producto);

if (productoExistente && productoExistente.cantidad > 0) {
 productoExistente.cantidad--;
} else {
 carrito.push({ ...producto, cantidad: 0 });
}
if (productoExistente && productoExistente.cantidad == 0) {
 eliminarDelCarrito(producto);
} 
mostrarCarrito();
}

function eliminarDelCarrito(producto) {
const index = carrito.findIndex(item => item.nombre_producto === producto.nombre_producto);
if (index !== -1) {
 carrito.splice(index, 1);
}
mostrarCarrito();
}


function mostrarCarrito() {
const productosModal = document.getElementById("productos-modal");
const totalModal = document.getElementById("total-modal");
productosModal.innerHTML = '';
let total = 0;

carrito.forEach(producto => {
 const itemDiv = document.createElement('div');
 itemDiv.classList.add('carrito-item');
 itemDiv.textContent = `${producto.nombre_producto} x${producto.cantidad} - $${producto.precio_producto * producto.cantidad}`;
 productosModal.appendChild(itemDiv);
 total += producto.precio_producto * producto.cantidad;
});

totalModal.textContent = `Total: $${total.toFixed(2)}`;
}
*/