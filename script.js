// Variables de sélection des éléments
const selectCurrencyFrom = document.getElementById("select_currency_from");
const selectCurrencyTo = document.getElementById("select_currency_to");
const selectAmountFrom = document.getElementById("select_amount_from");
const selectAmountTo = document.getElementById("select_amount_to");
const btnReverse = document.getElementById("btn_reverse");
const exchangeSubmit = document.getElementById("exchange_submit");
const receiveWallet = document.getElementById("receive_wallet");
const receiveExtraId = document.getElementById("receive_extraid");

// Fonction d'activation/désactivation du bouton d'échange
function checkFormCompletion() {
    // Active le bouton si tous les champs requis sont remplis
    if (
        selectCurrencyFrom.value &&
        selectCurrencyTo.value &&
        selectAmountFrom.value &&
        selectAmountTo.value &&
        receiveWallet.value
    ) {
        exchangeSubmit.classList.remove("disabled");
    } else {
        exchangeSubmit.classList.add("disabled");
    }
}

// Inverser les devises sélectionnées
btnReverse.addEventListener("click", function () {
    const tempCurrency = selectCurrencyFrom.value;
    selectCurrencyFrom.value = selectCurrencyTo.value;
    selectCurrencyTo.value = tempCurrency;
    checkFormCompletion();
});

// Mettre à jour le montant reçu en fonction du montant envoyé
selectAmountFrom.addEventListener("input", function () {
    const rate = selectCurrencyFrom.value === "BTC" ? 1.05 : 1.02; // Exemple de taux fictif
    selectAmountTo.value = (parseFloat(selectAmountFrom.value) * rate).toFixed(2);
    checkFormCompletion();
});

// Vérifier si l'adresse de portefeuille est remplie
receiveWallet.addEventListener("input", function () {
    const isValid = receiveWallet.value.length >= 26; // Ex: vérifie si l'adresse a un minimum de 26 caractères
    document.getElementById("receive_wallet_error").style.display = isValid ? "none" : "inline";
    checkFormCompletion();
});

// Activer le bouton d'échange une fois le formulaire rempli
document.querySelectorAll("input, select, textarea").forEach((element) => {
    element.addEventListener("input", checkFormCompletion);
});

// Gestion du type de taux sélectionné
document.querySelectorAll("input[name='select_type_from']").forEach((radio) => {
    radio.addEventListener("change", function () {
        const rateType = radio.value;
        document.getElementById("type_difference").innerText = rateType === "fixed" ?
            "Taux fixe sélectionné" : "Taux flottant sélectionné";
    });
});

// Action lors de la soumission du formulaire
exchangeSubmit.addEventListener("click", function (e) {
    e.preventDefault();
    if (!exchangeSubmit.classList.contains("disabled")) {
        alert("Échange lancé ! Traitement de votre demande...");
        // Code d'exécution de l'échange ou d'envoi de données peut être ajouté ici
    }
});

// Copier/Coller le texte du presse-papiers
document.getElementById("wallet_paste").addEventListener("click", async function () {
    try {
        const text = await navigator.clipboard.readText();
        receiveWallet.value = text;
        checkFormCompletion();
    } catch (err) {
        alert("Impossible de coller le texte");
    }
});

// Nettoyer les champs
document.getElementById("wallet_clear").addEventListener("click", function () {
    receiveWallet.value = "";
    checkFormCompletion();
});
document.getElementById("extraid_clear").addEventListener("click", function () {
    receiveExtraId.value = "";
});

// Initialisation des valeurs par défaut
checkFormCompletion();
