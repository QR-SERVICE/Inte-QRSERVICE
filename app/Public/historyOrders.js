fetch('/Historial_ordenes')
  .then(response => response.json()) 
  .then(data => {
    const OrderDIV = document.getElementById('finishedOrders');

    data.forEach(OrdersEnd => {
      const div = document.createElement('div');
      div.classList.add('OrderClass');

      const name = document.createElement('H1');
      name.textContent = OrdersEnd.nombre_orden;
      name.classList.add('nameOrder');

      const nameM = document.createElement('H1');
      nameM.textContent = OrdersEnd.MesaName;
      nameM.classList.add('nameOrder');

      const fecha = document.createElement('p');
      fecha.classList.add('dateOrderFinished'); 
      const rawFecha = OrdersEnd.fecha_orden;
      function formatearFecha(fechaRaw) {
          const opciones = {
              weekday: "long",   
              year: "numeric",   
              month: "long",     
              day: "numeric",    
              hour: "numeric",   
              minute: "2-digit", 
          };
          const fecha = new Date(fechaRaw);
          return fecha.toLocaleDateString("es-ES", opciones);
      }
      fecha.textContent = formatearFecha(rawFecha);

      const total = document.createElement('p');
      total.textContent = OrdersEnd.total;
      total.classList.add('priceOrder');

      const orderComent = document.createElement('p');
      orderComent.textContent = `Comentario: ${OrdersEnd.coment}`;
    
      div.appendChild(nameM);
      div.appendChild(name);
      div.appendChild(fecha);
      div.appendChild(total);
      div.appendChild(orderComent);

      // Realizar la segunda llamada para obtener los detalles de cada orden específica
      fetch(`/Detalles/${OrdersEnd.id_orden}`, {
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
            productoNombre.textContent = `Producto: ${detalle.nombre_producto}`;

            const productoCantidad = document.createElement('p');
            productoCantidad.textContent = `Cantidad: ${detalle.cantidad}`;

            const productoPrecio = document.createElement('p');
            productoPrecio.textContent = `Precio: ${detalle.precio_producto}`;

            const productoTotal = document.createElement('p');
            productoTotal.textContent = `Total: ${detalle.total}`;

            productoDiv.appendChild(productoNombre);
            productoDiv.appendChild(productoCantidad);
            productoDiv.appendChild(productoPrecio);
            productoDiv.appendChild(productoTotal);
            div.appendChild(productoDiv);
          });
        })
        .catch(error => {
          console.error(`Error al cargar los detalles de la orden ${OrdersEnd.id_orden}:`, error);
        });

      OrderDIV.appendChild(div);
    });
  })
  .catch(error => {
    console.error('Error al cargar las órdenes:', error);
  });


