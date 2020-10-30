const criptomonedasSelect = document.querySelector('#criptomonedas');

// Crear un promise
const obtenerCriptomonedas = (criptomonedas) =>
    new Promise((resolve) => {
        resolve(criptomonedas);
    });

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptomonedas();
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
