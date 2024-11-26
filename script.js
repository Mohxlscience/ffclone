          // Variables globales - Déclarer ces variables en haut du script
          let selectedFromCurrency = "bitcoin"; // Devise par défaut pour "Send"
          let selectedToCurrency = "ethereum"; // Devise par défaut pour "Receive"
          
          // Éléments du DOM
          const sendAmountInput = document.getElementById("select_amount_from");
          const receiveAmountInput = document.getElementById("select_amount_to");
          
          // Ensuite, configurer les autres éléments...
          
                        document.addEventListener("DOMContentLoaded", async () => {
              const sendAmountInput = document.getElementById("select_amount_from"); // Input pour Send
              const receiveAmountInput = document.getElementById("select_amount_to"); // Input pour Receive
              const sendCurrencyName = document.getElementById("select_ccyname_from"); // Nom devise Send
              const receiveCurrencyName = document.getElementById("select_ccyname_to"); // Nom devise Receive
          
              // Montants fixes pour chaque crypto
              const cryptoRates = {
                  btc: 94966.96,
                  eth: 3354.07,
                  tether: 1.00,
                  bnb: 620.93,
                  monero: 161.32
              };
          
              // Fonction pour initialiser les valeurs par défaut
              const initializeDefaultValues = () => {
                  const defaultBTCValue = 0.00062917; // Valeur par défaut en BTC
                  // Mettre la valeur par défaut dans Send
                  sendAmountInput.value = defaultBTCValue;
                  // Calculer la conversion en ETH basée sur les taux fixes
                  const convertedValue = ((defaultBTCValue * cryptoRates.btc) / cryptoRates.eth).toFixed(8);
                  // Mettre à jour Receive avec la valeur convertie
                  receiveAmountInput.value = convertedValue;
                  // Définir les noms des devises
                  if (sendCurrencyName) sendCurrencyName.textContent = "Bitcoin";
                  if (receiveCurrencyName) receiveCurrencyName.textContent = "Ethereum";
                  // Mettre à jour les taux en USD
                  const rateUsdFrom = document.getElementById("rate_usd_from");
                  const rateUsdTo = document.getElementById("rate_usd_to");
                  if (rateUsdFrom) rateUsdFrom.textContent = `$${cryptoRates.btc}`;
                  if (rateUsdTo) rateUsdTo.textContent = `$${cryptoRates.eth}`;
              };
              // Initialiser les valeurs par défaut
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
          
                  // Inverser les valeurs min et max
                  const sendMaxMin = document.getElementById("select_maxmin_from");
                  const receiveMaxMin = document.getElementById("select_maxmin_to");
                  if (sendMaxMin && receiveMaxMin) {
                      const tempMaxMinHTML = sendMaxMin.innerHTML;
                      sendMaxMin.innerHTML = receiveMaxMin.innerHTML;
                      receiveMaxMin.innerHTML = tempMaxMinHTML;
                  }
          
                  // Inverser les taux entre les cryptomonnaies
                  const rateFrom = document.getElementById("select_rate_from");
                  const rateTo = document.getElementById("select_rate_to");
                  if (rateFrom && rateTo) {
                      const tempRateHTML = rateFrom.innerHTML;
                      rateFrom.innerHTML = rateTo.innerHTML;
                      rateTo.innerHTML = tempRateHTML;
                  }
          
                  
              // Mettre à jour les variables globales pour refléter l'inversion
              const tempCurrency = selectedFromCurrency;
              selectedFromCurrency = selectedToCurrency;
              selectedToCurrency = tempCurrency;
          
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
              const cryptoRates = {
                  bitcoin: 94966.96,
                  ethereum: 3354.07,
                  tether: 1.00,
                  binancecoin: 620.93,
                  monero: 161.32,
              };
          
             // Dictionnaire pour correspondre les noms des crypto aux symboles
             const cryptoSymbols = {
                 bitcoin: "BTC",
                 ethereum: "ETH",
                 litecoin: "LTC",
                 ripple: "XRP",
                 binancecoin: "BNB",
                 monero: "XMR",
                 tether: "USDT",
             };
          
           // Fonction pour obtenir le taux de conversion entre deux cryptomonnaies
           const getConversionRate = (from, to) => {
              const fromRate = cryptoRates[from.toLowerCase()] || 0;
              const toRate = cryptoRates[to.toLowerCase()] || 0;
              return fromRate && toRate ? fromRate / toRate : null;
          };
          
          // Fonction pour mettre à jour la valeur "Receive"
          const updateReceiveValue = (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
              const sendAmount = parseFloat(sendAmountInput.value) || 0;
              if (sendAmount > 0) {
                  const conversionRate = getConversionRate(fromCurrency, toCurrency);
                  if (conversionRate !== null) {
                      receiveAmountInput.value = (sendAmount * conversionRate).toFixed(6);
                  } else {
                      receiveAmountInput.value = "Error";
                  }
              } else {
                  receiveAmountInput.value = "";
              }
          };
          
          const updateSendValue = (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
              const receiveAmount = parseFloat(receiveAmountInput.value) || 0; // Récupérer la valeur entrée
              if (receiveAmount > 0) {
                  const conversionRate = getConversionRate(fromCurrency, toCurrency); // Taux de conversion
                  if (conversionRate !== null) {
                      // Calcul inverse pour obtenir "Send"
                      sendAmountInput.value = (receiveAmount / conversionRate).toFixed(6);
                  } else {
                      sendAmountInput.value = "Error"; // Si le taux est invalide
                  }
              } else {
                  sendAmountInput.value = ""; // Si aucune valeur n'est entrée
              }
          };
          
          
          // Fonction pour mettre à jour les taux en USD
          const updateUsdRates = (fromCurrency, toCurrency) => {
              const fromRate = cryptoRates[fromCurrency.toLowerCase()] || null;
              const toRate = cryptoRates[toCurrency.toLowerCase()] || null;
          
              const rateUsdFrom = document.getElementById("rate_usd_from");
              const rateUsdTo = document.getElementById("rate_usd_to");
          
              const sendAmount = parseFloat(document.getElementById("select_amount_from").value) || 0;
              const receiveAmount = parseFloat(document.getElementById("select_amount_to").value) || 0;
          
              if (fromRate !== null) {
                  const amountInUsdFrom = sendAmount * fromRate;
                  rateUsdFrom.innerText = sendAmount > 0
                      ? `$${amountInUsdFrom.toFixed(2)}`
                      : `$${fromRate.toFixed(2)}`;
              } else {
                  rateUsdFrom.innerText = "Error";
              }
          
              if (toRate !== null) {
                  const amountInUsdTo = receiveAmount * toRate;
                  rateUsdTo.innerText = receiveAmount > 0
                      ? `$${amountInUsdTo.toFixed(2)}`
                      : `$${toRate.toFixed(2)}`;
              } else {
                  rateUsdTo.innerText = "Error";
              }
          };
          const configureMaxMinButtons = (inputId, containerId, updateFunction, otherInputId) => {
              const input = document.getElementById(inputId);
              const otherInput = document.getElementById(otherInputId);
              const container = document.getElementById(containerId);
          
              if (input && container) {
                  container.addEventListener("click", async (event) => {
                      const button = event.target.closest(".maxmin-value");
                      if (button) {
                          let value = button.getAttribute("data-value");
                          if (value) {
                              // Extraire la valeur numérique
                              value = parseFloat(value.replace(/[^\d.]/g, "")) || 0;
                              input.value = value;
          
                              // Utilisez les devises actuelles sélectionnées
                              await updateFunction(
                                  selectedFromCurrency, // Devise actuelle "Send"
                                  selectedToCurrency,   // Devise actuelle "Receive"
                                  input,
                                  otherInput
                              );
          
                              // Met à jour les montants en USD
                              updateUsdRates(selectedFromCurrency, selectedToCurrency);
                          }
                      }
                  });
              }
          };
          
          
          // Fonction pour gérer la sélection de crypto et stocker dans localStorage
          const handleCryptoSelection = (event) => {
              const selectedCrypto = event.currentTarget.getAttribute("data-api-value").toLowerCase(); // Nom complet en minuscules
              const isSendCurrency = event.currentTarget.closest(".ui-select-outer").classList.contains("send");
          
              // Identifie le type de crypto sélectionnée (Send ou Receive)
              const cryptoType = isSendCurrency ? "sendCrypto" : "receiveCrypto";
          
              // Récupère le symbole depuis le dictionnaire
              const cryptoSymbol = cryptoSymbols[selectedCrypto] || selectedCrypto;
          
              // Stocke la sélection (symbole) dans localStorage
              localStorage.setItem(cryptoType, cryptoSymbol);
          
              console.log(`${cryptoType} sélectionné : ${cryptoSymbol}`);
          };
          
          
          
          const configureCurrencySelection = (optionsSelector) => {
              const options = document.querySelectorAll(optionsSelector);
              options.forEach(option => {
                  option.addEventListener("click", (event) => {
                      const currency = option.getAttribute("data-api-value").toLowerCase();
                      const isSendCurrency = option.closest('.ui-select-outer').classList.contains('send');
          
                      if (isSendCurrency) {
                          selectedFromCurrency = currency;
                          updateUsdRates(selectedFromCurrency, selectedToCurrency);
                          updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
                      } else {
                          selectedToCurrency = currency;
                          updateUsdRates(selectedFromCurrency, selectedToCurrency);
                          updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
                      }
          
                      // Appeler la fonction pour gérer la sélection et stocker dans localStorage
                      handleCryptoSelection(event);
          
                      // Mettre à jour les affichages avec les symboles
                      updateDisplayedCurrencies();
                  });
              });
          };
          
          
             // Configurer les événements pour les devises
             configureCurrencySelection(".ui-select-option");
          
             sendAmountInput.addEventListener("input", () => {
             updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
             updateUsdRates(selectedFromCurrency, selectedToCurrency); // Met à jour les montants en USD
          });
          
          receiveAmountInput.addEventListener("input", () => {
             updateSendValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
             updateUsdRates(selectedFromCurrency, selectedToCurrency); // Met à jour les montants en USD
          });
          
             // Configurer Max/Min pour Send et Receive
             configureMaxMinButtons(
                 "select_amount_from",
                 "select_maxmin_from",
                 updateReceiveValue,
                 "select_amount_to",
                 selectedFromCurrency,
                 selectedToCurrency
             );
             configureMaxMinButtons(
                 "select_amount_to",
                 "select_maxmin_to",
                 updateSendValue,
                 "select_amount_from",
                 selectedFromCurrency,
                 selectedToCurrency
             );
          
             // Initialiser les taux en USD
             updateUsdRates(selectedFromCurrency, selectedToCurrency);
          });
          
          document.addEventListener("DOMContentLoaded", () => {
              // Montants fixes pour chaque crypto
              const cryptoRates = {
                  bitcoin: 94966.96,
                  ethereum: 3354.07,
                  tether: 1.00,
                  binancecoin: 620.93,
                  monero: 161.32,
              };
          
              // Dictionnaire pour correspondre les noms des crypto aux symboles
              const cryptoSymbols = {
                  bitcoin: "BTC",
                  ethereum: "ETH",
                  tether: "USDT",
                  binancecoin: "BNB",
                  monero: "XMR",
              };
          
              // Fonction pour calculer le taux de conversion
              const getConversionRate = (from, to) => {
                  const fromToUsd = cryptoRates[from] || 0;
                  const toToUsd = cryptoRates[to] || 0;
          
                  // Si l'une des devises n'a pas de taux valide, retourner null
                  if (fromToUsd === 0 || toToUsd === 0) {
                      return null;
                  }
          
                  // Retourne le taux de conversion
                  return fromToUsd / toToUsd;
              };
          
              // Fonction pour mettre à jour la valeur "Receive"
              const updateReceiveValue = (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
                  const sendAmount = parseFloat(sendAmountInput.value) || 0;
                  if (sendAmount > 0) {
                      const conversionRate = getConversionRate(fromCurrency, toCurrency);
                      if (conversionRate !== null) {
                          receiveAmountInput.value = (sendAmount * conversionRate).toFixed(6);
                          updateRateDisplay(fromCurrency, toCurrency, conversionRate); // Mise à jour des taux de conversion affichés
                      } else {
                          receiveAmountInput.value = "Error";
                      }
                  } else {
                      receiveAmountInput.value = "";
                  }
              };
          
              // Fonction pour mettre à jour la valeur "Send"
              const updateSendValue = (fromCurrency, toCurrency, sendAmountInput, receiveAmountInput) => {
                  const receiveAmount = parseFloat(receiveAmountInput.value) || 0;
                  if (receiveAmount > 0) {
                      const conversionRate = getConversionRate(fromCurrency, toCurrency);
                      if (conversionRate !== null) {
                          sendAmountInput.value = (receiveAmount / conversionRate).toFixed(6);
                          updateRateDisplay(fromCurrency, toCurrency, conversionRate); // Mise à jour des taux de conversion affichés
                      } else {
                          sendAmountInput.value = "Error";
                      }
                  } else {
                      sendAmountInput.value = "";
                  }
              };
          
              // Fonction pour mettre à jour les taux affichés
              const updateRateDisplay = (fromCurrency, toCurrency, conversionRate) => {
                  const rateFrom = document.getElementById("select_rate_from");
                  const rateTo = document.getElementById("select_rate_to");
          
                  if (rateFrom && rateTo && conversionRate !== null) {
                      // Mise à jour du taux de la devise "From"
                      rateFrom.innerText = `1 ${cryptoSymbols[fromCurrency]} ≈ ${conversionRate.toFixed(8)} ${cryptoSymbols[toCurrency]}`;
          
                      // Mise à jour du taux de la devise "To"
                      rateTo.innerText = `1 ${cryptoSymbols[toCurrency]} ≈ ${(1 / conversionRate).toFixed(8)} ${cryptoSymbols[fromCurrency]}`;
                  }
              };
          
              
          
              document.querySelectorAll(".ui-select-option").forEach(option => {
              option.addEventListener("click", () => {
                  const currency = option.getAttribute("data-api-value").toLowerCase();
                  const isSendCurrency = option.closest('.ui-select-outer').classList.contains('send');
          
                  if (isSendCurrency) {
                      selectedFromCurrency = currency;
                      console.log("Devise Send mise à jour :", selectedFromCurrency);
                  } else {
                      selectedToCurrency = currency;
                      console.log("Devise Receive mise à jour :", selectedToCurrency);
                  }
          
                  updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
              });
          });
          
              // Ajouter des événements d'input
              sendAmountInput.addEventListener("input", () => {
                  updateReceiveValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
              });
          
              receiveAmountInput.addEventListener("input", () => {
                  updateSendValue(selectedFromCurrency, selectedToCurrency, sendAmountInput, receiveAmountInput);
              });
          
              // Initialiser les taux de conversion et les valeurs affichées
              const initialRate = getConversionRate(selectedFromCurrency, selectedToCurrency);
              if (initialRate !== null) {
                  updateRateDisplay(selectedFromCurrency, selectedToCurrency, initialRate);
              }
          });
          