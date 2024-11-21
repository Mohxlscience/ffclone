document.addEventListener("DOMContentLoaded", async () => {
    const elements = {
        sendAmountInput: document.getElementById("select_amount_from"),
        receiveAmountInput: document.getElementById("select_amount_to"),
        sendCurrencyName: document.getElementById("select_ccyname_from"),
        receiveCurrencyName: document.getElementById("select_ccyname_to"),
        rateUsdFrom: document.getElementById("rate_usd_from"),
        rateUsdTo: document.getElementById("rate_usd_to"),
        reverseButton: document.getElementById("btn_reverse"),
    };

    const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
    let btcToUsd = 0;
    let ethToUsd = 0;

    /**
     * Récupère les taux de conversion depuis l'API
     */
    const fetchCryptoRates = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            btcToUsd = data.bitcoin.usd;
            ethToUsd = data.ethereum.usd;
        } catch (error) {
            console.error("Erreur lors de la récupération des taux de conversion :", error);
        }
    };

    /**
     * Initialise les valeurs par défaut pour les champs et les étiquettes
     */
    const initializeDefaultValues = () => {
        const defaultBTCValue = 0.00062917;
        const convertedValue = ((defaultBTCValue * btcToUsd) / ethToUsd).toFixed(8);

        elements.sendAmountInput.value = defaultBTCValue;
        elements.receiveAmountInput.value = convertedValue;

        if (elements.sendCurrencyName) elements.sendCurrencyName.textContent = "Bitcoin";
        if (elements.receiveCurrencyName) elements.receiveCurrencyName.textContent = "Ethereum";

        if (elements.rateUsdFrom) elements.rateUsdFrom.textContent = `1 BTC = $${btcToUsd}`;
        if (elements.rateUsdTo) elements.rateUsdTo.textContent = `1 ETH = $${ethToUsd}`;
    };

    /**
     * Inverse les valeurs et étiquettes entre les sections Send et Receive
     */
    const reverseSections = () => {
        [elements.sendAmountInput.value, elements.receiveAmountInput.value] =
            [elements.receiveAmountInput.value, elements.sendAmountInput.value];

        [elements.sendCurrencyName.textContent, elements.receiveCurrencyName.textContent] =
            [elements.receiveCurrencyName.textContent, elements.sendCurrencyName.textContent];

        [elements.rateUsdFrom.textContent, elements.rateUsdTo.textContent] =
            [elements.rateUsdTo.textContent, elements.rateUsdFrom.textContent];
    };

    /**
     * Configure les options interactives pour les sections Send et Receive
     */
    const configureOptions = (optionsSelector, ccyNameId, labelId, maxMinContainerId, currencyLimits) => {
        const options = document.querySelectorAll(optionsSelector);
        const ccyName = document.getElementById(ccyNameId);
        const label = document.getElementById(labelId);
        const maxMinContainer = document.getElementById(maxMinContainerId);

        options.forEach(option => {
            option.addEventListener("click", () => {
                const name = option.querySelector(".coin-name").textContent.trim();
                const symbol = option.querySelector(".name").textContent.trim();
                const iconClass = Array.from(option.querySelector(".coin-ico").classList).find(cls => cls !== "coin-ico" && cls !== "svgcoin");

                if (ccyName) ccyName.textContent = name;
                if (label) label.innerHTML = `
                    <span class="coin-img svgcoin ${iconClass}"></span>
                    <span class="coin-name">
                        <span class="name">${symbol}</span>
                    </span>`;

                if (maxMinContainer && currencyLimits[symbol]) {
                    maxMinContainer.innerHTML = `
                        <button type="button" class="maxmin-value" data-value="${currencyLimits[symbol].min}">
                            <span class="prefix">min:</span>${currencyLimits[symbol].min}
                        </button>
                        <button type="button" class="maxmin-value" data-value="${currencyLimits[symbol].max}">
                            <span class="prefix">max:</span>${currencyLimits[symbol].max}
                        </button>`;
                }
            });
        });
    };

    // Initialiser les taux et les valeurs par défaut
    await fetchCryptoRates();
    initializeDefaultValues();

    // Configurer le bouton d'inversion
    if (elements.reverseButton) {
        elements.reverseButton.addEventListener("click", (event) => {
            event.preventDefault();
            reverseSections();
        });
    }

    // Configurer les options pour les sections Send et Receive
    const currencyLimits = {
        'BTC': { min: '0.00023605 BTC', max: '1.44540475 BTC' },
        'ETH': { min: '0.005 ETH', max: '40.499034 ETH' },
        'USDT': { min: '10 USDT', max: '10000 USDT' },
        'XMR': { min: '0.01 XMR', max: '500 XMR' },
        'BNB': { min: '0.1 BNB', max: '1000 BNB' },
    };

    configureOptions(".ui-select-outer.send .ui-select-option", "select_ccyname_from", "select_label_from", "select_maxmin_from", currencyLimits);
    configureOptions(".ui-select-outer.receive .ui-select-option", "select_ccyname_to", "select_label_to", "select_maxmin_to", currencyLimits);
});
