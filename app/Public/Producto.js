const Imagen_agregar = document.getElementById("img-agreg")
const Texto_agregar = document.getElementById("texto_producto");
const Boton_agregar = document.getElementById("agreg_pro");
const Producto = document.getElementById("Aqui-pro");

Boton_agregar.addEventListener("click", () =>{
    /*Evaluamos el texto antes de agregar*/
    const Txt = Texto_agregar.value;

    /*Creamos la constante en donde el texto se guardara*/
    const agreg_txt= document.createTextNode(Txt);
    /*Se crea la constante en donde se crea la imagen*/
    const agreg_img = document.createElement('img');
    agreg_img.src = URL.createObjectURL(Imagen_agregar.files[0]); // Previsualizar la imagen seleccionada

    /*Se crea boton borrar, el cual borra el producto*/
    const boton_borrar = document.createElement("button");
    /*Se le da el nombre al boton*/
    boton_borrar.textContent = "Borrar";
    boton_borrar.classList.add("Boton-delete")

    /*Se crea un contenedor, para guardar los productos*/
    const Men_pro = document.createElement("div");
    Men_pro.classList.add("Productos_agreg");

    /*Se crea un p, en donde se guarda el texto*/
    const Texto = document.createElement("p");
    Texto.textContent = Texto_agregar.value;

    /*Se crea un boton el cual sirve para editar texto*/
    const Edit_text = document.createElement("button");
    Edit_text.textContent = "Editar-text";
    Edit_text.classList.add("Boton-delete")

    Edit_text.addEventListener("click", () =>{
        if(Texto.contentEditable === "true"){
            Texto.contentEditable = "false";
            Edit_text.textContent = "Edit";
        }else{
            Texto.contentEditable = "true";
            Edit_text.textContent = "Edit";
        }
    });

    boton_borrar.addEventListener("click", () =>{
        agreg_img.remove();
        agreg_txt.remove();
        boton_borrar.remove();
        Men_pro.remove();
    });

    /*Se agregan los prodcutos, al div, el cual va tener todos los productos*/
    Men_pro.appendChild(boton_borrar);
    Men_pro.appendChild(Texto);
    Men_pro.appendChild(agreg_img);
    Men_pro.appendChild(Edit_text);
    Producto.appendChild(Men_pro);

});