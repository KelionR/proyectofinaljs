import { getUsers } from "../../../SERVICIOS/GETusuarios";
import { postUsers } from "../../../SERVICIOS/POSTusuarios";


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');

    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(form);

        
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        try {
           
            const response = await fetch('http://localhost:3001/users', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }

            const result = await response.json();

            alert('Registro exitoso: ' + result.message);
            form.reset(); 
        } catch (error) {
            
            console.error('Error en el registro:', error);
            alert('Hubo un problema con el registro. Inténtalo de nuevo.');
        }
    });
});
