
let ingresos = [];
let gastos = [];


window.onload = function () {
  if (localStorage.getItem('ingresos')) {
    ingresos = JSON.parse(localStorage.getItem('ingresos'));
  }
  if (localStorage.getItem('gastos')) {
    gastos = JSON.parse(localStorage.getItem('gastos'));
  }
  mostrarPresupuesto();
};

// Funciones para manejar eventos
function agregarIngreso() {
  const descripcion = document.getElementById('descripcion-ingreso').value;
  const monto = parseFloat(document.getElementById('monto-ingreso').value);

  if (descripcion && !isNaN(monto) && monto > 0) {
    ingresos.push({ descripcion, monto });
    localStorage.setItem('ingresos', JSON.stringify(ingresos));
    mostrarPresupuesto();
  }
}

function agregarGasto() {
  const descripcion = document.getElementById('descripcion-gasto').value;
  const monto = parseFloat(document.getElementById('monto-gasto').value);

  if (descripcion && !isNaN(monto) && monto > 0) {
    gastos.push({ descripcion, monto });
    localStorage.setItem('gastos', JSON.stringify(gastos));
    mostrarPresupuesto();
  }
}

// Mostrar los datos en el DOM
function mostrarPresupuesto() {
  const listaIngresos = document.getElementById('lista-ingresos');
  const listaGastos = document.getElementById('lista-gastos');
  listaIngresos.innerHTML = '';
  listaGastos.innerHTML = '';

  let totalIngresos = 0;
  let totalGastos = 0;

  ingresos.forEach((ingreso) => {
    totalIngresos += ingreso.monto;
    const li = document.createElement('li');
    li.textContent = `${ingreso.descripcion}: $${ingreso.monto.toFixed(2)}`;
    listaIngresos.appendChild(li);
  });

  gastos.forEach((gasto) => {
    totalGastos += gasto.monto;
    const li = document.createElement('li');
    li.textContent = `${gasto.descripcion}: $${gasto.monto.toFixed(2)}`;
    listaGastos.appendChild(li);
  });

  const balance = totalIngresos - totalGastos;
  document.getElementById('total-ingresos').textContent = `$${totalIngresos.toFixed(2)}`;
  document.getElementById('total-gastos').textContent = `$${totalGastos.toFixed(2)}`;
  document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}

// Botones de evento
const botonIngreso = document.getElementById('agregar-ingreso');
botonIngreso.addEventListener('click', agregarIngreso);

const botonGasto = document.getElementById('agregar-gasto');
botonGasto.addEventListener('click', agregarGasto);