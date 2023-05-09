document.addEventListener('DOMContentLoaded', function () {
    const compraEtiquetasForm = document.getElementById('compraEtiquetasForm');
    const resumenModal = document.getElementById('resumenModal');
    const resumenTexto = document.getElementById('resumenTexto');
    const cerrarModal = document.getElementById('cerrarModal');

    compraEtiquetasForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const identificacion = document.getElementById('identificacion').value;
        const nombre = document.getElementById('nombre').value;
        const apellidos = document.getElementById('apellidos').value;
        const correo = document.getElementById('correo').value;
        const ciudadOrigen = document.getElementById('ciudadOrigen').value;
        const ciudadDestino = document.getElementById('ciudadDestino').value;
        const millas = document.getElementById('millas').value;
        const valorMillas = document.getElementById('valorMillas').value;

        // Realizar cálculos
        const valorTrayecto = millas * valorMillas;
        const impuesto = valorTrayecto * 0.16;
        const tasaAeroportuaria = valorTrayecto * 0.05;
        const valorTotal = valorTrayecto + impuesto + tasaAeroportuaria;

        // Generar resumen de la compra
        const resumen = `
        <strong>Número de Identificación:</strong> ${identificacion}<br>
        <strong>Nombre:</strong> ${nombre}<br>
        <strong>Apellidos:</strong> ${apellidos}<br>
        <strong>Correo Electrónico:</strong> ${correo}<br>
        <strong>Ciudad de Origen:</strong> ${ciudadOrigen}<br>
        <strong>Ciudad de Destino:</strong> ${ciudadDestino}<br>
        <strong>Valor del Trayecto:</strong> $${valorTrayecto.toFixed(2)}<br>
        <strong>Impuesto (16%):</strong> $${impuesto.toFixed(2)}<br>
        <strong>Tasa Aeroportuaria (5%):</strong> $${tasaAeroportuaria.toFixed(2)}<br>
        <strong>Valor Total:</strong> $${valorTotal.toFixed(2)}
      `;

        resumenTexto.innerHTML = resumen;
        resumenModal.style.display = 'block';
    });

    cerrarModal.addEventListener('click', function () {
        resumenModal.style.display = 'none';
    });
});
