// Definir comandasGuardadas como let para poder actualizarlo
let comandasGuardadas = [];

// Seleccionar el elemento de la sección de comandas
const comandasSection = document.getElementById("comandas");


// Cargar las comandas desde la API al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:3500/api/comandas')
        .then(response => response.json())
        .then(data => {
            comandasGuardadas = data;  // Actualizar las comandas con los datos del servidor
            mostrarMesas(); // Mostrar las mesas después de cargar las comandas
        })
        .catch(error => {
            console.error('Error al cargar las comandas:', error);
        });

    mostrarMesas(); // Mostrar las mesas inicialmente (esto también se puede ajustar según la necesidad)
});


// Función para mostrar la lista de mesas
function mostrarMesas() {
    comandasSection.innerHTML = ""; // Limpiar la sección de comandas
    comandasGuardadas.forEach((comanda, index) => {
        const mesaDiv = document.createElement("div");
        mesaDiv.classList.add("mesa");
        mesaDiv.innerHTML = `
    <p><strong>Número de Mesa:</strong> ${comanda.mesa}</p>
    <p><strong>Pedido:</strong> ${comanda.pedido.map(item => `${item.cantidad} x ${item.platillo}`).join(", ")}</p>
    <p><strong>Comentarios:</strong> ${comanda.comentarios}</p>
    <button class="btnAtendida" onclick="marcarComoListo(${index})">Marcar como Atendida</button>
    <button class="btnEliminar" onclick="eliminarComanda(${index})">Eliminar Comanda</button>
`;
        comandasSection.appendChild(mesaDiv);
    });
}

// Función para marcar el pedido como listo //
function marcarComoListo(index) {
    fetch(`http://localhost:3500/api/comandas/${index}`, {
        method: 'DELETE' //OJO AQUI LO ESTOY BORRANDO PARA USOS PRACTICOS
        //LA IDEA ES QUE DESPUES HAGAMOS UN POST A LA PANTALLA DE HISTORIAL
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarMesas(); // Volver a mostrar la lista de mesas
        })
        .catch(error => {
            console.error("Error al eliminar la comanda:", error);
        });
}
// Función para verificar si el usuario llegó al final de la página
function checkScrollPosition() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        document.getElementById('footer').style.display = 'block';
    } else {
        document.getElementById('footer').style.display = 'none';
    }
}

// Ejecutar la función cuando el usuario haga scroll
window.addEventListener('scroll', checkScrollPosition);

// Ejecutar al cargar la página para ocultar el footer inicialmente
window.onload = checkScrollPosition;

// Navbar
fetch('/NavbarConfiguracion')
    .then(response => response.text())
    .then(data => {
        // Insertar el HTML en el contenedor
        document.getElementById('navbar-configuracion').innerHTML = data;
        document.getElementById("titulo").innerHTML = "Comandas Recientes";
    })
    .catch(error => console.error('Error al cargar el navbar:', error));