fetch('/Historial_ordenes')
.then(response => response.json()) 
.then(data => {
    const OrderDIV = document.getElementByID('finishedOrders')

    data.array.forEach(OrdersEnd => {
        const div = document.createElement('div');
        const name = document.createElement('p');
        name.textContent = OrdersEnd.nombre_orden;
        name.classList.add('nameOrder');
        const fecha = document.createElement('p');
        fecha.classList.add('dateOrder');
        const total = document.createElement('p');
        total.classList.add('priceOrder');


    });

})
.catch(error => {
    console.error('Error al cargar las ordenes:', error);
});