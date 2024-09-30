const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
})

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})


const langButtons = document.querySelectorAll("[data-language]");
langButtons.forEach((button) =>{
    button.addEventListener("click", () =>{
        const texttochange = document.querySelectorAll("[data-seccion]");
        console.log(texttochange);
        fetch(`../languages/${button.dataset.language}.json`)
        .then(res => res.json())
        .then(data => {
            texttochange.forEach((el) => {
                const seccion = el.dataset.seccion;
                const valor = el.dataset.valor;

                el.textContent = data[seccion][valor];
                
            })
        })
    })
})

const opcionButtons = document.querySelectorAll("[data-opcion]");
opcionButtons.forEach((button) => {
            button.addEventListener("click", () =>{
                const textTochange = document.querySelectorAll("[data-section]");
                console.log(textTochange);
                 fetch(`../Productos.js/${button.dataset.opcion}.json`)
                .then(res => res.json())
                .then(data =>{
                textTochange.forEach((op)=>{
                    const section = op.dataset.section;
                    const value = op.dataset.value;

                    op.textContent= data[section][value];
                    
            })
        })                 
    })
})


