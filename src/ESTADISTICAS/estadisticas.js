  function cargarEstadisticas() {
  const datos = localStorage.getItem('consultas');
    
  if (datos) {
  const consultas = JSON.parse(datos);
  const contenedor = document.querySelector('.contenidoEstadisticas');

  contenedor.innerHTML = '';
        
  // Itera sobre los datos y crea los elementos
  consultas.forEach(consulta => {
  // Crea el contenedor de cada consulta
  const divConsulta = document.createElement('div');
  divConsulta.classList.add('consulta');

  // botones
  const botonEditar = document.createElement('button');
  botonEditar.textContent = 'Editar';
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  const botonAceptar = document.createElement('button');
  botonAceptar.textContent = 'Aceptar';
  
  // Crea el contenedor de detalles
  const detalles = document.createElement('div');
  detalles.classList.add('detalles');
  detalles.innerHTML = `
      <p>Nombre: ${consulta.nombre}</p>
      <p>Fecha: ${consulta.fecha}</p>
      <p>Hora: ${consulta.hora}</p>
      <p>Comentario: ${consulta.comentario}</p>
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
}

window.onload = cargarEstadisticas;
