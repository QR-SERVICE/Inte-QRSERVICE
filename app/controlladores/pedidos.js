export const getPedidos = (req,res) =>{
    const placeholder = [
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
    res.json(placeholder);
}

export const postPedidos = (req,res) =>{
    try{
        const {id_pedido,cantidad,total,fecha,id_producto,id_mesa} = req.body; 
        console.log(id_pedido,cantidad,total,fecha,id_producto,id_mesa);
        res.status(200).json({message:"Pedido registrado"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar el pedido"});
    }
}