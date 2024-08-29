import { getUsers } from "../../SERVICIOS/GETusuarios";


document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const messageElement = document.getElementById('message'); 

    // Verifica si todos los campos están llenos
    if (email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red'; 
        return; // Sale de la función si hay campos vacíos
    }

    try {
        // Verifica las credenciales del usuario
        let users = await getUsers() || []; 
        const user = users.find(user => user.email === email && user.password === password);

        if (!user) {
            // Si el usuario no se encuentra, muestra un mensaje de error
            messageElement.textContent = 'Email o contraseña incorrectos.';
            messageElement.style.color = 'red'; 
            return;
        }

        // Mensaje de éxito
        messageElement.textContent = 'Inicio de sesión exitoso.';
        messageElement.style.color = 'green'; 

        // Redirige a la página principal o al dashboard después del inicio de sesión exitoso
        setTimeout(() => {
            window.location.href = ""; 
        }, 1000); // Espera 1 segundo antes de redirigir

    } catch (error) {
        console.error('Error al verificar las credenciales:', error);
        messageElement.textContent = 'Ocurrió un error al verificar las credenciales.';
        messageElement.style.color = 'red'; 
    }

    // Limpia los campos del formulario
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
});

// Funciones simuladas para obtener y enviar datos de usuarios
async function getUsers() {
    // Aquí deberías hacer una solicitud a tu servidor para obtener los usuarios registrados
    // Este código es solo un ejemplo
    return fetch('/api/users')
        .then(response => response.json())
        .catch(error => console.error('Error al obtener usuarios:', error));
}