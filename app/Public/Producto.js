fetch("/BebidasP")
    .then(response => response.json())
    .then(data => {
        const bebidas = document.getElementById('Drinks');

        // Crear el título
        const h1 = document.createElement('h1');
        h1.textContent = 'BEBIDAS';
        h1.classList.add('ProductH1');
        bebidas.appendChild(h1);

        const table = document.createElement('table');
        table.classList.add('productTable');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Nombre', 'Precio', 'Stock'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(drinks => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = "Eliminar";
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = drinks.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${drinks.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = drinks.stock;
            stockCell.appendChild(deleteButton)
            stockCell.classList.add('productStock');

            deleteButton.addEventListener('click', async () => {
                const producDelete = drinks.id_producto;
              
                try {
                  const response = await fetch(`http://localhost:3500/EliminarProducto/${producDelete}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  });
              
                  const responseData = await response.json();
                  console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
                  
                  if (response.ok) {
                    row.remove(); 
                    alert('Producto eliminado correctamente');
                  } else {
                    alert('Problemas al eliminar el producto');
                  }
                } catch (e) {
                  console.error('Error en el catch:', e);
                  alert('Problemas al eliminar el producto');
                }
              });

            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        bebidas.appendChild(table);
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });



    fetch("/PlatillosP")
    .then(response => response.json())
    .then(data => {
        const foodContainer = document.getElementById('Food');

        // Crear el título
        const h1 = document.createElement('h1');
        h1.textContent = 'PLATILLOS';
        h1.classList.add('ProductH1');
        foodContainer.appendChild(h1);

        const table = document.createElement('table');
        table.classList.add('productTable');


        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Nombre', 'Precio', 'Stock'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(food => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = "Eliminar";
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = food.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${food.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = food.stock;
            stockCell.appendChild(deleteButton)
            stockCell.classList.add('productStock');
            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        foodContainer.appendChild(table);
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });



        fetch("/PostresP")
    .then(response => response.json())
    .then(data => {
        const dessertsContainer = document.getElementById('Desserts');

        const h1 = document.createElement('h1');
        h1.textContent = 'POSTRES';
        h1.classList.add('ProductH1');
        dessertsContainer.appendChild(h1);

        const table = document.createElement('table');
        table.classList.add('productTable');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Nombre', 'Precio', 'Stock'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(dessert => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = "Eliminar";
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = dessert.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${dessert.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = dessert.stock;
            stockCell.appendChild(deleteButton)
            stockCell.classList.add('productStock');
            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        dessertsContainer.appendChild(table);
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });



    fetch("/EntradasP")
    .then(response => response.json())
    .then(data => {
        const ticketsContainer = document.getElementById('Tickets');

        const h1 = document.createElement('h1');
        h1.textContent = 'ENTRADAS';
        h1.classList.add('ProductH1');
        ticketsContainer.appendChild(h1);

        const table = document.createElement('table');
        table.classList.add('productTable');

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Nombre', 'Precio', 'Stock'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        data.forEach(ticket => {
            const row = document.createElement('tr');
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton');
            deleteButton.textContent = "Eliminar";
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = ticket.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${ticket.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = ticket.stock;
            stockCell.appendChild(deleteButton)
            stockCell.classList.add('productStock');
            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        ticketsContainer.appendChild(table);
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });

    // Boton para abrir la sidebar
    const menu = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    menu.addEventListener('click', () => {
        sidebar.classList.toggle('menu-toggle');
    })