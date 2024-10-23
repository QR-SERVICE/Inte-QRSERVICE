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
        fetch(`../Menu/languages/${button.dataset.language}.json`)
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


document.addEventListener("DOMContentLoaded", () => {
    const botonEn = document.getElementById("enviar-t");
    if (botonEn) {
        botonEn.addEventListener("click", () => {
            const productosguardador = []; 
            const productosName = document.querySelectorAll(".name");
            const productosPrice = document.querySelectorAll(".price");
            productosName.forEach((nameElement, index) => {
                const name = nameElement.textContent;
                const price = productosPrice[index].textContent.replace("$", "").trim();
                productosguardador.push({
                    name: name,
                    price: price
                });
            });
            const total = document.getElementById("TOTAL").textContent;
            localStorage.setItem("total", total);
            localStorage.setItem("lst", JSON.stringify(productosguardador));
            console.log("Lista de productos guardada:", JSON.parse(localStorage.getItem("lst")));
            console.log("Total guardado:", localStorage.getItem("total"));
        });
    } else {
        console.error("Error al guardar los datos");
    }
});