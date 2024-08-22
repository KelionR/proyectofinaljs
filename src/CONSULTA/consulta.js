document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultaForm');
    const consultaQueue = document.getElementById('consultaQueue');

    // Cargar las consultas desde localStorage al iniciar
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
            id: id ? Number(id) : Date.now(), // Si hay un ID, lo usamos para editar; si no, generamos uno nuevo
            nombre,
            consulta,
            detalle,
            tipo,
            fecha,
            hora
        };

        if (id) {
            // Actualiza el tiquete existente
            updateTicket(ticket);
        } else {
            // Guarda un nuevo tiquete
            saveTicket(ticket);
        }

        // Limpiar el formulario
        form.reset();
        document.getElementById('editar').value = '';
    });

    // Función para guardar un tiquete en localStorage
    function saveTicket(ticket) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.push(ticket);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadConsultas();
    }

    // Función para cargar las consultas desde localStorage
    function loadConsultas() {
        consultaQueue.innerHTML = ''; // Limpiar la cola antes de recargar
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        
        tickets.forEach(ticket => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                Nombre: ${ticket.nombre}, Consulta: ${ticket.consulta}, Detalle: ${ticket.detalle}, Tipo: ${ticket.tipo}, Fecha: ${ticket.fecha}, Hora: ${ticket.hora}
                <div class="actions">
                    <button onclick="editTicket(${ticket.id})">Editar</button>
                    <button onclick="deleteTicket(${ticket.id})">Eliminar</button>
                </div>
            `;
            consultaQueue.appendChild(listItem);
        });
    }

    // Función para eliminar un tiquete
    window.deleteTicket = function(id) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets = tickets.filter(ticket => ticket.id !== id);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadConsultas();
    };

    // Función para editar un tiquete
    window.editTicket = function(id) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        const ticketToEdit = tickets.find(ticket => ticket.id === id);
        
        if (ticketToEdit) {
            // Rellena el formulario con los datos del tiquete
            document.getElementById('editar').value = ticketToEdit.id;
            document.getElementById('nombre').value = ticketToEdit.nombre;
            document.getElementById('consulta').value = ticketToEdit.consulta;
            document.getElementById('detalle').value = ticketToEdit.detalle;
            document.getElementById('tipo').value = ticketToEdit.tipo;
            document.getElementById('fecha').value = ticketToEdit.fecha;
        }
    };

    // Función para actualizar un tiquete
    function updateTicket(ticket) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets = tickets.map(t => t.id === ticket.id ? ticket : t);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        loadConsultas();
    }
});