 
            document.addEventListener("DOMContentLoaded", async () => {
 const sendAmountInput = document.getElementById("select_amount_from"); // Input pour Send
 const receiveAmountInput = document.getElementById("select_amount_to"); // Input pour Receive
 const sendCurrencyName = document.getElementById("select_ccyname_from"); // Nom devise Send
 const receiveCurrencyName = document.getElementById("select_ccyname_to"); // Nom devise Receive
 // API URL pour récupérer les données de CoinGecko
 const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";
 let btcToUsd = 0;
 let ethToUsd = 0;
 // Fonction pour récupérer les données de l'API
 const fetchCryptoRates = async () => {
     try {
         const response = await fetch(API_URL);
         const data = await response.json();
         // Récupérer les taux pour BTC et ETH
         btcToUsd = data.bitcoin.usd;
         ethToUsd = data.ethereum.usd;
     } catch (error) {
         console.error("Erreur lors de la récupération des taux de conversion :", error);
     }
 };
 // Fonction pour initialiser les valeurs par défaut
 const initializeDefaultValues = () => {
     const defaultBTCValue = 0.00062917; // Valeur par défaut en BTC
     // Mettre la valeur par défaut dans Send
     sendAmountInput.value = defaultBTCValue;
     // Calculer la conversion en ETH basée sur les taux actuels
     const convertedValue = ((defaultBTCValue * btcToUsd) / ethToUsd).toFixed(8);
     // Mettre à jour Receive avec la valeur convertie
     receiveAmountInput.value = convertedValue;
     // Définir les noms des devises
     if (sendCurrencyName) sendCurrencyName.textContent = "Bitcoin";
     if (receiveCurrencyName) receiveCurrencyName.textContent = "Ethereum";
     // Mettre à jour les taux en USD
     const rateUsdFrom = document.getElementById("rate_usd_from");
     const rateUsdTo = document.getElementById("rate_usd_to");
     if (rateUsdFrom) rateUsdFrom.textContent = `1 BTC = $${btcToUsd}`;
     if (rateUsdTo) rateUsdTo.textContent = `1 ETH = $${ethToUsd}`;
 };
 // Appeler l'API pour récupérer les taux, puis initialiser les valeurs
 await fetchCryptoRates();
 initializeDefaultValues();
});
document.addEventListener("DOMContentLoaded", () => {
 const reverseButton = document.getElementById("btn_reverse"); // Bouton reverse
 const sendAmountInput = document.getElementById("select_amount_from"); // Input pour Send
 const receiveAmountInput = document.getElementById("select_amount_to"); // Input pour Receive
 // Fonction pour inverser les contenus des sections
 const reverseSections = () => {
     // Échanger les valeurs dans les inputs
     const sendValue = sendAmountInput.value;
     const receiveValue = receiveAmountInput.value;
     sendAmountInput.value = receiveValue;
     receiveAmountInput.value = sendValue;
     // Échanger les devises affichées dans les labels
     const sendLabel = document.getElementById("select_label_from");
     const receiveLabel = document.getElementById("select_label_to");
     if (sendLabel && receiveLabel) {
         const tempSendLabelHTML = sendLabel.innerHTML;
         sendLabel.innerHTML = receiveLabel.innerHTML;
         receiveLabel.innerHTML = tempSendLabelHTML;
     }
     // Inverser les devises dans les sections Send/Receive
     const sendCurrencyName = document.getElementById("select_ccyname_from");
     const receiveCurrencyName = document.getElementById("select_ccyname_to");
     if (sendCurrencyName && receiveCurrencyName) {
         const tempName = sendCurrencyName.textContent.trim();
         sendCurrencyName.textContent = receiveCurrencyName.textContent.trim();
         receiveCurrencyName.textContent = tempName;
     }
     // Inverser les taux en USD
     const rateUsdFrom = document.getElementById("rate_usd_from");
     const rateUsdTo = document.getElementById("rate_usd_to");
     if (rateUsdFrom && rateUsdTo) {
         const tempRate = rateUsdFrom.textContent.trim();
         rateUsdFrom.textContent = rateUsdTo.textContent.trim();
         rateUsdTo.textContent = tempRate;
     }
     // Inverser les titres des sections Send/Receive
     const sendHeader = document.querySelector(".wrap-header.exch-header header");
     const receiveHeader = document.querySelector(".wrap-footer.exch-footer header");
     if (sendHeader && receiveHeader) {
         const tempHeader = sendHeader.textContent.trim();
         sendHeader.textContent = receiveHeader.textContent.trim();
         receiveHeader.textContent = tempHeader;
     }
     // Inverser colSelector
     const colFrom = document.querySelector(".col[data-value]");
     const colTo = document.querySelector(".col[data-value]:not([data-value='" + colFrom.getAttribute("data-value") + "'])");
     if (colFrom && colTo) {
         const tempColValue = colFrom.getAttribute("data-value");
         colFrom.setAttribute("data-value", colTo.getAttribute("data-value"));
         colTo.setAttribute("data-value", tempColValue);
     }
     // Inverser btnReverseId
     const btnReverseFrom = document.getElementById("btn_reverse_from");
     const btnReverseTo = document.getElementById("btn_reverse_to");
     if (btnReverseFrom && btnReverseTo) {
         const tempReverse = btnReverseFrom.getAttribute("data-value");
         btnReverseFrom.setAttribute("data-value", btnReverseTo.getAttribute("data-value"));
         btnReverseTo.setAttribute("data-value", tempReverse);
     }
     // Mettre à jour les taux en USD et effectuer des calculs si nécessaire
     updateUsdRates();
     updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
 };
 // Ajouter un événement au bouton reverse
 reverseButton.addEventListener("click", (event) => {
     event.preventDefault(); // Empêcher le comportement par défaut
     reverseSections(); // Appeler la fonction pour inverser les sections
 });
});
document.addEventListener("DOMContentLoaded", () => {
 // Fonction pour configurer les options de chaque section
 const configureOptions = (optionsSelector, ccyNameId, labelId, btnReverseId, colSelector, maxMinContainerId) => {
     const options = document.querySelectorAll(optionsSelector); // Options de la section
     const ccyName = document.getElementById(ccyNameId); // Nom complet
     const label = document.getElementById(labelId); // Label
     const btnReverse = document.getElementById(btnReverseId); // Bouton d'échange
     const colDiv = document.querySelector(colSelector); // Div pour la valeur
     // Dictionnaire des valeurs min et max pour chaque devise
     const currencyLimits = {
         'BTC': {
             min: '0.00023605 BTC',
             max: '1.44540475 BTC'
         },
         'ETH': {
             min: '0.005 ETH',
             max: '40.499034 ETH'
         },
         'USDT': {
             min: '10 USDT',
             max: '10000 USDT'
         },
         'XMR': {
             min: '0.01 XMR',
             max: '500 XMR'
         },
         'BNB': {
             min: '0.1 BNB',
             max: '1000 BNB'
         }
     };
     // Fonction pour mettre à jour les informations
     const updateSelectedCurrency = (name, symbol, iconClass) => {
         ccyName.textContent = name; // Mettre à jour le nom complet
         label.innerHTML = `
            <span class="coin-img svgcoin ${iconClass}"></span>
            <span class="coin-name">
                <span class="name">${symbol}</span>
            </span>`;
         btnReverse.setAttribute("data-value", symbol); // Mettre à jour la valeur pour l'échange
         if (colDiv) {
             colDiv.setAttribute("data-value", symbol); // Mettre à jour la valeur dans le div
         }
         // Mettre à jour les valeurs min et max
         const maxMinContainer = document.getElementById(maxMinContainerId);
         if (maxMinContainer && currencyLimits[symbol]) {
             maxMinContainer.innerHTML = `
                <button type="button" class="maxmin-value" data-value="${currencyLimits[symbol].min}">
                    <span class="prefix">min:</span><span>${currencyLimits[symbol].min}</span>
                </button>
                <button type="button" class="maxmin-value" data-value="${currencyLimits[symbol].max}">
                    <span class="prefix">max:</span><span>${currencyLimits[symbol].max}</span>
                </button>`;
         }
     };
     // Écoute des clics sur chaque option
     options.forEach(option => {
         option.addEventListener("click", () => {
             const name = option.querySelector(".coin-outer .coin-name").textContent.trim();
             const symbol = option.querySelector(".coin-ticker .name").textContent.trim();
             const iconElement = option.querySelector(".coin-ico"); // Sélectionne l'élément contenant l'icône
             const iconClass = Array.from(iconElement.classList).find(cls => cls !== "coin-ico" && cls !== "svgcoin");
             updateSelectedCurrency(name, symbol, iconClass);
         });
     });
 };
 // Configurer la section "Send"
 configureOptions(
     ".ui-select-outer.send .ui-select-option", // Sélecteur des options
     "select_ccyname_from", // ID du nom de la devise
     "select_label_from", // ID du label
     "btn_reverse_from", // ID du bouton reverse
     ".col[data-value='BTC']", // Sélecteur pour le div Send
     "select_maxmin_from" // ID pour la mise à jour min/max de Send
 );
 // Configurer la section "Receive"
 configureOptions(
     ".ui-select-outer.receive .ui-select-option", // Sélecteur des options
     "select_ccyname_to", // ID du nom de la devise
     "select_label_to", // ID du label
     "btn_reverse_to", // ID du bouton reverse
     ".col[data-value='ETH']", // Sélecteur pour le div Receive
     "select_maxmin_to" // ID pour la mise à jour min/max de Receive
 );
});
// Fonction pour configurer le comportement d'une section (Send ou Receive)
function configureSection(labelId, outerDivClass, optionClass) {
 const label = document.getElementById(labelId); // Label spécifique (Send ou Receive)
 const outerDiv = document.querySelector(`.${outerDivClass}`); // Conteneur principal
 const options = outerDiv.querySelectorAll(`.${optionClass}`); // Options dans la liste (liées à ce menu)
 // Basculer la classe "active" lorsque le label est cliqué
 label.addEventListener('click', (event) => {
     event.stopPropagation(); // Empêche la propagation du clic
     outerDiv.classList.toggle('active'); // Ajoute ou enlève "active"
 });
 // Fermer le menu si on clique à l'extérieur
 document.addEventListener('click', (event) => {
     if (!label.contains(event.target) && !outerDiv.contains(event.target)) {
         outerDiv.classList.remove('active');
     }
 });
 // Gérer le clic sur une option
 options.forEach((option) => {
     option.addEventListener('click', () => {
         // Met à jour les éléments visuels selon l'option choisie
         const value = option.getAttribute('data-value');
         const coinName = option.querySelector('.coin-name').textContent;
         const coinClass = option.querySelector('.coin-ico').classList[2]; // Récupère la classe spécifique de l'icône
         // Met à jour le label avec les données choisies
         const coinImg = label.querySelector('.coin-img');
         const coinLabel = label.querySelector('.coin-name .name');
         if (coinImg && coinLabel) {
             coinImg.className = `coin-img svgcoin ${coinClass}`; // Change la classe de l'image
             coinLabel.textContent = value; // Met à jour le ticker (ex: ETH, BTC)
         }
         // Ferme le menu
         outerDiv.classList.remove('active');
     });
 });
}
// Configurer la section Send
configureSection('selectlabelfrom', 'ui-select-outer.send', 'ui-select-option');
// Configurer la section Receive
configureSection('selectlabelto', 'ui-select-outer.receive', 'ui-select-option');
document.addEventListener("DOMContentLoaded", () => {
const apiUrl = "https://api.coingecko.com/api/v3/simple/price";

// Fonction pour récupérer le taux de conversion entre deux cryptos
const fetchConversionRate = async (from, to) => {
    try {
        const response = await fetch(`${apiUrl}?ids=${from},${to}&vs_currencies=usd`);
        const data = await response.json();
        const fromToUsd = data[from]?.usd || 0;
        const toToUsd = data[to]?.usd || 0;
        return fromToUsd && toToUsd ? fromToUsd / toToUsd : null;
    } catch (error) {
        console.error("Erreur lors de la récupération du taux de conversion:", error);
        return null;
    }
};

// Fonction pour mettre à jour la valeur "Receive"
const updateReceiveValue = async (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
    const sendAmount = parseFloat(sendAmountInput.value) || 0;
    if (sendAmount > 0) {
        const rate = await fetchConversionRate(fromCurrency, toCurrency);
        if (rate !== null) {
            receiveAmountInput.value = (sendAmount * rate).toFixed(6);
        } else {
            receiveAmountInput.value = "Erreur";
        }
    } else {
        receiveAmountInput.value = "";
    }
};

// Fonction pour mettre à jour la valeur "Send"
const updateSendValue = async (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
    const receiveAmount = parseFloat(receiveAmountInput.value) || 0;
    if (receiveAmount > 0) {
        const rate = await fetchConversionRate(toCurrency, fromCurrency);
        if (rate !== null) {
            sendAmountInput.value = (receiveAmount * rate).toFixed(6);
        } else {
            sendAmountInput.value = "Erreur";
        }
    } else {
        sendAmountInput.value = "";
    }
};

// Récupérer les éléments DOM
const sendAmountInput = document.getElementById("select_amount_from");
const receiveAmountInput = document.getElementById("select_amount_to");

// Variables pour stocker les devises sélectionnées
let selectedFromCurrency = "bitcoin"; // Par défaut
let selectedToCurrency = "ethereum"; // Par défaut

// Écouteurs pour les sélecteurs de devises
const fromCurrencySelect = document.getElementById("from_currency");
const toCurrencySelect = document.getElementById("to_currency");

if (fromCurrencySelect && toCurrencySelect) {
    fromCurrencySelect.addEventListener("change", () => {
        selectedFromCurrency = fromCurrencySelect.value;
        updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
    });

    toCurrencySelect.addEventListener("change", () => {
        selectedToCurrency = toCurrencySelect.value;
        updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
    });
}

// Fonction pour configurer les interactions avec les boutons "Max" et "Min"
const configureMaxMinButtons = (inputId, containerId, isSendInput) => {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);

    if (input && container) {
        container.addEventListener("click", async (event) => {
            const button = event.target.closest(".maxmin-value");
            if (button) {
                const value = button.getAttribute("data-value");
                if (value) {
                    input.value = value; // Met à jour la valeur de l'input
                    // Met à jour l'autre champ en fonction de la crypto sélectionnée
                    if (isSendInput) {
                        await updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
                    } else {
                        await updateSendValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
                    }
                }
            }
        });
    }
};

// Configure les interactions pour les boutons "Max" et "Min"
configureMaxMinButtons("select_amount_from", "select_maxmin_from", true);
configureMaxMinButtons("select_amount_to", "select_maxmin_to", false);

// Ajouter des événements pour la saisie dynamique
sendAmountInput.addEventListener("input", () => {
    updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
});

receiveAmountInput.addEventListener("input", () => {
    updateSendValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
});
});