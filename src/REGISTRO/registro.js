    import { postUsers } from "../../../SERVICIOS/POSTusuarios";
    import { getUsers } from "../../../SERVICIOS/GETusuarios"; 

    document.getElementById('registroForm').addEventListener('submit', async function(event) {
        event.preventDefault(); 



        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        const btnRegistro = document.getElementById('Boton')

        const messageElement = document.getElementById('message'); 

        // Verifica si todos los campos están llenos
        if (nombre === '' || email === '' || password === '') {
            messageElement.textContent = 'Por favor, complete todos los campos.';
            messageElement.style.color = 'red'; 
            return;
        }

        try {
            await postUsers({ nombre, email, password });
            
            // Obtiene la lista de usuarios guardados o crea una lista vacía si no hay usuarios guardados
            let users = await getUsers() || [];

            // Puedes manejar la lista de usuarios aquí si es necesario
            console.log(users); 
        } catch (error) {
            messageElement.textContent = 'Ocurrió un error al enviar los datos.';
            messageElement.style.color = 'red'; 
            console.error('Error al enviar los datos:', error);
        }
    });
