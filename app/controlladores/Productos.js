export const getProducto = (req,res) =>{
    const placeholder = [
        {
            id_producto:1,
            nombre:"Limonada Natural",
            precio:30,
            stock:100,
            categoria:"Bebidas",
            descripcion:"Agua de limon",
            img:"limonada.jpg"
        },
        {
            id_producto:2,
            nombre:"Limonada Mineral",
            precio:40,
            stock:100,
            categoria:"Bebidas",
            descripcion:"Agua gasificada de limon",
            img:"limonadaM.jpg"
        },
        {
            id_producto:3,
            nombre:"Pizza pepperoni",
            precio:100,
            stock:20,
            categoria:"Platillo",
            descripcion:"Pizza artesanal italiana ",
            img:"pizza.jpg"
        },
        {
            id_producto:4,
            nombre:"Trufa de chocolate",
            precio:140,
            stock:20,
            categoria:"Postre",
            descripcion:"Pastel de chocolate con pedazos de trufa",
            img:"trufa.jpg"
        },
        {
            id_producto:5,
            nombre:"Aceitunas",
            precio:70,
            stock:120,
            categoria:"Entradas",
            descripcion:"Aceitunas bañadas en salsas",
            img:"aceitunas.jpg"
        }
    ];
    res.json(placeholder);
}

export const postProducto = (req,res) =>{
    try{
        const { id_producto,nombre,precio,stock,categoria,descripcion,img} = req.body; 
        console.log(id_producto,nombre,precio,stock,categoria,descripcion,img);
        res.status(200).json({message:"Producto guardado"})
    }catch(e){
        console.log(e);
        res.status(500).json({Message: "Error al guardar el producto"});
    }
}