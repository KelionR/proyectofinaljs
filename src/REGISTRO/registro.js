import { postUsers } from "../../servicios/POSTusuarios";
import { getUsers } from "../../SERVICIOS/GETusuarios";

// document.getElementById('registroForm')

let registroEnviar = document.getElementById('submitButton')

registroEnviar.addEventListener('click', async function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const messageElement = document.getElementById('message'); 

    // Función para mostrar mensajes
    function showMessage(message, color) {
        messageElement.textContent = message;
        messageElement.style.color = color;
    }

    try {
        // Verifica si todos los campos están llenos
        if (!nombre.value || !email.value || !password.value) {
            showMessage('Por favor, complete todos los campos.', 'red');
            return;
        }else{
            const users = await getUsers(); 

            let validarEmail = users.some(user => user.email === email.value)

            if (validarEmail) {
                showMessage('El email ya está registrado.', 'red');
                return;
            }else{
                // Enviar datos del formulario
                await postUsers(nombre.value , email.value, password.value);

                // Mensaje de éxito
                showMessage('Datos enviados exitosamente.', 'green');

                // Limpia los campos del formulario
                document.getElementById('nombre').value = "";
                document.getElementById('email').value = "";
                document.getElementById('password').value = "";
                
                // Redirige a otra página después del registro exitoso
                setTimeout(() => {
                    window.location.href = "http://localhost:1234/login.html"; 
                }, 1000); 

            }    
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        showMessage('Ocurrió un error al enviar los datos.', 'red');
    } 
});
