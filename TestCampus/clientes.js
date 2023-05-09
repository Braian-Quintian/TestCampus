/* INICIO DE SECCION BASE DE DATOS */
const apiUrl = 'http://localhost:4001/usuarios';
// Función para listar los clientes
function listarClientes() {
  // Realizar una solicitud GET al servidor JSON
  fetch(apiUrl)
    .then(response => response.json())
    .then(clientes => {
      // Mostrar los clientes en la tabla
      mostrarClientes(clientes);
    })
    .catch(error => {
      console.error('Error al obtener la lista de clientes:', error);
    });
}
// Función para registrar un cliente
function registrarCliente(event) {
  event.preventDefault();
  const identificacion = document.getElementById('identificacion').value;
  const nombres = document.getElementById('nombres').value;
  const apellidos = document.getElementById('apellidos').value;
  const telefono = document.getElementById('telefono').value;
  const fechaNacimiento = document.getElementById('fechaNacimiento').value;
  const ciudad = document.getElementById('ciudad').value;
  const pais = document.getElementById('pais').value;
  const correo = document.getElementById('correo').value;
  const cliente = {
    identificacion,
    nombres,
    apellidos,
    telefono,
    fechaNacimiento,
    ciudad,
    pais,
    correo
  };
  // Realizar una solicitud POST al servidor JSON
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cliente)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cliente registrado:', data);
      // Limpiar el formulario después de registrar el cliente
      document.getElementById('clienteForm').reset();
      // Actualizar la lista de clientes
      listarClientes();
    })
    .catch(error => {
      console.error('Error al registrar el cliente:', error);
    });
}
// Función para buscar clientes
function buscarClientes() {
  const buscarInput = document.getElementById('buscarInput');
  const criterio = buscarInput.value.toLowerCase();
  // Realizar una solicitud GET al servidor JSON
  fetch(apiUrl)
    .then(response => response.json())
    .then(clientes => {
      // Filtrar los clientes según el criterio de búsqueda
      const clientesFiltrados = clientes.filter(cliente =>
        cliente.nombres.toLowerCase().includes(criterio) ||
        cliente.apellidos.toLowerCase().includes(criterio) ||
        cliente.identificacion.includes(criterio)
      );
      // Mostrar los clientes filtrados en la tabla
      mostrarClientes(clientesFiltrados);
    })
    .catch(error => {
      console.error('Error al buscar clientes:', error);
    });
}
// Función para eliminar un cliente
function eliminarCliente(id) {
  // Realizar una solicitud DELETE al servidor JSON
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cliente eliminado:', data);
      // Actualizar la lista de clientes después de eliminar
      listarClientes();
    })
    .catch(error => {
      console.error('Error al eliminar el cliente:', error);
    });
}
// Función para mostrar los clientes en la tabla
function mostrarClientes(clientes) {
  const clientesBody = document.getElementById('clientesBody');
  clientesBody.innerHTML = '';
  clientes.forEach(cliente => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${cliente.identificacion}</td>
      <td>${cliente.nombres}</td>
      <td>${cliente.apellidos}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.fechaNacimiento}</td>
      <td>${cliente.ciudad}</td>
      <td>${cliente.pais}</td>
      <td>${cliente.correo}</td>
      <td>
        <button onclick="eliminarCliente(${cliente.id})">Eliminar</button>
        <button onclick="mostrarFormularioEditar(${cliente.id})">Editar</button>
      </td>
    `;
    clientesBody.appendChild(row);
  });
}
// Variable global para almacenar el ID del cliente que se está editando
let clienteEditandoId = null;
// Función para mostrar el formulario de edición de un cliente
function mostrarFormularioEditar(id) {
  clienteEditandoId = id;
  // Obtener el cliente a editar mediante una solicitud GET al servidor JSON
  fetch(`${apiUrl}/${id}`)
    .then(response => response.json())
    .then(cliente => {
      // Rellenar el formulario de edición con los datos del cliente
      document.getElementById('editarIdentificacion').value = cliente.identificacion;
      document.getElementById('editarNombres').value = cliente.nombres;
      document.getElementById('editarApellidos').value = cliente.apellidos;
      document.getElementById('editarTelefono').value = cliente.telefono;
      document.getElementById('editarFechaNacimiento').value = cliente.fechaNacimiento;
      document.getElementById('editarCiudad').value = cliente.ciudad;
      document.getElementById('editarPais').value = cliente.pais;
      document.getElementById('editarCorreo').value = cliente.correo;
      // Mostrar el modal de edición
      const modal = document.getElementById('modalEditar');
      modal.style.display = 'block';
    })
    .catch(error => {
      console.error('Error al obtener el cliente:', error);
    });
}
// Función para cancelar la edición y cerrar el modal
function cancelarEdicion() {
  clienteEditandoId = null;
  // Limpiar el formulario después de cancelar la edición
  document.getElementById('editarForm').reset();
  // Ocultar el modal de edición
  const modal = document.getElementById('modalEditar');
  modal.style.display = 'none';
}
// Función para actualizar los datos de un cliente
function actualizarCliente() {
  if (!clienteEditandoId) {
    return;
  }
  // Obtener los valores del formulario de edición
  const identificacion = document.getElementById('editarIdentificacion').value;
  const nombres = document.getElementById('editarNombres').value;
  const apellidos = document.getElementById('editarApellidos').value;
  const telefono = document.getElementById('editarTelefono').value;
  const fechaNacimiento = document.getElementById('editarFechaNacimiento').value;
  const ciudad = document.getElementById('editarCiudad').value;
  const pais = document.getElementById('editarPais').value;
  const correo = document.getElementById('editarCorreo').value;
  const clienteActualizado = {
    identificacion,
    nombres,
    apellidos,
    telefono,
    fechaNacimiento,
    ciudad,
    pais,
    correo
  };
  // Enviar una solicitud PUT al servidor JSON para actualizar el cliente
  fetch(`${apiUrl}/${clienteEditandoId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clienteActualizado)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Cliente actualizado:', data);
      // Actualizar la lista de clientes después de actualizar
      listarClientes();
      // Cerrar el modal de edición
      cancelarEdicion();
    })
    .catch(error => {
      console.error('Error al actualizar el cliente:', error);
    });
}
// Asignar el controlador de eventos al formulario de edición de clientes
const editarForm = document.getElementById('editarForm');
editarForm.addEventListener('submit', event => {
  event.preventDefault();
  actualizarCliente();
});
// Llamar a la función listarClientes para mostrar la lista inicial de clientes al cargar la página
listarClientes();
// Asignar el controlador de eventos al formulario de registro de clientes
const clienteForm = document.getElementById('clienteForm');
clienteForm.addEventListener('submit', registrarCliente);
/* FIN DE SECCION BASE DE DATOS */