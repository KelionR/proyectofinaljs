// main.js
import { postUsers } from "../../servicios/POSTusuarios";
import { getUsers } from "../../SERVICIOS/GETusuarios";

document.getElementById('registroForm').addEventListener('click', async function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const messageElement = document.getElementById('message'); 

    // Verifica si todos los campos están llenos
    if (nombre === '' || email === '' || password === '') {
        messageElement.textContent = 'Por favor, complete todos los campos.';
        messageElement.style.color = 'red'; 
        return; // Sale de la función si hay campos vacíos
    }

    try {
        // Verifica si el email ya está registrado
        let users = await getUsers() || []; 
        if (users.find(user => user.email === email)) {
            // Si el email ya existe, muestra un mensaje de error
            messageElement.textContent = 'El email ya está registrado.';
            messageElement.style.color = 'red'; 
            return;
        }

        // Enviar datos del formulario
        await postUsers({ nombre, email, password });

        // Maneja la lista de usuarios aquí si es necesario
        console.log(users); 

        // Mensaje de éxito
        messageElement.textContent = 'Datos enviados exitosamente.';
        messageElement.style.color = 'green'; 

        // Redirige a otra página después del registro exitoso
        setTimeout(() => {
            window.location.href = "http://localhost:1234/login.html"; 
        }, 1000); // Espera 1 segundo antes de redirigir

    } catch (error) {
        console.error('Error al enviar los datos:', error);
        messageElement.textContent = 'Ocurrió un error al enviar los datos.';
        messageElement.style.color = 'red'; 
    }

    // Limpia los campos del formulario
    document.getElementById('nombre').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";
});
