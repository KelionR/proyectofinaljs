function cargarEstadisticas() {


            // Filtrar las consultas de los últimos 3 días
            const fechaLimite = new Date();
            fechaLimite.setDate(fechaLimite.getDate() - 3);
            
            consultas = consultas.filter(consulta => {
                const fechaConsulta = new Date(consulta.fecha);
                return fechaConsulta >= fechaLimite;
            });

            consultas.forEach(consulta => {
                // Crea el contenedor de cada consulta
                const divConsulta = document.createElement('div');
                divConsulta.classList.add('consulta');

                // Botones
                const botonEditar = document.createElement('button');
                botonEditar.textContent = 'Editar';
                botonEditar.addEventListener('click', () => editConsulta(consulta.id));
                
                const botonEliminar = document.createElement('button');
                botonEliminar.textContent = 'Eliminar';
                botonEliminar.addEventListener('click', () => deleteConsulta(consulta.id));
                
                const botonAceptar = document.createElement('button');
                botonAceptar.textContent = 'Aceptar';
                
                // Crea el contenedor de detalles
                const detalles = document.createElement('div');
                detalles.classList.add('detalles');
                detalles.innerHTML = `
                    <p><strong>Nombre:</strong> ${consulta.nombre}</p>
                    <p><strong>Consulta:</strong> ${consulta.consulta}</p>
                    <p><strong>Detalle:</strong> ${consulta.detalle}</p>
                    <p><strong>Tipo:</strong> ${consulta.tipo}</p>
                    <p><strong>Fecha:</strong> ${consulta.fecha}</p>
                    <p><strong>Hora:</strong> ${consulta.hora}</p>
                `;

                // Agrega los botones y detalles al contenedor de consulta
                divConsulta.appendChild(botonEditar);
                divConsulta.appendChild(botonEliminar);
                divConsulta.appendChild(botonAceptar);
                divConsulta.appendChild(detalles);

                // Agrega el contenedor de consulta al contenedor principal
                contenedor.appendChild(divConsulta);
            });
        }