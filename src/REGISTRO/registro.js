import { postUsers } from "../../servicios/POSTusuarios";
import { getUsers } from "../../SERVICIOS/GETusuarios";

document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const messageElement = document.getElementById('message'); 

    // Función para mostrar mensajes
    function showMessage(message, color) {
        messageElement.textContent = message;
        messageElement.style.color = color;
    }

    // Verifica si todos los campos están llenos
    if (!nombre || !email || !password) {
        showMessage('Por favor, complete todos los campos.', 'red');
        return;
    }

    // Verifica el formato del email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        showMessage('El email no tiene un formato válido.', 'red');
        return;
    }

    try {
        // Verifica si el email ya está registrado
        const users = await getUsers(); 
        if (users.some(user => user.email === email)) {
            showMessage('El email ya está registrado.', 'red');
            return;
        }

        // Enviar datos del formulario
        await postUsers({ nombre, email, password });

        // Mensaje de éxito
        showMessage('Datos enviados exitosamente.', 'green');

        // Redirige a otra página después del registro exitoso
        setTimeout(() => {
            window.location.href = "http://localhost:1234/login.html"; 
        }, 1000); 

    } catch (error) {
        console.error('Error al enviar los datos:', error);
        showMessage('Ocurrió un error al enviar los datos.', 'red');
    } finally {
        // Limpia los campos del formulario
        document.getElementById('nombre').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
    }
});
