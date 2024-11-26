const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector('.sign-in button');
    const registerButton = document.querySelector('.sign-up button');
    // const forgotPasswordLink = document.querySelector('#forgot-password'); // Enlace de "Olvidaste tu contraseña?"

    // Función de validación de credenciales
    async function validateLogin(contraseña_admin,correo_admin) {
        try {
            const response = await fetch('http://localhost:3500/Entre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({contraseña_admin,correo_admin})
            });
      
            const responseData = await response.json();
            console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
      
            console.log('Estado de respuesta:', response.status);
            console.log('Respuesta completa:', response);
      
            if (response.ok) {
                alert('Inicio de sesion exitoso');
                return true;
                
            } else {
                return false;
            }
        } catch (e) {
            console.error('Error en el catch:', e);
            alert('Problemas al iniciar sesion');
            return false;
        };
    };

     // // Al hacer clic en el botón de iniciar sesión
     loginButton.addEventListener('click', async function (e) {
        e.preventDefault(); // Previene que se recargue la página

        const email = document.querySelector('.sign-in input[type="email"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        const loginSuccess = await validateLogin(password, email);

        if (loginSuccess) {
            // Redirigir a la página principal
            window.location.href = "/comandas";
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    });

    // Función para registrar un nuevo usuario
    async function registerUser(nombre_admin, contraseña_admin,correo_admin) {
        try {
            const response = await fetch('http://localhost:3500/Registrarse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({nombre_admin,contraseña_admin,correo_admin })
            });
      
            const responseData = await response.json();
            console.log('Mensaje del servidor:', responseData.message || 'Sin mensaje de error');
      
            console.log('Estado de respuesta:', response.status);
            console.log('Respuesta completa:', response);
      
            if (response.ok) {
                alert(`Registro de usuario correcto`);
            } else {
                alert('Problemas al registrar al usuario');
            }
        } catch (e) {
            console.error('Error en el catch:', e);
            alert('Problemas al registrar el usuario');
        }

        // Obtener los usuarios registrados desde localStorage
        // let users = JSON.parse(localStorage.getItem("users")) || [];

        // // Verificar si el usuario ya existe
        // const userExists = users.some(user => user.email === email);

        // if (userExists) {
        //     alert("El usuario con este correo ya está registrado.");
        // } else {
        //     // Agregar el nuevo usuario a la lista
        //     users.push({ email, password });

        //     // Guardar la lista actualizada en localStorage
        //     localStorage.setItem("users", JSON.stringify(users));

        //     alert(`Usuario registrado con éxito.\nCorreo: ${email}\nContraseña: ${password}`);
        // }
    }

    // Función para recordar contraseña
    // function rememberPassword(email) {
    //     // Obtener los usuarios registrados desde localStorage
    //     const users = JSON.parse(localStorage.getItem("users")) || [];

    //     // Buscar al usuario por su email
    //     const user = users.find(user => user.email === email);

    //     if (user) {
    //         alert(`Tu contraseña es: ${user.password}`);
    //     } else {
    //         alert("El correo no está registrado.");
    //     }
    // }

    // Al hacer clic en el botón de registrar
    registerButton.addEventListener('click', function (e) {
        e.preventDefault(); // Previene que se recargue la página

        
        const name = document.querySelector('.sign-up input[type="text"]').value;
        const gmail = document.querySelector('.sign-up input[type="email"]').value;
        const password = document.querySelector('.sign-up input[type="password"]').value;

        console.log(gmail);

        if (name && password) {
            registerUser(name, password, gmail); // Registrar el nuevo usuario
        } else {
            alert("Por favor completa todos los campos.");
        }
    });

    // Al hacer clic en el enlace de "Olvidaste tu contraseña?"
    // forgotPasswordLink.addEventListener('click', function (e) {
    //     e.preventDefault(); // Previene que se recargue la página

    //     const email = prompt("Ingresa tu correo electrónico para recordar tu contraseña:");
        
    //     if (email) {
    //         rememberPassword(email); // Llama a la función para recordar la contraseña
    //     }
    // });
});


const langButtons = document.querySelectorAll("[data-language]");
langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const texttochange = document.querySelectorAll("[data-section]");
        const traduction = document.querySelectorAll("[placeholder]");
        fetch(`/languages/${button.dataset.language}.json`)
            .then((res) => res.json())
            .then((data) => {
                texttochange.forEach((el) => {
                    const section = el.dataset.section;
                    const value = el.dataset.value;
                    el.innerHTML = data[section][value];
                });
                traduction.forEach((element) => {
                    const section = element.dataset.section;
                    const value = element.dataset.value;
                    
                    element.placeholder = data[section][value]; 
                });
            });
    });
});



