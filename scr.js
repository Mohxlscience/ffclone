document.addEventListener("DOMContentLoaded", () => {
    // Boutons
    const pasteButton = document.getElementById("wallet_paste");
    const clearButton = document.getElementById("wallet_clear");

    // Champ d'entrée cible
    const walletInput = document.getElementById("receive_wallet");

    // Fonction pour coller le contenu du presse-papiers
    pasteButton.addEventListener("click", async () => {
        try {
            const text = await navigator.clipboard.readText(); // Lire le presse-papiers
            if (walletInput) {
                walletInput.value = text; // Coller le texte dans le champ d'entrée
            }
        } catch (error) {
            console.error("Échec de la lecture du presse-papiers : ", error);
            alert("Impossible d'accéder au presse-papiers. Vérifiez les autorisations.");
        }
    });

    // Fonction pour effacer le contenu du champ d'entrée
    clearButton.addEventListener("click", () => {
        if (walletInput) {
            walletInput.value = ""; // Effacer le contenu
        }
    });
});
document.getElementById("exchange_submit").addEventListener("click", function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire par défaut

    // Récupération des valeurs des champs
    const sendAmount = document.getElementById("select_amount_from").value;
    const receiveAmount = document.getElementById("select_amount_to").value;
    const destinationAddress = document.getElementById("receive_wallet").value;

    // Vérification des valeurs (facultatif)
    if (!sendAmount || !receiveAmount || !destinationAddress) {
        alert("Veuillez remplir tous les champs !");
        return;
    }

    // Stockage des valeurs dans localStorage
    localStorage.setItem("sendAmount", sendAmount);
    localStorage.setItem("receiveAmount", receiveAmount);
    localStorage.setItem("destinationAddress", destinationAddress);
    
    // Redirection vers order.html
    window.location.href = "order.html";
});
















 // Fonction pour gérer la sélection de crypto et changer immédiatement le placeholder
 function handleCryptoSelection(event) {
    const selectedCrypto = event.currentTarget.getAttribute("data-value"); // Récupérer l'attribut data-value
    const cryptoType = event.currentTarget.closest(".ui-select-outer").classList.contains("send") ? "sendCrypto" : "receiveCrypto";

    console.log(`${cryptoType} sélectionné : ${selectedCrypto}`);

    // Si c'est la crypto de réception, mettre à jour immédiatement le placeholder
    if (cryptoType === "receiveCrypto") {
        updateReceivePlaceholder(selectedCrypto);
    }
}

// Fonction pour mettre à jour le placeholder du champ de réception
function updateReceivePlaceholder(crypto) {
    const receiveWalletField = document.getElementById("receive_wallet");
    if (receiveWalletField) {
        receiveWalletField.placeholder = `Your ${crypto} address`; // Met à jour immédiatement le placeholder
    }
}

// Ajout d'un écouteur d'événements pour tous les boutons/options de crypto
document.querySelectorAll(".crypto-option").forEach(option => {
    option.addEventListener("click", handleCryptoSelection);
});
// Fonction pour gérer la sélection de crypto et changer immédiatement le placeholder
function handleCryptoSelection(event) {
    const selectedElement = event.currentTarget; // Élément cliqué
    const selectedCryptoName = selectedElement.querySelector(".coin-name").textContent.trim(); // Récupérer le nom de la crypto

    console.log(`Crypto sélectionnée : ${selectedCryptoName}`);

    // Mettre à jour le placeholder du champ de réception
    updateReceivePlaceholder(selectedCryptoName);
}

// Fonction pour mettre à jour le placeholder du champ de réception
function updateReceivePlaceholder(cryptoName) {
    const receiveWalletField = document.getElementById("receive_wallet");
    if (receiveWalletField) {
        receiveWalletField.placeholder = `Your ${cryptoName} address`; // Met à jour le placeholder
    }
}

// Attacher les événements de clic aux options de crypto
document.querySelectorAll("#select_crypto_to .ui-select-option").forEach(option => {
    option.addEventListener("click", handleCryptoSelection);
});
















//  SUITE
document.addEventListener("DOMContentLoaded", () => {
    // Fonction générique pour configurer l'interaction d'un input avec son conteneur de boutons
    const configureMaxMinButtons = (inputId, containerId) => {
        const input = document.getElementById(inputId); // Sélectionne l'input
        const container = document.getElementById(containerId); // Sélectionne le conteneur
        // Vérifie que les éléments existent
        if (input && container) {
            container.addEventListener("click", (event) => {
                const button = event.target.closest(".maxmin-value"); // Vérifie si un bouton est cliqué
                if (button) {
                    const value = button.getAttribute("data-value"); // Récupère la valeur
                    if (value) {
                        input.value = value; // Met à jour l'input
                    }
                }
            });
        }
    };
    // Configurer les interactions pour les deux paires input-conteneur
    configureMaxMinButtons("select_amount_from", "select_maxmin_from");
    configureMaxMinButtons("select_amount_to", "select_maxmin_to");
});