fetch('/Orden' )
.then(response => response.json())
.then(data => {

  

    const seccionComandas = document.getElementById(`comandas`);
    data.forEach(orden => {
        const div = document.createElement('div');
        div.classList.add('divOrder');
        div.style.height = '100px';

        const name = document.createElement('p');
        name.classList.add('ordenName');
        name.textContent = orden.nombre_orden;

        const nameM = document.createElement('p');
        nameM.classList.add('nameM');
        nameM.textContent = orden.MesaName;
        nameM.style.fontSize = '30px';

                const fecha = document.createElement('p');
        fecha.classList.add('ordenDate'); // Agregar clase para estilos

        // Obtener la fecha original de la orden
        const rawFecha = orden.fecha_orden;

        // Función para formatear la fecha
        function formatearFecha(fechaRaw) {
            const opciones = {
                weekday: "long",   // Día de la semana
                year: "numeric",   // Año completo
                month: "long",     // Nombre completo del mes
                day: "numeric",    // Día del mes
                hour: "numeric",   // Hora (12 horas con AM/PM)
                minute: "2-digit", // Minutos con 2 dígitos
            };

            // Crear un objeto Date usando el timestamp de MySQL
            const fecha = new Date(fechaRaw);

            // Retornar la fecha formateada en español
            return fecha.toLocaleDateString("es-ES", opciones);
        }

        // Formatear la fecha y asignarla al elemento
        fecha.textContent = formatearFecha(rawFecha);

        const comentario = document.createElement('p');
        comentario.classList.add('ordenComent');
        comentario.textContent = orden.coment;

        const total = document.createElement('p');
        total.classList.add('ordenTotal');
        total.textContent = orden.total;
         
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        const i = document.createElement('i');
        i.className = 'bi bi-trash';
        deleteButton.appendChild(i);

        fetch(`/Detalles/${orden.id_orden}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(response => response.json())
            .then(detalles => {
              detalles.forEach(detalle => {
                const productoDiv = document.createElement('div');
                productoDiv.classList.add('productoDetalle');
    
                const productoNombre = document.createElement('p');
                productoNombre.textContent = `${detalle.nombre_producto}`;
    
                const productoCantidad = document.createElement('p');
                productoCantidad.textContent = `Cantidad: ${detalle.cantidad}`;
    
                productoDiv.appendChild(productoNombre);
                productoDiv.appendChild(productoCantidad);
                div.appendChild(productoDiv);
              });
            })
            .catch(error => {
              console.error(`Error al cargar los detalles de la orden ${orden.id_orden}:`, error);
            });

            div.appendChild(deleteButton);
            div.appendChild(nameM);
            div.appendChild(name);
            div.appendChild(fecha);
            div.appendChild(comentario);
            div.appendChild(total);
            seccionComandas.appendChild(div);

            deleteButton.addEventListener('click', async () => {

                const id_orden = orden.id_orden;
              
                try {
                  const response = await fetch(`/TerminarOrden/${id_orden}`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              
                  const responseData = await response.json();
                  console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
                  
                  if (response.ok) {
                    alert('Orden eliminada correctamente');
                    div.remove();
                  } else {
                    alert('Problemas al eliminar la orden');
                  }
                } catch (e) {
                  console.error('Error en el catch:', e);
                  alert('orden eliminada correctamente');
                }
              });
    })

})