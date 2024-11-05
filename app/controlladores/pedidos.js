let Pedidos = [
        {
            id_pedido:1,
            cantidad:4,
            total:120,
            fecha:"05/11/2024 - 10:40am",
            id_producto:1,
            id_mesa:1,
            
        },
        {
            id_pedido:2,
            cantidad:3,
            total:300,
            fecha:"05/11/2024 - 10:40am",
            id_producto:3,
            id_mesa:1,
        },
        {
            id_pedido:3,
            cantidad:2,
            total:280,
            fecha:"05/11/2024 - 10:40am",
            id_producto:4,
            id_mesa:2,
        }
    ];

    export const getPedidos = (req,res) =>{
        res.json(Pedidos);
    }

export const postPedidos = (req,res) =>{
    try{
        const {cantidad,total,id_producto,id_mesa} = req.body;
        const id = Pedidos.length + 1;
        const fecha = new Date()
        const newPedido = {id,fecha,...req.body};
        Pedidos.push(newPedido)
        res.status(200).json({message:"Pedido registrado"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar el pedido"});
    }
}