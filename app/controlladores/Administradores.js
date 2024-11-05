export const getAdministradores = (req,res) =>{
    const placeholder = [
        {
            id_admin:1,
            nombre:"Juan",
            apellido:"Hernandez",
            correo:"juan@gmail.com",
            
        },
        {
            id_admin:2,
            nombre:"Pedro",
            apellido:"Ortega",
            correo:"@gmail.com",
        },
        {
            id_admin:3,
            nombre:"Felipe",
            apellido:"Molina",
            correo:"@gmail.com",
        }
    ];
    res.json(placeholder);
}

export const postAdministradores = (req,res) =>{
    try{
        const { id_admin,nombre,apellido,correo} = req.body; 
        console.log(id_admin,nombre,apellido,correo);
        res.status(200).json({message:"Aministrador guardado"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar al administrador"});
    }
}