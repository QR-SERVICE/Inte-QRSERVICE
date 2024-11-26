// Boton para abrir la sidebar
const menu = document.getElementById('menu-desplegable');
const sidebar = document.getElementById('sidebar');

menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
})


// Seleccionamos los elementos necesarios
const abrirNotis = document.getElementById('abrir-notis');
const cerrarNotis = document.getElementById('cerrar-notis');
const notificaciones = document.getElementById('notificaciones');
const callMesero = document.querySelector('.call-mesero');
const callAccount = document.querySelector('.call-account');

// Establecer conexión con el WebSocket
const socket = new WebSocket('ws://localhost:3500');

// Manejo de la conexión
socket.onopen = () => {
    console.log('Conectado al WebSocket.');
};

socket.onerror = (error) => {
    console.error('Error en la conexión WebSocket:', error);
};

// Función para mostrar el menú de notificaciones
abrirNotis.addEventListener('click', function() {
notificaciones.style.display = 'block';
});

// Función para ocultar el menú de notificaciones
cerrarNotis.addEventListener('click', function() {
notificaciones.style.display = 'none';
});

// Cerrar el menú cuando se hace clic fuera de él
document.addEventListener('click', function(event) {
if (notificaciones.style.display === 'block' && 
    !notificaciones.contains(event.target) && 
    event.target !== abrirNotis) {
    notificaciones.style.display = 'none';
}
});

// Manejo del clic en "Llamar mesero"
callMesero.addEventListener('click', function () {
    const mesa = 1; // Puedes reemplazar con la lógica para obtener la mesa actual
    const mensaje = {
        action: 'call_waiter',
        mesa: mesa,
        message: `Mesa ${mesa} solicitó un mesero`,
    };

    socket.send(JSON.stringify(mensaje));
    alert('Llamaste al mesero');
});

// Manejo del clic en "Solicitar cuenta"
callAccount.addEventListener('click', function () {
    const mesa = 1; // Puedes reemplazar con la lógica para obtener la mesa actual
    const mensaje = {
        action: 'request_account',
        mesa: mesa,
        message: `Mesa ${mesa} solicitó la cuenta`,
    };

    socket.send(JSON.stringify(mensaje));
    alert('Solicitaste la cuenta');
});




    

// cambiar estado de seleccionado en el menu
const menuButtons = document.querySelectorAll('.menu-boton');

    menuButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            menuButtons.forEach(btn => btn.classList.remove('a-selected'));
            button.classList.add('a-selected');
        });
    });

// Boton para abrir y cerrar las opciones del menu en modo responsivo
const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

function obtenerPrecios(elementos) {
    return Array.from(elementos).map(elemento => {
        const texto = elemento.textContent.trim();
        const precioNumerico = parseFloat(texto.replace('$', '')); 
        return isNaN(precioNumerico) ? 0 : precioNumerico; 
    });
}

const sumProducts = document.querySelectorAll(".button_agregar_carrito");
const nombresP = document.querySelectorAll(".nombreP");
const preciosP = document.querySelectorAll(".precio");
const productOrde = document.getElementById("productos_orden");
const cantidadP = document.querySelectorAll(".input_cant");
const TOTAL = document.getElementById("TOTAL");
let totalSum = 0;

const precios = obtenerPrecios(preciosP);

sumProducts.forEach((sumProducts, index) => {
    sumProducts.addEventListener("click", () => {
        const name = nombresP[index].textContent; 
        const precio = precios[index];
        const cantidad = parseInt(cantidadP[index].value);

        console.log(cantidad);

        if(cantidad > 0) {
            const row = document.createElement("tr");
            row.className = "producto-fila";
            row.classList.add("producto-fila");

            
            const cellName = document.createElement("td");
            const cellPrice = document.createElement("td");
            const cellAmount = document.createElement("td");
            const cellRemove = document.createElement("td");

            
            const parrafoName = document.createElement("p");
            parrafoName.className = "name";
            parrafoName.textContent = name;
            cellName.appendChild(parrafoName);

            
            const parrafoPrice = document.createElement("p");
            parrafoPrice.className = "price";
            parrafoPrice.textContent = ` $${precio.toFixed(2)} X `;
            cellPrice.appendChild(parrafoPrice);

            const parrafoAmount = document.createElement("p");
            parrafoAmount.className = "amount";
            parrafoAmount.textContent = cantidad ;
            cellAmount.appendChild(parrafoAmount);

            
            const removeButton = document.createElement("button");
            removeButton.className = "bi bi-trash";
            removeButton.id = "bote-basura";
            removeButton.textContent = " Eliminar";  
            removeButton.style.backgroundColor = '#ff4d4f'; 
            removeButton.style.color = 'white';
            removeButton.style.margin = '4px';
            removeButton.style.border = 'none'; 
            removeButton.style.padding = '10px 15px';
            removeButton.style.fontSize = '14px'; 
            removeButton.style.borderRadius = '5px'; 
            removeButton.style.cursor = 'pointer';
            removeButton.style.transition = 'background-color 0.3s ease';

            
            removeButton.addEventListener("click", () => {
                row.remove();  
                totalSum -= precio * cantidad;  
                TOTAL.textContent = totalSum.toFixed(2) + "$";  
            });

            
            cellRemove.appendChild(removeButton);

            
            row.appendChild(cellName);
            row.appendChild(cellPrice);
            row.appendChild(cellAmount);
            row.appendChild(cellRemove);

            
            productOrde.appendChild(row);
            
            totalSum += precio * cantidad;
            TOTAL.textContent = "$" +totalSum.toFixed(2) ;

        }  else {
            alert('Añada una cantidad')
        } 
    });
});



const notificacionesM = document.querySelector('#notificaciones');

notificacionesM.addEventListener("click", cerrarNotificacion);

function cerrarNotificacion() {
    notificacionesM.classList.toggle("visible");
}

document.addEventListener('click', (event) => {
    const target = event.target;
    const menuNotificacion = target === notificacionesM || notificacionesM.contains(target);

    if (!menuNotificacion) {
        notificacionesM.classList.remove("visible");
    }
});

// cerrar si se hace click fuera de la barra de menu
document.addEventListener('click', (event) => {
    const ClickDentroSidebar = sidebar.contains(event.target);
    const ClickDentroMenu = menu.contains(event.target);

    if (!ClickDentroSidebar && !ClickDentroMenu) {
        sidebar.classList.remove('menu-toggle');
    }
});

function openModal() {
    const modal = document.getElementById("pantalla_detalles_1");  // Abre pantalla_detalles
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add("show");
    });
}

function closeModal() {
    const modal = document.getElementById("pantalla_detalles_1"); // Oculta la pantalla_detalles
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

const navbar = document.getElementById('navbar');

// Función para cambiar la clase según el scroll
function cambiarClasePorScroll() {
    // Si el scroll ha pasado (X)px desde la parte superior
    if (window.scrollY > 90) {
        navbar.classList.add('navbar-scroll'); 
    } else {
        navbar.classList.remove('navbar-scroll'); 
    }
}

carcerrarsidebar  = document.getElementById('carr');

carcerrarsidebar.addEventListener('click', () => {
    sidebar.classList.remove('menu-toggle');
});

// Función para cambiar el margen superior del sidebar según el scroll

function cambiarClaseSidebarScroll() {
    const scrollY = window.scrollY;
    let newMarginTop;
    const screenWidth = window.innerWidth; // Ancho actual de la pantalla

    if(screenWidth >= 620 && screenWidth < 720) {
        if (scrollY < 90) {
            newMarginTop = 20 - (scrollY / 4); 
        } else {
            newMarginTop = 5; 
        }
    }

    if(screenWidth <= 416) {
        if (scrollY < 90) {
            newMarginTop = 20 - (scrollY / 4); // Ajustar este factor de división para controlar la velocidad
        } else {
            newMarginTop = 12; // Fijar el margin-top en 48% cuando scrollY es mayor a 90
        }
    }
}

// Función para cambiar la clase según el scroll
function cambiarClasePorScroll() {
    // Si el scroll ha pasado (X)px desde la parte superior
    if (window.scrollY > 90) {
        navbar.classList.add('navbar-scroll'); 
    } else {
        navbar.classList.remove('navbar-scroll'); 
    }
}

// Llamar a ambas funciones cuando se haga scroll
window.addEventListener('scroll', function() {
    cambiarClasePorScroll();
    cambiarClaseSidebarScroll();
});

// Animacion suave al darle click a la sidebar
document.querySelectorAll('.menu-boton').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault(); // Evita el comportamiento predeterminado del enlace.
      const targetId = this.getAttribute('href').substring(1); // Obtén el id de destino.
      const targetElement = document.getElementById(targetId);
  
      if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop - 100, // Margen de arriba
          behavior: 'smooth' // Desplazamiento suave.
        });
      }
    });
  });

  
const carritoCerrar = document.querySelector('.carrito');

// Cerrar el carrito al hacer clic fuera de él
document.addEventListener('click', (event) => {
    if (!carritoCerrar.contains(event.target) && !ver.contains(event.target)) {
        carritoCerrar.classList.remove("visible"); 
    }
});

// Evitar que el clic dentro del carrito cierre el carrito
carritoCerrar.addEventListener('click', (event) => {
    event.stopPropagation();  // Detiene la propagación del clic dentro del carrito
});

// Boton para mostrar lo que llevan de orden 
const carrito = document.getElementById("carrito");
const ver = document.getElementById("carr")
const NoVer = document.getElementById("cerrar_carr")

ver.addEventListener("click", () => {
    carrito.style.display = 'block'; 
    carrito.style.zIndex = 1; 
    setTimeout(() => {
        carrito.classList.add("visible"); 
    }, 10); 
});

NoVer.addEventListener("click", () => {
    carrito.classList.remove("visible"); 
});

function vaciarCarrito() {
    const productRows = document.querySelectorAll('.producto-fila');
    productRows.forEach(row => row.remove());
    TOTAL.textContent = '$0.00'; 
    coment.value = '';
};

function actualizarTablaRecord(pedidos, total) {
    const historial = document.getElementById('RecordTable');
    const tbodyHistorial = historial.querySelector('tbody');

    pedidos.forEach(pedido => {
        const filaHistorial = document.createElement('tr');
        filaHistorial.classList.add('productos_Record');
        
        
        const celdaProducto = document.createElement('td');
        celdaProducto.textContent = pedido.nombre_producto;
        filaHistorial.appendChild(celdaProducto);

        const celdaPrecio = document.createElement('td');
        celdaPrecio.textContent = `$${pedido.precio.toFixed(2)}`;
        filaHistorial.appendChild(celdaPrecio);

        const celdaCantidad = document.createElement('td');
        celdaCantidad.textContent = pedido.cantidad;
        filaHistorial.appendChild(celdaCantidad);
        tbodyHistorial.appendChild(filaHistorial);
    });
    document.getElementById('Record_total').textContent = `$${total.toFixed(2)}`;
}


const botonEn = document.getElementById('enviar-t');
const coment = document.getElementById('coment');
const totalisimo = document.getElementById('TOTAL');
const Nm = document.getElementById('Mesa');

const enviarOrden = async () => {
    function parseTotal() {
        const totalText = totalisimo.textContent.trim();
        const totalValue = parseFloat(totalText.replace('$', '').trim());
        return totalValue;
    }

    const total = parseTotal();
    const comentario = coment.value;
    const NombreMesa = Nm.textContent;

    console.log("Mesa:", NombreMesa);

    const pedidos = [];
    const productName = document.querySelectorAll('.name');
    const productAmount = document.querySelectorAll('.amount');
    const productPrice = document.querySelectorAll('.price');

    productName.forEach((nameElement, index) => {
        const name = nameElement.textContent;
        const amount = parseInt(productAmount[index].textContent);
        const price = parseFloat(productPrice[index].textContent.replace("$", "").trim());
        pedidos.push({
            nombre_producto: name,
            cantidad: amount,
            precio: price
        });
    });

    try {
        const response = await fetch('http://localhost:3500/OrdenP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ NombreMesa, pedidos, comentario, total })
        });

        const responseData = await response.json();
        console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
        console.log('Estado de respuesta:', response.status);

        if (response.ok) {
            alert('Orden exitosa');
            vaciarCarrito();
            actualizarTablaRecord(pedidos, total);
        } else {
            alert('Problemas al agregar el producto');
        }
    } catch (e) {
        console.error('Error al enviar la orden:', e);
        alert('No se pudo enviar la orden. Intenta nuevamente.');
    }
};

botonEn.removeEventListener("click", enviarOrden);
botonEn.addEventListener("click", enviarOrden);



const orderButton = document.getElementById('Order'); 
const closeButton = document.getElementById('cerrar_Record'); 
const recordDiv = document.getElementById('Record'); 


orderButton.addEventListener('click', () => {
    recordDiv.classList.add('visible'); 
});

closeButton.addEventListener('click', () => {
    recordDiv.classList.remove('visible');
});