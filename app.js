const apiKey = '89f956179ae6417f8c6ac66b';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function getCurrencies() {
    const response = await fetch(apiURL);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    let fromCurrency = document.getElementById("fromCurrency");
    let toCurrency = document.getElementById("toCurrency");

    currencies.forEach(currency => {
        let optionFrom = document.createElement("option");
        optionFrom.text = currency;
        fromCurrency.add(optionFrom);

        let optionTo = document.createElement("option");
        optionTo.text = currency;
        toCurrency.add(optionTo);
    });
}

async function convertCurrency() {
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;
    let amount = document.getElementById("amount").value;

    if (amount === '') {
        alert("Please enter an amount");
        return;
    }

    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
    const data = await response.json();

    let result = document.getElementById("result");
    result.innerText = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
}

document.getElementById("convertBtn").addEventListener("click", convertCurrency);

// Call function to populate currency options on load
getCurrencies();
