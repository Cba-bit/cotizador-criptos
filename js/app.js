const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedasSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: '',
};

// Crear un promise
const obtenerCriptomonedas = (criptomonedas) =>
    new Promise((resolve) => {
        resolve(criptomonedas);
    });

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedasSelect.addEventListener('change', leerValor);
});

function consultarCriptomonedas() {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

    fetch(url)
        .then((respuesta) => respuesta.json())
        .then((resultado) => obtenerCriptomonedas(resultado.Data))
        .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
    criptomonedas.forEach((cripto) => {
        const { FullName, Name } = cripto.CoinInfo;

        const options = document.createElement('option');
        options.value = Name;
        options.textContent = FullName;

        criptomonedasSelect.appendChild(options);
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
    e.preventDefault();

    // Validar

    const { moneda, criptomoneda } = objBusqueda;
    if (moneda === '' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios');
        return;
    }
}

function mostrarAlerta(mensaje) {
    console.log(mensaje);
}
