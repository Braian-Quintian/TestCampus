/* INICIO DE SECCION BASE DE DATOS */
const apiUrl = 'http://localhost:4001/rutasAereas';

// Función para listar las rutas aéreas
function listarRutasAereas() {
  // Realizar una solicitud GET al servidor JSON
  fetch(apiUrl)
    .then(response => response.json())
    .then(rutasAereas => {
      // Mostrar las rutas aéreas en la tabla
      mostrarRutasAereas(rutasAereas);
    })
    .catch(error => {
      console.error('Error al obtener la lista de rutas aéreas:', error);
    });
}

// Función para registrar una ruta aérea
function registrarRutaAerea(event) {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const ciudadOrigen = document.getElementById('ciudadOrigen').value;
  const ciudadDestino = document.getElementById('ciudadDestino').value;
  const millas = document.getElementById('millas').value;
  const valorMillas = document.getElementById('valorMillas').value;
  const rutaAerea = {
    nombre,
    ciudadOrigen,
    ciudadDestino,
    millas,
    valorMillas
  };
  // Realizar una solicitud POST al servidor JSON
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(rutaAerea)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Ruta aérea registrada:', data);
      // Limpiar el formulario después de registrar la ruta aérea
      document.getElementById('rutaAereaForm').reset();
      // Actualizar la lista de rutas aéreas
      listarRutasAereas();
    })
    .catch(error => {
      console.error('Error al registrar la ruta aérea:', error);
    });
}

// Función para mostrar las rutas aéreas en la tabla
function mostrarRutasAereas(rutasAereas) {
  const rutasAereasBody = document.getElementById('rutasAereasBody');
  rutasAereasBody.innerHTML = '';

  rutasAereas.forEach(rutaAerea => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${rutaAerea.id}</td>
      <td>${rutaAerea.nombre}</td>
      <td>${rutaAerea.ciudadOrigen}</td>
      <td>${rutaAerea.ciudadDestino}</td>
      <td>${rutaAerea.millas}</td>
      <td>${rutaAerea.valorMillas}</td>
    `;
    rutasAereasBody.appendChild(row);
  });
}
// Función para buscar rutas aéreas
function buscarRutasAereas() {
  const searchTerm = document.getElementById('buscarInput').value.toLowerCase();

  fetch(apiUrl)
    .then(response => response.json())
    .then(rutasAereas => {
      const rutasFiltradas = rutasAereas.filter(rutaAerea =>
        rutaAerea.nombre.toLowerCase().includes(searchTerm) ||
        rutaAerea.ciudadOrigen.toLowerCase().includes(searchTerm) ||
        rutaAerea.ciudadDestino.toLowerCase().includes(searchTerm)
      );

      mostrarRutasAereas(rutasFiltradas);
    })
    .catch(error => {
      console.error('Error al buscar las rutas aéreas:', error);
    });
}
// Asignar el controlador de eventos al formulario de registro de rutas aéreas
const rutaAereaForm = document.getElementById('rutaAereaForm');
rutaAereaForm.addEventListener('submit', registrarRutaAerea);

// Llamar a la función listarRutasAereas para mostrar la lista inicial de rutas aéreas al cargar la página
listarRutasAereas();
/* FIN DE SECCION BASE DE DATOS */







