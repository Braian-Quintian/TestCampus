/* INICIO DE SECCION BASE DE DATOS */
const apiUrl = 'http://localhost:4001/flotaAerea';

// Función para listar la flota aérea
function listarFlotaAerea() {
  // Realizar una solicitud GET al servidor JSON
  fetch(apiUrl)
    .then(response => response.json())
    .then(flotaAerea => {
      // Mostrar la flota aérea en la tabla
      mostrarFlotaAerea(flotaAerea);
    })
    .catch(error => {
      console.error('Error al obtener la lista de la flota aérea:', error);
    });
}

// Función para registrar una aeronave
function registrarAeronave(event) {
  event.preventDefault();
  const numeroAeronave = document.getElementById('numeroAeronave').value;
  const cantidadPasajeros = document.getElementById('cantidadPasajeros').value;
  const fechaCompra = document.getElementById('fechaCompra').value;
  const valorCompra = document.getElementById('valorCompra').value;
  const numeroMatricula = document.getElementById('numeroMatricula').value;
  const aeronave = {
    numeroAeronave,
    cantidadPasajeros,
    fechaCompra,
    valorCompra,
    numeroMatricula
  };
  // Realizar una solicitud POST al servidor JSON
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(aeronave)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Aeronave registrada:', data);
      // Limpiar el formulario después de registrar la aeronave
      document.getElementById('aeronaveForm').reset();
      // Actualizar la lista de la flota aérea
      listarFlotaAerea();
    })
    .catch(error => {
      console.error('Error al registrar la aeronave:', error);
    });
}

// Función para mostrar la flota aérea en la tabla
function mostrarFlotaAerea(flotaAerea) {
  const flotaAereaBody = document.getElementById('flotaAereaBody');
  flotaAereaBody.innerHTML = '';

  flotaAerea.forEach(aeronave => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${aeronave.numeroAeronave}</td>
      <td>${aeronave.cantidadPasajeros}</td>
      <td>${aeronave.fechaCompra}</td>
      <td>${aeronave.valorCompra}</td>
      <td>${aeronave.numeroMatricula}</td>
    `;
    flotaAereaBody.appendChild(row);
  });
}

// Función para buscar aeronaves
function buscarAeronaves() {
  const searchTerm = document.getElementById('buscarInput').value.toLowerCase();

  fetch(apiUrl)
    .then(response => response.json())
    .then(flotaAerea => {
      const aeronavesFiltradas = flotaAerea.filter(aeronave =>
        aeronave.numeroAeronave.toLowerCase().includes(searchTerm) ||
        aeronave.numeroMatricula.toLowerCase().includes(searchTerm)
      );

      mostrarFlotaAerea(aeronavesFiltradas);
    })
    .catch(error => {
      console.error('Error al buscar las aeronaves:', error);
    });
}

// Asignar el controlador de eventos al formulario de registro de aeronaves
aeronaveForm.addEventListener('submit', registrarAeronave);

// Llamar a la función listarFlotaAerea para mostrar la lista inicial de aeronaves al cargar la página
listarFlotaAerea();
/* FIN DE SECCION BASE DE DATOS */
