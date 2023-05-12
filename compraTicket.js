// Objeto de configuración de la API
const apiConfig = {
    baseUrl: 'http://localhost:4001',
    endpoints: {
        clientes: '/usuarios',
        registroCompras: '/registroCompras',
    },
};

// Obtener elementos del formulario y las ventanas modales
const compraTicketForm = document.getElementById('compraTicketForm');
const resumenCompraModal = document.getElementById('resumenCompraModal');
const resumenCompraList = document.getElementById('resumenCompraList');
const totalPagar = document.getElementById('totalPagar');
const closeModal = document.getElementsByClassName('close')[0];

// Función para realizar una solicitud GET a la API
async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para realizar una solicitud POST a la API
async function postApi(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para buscar un cliente por número de identificación en la base de datos
async function buscarCliente(numeroIdentificacion) {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.clientes}?numeroIdentificacion=${numeroIdentificacion}`;
    const clientes = await fetchApi(url);
    if (clientes.length > 0) {
        return clientes[0];
    } else {
        return null;
    }
}

// Función para calcular el valor base de la compra
function calcularValorBase(ciudadOrigen, ciudadDestino) {
    // Lógica para calcular el valor base según las ciudades de origen y destino
    // ...
}

// Función para calcular el valor de la compra
function calcularValorCompra(valorBase, numeroPersonas, numeroAdultos, numeroNinos) {
    // Lógica para calcular el valor de la compra según el valor base y el número de personas
    // ...
}

// Función para calcular el impuesto de la compra
function calcularImpuesto(valorCompra) {
    // Lógica para calcular el impuesto sobre el valor de la compra
    // ...
}

// Función para calcular la tasa aeroportuaria de la compra
function calcularTasaAeroportuaria(valorCompra) {
    // Lógica para calcular la tasa aeroportuaria sobre el valor de la compra
    // ...
}

// Función para calcular el total a pagar de la compra
function calcularTotalPagar(valorCompra, impuesto, tasaAeroportuaria) {
    // Lógica para calcular el total a pagar de la compra
    // ...
}

// Función para guardar la compra en la base de datos
async function guardarCompra(compra) {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.registroCompras}`;
    await postApi(url, compra);
}

// Evento de envío del formulario
compraTicketForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;
    const ciudadOrigen = document.getElementById('ciudadOrigen').value;
    const ciudadDestino = document.getElementById('ciudadDestino').value;
    const fechaSalida = document.getElementById('fechaSalida').value;
    const numeroPersonas = parseInt(document.getElementById('numeroPersonas').value);
    const numeroAdultos = parseInt(document.getElementById('numeroAdultos').value);
    const numeroNinos = parseInt(document.getElementById('numeroNinos').value);
    const numeroMaletas = parseInt(document.getElementById('numeroMaletas').value);

    // Verificar si el cliente está registrado
    let clienteInfo;
    if (numeroIdentificacion) {
        clienteInfo = await buscarCliente(numeroIdentificacion);
    } else {
        clienteInfo = {
            nombres: nombre,
            apellidos: apellidos,
            correo: correo,
        };
    }

    // Validar información del cliente
    if (!clienteInfo) {
        alert('El cliente no está registrado. Proporcione todos los campos requeridos.');
        return;
    }

    // Calcular el valor de la compra
    const valorBase = calcularValorBase(ciudadOrigen, ciudadDestino);
    const valorCompra = calcularValorCompra(valorBase, numeroPersonas, numeroAdultos, numeroNinos);
    const impuesto = calcularImpuesto(valorCompra);
    const tasaAeroportuaria = calcularTasaAeroportuaria(valorCompra);
    const totalPagarCompra = calcularTotalPagar(valorCompra, impuesto, tasaAeroportuaria);

    // Agregar la compra al carrito
    const compra = {
        cliente: clienteInfo,
        ciudadOrigen,
        ciudadDestino,
        fechaSalida,
        numeroPersonas,
        numeroAdultos,
        numeroNinos,
        numeroMaletas,
        valorCompra,
        impuesto,
        tasaAeroportuaria,
        totalPagarCompra,
    };

    // Guardar la compra en la base de datos
    await guardarCompra(compra);

    // Mostrar resumen de la compra en la ventana modal
    resumenCompraList.innerHTML = `
  <li><strong>Nombres:</strong> ${clienteInfo.nombres}</li>
  <li><strong>Apellidos:</strong> ${clienteInfo.apellidos}</li>
  <li><strong>Correo Electrónico:</strong> ${clienteInfo.correo}</li>
  <li><strong>Ciudad de Origen:</strong> ${ciudadOrigen}</li>
  <li><strong>Ciudad de Destino:</strong> ${ciudadDestino}</li>
  <li><strong>Fecha de Salida:</strong> ${fechaSalida}</li>
  <li><strong>Número de Personas:</strong> ${numeroPersonas}</li>
  <li><strong>Número de Adultos:</strong> ${numeroAdultos}</li>
  <li><strong>Número de Niños:</strong> ${numeroNinos}</li>
  <li><strong>Número de Maletas:</strong> ${numeroMaletas}</li>
  <li><strong>Valor de la Compra:</strong> ${valorCompra}</li>
  <li><strong>Impuesto:</strong> ${impuesto}</li>
  <li><strong>Tasa Aeroportuaria:</strong> ${tasaAeroportuaria}</li>
  <li><strong>Total a Pagar:</strong> ${totalPagarCompra}</li>
`;

    // Mostrar la ventana modal con el resumen de la compra
    resumenCompraModal.style.display = 'block';
});

// Cerrar la ventana modal al hacer clic en el botón de cerrar
closeModal.addEventListener('click', function () {
    resumenCompraModal.style.display = 'none';
});
