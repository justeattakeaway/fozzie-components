const messages = {
    locale: 'it-IT',

    labels: {
        addressGroup: 'Indirizzo',
        deliveryOrderMethod: 'Orario di consegna',
        collectionOrderMethod: 'Orario per il ritiro',
        dineinOrderMethod: 'Orario di consumazione in loco'
    },

    formFields: {
        dineIn: {
            tableIdentifier: {
                label: 'Numero o nome del tavolo',
                validationMessages: {
                    required: 'Inserisci il tuo numero di tavolo'
                }
            }
        },
        customer: {
            mobileNumber: {
                label: 'Numero di cellulare',
                validationMessages: {
                    required: 'Inserisci il tuo numero di telefono',
                    invalid: 'Inserisci un numero di telefono valido'
                }
            },
            firstName: {
                label: 'Nome',
                validationMessages: {
                    required: 'Inserisci il tuo nome'
                }
            },
            lastName: {
                label: 'Cognome',
                validationMessages: {
                    required: 'Inserisci il tuo cognome'
                }
            },
            email: {
                label: 'Email',
                validationMessages: {
                    required: 'Inserisci la tua email',
                    invalid: 'Inserisci un indirizzo e-mail valido'
                }
            }
        },
        address: {
            line1: {
                label: 'Indirizzo riga 1. ad es. "Via Rizzoli"',
                validationMessages: {
                    required: 'Aggiungi la riga 1 all’indirizzo di consegna'
                }
            },
            line2: {
                label: 'Indirizzo riga 2 ad es. "7"',
                validationMessages: {
                    required: 'Inserisci la seconda riga del tuo indirizzo'
                }
            },
            line3: {
                label: 'Indirizzo riga 3 ad es. "Citofono"'
            },
            line4: {
                label: 'Indirizzo riga 4 ad es. "Interno e Scala"'
            },
            locality: {
                label: 'Città',
                validationMessages: {
                    required: 'Aggiungi la città all’indirizzo di consegna'
                }
            },
            postcode: {
                label: 'CAP',
                validationMessages: {
                    required: 'Inserisci un CAP valido',
                    invalid: 'Non riconosciamo il CAP che hai inserito. Controllalo e inseriscilo nuovamente'
                }
            }
        }
    },

    asapFulfilmentOption: 'Appena possibile',

    errorMessages: {
        errorHeading: 'Errore',
        genericServerError: 'Qualcosa è andato storto, mi dispiace. Riprovare',
        singleFieldError: 'C’è un errore nel modulo',
        multipleFieldErrors: 'Ci sono {errorCount} errori nel modulo',
        pageLoad: {
            heading: 'Qualcosa è andato storto',
            description: 'Si tratta di un problema nel nostro sistema, siamo spiacenti. Il tuo carrello, tuttavia, non ha subito modifiche. Riprova subito.',
            buttonText: 'Torna all\'ordine'
        },
        accessForbiddenError: {
            heading: 'Qualcosa è andato storto',
            description: 'Questo carrello è stato creato con un account diverso da questo, quindi non possiamo procedere. Per favore aggiungi di nuovo i tuoi articoli.',
            buttonText: 'Torna all\'ordine'
        },
        noTimeAvailable: {
            heading: 'Qualcosa è andato storto',
            description: 'Siamo spiacenti, ma non ci sono orari disponibili per il servizio di {serviceType}. Scegli un altro ristorante per il tuo ordine.',
            buttonText: 'Cerca un altro ristorante'
        },

        guestUserCreationFailure: 'Siamo spiacenti, il pagamento come utente ospite non è disponibile. Riprova o registrati',

        checkoutIssues: {
            MINIMUM_ORDER_VALUE_NOT_MET: {
                title: 'Importo minimo di spesa non raggiunto',
                message: 'Spiacenti: non hai raggiunto l’importo minimo di spesa necessario. Ti preghiamo di correggere il tuo ordine.',
                buttonText: 'Torna all\'ordine'
            },

            RESTAURANT_NOT_TAKING_ORDERS: {
                title: 'Il ristorante non accetta ordini',
                message: 'Ci dispiace, ma al momento il ristorante non accetta ordini. Scegli un altro ristorante per il tuo ordine.',
                buttonText: 'Torna alla ricerca'
            },

            SERVICE_TYPE_UNAVAILABLE: {
                title: '{serviceType} in loco non disponibili',
                message: 'Ci dispiace, ma al momento il ristorante non accetta ordini con {serviceType}. Scegli un ordine con oppure ordina da un altro ristorante.',
                buttonText: 'Torna all\'ordine'
            },

            ADDITIONAL_ITEMS_REQUIRED: {
                title: 'Articolo/i non ordinabile',
                message: 'Spiacenti: l’articolo/gli articoli che hai richiesto non possono essere ordinati singolarmente ma solo insieme ad altri articoli. Ti preghiamo di correggere il tuo ordine.',
                buttonText: 'Torna all\'ordine'
            },

            ITEMS_UNORDERABLE: {
                title: 'Articolo/i non disponibile',
                message: 'Spiacenti: alcuni degli articoli che hai inserito nell’ordine non sono più disponibili. Verifica il tuo ordine prima di continuare.',
                buttonText: 'Torna all\'ordine'
            },

            FULFILMENT_TIME_UNAVAILABLE: {
                title: 'Orario non disponibile',
                message: 'Spiacenti: l’orario selezionato non è più disponibile. Seleziona un altro orario.',
                buttonText: 'Ok'
            },

            LOCATION_UNDELIVERABLE: {
                title: 'Non si effettuano consegne a questo indirizzo',
                message: 'Spiacenti: attualmente il ristorante non consegna a questo indirizzo. Scegli l’opzione del ritiro oppure ordina da un altro ristorante.',
                buttonText: 'Ok'
            },

            TABLE_IDENTIFIER_REQUIRED: {
                title: 'È obbligatorio inserire numero di tavolo/nome',
                message: 'Non hai specificato come trovarti all’interno del ristorante. Per favore, inserisci il numero del tuo tavolo e riprova.',
                buttonText: 'Ok'
            },

            GEOLOCATION_REQUIRED: {
                title: 'Qualcosa è andato storto',
                message: 'Siamo spiacenti, ma al momento il ristorante non consegna a questo indirizzo. Scegli l’opzione del ritiro oppure ordina da un altro ristorante.',
                buttonText: 'Torna all\'ordine'
            },

            KITCHEN_NOTE_NOT_ACCEPTED: {
                title: 'Nota per la cucina non valida',
                message: 'Spiacenti, la nota che hai lasciato per la cucina non è stata accettata',
                buttonText: 'Ok'
            },

            COURIER_NOTE_NOT_ACCEPTED: {
                title: 'Nota per il courier non valida',
                message: 'Spiacenti, la nota che hai lasciato per il courier non è stata accettata',
                buttonText: 'Ok'
            },

            ORDER_NOTE_NOT_ACCEPTED: {
                title: 'Nota non valida',
                message: 'Spiacenti, la nota che hai lasciato non è stata accettata',
                buttonText: 'Ok'
            },

            DEFAULT_CHECKOUT_ISSUE: {
                title: 'Qualcosa è andato storto',
                message: 'Si prega di riprovare.',
                buttonText: 'Ok'
            },

            DuplicateOrder: {
                title: 'Questo ordine non è stato inviato',
                message: 'L’ordine è identico a quello che hai inviato un attimo fa e vogliamo accertarci che non si tratti di un errore. Attendi 15 minuti o modifica un articolo dell’ordine',
                buttonText: 'Chiudi',
                buttonTextPrimary: 'Visualizza i miei ordini'
            },

            BasketChanged: {
                title: 'Abbiamo eliminato un articolo dal tuo ordine',
                message: 'Il ristorante potrebbe averlo esaurito o potrebbe aver aggiornato il suo menù durante il tuo ordine. Puoi tornare indietro e modificare l’ordine scegliendo un altro articolo.',
                buttonText: 'Torna all\'ordine'
            }
        }
    },

    warningMessages: {
        preOrder: {
            title: 'Attenzione: questo è un pre-ordine',
            body: 'Verifica giorno e orario qui sopra'
        }
    },

    buttonText: 'Vai al pagamento',

    userNote: {
        courier: {
            delivery: {
                title: 'Aggiungi una nota per il courier',
                text: 'Lascia una nota per il courier se ci sono informazioni particolari di cui deve essere a conoscenza (ad es. il citofono non funziona).',
                placeholder: 'ad es. il citofono non funziona.'
            },
            collection: {
                title: 'Lascia una nota',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza. Non inserire dettagli sulle allergie.',
                placeholder: 'Non inserire dettagli sulle allergie in questo campo. Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            },
            dinein: {
                title: 'Lascia una nota',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza. Non inserire dettagli sulle allergie.',
                placeholder: 'ad esempio: servire insieme antipasti e primi. \n\nNon inserire dettagli sulle allergie in questo campo.'
            }
        },
        order: {
            delivery: {
                title: 'Lascia una nota',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza (ad es. il citofono non funziona). Non inserire dettagli sulle allergie.',
                placeholder: 'ad es. il citofono non funziona. Non inserire dettagli sulle allergie in questo campo. Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            },
            collection: {
                title: 'Lascia una nota',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza. Non inserire dettagli sulle allergie.',
                placeholder: 'ad es. il citofono non funziona. Non inserire dettagli sulle allergie in questo campo. Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            },
            dinein: {
                title: 'Lascia una nota',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza. Non inserire dettagli sulle allergie.',
                placeholder: 'Non inserire dettagli sulle allergie in questo campo. Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            }
        },
        kitchen: {
            delivery: {
                title: 'Aggiungi una nota per la cucina',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza.',
                placeholder: 'Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            },
            dinein: {
                title: 'Aggiungi una nota per la cucina',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza.',
                placeholder: 'Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            },
            collection: {
                title: 'Aggiungi una nota per la cucina',
                text: 'Lascia una nota per il ristorante se ci sono informazioni particolari di cui devono essere a conoscenza.',
                placeholder: 'Insieme ai ristoranti, ci stiamo impegnando per ridurre i rifiuti: aiutaci anche tu evitando di chiedere posate in plastica.'
            }
        }
    },

    checkoutHeader: {
        user: {
            title: '{name}, conferma i tuoi dati',
            switchUser: 'Non sei {name}? Clicca qui'
        },
        guest: {
            loginTitle: 'Come desideri procedere?',
            loginButton: 'Come desideri procedere?',
            option: 'o',
            guestTitle: 'Continua senza creare un account',
            confirmation: 'Per favore, conferma i tuoi dati {serviceType}'
        }
    },

    serviceTypes: {
        collection: 'Ritiro',
        delivery: 'Consegna'
    },

    checkoutTermsAndConditions: 'Effettuando un ordine, accetti i nostri {termsAndConditions}. Leggi la nostra {privacyPolicy} e la {cookiePolicy}.',

    termsAndConditionsLinkText: 'Termini & Condizioni',
    termsAndConditionsLinkUrl: 'https://www.just-eat.es/info/terminos-y-condiciones',

    privacyPolicyLinkText: 'Informativa sulla Privacy',
    privacyPolicyLinkUrl: 'https://www.just-eat.es/info/politica-de-privacidad',

    cookiePolicyLinkText: 'Consenso ai cookie',
    cookiePolicyLinkUrl: 'https://www.just-eat.it/info/politica-de-privacidad',

    ageVerification: {
        heading: 'Conferma la tua data di nascita',
        description: 'Il tuo ordine contiene alcolici. Ti chiediamo di confermare di avere un\'età superiore ai 18 anni.',
        ageSelection: {
            day: 'Giorno',
            month: 'Mese',
            year: 'Anno'
        },
        askForIdDescription: 'Alla consegna, potrebbe esserti richiesto di mostrare un documento d’identità con foto. Il courier non potrà consegnare l’ordine se il nome riportato sul documento di identità non corrisponde a quello dell’ordine, né potrà consegnarlo a chiunque appaia in stato di ebbrezza.',
        errorMessage: 'Devi avere almeno 18 anni per ordinare alcolici.',
        buttonText: 'Continua'
    }
};

const dateTimeFormats = {
    short: {
        weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: false
    }
};

export default {
    messages,
    dateTimeFormats
};
