const messages = {
    locale: 'it-IT',
    percentage: '10',
    currency: 'euro',
    currencySymbol: '€',
    termsUrl: '/info/terms-and-conditions#ii.just-eat-voucher-terms-conditions',
    termsText: 'Leggi Termini e condizioni',
    header: {
        title: 'Carte Fedeltà',
        text: 'Guarda quanti timbri hai raccolto e gli sconti maturati finora.',
        alt: 'Immagine per collezionare i tuoi timbri'
    },
    tabs: {
        stamps: {
            title: 'Le tue Carte Fedeltà',
            readyToClaimTitle: 'Riscatta il tuo sconto',
            inProgressTitle: 'In corso'
        },
        howItWorks: {
            title: 'Come funziona'
        }
    },
    stamps: {
        errorNoCards: {
            title: 'Ogni volta che ordini da un ristorante aderente al programma, puoi visualizzare i timbri raccolti qui.',
            subTitle: 'Non visualizzi i timbri? Prova a ricaricare la pagina tornando alla schermata principale e poi riapri questa schermata.'
        }
    },
    unauthenticated: {
        loginTitle: 'Accedi per iniziare',
        loginButtonText: 'Accedi'
    },
    howItWorks: {
        imagePath: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/',
        title: 'Risparmia sui tuoi piatti preferiti',
        text: 'La tua fedeltà sarà premiata. Inizia a raccogliere timbri con i tuoi ristoranti preferiti per ottenere sconti appetitosi!',
        exampleSection: {
            title: 'Ad esempio',
            orders: 'I tuoi ordini',
            percentage: '10% su ogni ordine',
            total: 'Sconto totale per il 6° ordine',
            accessibilityText: 'Se effettui 5 ordini per un totale di 230€, guadagnerai 34,5€ di sconto sul tuo sesto ordine.'
        },
        media: {
            title: 'Come funziona?',
            cards: {
                order: {
                    title: 'Ordina',
                    text: 'Raccogli un timbro ogni volta che ordini da uno dei ristoranti che hanno aderito al programma.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-restaurant-promo.svg'
                },
                earn: {
                    title: 'Risparmia',
                    text: 'Ogni timbro vale il 10% dell’importo dell’ordine (imposte e spese escluse) e viene aggiunto alla Carta Fedeltà del ristorante da cui hai ordinato.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-login-promo-full-colour-10.svg'
                },
                collect: {
                    title: 'Raccogli',
                    text: 'Una volta raccolti cinque timbri con lo stesso ristorante, avrai diritto a uno sconto sul sesto ordine.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-complex-object-stampcard-colour-03-10-full.svg'
                },
                reward: {
                    title: 'Usa lo sconto',
                    text: 'Lo sconto equivale all’importo totalizzato con i cinque timbri raccolti e sarà applicato automaticamente al sesto ordine dallo stesso ristorante.',
                    image: 'https://just-eat-prod-eu-res.cloudinary.com/image/upload/v1630068495/Experiments/Homeweb-Coreweb/stampcards-bag-order-refund.svg'
                }
            }
        }
    }
};

export default {
    messages
};
