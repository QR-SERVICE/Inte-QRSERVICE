// Boton para abrir la sidebar
const menu = document.getElementById('menu-desplegable');
const sidebar = document.getElementById('sidebar');

menu.addEventListener('click', () => {
    sidebar.classList.toggle('menu-toggle');
})

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
    carrito.addEventListener('transitionend', () => {
        carrito.style.display = 'none'; 
    }, { once: true }); 
});
// Boton para mostrar las opciones de notificaciones

const notificaciones = document.getElementById("notificaciones");
const cerrar_notis = document.getElementById("cerrar-notis");
const abrir_notis = document.getElementById("abrir-notis");

abrir_notis.addEventListener("click", () => {
    notificaciones.style.display = 'block'; 
    notificaciones.style.zIndex = 1; 
    setTimeout(() => {
        notificaciones.classList.add("visible"); 
    }, 10); 
})

cerrar_notis.addEventListener("click", () => {
    notificaciones.classList.remove("visible");
})


// Boton de traduccion
const langButtons = document.querySelectorAll("[data-language]");
langButtons.forEach((button) =>{
    button.addEventListener("click", () =>{
        const texttochange = document.querySelectorAll("[data-seccion]");
        console.log(texttochange);
        fetch(`/languages/${button.dataset.language}.json`)
        .then(res => res.json())
        .then(data => {
            texttochange.forEach((el) => {
                const seccion = el.dataset.seccion;
                const valor = el.dataset.valor;

                el.textContent = data[seccion][valor];
                
            })
        })
    })
})

// Boton para cambiar de categoria de productos
const opcionButtons = document.querySelectorAll("[data-categoria]");
opcionButtons.forEach((button) =>{
    button.addEventListener("click",()=>{
        const texTochange = document.querySelectorAll("[data-section]");
        console.log(texTochange);
        fetch(`../Menu/Productos.js/${button.dataset.categoria}.json`)
        .then(res => res.json())
        .then(data =>{
            texTochange.forEach((op) => {
                const section = op.dataset.section;
                const value = op.dataset.value;

                op.textContent= data[section][value];
            })
        })
    })
})

const sumProducts = document.querySelectorAll(".S-boton");
const nombresP = document.querySelectorAll(".nombreP");
const preciosP = document.querySelectorAll(".costo");
const productOrde = document.getElementById("productos_orden");
const TOTAL = document.getElementById("TOTAL");
let totalSum = 0;

sumProducts.forEach((sumProduct, index) => {
    sumProduct.addEventListener("click", () => {
        const name = nombresP[index].textContent;
        const precio = parseFloat(preciosP[index].textContent);
        const agregarOrden = document.createElement("td");
        const parrafoName = document.createElement("p")
        parrafoName.className = "name";
        const parrafoprice = document.createElement("p")
        parrafoprice.className = "price";
        const nombre = document.createTextNode(name);
        parrafoName.appendChild(nombre)
        const price = document.createTextNode(" "+ precio.toFixed(2) + "$");
        parrafoprice.appendChild(price)
        const restProduct = document.createElement("button");
        agregarOrden.className = ("datos-producto")
        restProduct.className = "bi bi-trash";
        restProduct.id =("bote-basura");
        restProduct.addEventListener("click", () => {
            agregarOrden.remove();
            restProduct.remove();
            totalSum -= precio;
            TOTAL.textContent = totalSum.toFixed(2) + "$";

        });
        agregarOrden.appendChild(parrafoName);
        agregarOrden.appendChild(parrafoprice);
        productOrde.appendChild(agregarOrden);
        productOrde.appendChild(restProduct);

        totalSum += precio;
        TOTAL.textContent = totalSum.toFixed(2) + "$";
                
    });
});

/////////////////////////// Cambios boton enviar (Modificado por chris) ////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const botonEn = document.getElementById("enviar-t");
    if (botonEn) {
        botonEn.addEventListener("click", () => {
            const productosGuardador = []; 
            const productosName = document.querySelectorAll(".name");
            const productosPrice = document.querySelectorAll(".price");
            productosName.forEach((nameElement, index) => {
                const name = nameElement.textContent;
                const price = parseFloat(productosPrice[index].textContent.replace("$", "").trim()); 
                productosGuardador.push({
                    name: name,
                    price: price
                });
            });
            const mesa = 1; /* Mas adelante tenemos que crear aqui la funcion para que ese numero 1 cambie al numero de
         la mesa que realizo la orden */
         const comanda = {
            mesa: mesa,
            pedido: productosGuardador,
            total: totalSum
        };

        //ENVIAR LA COMANDA AL SERVIDOR
        fetch('http://localhost:3500/api/comandas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comanda)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Comanda guardada:", data);
             // Limpiar el carrito y restablecer el total
             productOrde.innerHTML = ""; // Limpia el contenido del carrito
             totalSum = 0; // Restablece el total a cero
             TOTAL.textContent = totalSum.toFixed(2) + "$"; // Actualiza la visualización del total
             alert("¡Comanda enviada exitosamente! Puedes seguir agregando productos.");
        })
        .catch(error => {
            console.error("Error al guardar la comanda:", error);
        });
    });
}
});


////////////////// Terminan cambios de christian /////////////////////////////


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


// Función para cambiar el margen superior del sidebar según el scroll

function cambiarClaseSidebarScroll() {
    const scrollY = window.scrollY;
    let newMarginTop;

    // Solo ajustar el margin-top si scrollY es menor a 90
    if (scrollY < 90) {
        newMarginTop = 40 - (scrollY / 4); // Ajustar este factor de división para controlar la velocidad
    } else {
        newMarginTop = 16; // Fijar el margin-top en 48% cuando scrollY es mayor a 90
    }

    // Aplicar el nuevo margen superior al sidebar
    sidebar.style.marginTop = newMarginTop + '%';
}

// Llamar a ambas funciones cuando se haga scroll
window.addEventListener('scroll', function() {
    cambiarClasePorScroll();
    cambiarClaseSidebarScroll();
});