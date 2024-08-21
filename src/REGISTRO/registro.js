document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 

        const formData = new FormData(form);
        const data = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
  
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();

            
            document.getElementById('message').textContent = 'Usuario registrado con éxito';
            form.reset();

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('message').textContent = 'Hubo un problema al registrar el usuario';
        }
    });
});
