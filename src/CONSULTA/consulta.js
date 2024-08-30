import { updateconsulta } from '../../SERVICIOS/updateconsulta.js'
import { postconsulta } from '../../SERVICIOS/postconsultas.js'
import { getconsulta } from '../../SERVICIOS/getconsulta.js'
import { deleteconsulta } from '../../SERVICIOS/delete.consulta.js'

document.addEventListener('DOMContentLoaded', () => {
    const nombreInput = document.getElementById('nombre');
    const consultaInput = document.getElementById('consulta');
    const detalleInput = document.getElementById('detalle');
    const tipoSelect = document.getElementById('tipo');
    const fechaInput = document.getElementById('fecha');
    const consultaQueueList = document.getElementById('consultaQueue');
    const consultaForm = document.getElementById('consultaForm');

    // Función para cargar y mostrar consultas desde el servidor
    async function loadConsultas() {
        try {
            const response = await fetch('http://localhost:3001/consultas');
            if (!response.ok) throw new Error('Error al cargar las consultas');
            const consultas = await response.json();
            consultaQueueList.innerHTML = '';
            consultas.forEach(_consulta => {
                const listItem = document.createElement('li');
                listItem.textContent = "${consulta.nombre}" - "${consulta.consulta}" - "${consulta.detalle}" - "${consulta.fecha}" - "${consulta.tipo}";
                consultaQueueList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Función para agregar una nueva consulta al servidor
    async function addConsulta(event) {
        event.preventDefault();

        const nombre = nombreInput.value.trim();
        const consulta = consultaInput.value.trim();
        const detalle = detalleInput.value.trim();
        const tipo = tipoSelect.value;
        const fecha = fechaInput.value;

        if (!nombre || !consulta || !detalle || !tipo || !fecha) {
            alert('Por favor complete todos los campos.');
            return;
        }

        const nuevaConsulta = {
            nombre,
            consulta,
            detalle,
            tipo,
            fecha,
            hora: new Date().toLocaleTimeString()
        };

        try {
            const response = await fetch('http://localhost:3001/consultas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(nuevaConsulta)
            });

            if (!response.ok) throw new Error('Error al agregar la consulta');

            // Limpiar el formulario
            nombreInput.value = '';
            consultaInput.value = '';
            detalleInput.value = '';
            tipoSelect.value = '';
            fechaInput.value = '';

            // Volver a cargar la lista de consultas
            loadConsultas();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Agregar eventos al formulario
    consultaForm.addEventListener('submit', addConsulta);

    // Cargar consultas al inicio
    loadConsultas();
});