export const getMesas = (req,res) =>{
    const placeholder = [
        {
            id_mesa:1,
            nombre:"Mesa 1",
        },
        {
            id_mesa:2,
            nombre:"Mesa 2",
        },
        {
            id_mesa:3,
            nombre:"Mesa 3",
        }
    ];
    res.json(placeholder);
}

export const postMesa = (req,res) =>{
    try{
        const { id_mesa,nombre} = req.body; 
        console.log(id_mesa,nombre);
        res.status(200).json({message:"Mesa Guardada"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar la mesa"});
    }
}