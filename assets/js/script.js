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