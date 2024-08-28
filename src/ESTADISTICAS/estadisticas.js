function cargarEstadisticas() {
    const apiUrl = 'http://localhost:3001/consultas';
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(consultas => {
            const contenedor = document.querySelector('.contenidoEstadisticas');
            contenedor.innerHTML = '';

            const today = new Date();
            const threeDaysAgo = new Date();
            threeDaysAgo.setDate(today.getDate() - 3);

            const filteredConsultas = consultas.filter(consulta => {
                const consultaDate = new Date(consulta.fecha);
                return consultaDate >= threeDaysAgo && consultaDate <= today;
            });

            filteredConsultas.forEach(consulta => {
                // Crea el contenedor de cada consulta
                const divConsulta = document.createElement('div');
                divConsulta.classList.add('consulta');
                
                // Crea el contenedor de detalles
                const detalles = document.createElement('div');
                detalles.classList.add('detalles');
                detalles.innerHTML = `
                    <p>Nombre: ${consulta.nombre}</p>
                    <p>Consulta: ${consulta.consulta}</p>
                    <p>Detalle: ${consulta.detalle}</p>
                    <p>Tipo: ${consulta.tipo}</p>
                    <p>Fecha: ${consulta.fecha}</p>
                    <p>Hora: ${consulta.hora}</p>
                `;
                
                // Agrega el contenedor de detalles al contenedor de consulta
                divConsulta.appendChild(detalles);
                
                // Agrega el contenedor de consulta al contenedor principal
                contenedor.appendChild(divConsulta);
            });
        })
        .catch(error => console.error('Error al cargar las estadísticas:', error));
}

window.onload = cargarEstadisticas;