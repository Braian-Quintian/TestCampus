const apiConfig = {
    baseUrl: 'http://localhost:4001',
    endpoints: {
        clientes: '/usuarios',
        registroCompras: '/registroCompras',
        rutasAereas: '/rutasAereas',
    },
};

const compraTicketForm = document.getElementById('compraTicketForm');
const resumenCompraModal = document.getElementById('resumenCompraModal');
const resumenCompraList = document.getElementById('resumenCompraList');
const closeModal = document.querySelector('.close');

async function fetchApi(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

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
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function buscarCliente(numeroIdentificacion) {
    try {
        const url = `${apiConfig.baseUrl}${apiConfig.endpoints.clientes}?identificacion=${numeroIdentificacion}`;
        const clientes = await fetchApi(url);
        return clientes[0];
    } catch (error) {
        console.error('Error:', error);
    }
}

function calcularValorBase(ciudadOrigen, ciudadDestino) {
    // Lógica para calcular el valor base según las ciudades de origen y destino
    // ...
}

function calcularValorCompra(valorBase, numeroPersonas, numeroAdultos, numeroNinos) {
    // Lógica para calcular el valor de la compra según el valor base y el número de personas
    // ...
}

function calcularImpuesto(valorCompra) {
    // Lógica para calcular el impuesto sobre el valor de la compra
    // ...
}

function calcularTasaAeroportuaria(valorCompra) {
    // Lógica para calcular la tasa aeroportuaria sobre el valor de la compra
    // ...
}

function calcularTotalPagar(valorCompra, impuesto, tasaAeroportuaria) {
    // Lógica para calcular el total a pagar de la compra
    // ...
}

async function guardarCompra(compra) {
    const url = `${apiConfig.baseUrl}${apiConfig.endpoints.registroCompras}`;
    await postApi(url, compra);
}

compraTicketForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const numeroIdentificacion = document.getElementById('numeroIdentificacion').value;
    const clienteInfo = await buscarCliente(numeroIdentificacion);

    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const correo = document.getElementById('correo').value;

    const ciudadOrigen = document.getElementById('ciudadOrigen').value;
    const ciudadDestino = document.getElementById('ciudadDestino').value;

    const valorBase = calcularValorBase(ciudadOrigen, ciudadDestino);
    const numeroPersonas = parseInt(document.getElementById('numeroPersonas').value);
    const numeroAdultos = parseInt(document.getElementById('numeroAdultos').value);
    const numeroNinos = parseInt(document.getElementById('numeroNinos').value);

    const valorCompra = calcularValorCompra(valorBase, numeroPersonas, numeroAdultos, numeroNinos);

    const impuesto = calcularImpuesto(valorCompra);
    const tasaAeroportuaria = calcularTasaAeroportuaria(valorCompra);
    const totalPagar = calcularTotalPagar(valorCompra, impuesto, tasaAeroportuaria);

    const compra = {
        cliente: clienteInfo ? clienteInfo : {
            identificacion: numeroIdentificacion,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo
        },
        ciudadOrigen: ciudadOrigen,
        ciudadDestino: ciudadDestino,
        valorCompra: valorCompra,
        impuesto: impuesto,
        tasaAeroportuaria: tasaAeroportuaria,
        totalPagar: totalPagar
    };

    await guardarCompra(compra);

    // Mostrar resumen de la compra en la ventana modal
    const resumenCompraItems = `
    <li>Nombres: ${clienteInfo ? clienteInfo.nombres : nombres}</li>
    <li>Apellidos: ${clienteInfo ? clienteInfo.apellidos : apellidos}</li>
    <li>Correo Electrónico: ${clienteInfo ? clienteInfo.correo : correo}</li>
    <li>Ciudad Origen: ${ciudadOrigen}</li>
    <li>Ciudad Destino: ${ciudadDestino}</li>
    <li>Valor de la Compra: ${valorCompra}</li>
    <li>Impuesto: ${impuesto}</li>
    <li>Tasa Aeroportuaria: ${tasaAeroportuaria}</li>
    <li>Total a Pagar: ${totalPagar}</li>
`;

    resumenCompraList.innerHTML = resumenCompraItems;
    resumenCompraModal.style.display = 'block';
});

closeModal.addEventListener('click', function () {
    resumenCompraModal.style.display = 'none';
});

