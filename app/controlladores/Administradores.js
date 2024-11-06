let Administradores = [
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
            correo:"pedro@gmail.com",
        },
        {
            id_admin:3,
            nombre:"Felipe",
            apellido:"Molina",
            correo:"felipe@gmail.com",
        }
    ];

export const getAdministradores = (req,res) =>{
    res.json(Administradores)
};

export const postAdministradores = (req,res) =>{
    try{
        const {nombre,apellido,correo} = req.body;
        const id = Administradores.length + 1; 
        const newAdministrador = {id,...req.body}
        Administradores.push(newAdministrador);
        res.status(200).json({message:"Aministrador guardado"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar al administrador"});
    }
}