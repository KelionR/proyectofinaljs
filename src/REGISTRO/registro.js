import { postUsers } from "../../servicios/POSTusuarios";
// import { getUsers } from "../../../servicios/GETusuarios.js"; 

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

    // Limpia los campos del formulario
    document.getElementById('nombre').value = "";
    document.getElementById('email').value = "";
    document.getElementById('password').value = "";


    

    // setTimeout(() => {
    //     window.Location.href = "Server running at http://localhost:1234/login.js"; 
    // }, 1000); 

});
