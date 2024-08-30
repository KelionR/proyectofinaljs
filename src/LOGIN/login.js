import { getUsers } from "../../SERVICIOS/GETusuarios";

let enviarBoton = document.getElementById('enviarBTN');

enviarBoton.addEventListener('click', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const messageElement = document.getElementById('message');

    try {
        // Verifica las credenciales del usuario
        // Verifica si todos los campos están llenos
        if (!email.value || !email.value) {
            messageElement.textContent = 'Por favor, complete todos los campos.';
            messageElement.classList.add('error-message');
            return; // Sale de la función si hay campos vacíos
        }else{
            let users = await getUsers();

            const user = users.find(user => user.email === email.value);

            if (user) {
                if (user.password === password.value) {
                    // Mensaje de éxito
                    messageElement.textContent = 'Inicio de sesión exitoso.';
                    messageElement.classList.add('success-message');

                    // Redirige a la página principal o al dashboard después del inicio de sesión exitoso
                    setTimeout(() => {
                        window.location.href = "http://localhost:1234/consulta.html";
                    }, 1000); // Espera 1 segundo antes de redirigir

                    // Limpia los campos del formulario solo si la autenticación es exitosa
                    document.getElementById('email').value = "";
                    document.getElementById('password').value = "";
                } else {
                    messageElement.textContent = 'Contraseña incorrectos.';
                    messageElement.classList.add('error-message');
                } 
            } else {
                // Si el usuario no se encuentra, muestra un mensaje de error
                messageElement.textContent = 'Email incorrecto.';
                messageElement.classList.add('error-message');
            }
        }
    } catch (error) {
        console.error('Error al intentar acceder al login:', error);
        messageElement.textContent = 'Ocurrió un error al intentar acceder al login.';
        messageElement.classList.add('error-message');
    }
});
