/*
let listaNombreGastos = [];
let listaValorGasto = [];

function agregar () {

    let NombreDelGasto = document.getElementById('nombreGasto').value.toUpperCase();
    let ValorGasto = document.getElementById('valorGasto').value;

    console.log(NombreDelGasto + "  " + ValorGasto)

    listaNombreGastos.push(NombreDelGasto);
    listaValorGasto.push(ValorGasto);
    actualizarListaDeGastos();
    limpiar();
}

function actualizarListaDeGastos () {
    const listaElementos = document.getElementById('listaDeGastos');
    let htmLista = '';
    let totalElementos = document.getElementById('totalGastos')
    let totalGastos = 0;
    listaNombreGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValorGasto[posicion]);
        htmLista += `<li> ${elemento} - COP ${valorGasto.toFixed(2)}  <button id="botonFormulario" onclick='eliminar(${posicion})'>Eliminar</button></li>`
        totalGastos += valorGasto;
        console.log(totalGastos)
    });

    listaElementos.innerHTML = htmLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);
}

function limpiar () {
    document.getElementById('nombreGasto').value  = '';
    document.getElementById('valorGasto').value = '';
}

function eliminar (posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValorGasto.splice(posicion, 1);
    actualizarListaDeGastos();
}

*/

//Reto
let listaNombreGastos = [];
let listaValorGasto = [];
let posicionAEditar = null;  // Variable para controlar la edición

// Función para agregar o actualizar un gasto
function agregar() {
    let NombreDelGasto = document.getElementById('nombreGasto').value.toUpperCase();
    let ValorGasto = document.getElementById('valorGasto').value;

    if (posicionAEditar === null) {
        // Si no estamos editando, agregar el nuevo gasto
        listaNombreGastos.push(NombreDelGasto);
        listaValorGasto.push(ValorGasto);
    } else {
        // Si estamos editando, actualizar el gasto seleccionado
        listaNombreGastos[posicionAEditar] = NombreDelGasto;
        listaValorGasto[posicionAEditar] = ValorGasto;
        posicionAEditar = null;  // Restablecer la variable de edición
        cambiarTextoYFuncionBoton('Agregar', agregar);  // Cambiar el texto del botón de nuevo a 'Agregar'
    }

    actualizarListaDeGastos();
    limpiar();
}

// Función para actualizar la lista de gastos
function actualizarListaDeGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    let htmLista = '';
    let totalElementos = document.getElementById('totalGastos');
    let totalGastos = 0;

    listaNombreGastos.forEach((elemento, posicion) => {
        const valorGasto = Number(listaValorGasto[posicion]);
        htmLista += `<li> ${elemento} - COP ${valorGasto.toLocaleString('es-CO', { minimumFractionDigits: 2 })}  
        <button onclick='eliminar(${posicion})'>Eliminar</button> 
        <button onclick='editar(${posicion})'>Editar</button></li>`;
        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmLista;
    totalElementos.innerHTML = totalGastos.toLocaleString('es-CO', { minimumFractionDigits: 2 });

    // Alerta si el total supera 600,000 COP
    if (totalGastos > 600000) {
        alert('¡Atención! El total de gastos ha superado los 600,000 COP.');
    }
}

// Función para limpiar los campos de entrada
function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
}

// Función para eliminar un gasto
function eliminar(posicion) {
    listaNombreGastos.splice(posicion, 1);
    listaValorGasto.splice(posicion, 1);
    actualizarListaDeGastos();
}

// Función para editar un gasto
function editar(posicion) {
    // Rellenar los campos con el valor a editar
    document.getElementById('nombreGasto').value = listaNombreGastos[posicion];
    document.getElementById('valorGasto').value = listaValorGasto[posicion];
    
    // Cambiar el texto del botón a 'Actualizar' y asignar la función de actualizar
    cambiarTextoYFuncionBoton('Actualizar', agregar);
    posicionAEditar = posicion;  // Guardar la posición del gasto a editar
}

// Función para cambiar el texto y la función del botón
function cambiarTextoYFuncionBoton(texto, funcion) {
    const boton = document.getElementById('botonFormulario');
    boton.textContent = texto;       // Cambiar el texto del botón
    boton.onclick = funcion;         // Cambiar la función que se ejecuta al hacer clic
}
