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



/* // Función para mostrar la lista de mesas
function mostrarMesas() {
    comandasSection.innerHTML = ""; // Limpiar la sección de comandas
    comandasGuardadas.forEach((comanda, index) => {
        const mesaDiv = document.createElement("div");
        mesaDiv.classList.add("mesa");
        mesaDiv.textContent = `Mesa ${comanda.mesa}`;
        mesaDiv.onclick = () => mostrarDetallesComanda(index);
        comandasSection.appendChild(mesaDiv);
    });
}

// Función para mostrar los detalles de una comanda
function mostrarDetallesComanda(index) {
    const comanda = comandasGuardadas[index];
    const detallesDiv = document.createElement("div");
    detallesDiv.classList.add("detallesComanda");
    detallesDiv.innerHTML = `
        <h3>Detalles del Pedido - Mesa ${comanda.mesa}</h3>
        <ul>
            ${comanda.pedido.map(item => `<li>${item.cantidad} x ${item.platillo}</li>`).join("")}
        </ul>
        <p><strong>Notas del Cliente:</strong> ${comanda.comentarios || "Sin comentarios"}</p>
        <button onclick="marcarComoListo(${index})">Pedido Listo</button>
    `;
    // Limpiar y agregar los detalles
    comandasSection.innerHTML = "";
    comandasSection.appendChild(detallesDiv);
} */

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
