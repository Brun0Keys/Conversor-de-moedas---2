const API_KEY = 'a8f370622499b5b1b3dfd3af';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/BRL`;

document.addEventListener('DOMContentLoaded', () => {
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convert');

    const currencyDisplay = {
        'BRL': { name: 'Real Brasileiro', flag: './img/flags/brasil.png', coin: './img/coins/real-brasileiro.png' },
        'USD': { name: 'Dólar Americano', flag: './img/flags/estados-unidos.png', coin: './img/coins/dolar.png' },
        'EUR': { name: 'Euro', flag: './img/flags/uniao-europeia.png', coin: './img/coins/euro.png' },
        'ARS': { name: 'Peso Argentino', flag: './img/flags/argentina.png', coin: './img/coins/peso.png' },
        'GBP': { name: 'Libra Esterlina', flag: './img/flags/reino-unido.png', coin: './img/coins/libra.png' },
        'CNY': { name: 'Yuan Chinês', flag: './img/flags/china.png', coin: './img/coins/yuan.png' },
        'AED': { name: 'Dirham dos Emirados Árabes Unidos', flag: './img/flags/emirados-arabes-unidos.png', coin: './img/coins/dirham.png' },
        'INR': { name: 'Rupia Indiana', flag: './img/flags/india.png', coin: './img/coins/rupiah.png' },
        'CHF': { name: 'Franco Suíço', flag: './img/flags/suica.png', coin: './img/coins/franco.png' },
        'HUF': { name: 'Florim Húngaro', flag: './img/flags/hungria.png', coin: './img/coins/florim.png' }
    };

    let exchangeRates = {};

    function updateDisplay() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Update the display for the selected 'from' currency
        const fromCurrencyInfo = currencyDisplay[fromCurrency];
        document.getElementById('currency-flag').src = fromCurrencyInfo.flag;
        document.getElementById('currency-name').textContent = fromCurrencyInfo.name;

        // Update the display for the selected 'to' currency
        const toCurrencyInfo = currencyDisplay[toCurrency];
        document.getElementById('converted-currency-flag').src = toCurrencyInfo.flag;
        document.getElementById('converted-currency-name').textContent = toCurrencyInfo.name;

        // Set initial values
        document.getElementById('currency-value').textContent = `R$ ${amountInput.value || '0,00'}`;
        document.getElementById('converted-currency-value').textContent = `${toCurrencyInfo.symbol || 'R$'} 0,00`;
    }

    function fetchExchangeRates() {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                exchangeRates = data.conversion_rates;
                updateDisplay();
            })
            .catch(error => console.error('Error fetching exchange rates:', error));
    }

    function convertCurrency() {
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;
        const amount = parseFloat(amountInput.value.replace(',', '.'));

        if (isNaN(amount)) {
            alert('Por favor, insira um valor válido.');
            return;
        }

        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        const convertedAmount = (amount * rate).toFixed(2);
        const formattedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: toCurrency }).format(convertedAmount);

        document.getElementById('converted-currency-value').textContent = formattedAmount;
    }

    fromCurrencySelect.addEventListener('change', () => {
        updateDisplay();
        convertCurrency();
    });

    toCurrencySelect.addEventListener('change', () => {
        updateDisplay();
        convertCurrency();
    });

    amountInput.addEventListener('input', convertCurrency);

    convertButton.addEventListener('click', convertCurrency);

    fetchExchangeRates();
});
