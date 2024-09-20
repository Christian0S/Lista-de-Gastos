let gastos = JSON.parse(localStorage.getItem('gastos')) || [];

// Función para agregar un nuevo gasto
function agregar() {
    const nombreDelGasto = document.getElementById('nombreGasto').value.toUpperCase();
    const valorGasto = document.getElementById('valorGasto').value.replace(/[^\d]/g, '');

    if (!nombreDelGasto || !valorGasto || isNaN(valorGasto) || Number(valorGasto) <= 0) {
        alert('Por favor, ingrese un nombre y un valor de gasto válido.');
        return;
    }

    const fechaGasto = new Date().toLocaleDateString('es-CO');
    gastos.push({ nombre: nombreDelGasto, valor: Number(valorGasto), fecha: fechaGasto });

    // Alerta si el gasto supera los 600,000 COP
    if (Number(valorGasto) > 600000) {
        alert('Advertencia: Estás ingresando un gasto mayor a 600,000 COP.');
    }

    actualizarListaDeGastos();
    actualizarMenuFechas();
    limpiar();
    guardarDatosEnLocalStorage();
}

// Función para actualizar la lista de gastos
function actualizarListaDeGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    listaElementos.innerHTML = '';
    let totalGastos = 0;

    if (gastos.length === 0) {
        listaElementos.innerHTML = '<li>No hay gastos registrados.</li>';
        document.getElementById('totalGastos').innerHTML = '0.00';
        return;
    }

    gastos.forEach((gasto, posicion) => {
        listaElementos.innerHTML += `<li>${gasto.nombre} - COP ${gasto.valor.toLocaleString('es-CO')} - ${gasto.fecha} <button onclick='eliminar(${posicion})'>Eliminar</button> <button onclick='prepararEdicion(${posicion})'>Actualizar</button></li>`;
        totalGastos += gasto.valor;
    });

    document.getElementById('totalGastos').innerHTML = totalGastos.toLocaleString('es-CO', { minimumFractionDigits: 2 });
}

// Función para eliminar un gasto
function eliminar(posicion) {
    gastos.splice(posicion, 1);
    actualizarListaDeGastos();
    actualizarMenuFechas();
    guardarDatosEnLocalStorage();
}

// Función para preparar la edición de un gasto
function prepararEdicion(posicion) {
    document.getElementById('nombreGasto').value = gastos[posicion].nombre;
    document.getElementById('valorGasto').value = gastos[posicion].valor.toLocaleString('es-CO');
    document.getElementById('botonFormulario').innerText = 'Actualizar';
    document.getElementById('botonFormulario').onclick = function() {
        actualizar(posicion);
    };
}

// Función para actualizar un gasto
function actualizar(posicion) {
    const nombreDelGasto = document.getElementById('nombreGasto').value.toUpperCase();
    const valorGasto = document.getElementById('valorGasto').value.replace(/[^\d]/g, '');

    if (!nombreDelGasto || !valorGasto || isNaN(valorGasto) || Number(valorGasto) <= 0) {
        alert('Por favor, ingrese un nombre y un valor de gasto válido.');
        return;
    }

    // Alerta si el gasto actualizado supera los 600,000 COP
    if (Number(valorGasto) > 600000) {
        alert('Advertencia: Estás actualizando un gasto a más de 600,000 COP.');
    }

    gastos[posicion] = { nombre: nombreDelGasto, valor: Number(valorGasto), fecha: new Date().toLocaleDateString('es-CO') };
    document.getElementById('botonFormulario').innerText = 'Agregar Gasto';
    document.getElementById('botonFormulario').onclick = agregar;
    actualizarListaDeGastos();
    limpiar();
    guardarDatosEnLocalStorage();
}

// Función para exportar gastos a JSON
function exportarDatos() {
    const blob = new Blob([JSON.stringify(gastos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gastos.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Función para importar datos desde un archivo JSON
function importarDatos(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    // Confirmar si hay datos sin guardar
    if (gastos.length > 0) {
        const confirmacion = confirm('Tienes datos sin guardar. ¿Quieres exportarlos antes de cargar el nuevo archivo?');
        if (confirmacion) {
            exportarDatos(); // Exportar antes de cargar
        }
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                gastos = data; // Cargar datos del archivo
                actualizarListaDeGastos();
                actualizarMenuFechas();
                guardarDatosEnLocalStorage();
            } else {
                alert('El archivo no contiene datos válidos.');
            }
        } catch (error) {
            alert('Error al cargar los datos: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Función para limpiar los campos de entrada
function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

// Función para guardar los datos en el localStorage
function guardarDatosEnLocalStorage() {
    localStorage.setItem('gastos', JSON.stringify(gastos));
}

// Función para cargar los gastos guardados al cargar la página
window.onload = function() {
    actualizarListaDeGastos();
    actualizarMenuFechas();
};

// Función para actualizar el menú de fechas
function actualizarMenuFechas() {
    const menuFechas = document.getElementById('menuFechas');
    const fechasUnicas = [...new Set(gastos.map(gasto => gasto.fecha))];
    menuFechas.innerHTML = '<option value="">--Seleccione una fecha--</option>';
    fechasUnicas.forEach(fecha => {
        menuFechas.innerHTML += `<option value="${fecha}">${fecha}</option>`;
    });
}

// Función para filtrar la lista de gastos por fecha
function actualizarListaDeGastosPorFecha(fechaSeleccionada) {
    const listaElementos = document.getElementById('listaDeGastos');
    listaElementos.innerHTML = '';
    let totalGastos = 0;

    const gastosFiltrados = fechaSeleccionada ? gastos.filter(gasto => gasto.fecha === fechaSeleccionada) : gastos;

    if (gastosFiltrados.length === 0) {
        listaElementos.innerHTML = '<li>No hay gastos registrados para esta fecha.</li>';
        document.getElementById('totalGastos').innerHTML = '0.00';
        return;
    }

    gastosFiltrados.forEach((gasto, posicion) => {
        listaElementos.innerHTML += `<li>${gasto.nombre} - COP ${gasto.valor.toLocaleString('es-CO')} - ${gasto.fecha} <button onclick='eliminar(${posicion})'>Eliminar</button> <button onclick='prepararEdicion(${posicion})'>Actualizar</button></li>`;
        totalGastos += gasto.valor;
    });

    document.getElementById('totalGastos').innerHTML = totalGastos.toLocaleString('es-CO', { minimumFractionDigits: 2 });
}

// Función para formatear el valor del gasto a COP
function formatearValor(input) {
    let valor = input.value.replace(/[^0-9]/g, '');
    if (valor) {
        valor = Number(valor).toLocaleString('es-CO');
    }
    input.value = `COP ${valor}`;
}

// Agregar un evento para formatear el valor mientras se escribe
document.getElementById('valorGasto').addEventListener('input', function() {
    formatearValor(this);
});
