fetch("/BebidasP")
    .then(response => response.json())
    .then(data => {
        const bebidas = document.getElementById('Drinks');

        // Crear el título
        const h1 = document.createElement('h1');
        h1.textContent = 'BEBIDAS';
        h1.classList.add('ProductH1');
        bebidas.appendChild(h1);

        // Crear la tabla
        const table = document.createElement('table');
        table.classList.add('productTable');

        // Crear la cabecera de la tabla
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

        // Crear el cuerpo de la tabla
        const tbody = document.createElement('tbody');
        data.forEach(drinks => {
            const row = document.createElement('tr');
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = drinks.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${drinks.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = drinks.stock;
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
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = food.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${food.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = food.stock;
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

        // Crear la tabla
        const table = document.createElement('table');
        table.classList.add('productTable');

        // Crear la cabecera de la tabla
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

        // Crear el cuerpo de la tabla
        const tbody = document.createElement('tbody');
        data.forEach(dessert => {
            const row = document.createElement('tr');
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = dessert.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${dessert.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = dessert.stock;
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

        // Crear el título
        const h1 = document.createElement('h1');
        h1.textContent = 'ENTRADAS';
        h1.classList.add('ProductH1');
        ticketsContainer.appendChild(h1);

        // Crear la tabla
        const table = document.createElement('table');
        table.classList.add('productTable');

        // Crear la cabecera de la tabla
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
            
            const nombreCell = document.createElement('td');
            nombreCell.textContent = ticket.nombre_producto;
            row.appendChild(nombreCell);

            const precioCell = document.createElement('td');
            precioCell.textContent = `$${ticket.precio_producto}`;
            row.appendChild(precioCell);

            const stockCell = document.createElement('td');
            stockCell.textContent = ticket.stock;
            row.appendChild(stockCell);

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        ticketsContainer.appendChild(table);
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
    });