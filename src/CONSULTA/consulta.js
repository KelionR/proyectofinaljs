document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultaForm');
    const consultaQueue = document.getElementById('consultaQueue');
    const apiUrl = 'http://localhost:3001/consultas';

    // Cargar las consultas desde el servidor al iniciar
    loadConsultas();

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío predeterminado del formulario

        // Obtén los datos del formulario
        const id = document.getElementById('editar').value;
        const nombre = document.getElementById('nombre').value;
        const consulta = document.getElementById('consulta').value;
        const detalle = document.getElementById('detalle').value;
        const tipo = document.getElementById('tipo').value;
        const fecha = document.getElementById('fecha').value;
        const hora = new Date().toLocaleTimeString(); // Obtiene la hora actual

        const ticket = {
            nombre,
            consulta,
            detalle,
            tipo,
            fecha,
            hora
        };

        if (id) {
            // Actualiza el tiquete existente
            updateTicket(id, ticket);
        } else {
            // Guarda un nuevo tiquete
            createTicket(ticket);
        }

        // Limpiar el formulario
        form.reset();
        document.getElementById('editar').value = '';
    });

    // Función para crear un nuevo tiquete en el servidor
    function createTicket(ticket) {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })
        .then(response => response.json())
        .then(newTicket => {
            // Añadir el nuevo tiquete a la cola de consultas
            addTicketToQueue(newTicket);
        })
        .catch(error => console.error('Error al crear el tiquete:', error));
    }

    // Función para cargar las consultas desde el servidor
    function loadConsultas() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(tickets => {
                consultaQueue.innerHTML = ''; // Limpiar la cola antes de recargar
                
                tickets.forEach(ticket => {
                    addTicketToQueue(ticket);
                });
            })
            .catch(error => console.error('Error al cargar las consultas:', error));
    }

    // Función para añadir un tiquete a la cola de consultas
    function addTicketToQueue(ticket) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div>
                <strong>Nombre:</strong> ${ticket.nombre}<br>
                <strong>Consulta:</strong> ${ticket.consulta}<br>
                <strong>Detalle:</strong> ${ticket.detalle}<br>
                <strong>Tipo:</strong> ${ticket.tipo}<br>
                <strong>Fecha:</strong> ${ticket.fecha}<br>
                <strong>Hora:</strong> ${ticket.hora}
            </div>
            <div class="actions">
                <button onclick="editTicket(${ticket.id})">Editar</button>
                <button onclick="deleteTicket(${ticket.id})">Eliminar</button>
            </div>
        `;
        consultaQueue.appendChild(listItem);
    }

    // Función para eliminar un tiquete en el servidor
    window.deleteTicket = function(id) {
        fetch(`${apiUrl}/${id}`, {
            method: 'delete'
        })
        .then(() => loadConsultas())
        .catch(error => console.error('Error al eliminar el tiquete:', error));
    };

    // Función para editar un tiquete
    window.editTicket = function(id) {
        fetch(`${apiUrl}/${id}`)
            .then(response => response.json())
            .then(ticketToEdit => {
                if (ticketToEdit) {
                    // Rellena el formulario con los datos del tiquete
                    document.getElementById('editar').value = ticketToEdit.id;
                    document.getElementById('nombre').value = ticketToEdit.nombre;
                    document.getElementById('consulta').value = ticketToEdit.consulta;
                    document.getElementById('detalle').value = ticketToEdit.detalle;
                    document.getElementById('tipo').value = ticketToEdit.tipo;
                    document.getElementById('fecha').value = ticketToEdit.fecha;
                }
            })
            .catch(error => console.error('Error al editar el tiquete:', error));
    };

    // Función para actualizar un tiquete en el servidor
    function updateTicket(id, ticket) {
        fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticket)
        })
        .then(() => loadConsultas())
        .catch(error => console.error('Error al actualizar el tiquete:', error));
    }
});