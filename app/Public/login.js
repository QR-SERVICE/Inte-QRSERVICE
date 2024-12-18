
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
            const response = await fetch('/Entre', {
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
    async function registerUser(nombre_admin, contraseña_admin, correo_admin) {
        try {
            const response = await fetch('/Administradores');
            const data = await response.json();
    
            const usuarioExistente = data.some(admin => admin.correo_admin === correo_admin);
    
            if (usuarioExistente) {
                alert('Usuario ya registrado');
                return; 
            }
    
            const registroResponse = await fetch('/Registrarse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_admin, contraseña_admin, correo_admin }),
            });
    
            const responseData = await registroResponse.json();
    
            if (registroResponse.ok) {
                alert('Registro de usuario correcto');
            } else {
                console.error('Problemas al registrar el usuario:', responseData);
                alert('Problemas al registrar el usuario');
            }
        } catch (error) {
            console.error('Error en el proceso:', error);
            alert('Hubo un problema al registrar el usuario');
        }
    }
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



