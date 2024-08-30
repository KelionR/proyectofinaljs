import { postconsulta } from '../../SERVIcIOS/postconsultas.js';
import { getconsultas } from '../../SERVIcIOS/getconsulta.js';
// import { updateconsulta } from '../../SERVIcIOS/updateconsulta.js';
// import { deleteconsulta } from '../../SERVIcIOS/delete.consulta.js';

// Función para cargar y mostrar consultas desde el servidor
const consultaconsList = document.getElementById('consultacons');

async function loadconsultas() {
  try {
    const consultas = await getconsultas();

    consultaconsList.innerHTML = '';

    for (const element of consultas) {
      const listItem = document.createElement('li');
      listItem.textContent =`${element.nombre} - ${element.consulta} - ${element.detalle} - ${element.fecha} - ${element.tipo}`;
      consultaconsList.appendChild(listItem);
    }
    // consultas.forEach(element => {
      
    // });

  } catch (error) {
    console.error('Error:', error);
  }
}

// Función para agregar una nueva consulta al servidor
async function addconsulta(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const consulta = document.getElementById('consulta').value;
  const detalle = document.getElementById('detalle').value;
  const tipo = document.getElementById('tipo').value;
  const fecha = document.getElementById('fecha').value;

  if (!nombre || !consulta || !detalle || !tipo || !fecha) {
    alert('Por favor complete todos los campos.');
    return;
  }else{
    try {
      await postconsulta(nombre, consulta, detalle, tipo, fecha);
  
      loadconsultas();
    } catch (error) {
      console.error('Error:', error);
    }
  }

}

// Función para actualizar una consulta
// async function updateconsultas() {
//   try {
//     await updateconsulta(id, nombre, apellido);
//     loadconsultas();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// Función para eliminar una consulta
// async function deleteconsultas() {
//   try {
//     await deleteconsulta(id);
//     loadconsultas();
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// Agregar eventos al formulario
const consultaForm = document.getElementById('consultaForm');
consultaForm.addEventListener('submit', addconsulta);

// Cargar consultas al inicio
loadconsultas();