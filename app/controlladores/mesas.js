    let Mesas = [
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
    
export const getMesas = (req,res) =>{
    res.json(Mesas);
}

export const postMesa = (req,res) =>{
    try{
        const {nombre} = req.body; 
        const id = Mesas.length + 1;
        const newMesa = {id,...req.body}
        Mesas.push(newMesa);
        res.status(200).json({message:"Mesa Guardada"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar la mesa"});
    }
}